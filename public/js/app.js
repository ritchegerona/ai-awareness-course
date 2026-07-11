/* AI Awareness Course — application runtime
   Cross-platform hardened: storage, downloads, mobile nav, offline SW
*/
(function () {
  'use strict';

  const STORAGE_KEY = 'aiCourseState';
  const PASS_QUIZ = 4;
  const PASS_EXAM = 18;

  const defaultState = () => ({
    currentModule: 0,
    completedLessons: [],
    quizScores: {},
    examScore: null,
    examTaken: false,
    learnerName: '',
    examAnswers: {}
  });

  let state = defaultState();

  // ===== UTILITIES =====
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeFileName(str) {
    return String(str)
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .slice(0, 80) || 'Learner';
  }

  function toast(message, ms) {
    const el = document.getElementById('appToast');
    if (!el) {
      try { alert(message); } catch (_) { /* ignore */ }
      return;
    }
    el.textContent = message;
    el.hidden = false;
    el.classList.add('visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove('visible');
      el.hidden = true;
    }, ms || 3200);
  }

  function normalizeState(parsed) {
    const base = defaultState();
    if (!parsed || typeof parsed !== 'object') return base;

    if (typeof parsed.learnerName === 'string') base.learnerName = parsed.learnerName.slice(0, 120);
    if (Array.isArray(parsed.completedLessons)) {
      base.completedLessons = parsed.completedLessons
        .map(Number)
        .filter(function (n) { return n >= 1 && n <= MODULES.length; });
      // unique
      base.completedLessons = base.completedLessons.filter(function (v, i, a) { return a.indexOf(v) === i; });
    }
    if (parsed.quizScores && typeof parsed.quizScores === 'object') {
      Object.keys(parsed.quizScores).forEach(function (k) {
        const n = Number(parsed.quizScores[k]);
        if (!isNaN(n)) base.quizScores[k] = n;
      });
    }
    if (typeof parsed.examScore === 'number' || parsed.examScore === null) base.examScore = parsed.examScore;
    if (typeof parsed.examTaken === 'boolean') base.examTaken = parsed.examTaken;
    if (parsed.examAnswers && typeof parsed.examAnswers === 'object') base.examAnswers = parsed.examAnswers;
    if (parsed.currentModule === 'exam' || parsed.currentModule === 'cert' || parsed.currentModule === 0) {
      base.currentModule = parsed.currentModule;
    } else {
      const cm = parseInt(parsed.currentModule, 10);
      if (cm >= 0 && cm <= MODULES.length) base.currentModule = cm;
    }
    return base;
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = normalizeState(JSON.parse(saved));
      }
    } catch (e) {
      state = defaultState();
      toast('Could not load saved progress. Starting fresh.');
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      toast('Could not save progress (storage full or private mode).');
      return false;
    }
  }

  // ===== MOBILE NAV =====
  function isMobileNav() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function setSidebarOpen(open) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('menuToggle');
    if (!sidebar) return;

    if (open) {
      sidebar.classList.add('open');
      document.body.classList.add('sidebar-open');
      if (backdrop) {
        backdrop.hidden = false;
        backdrop.classList.add('visible');
      }
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
    } else {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
      if (backdrop) {
        backdrop.classList.remove('visible');
        backdrop.hidden = true;
      }
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    setSidebarOpen(!sidebar.classList.contains('open'));
  }

  function closeSidebarIfMobile() {
    if (isMobileNav()) setSidebarOpen(false);
  }

  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (toggle) toggle.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', function () { setSidebarOpen(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setSidebarOpen(false); });
    window.addEventListener('resize', function () {
      if (!isMobileNav()) setSidebarOpen(false);
    });
  }

  // ===== NAME PROMPT =====
  function showNamePrompt() {
    const modal = document.getElementById('nameModal');
    if (modal) modal.classList.add('active');
    const input = document.getElementById('learnerName');
    if (input) {
      setTimeout(function () { input.focus(); }, 50);
    }
  }

  function saveName() {
    const input = document.getElementById('learnerName');
    const name = input ? input.value.trim() : '';
    if (!name) {
      toast('Please enter your name.');
      if (input) input.focus();
      return;
    }
    state.learnerName = name.slice(0, 120);
    saveState();
    const modal = document.getElementById('nameModal');
    if (modal) modal.classList.remove('active');
  }

  function initNameModal() {
    const input = document.getElementById('learnerName');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveName();
        }
      });
      if (state.learnerName) input.value = state.learnerName;
    }
  }

  // ===== RENDER SIDEBAR =====
  function renderSidebar() {
    const list = document.getElementById('moduleList');
    if (!list) return;
    let html = '';
    MODULES.forEach(function (mod, i) {
      const idx = i + 1;
      const isActive = state.currentModule === idx;
      const isCompleted = state.completedLessons.indexOf(idx) !== -1;
      html +=
        '<li class="module-item' + (isActive ? ' active' : '') + (isCompleted ? ' completed' : '') + '" data-nav="' + idx + '">' +
        '<span class="num">' + (isCompleted ? '✓' : idx) + '</span>' +
        '<span class="info">' +
        '<span class="title">' + mod.icon + ' ' + escapeHtml(mod.title) + '</span>' +
        '<span class="duration">' + escapeHtml(mod.duration) + '</span>' +
        '</span></li>';
    });
    const isExamActive = state.currentModule === 'exam';
    html +=
      '<li class="module-item exam-item' + (isExamActive ? ' active' : '') + '" data-nav="exam">' +
      '<span class="num">' + (state.examTaken ? '✓' : '★') + '</span>' +
      '<span class="info">' +
      '<span class="title">📝 Final Exam</span>' +
      '<span class="duration">30 min</span>' +
      '</span></li>';
    html +=
      '<li class="module-item about-item" data-nav="about" role="button">' +
      '<span class="num">👤</span>' +
      '<span class="info">' +
      '<span class="title">About the Author</span>' +
      '<span class="duration">Ritche Gerona</span>' +
      '</span></li>';
    list.innerHTML = html;
    list.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        const t = el.getAttribute('data-nav');
        if (t === 'about') {
          navigateTo(0);
          setTimeout(function () {
            const section = document.getElementById('aboutAuthor');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
          return;
        }
        navigateTo(t === 'exam' ? 'exam' : parseInt(t, 10));
      });
    });
    updateProgress();
  }

  function updateProgress() {
    const total = MODULES.length + 1;
    const done = state.completedLessons.length + (state.examTaken ? 1 : 0);
    const pct = Math.round((done / total) * 100);
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  // ===== NAVIGATION =====
  function navigateTo(target) {
    if (!state.learnerName) {
      showNamePrompt();
      return;
    }

    closeSidebarIfMobile();

    const dashboard = document.getElementById('dashboard');
    const pageHeader = document.getElementById('pageHeader');
    const certView = document.getElementById('certificateView');
    if (dashboard) dashboard.style.display = 'none';
    document.querySelectorAll('.module-view').forEach(function (el) { el.classList.remove('active'); });
    if (certView) certView.classList.remove('active');
    if (pageHeader) pageHeader.style.display = 'block';

    if (target === 0 || target === '0') {
      state.currentModule = 0;
      if (dashboard) dashboard.style.display = 'block';
      if (pageHeader) pageHeader.style.display = 'block';
      renderSidebar();
      renderDashboardCards();
      saveState();
      window.scrollTo(0, 0);
      return;
    }

    if (target === 'exam') {
      state.currentModule = 'exam';
      if (pageHeader) pageHeader.style.display = 'none';
      renderExam();
      renderSidebar();
      saveState();
      window.scrollTo(0, 0);
      return;
    }

    const idx = parseInt(target, 10);
    if (isNaN(idx) || idx < 1 || idx > MODULES.length) return;

    state.currentModule = idx;
    renderModule(idx);
    renderSidebar();
    saveState();
    window.scrollTo(0, 0);
  }

  // ===== RENDER MODULE =====
  function renderModule(idx) {
    const mod = MODULES[idx - 1];
    const container = document.getElementById('moduleViews');
    if (!mod || !container) return;

    let view = document.getElementById('mod' + idx);
    if (!view) {
      view = document.createElement('div');
      view.id = 'mod' + idx;
      view.className = 'module-view';
      container.appendChild(view);
    }

    const isCompleted = state.completedLessons.indexOf(idx) !== -1;
    const score = state.quizScores[idx];

    const questionsHtml = mod.questions.map(function (q, qi) {
      const optionsHtml = q.options.map(function (opt, oi) {
        return (
          '<label data-select-option="' + idx + ',' + qi + ',' + oi + '">' +
          '<input type="radio" name="q' + idx + '_' + qi + '" value="' + oi + '">' +
          escapeHtml(opt) +
          '</label>'
        );
      }).join('');
      return (
        '<div class="question" id="q' + idx + '_' + qi + '">' +
        '<div class="q-text">' + (qi + 1) + '. ' + escapeHtml(q.q) + '</div>' +
        '<div class="options">' + optionsHtml + '</div>' +
        '<div class="feedback" id="fb' + idx + '_' + qi + '"></div>' +
        '</div>'
      );
    }).join('');

    const scoreLabel = isCompleted
      ? '✅ Completed! Well done.'
      : (score !== undefined && score < PASS_QUIZ ? '❌ Needs improvement. Retake to pass.' : '');

    view.innerHTML =
      '<div class="module-content">' +
      '<h2>' + mod.icon + ' Module ' + idx + ': ' + escapeHtml(mod.title) + '</h2>' +
      '<p class="subtitle">' + escapeHtml(mod.subtitle) + ' · ' + escapeHtml(mod.duration) + '</p>' +
      mod.content +
      '<div class="quiz-section" id="quiz' + idx + '">' +
      '<h3>📝 Module ' + idx + ' Quiz</h3>' +
      '<p style="color:var(--gray-500);margin-bottom:16px;">Test your understanding of this module. You need ' + PASS_QUIZ + '/5 correct to pass.</p>' +
      questionsHtml +
      '<div class="quiz-actions">' +
      '<button type="button" class="btn btn-primary" data-submit-quiz="' + idx + '">✅ Submit Quiz</button>' +
      '<button type="button" class="btn btn-outline" data-reset-quiz="' + idx + '">🔄 Reset</button>' +
      '</div>' +
      '<div class="quiz-score" id="quizScore' + idx + '" style="display:' + (isCompleted ? 'block' : 'none') + '">' +
      '<div class="score-num">' + (score !== undefined ? score : '—') + '/5</div>' +
      '<div class="score-label">' + scoreLabel + '</div>' +
      '</div></div></div>' +
      '<div class="section-nav">' +
      '<button type="button" class="btn btn-outline" data-nav-to="' + (idx > 1 ? idx - 1 : 0) + '"' + (idx <= 1 ? ' disabled' : '') + '>◀ Previous</button>' +
      '<button type="button" class="btn btn-primary" data-nav-to="' + (idx < MODULES.length ? idx + 1 : 'exam') + '">' +
      (idx < MODULES.length ? 'Next Module ▶' : 'Go to Final Exam ▶') +
      '</button></div>';

    view.querySelectorAll('[data-select-option]').forEach(function (el) {
      el.addEventListener('click', function () {
        const parts = el.getAttribute('data-select-option').split(',');
        selectOption(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
      });
    });
    const submitBtn = view.querySelector('[data-submit-quiz]');
    if (submitBtn) submitBtn.addEventListener('click', function () { submitQuiz(idx); });
    const resetBtn = view.querySelector('[data-reset-quiz]');
    if (resetBtn) resetBtn.addEventListener('click', function () { resetQuiz(idx); });
    view.querySelectorAll('[data-nav-to]').forEach(function (el) {
      el.addEventListener('click', function () {
        const t = el.getAttribute('data-nav-to');
        navigateTo(t === 'exam' ? 'exam' : parseInt(t, 10));
      });
    });

    view.classList.add('active');
  }

  // ===== QUIZ LOGIC =====
  function selectOption(modIdx, qIdx, optIdx) {
    const labels = document.querySelectorAll('#q' + modIdx + '_' + qIdx + ' .options label');
    labels.forEach(function (l) { l.classList.remove('selected'); });
    if (!labels[optIdx]) return;
    labels[optIdx].classList.add('selected');
    const radio = labels[optIdx].querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }

  function submitQuiz(modIdx) {
    const mod = MODULES[modIdx - 1];
    if (!mod) return;
    let correct = 0;

    mod.questions.forEach(function (q, qi) {
      const selected = document.querySelector('input[name="q' + modIdx + '_' + qi + '"]:checked');
      const fb = document.getElementById('fb' + modIdx + '_' + qi);
      if (!fb) return;
      fb.className = 'feedback';

      if (selected) {
        const val = parseInt(selected.value, 10);
        if (val === q.answer) {
          correct++;
          fb.className = 'feedback correct';
          fb.textContent = '✅ Correct!';
        } else {
          fb.className = 'feedback incorrect';
          fb.textContent = '❌ Incorrect. The correct answer was: ' + q.options[q.answer];
        }
      } else {
        fb.className = 'feedback incorrect';
        fb.textContent = '❌ No answer selected. The correct answer was: ' + q.options[q.answer];
      }
    });

    state.quizScores[modIdx] = correct;

    if (correct >= PASS_QUIZ) {
      if (state.completedLessons.indexOf(modIdx) === -1) {
        state.completedLessons.push(modIdx);
      }
      saveState();
      renderSidebar();
      renderDashboardCards();
    } else {
      saveState();
    }

    const scoreDiv = document.getElementById('quizScore' + modIdx);
    if (scoreDiv) {
      scoreDiv.style.display = 'block';
      const num = scoreDiv.querySelector('.score-num');
      const label = scoreDiv.querySelector('.score-label');
      if (num) num.textContent = correct + '/5';
      if (label) {
        label.textContent = correct >= PASS_QUIZ
          ? '✅ Passed! Great job!'
          : '❌ Not quite. You need ' + PASS_QUIZ + '/5 to pass. Review the module and try again.';
      }
    }

    updateProgress();
  }

  function resetQuiz(modIdx) {
    document.querySelectorAll('#quiz' + modIdx + ' input[type="radio"]').forEach(function (r) { r.checked = false; });
    document.querySelectorAll('#quiz' + modIdx + ' .feedback').forEach(function (f) {
      f.className = 'feedback';
      f.textContent = '';
    });
    document.querySelectorAll('#quiz' + modIdx + ' .options label').forEach(function (l) { l.classList.remove('selected'); });
    const scoreDiv = document.getElementById('quizScore' + modIdx);
    if (scoreDiv) scoreDiv.style.display = 'none';
    if (state.quizScores[modIdx] !== undefined) delete state.quizScores[modIdx];
    state.completedLessons = state.completedLessons.filter(function (l) { return l !== modIdx; });
    saveState();
    updateProgress();
    renderSidebar();
    renderDashboardCards();
  }

  // ===== EXAM =====
  function renderExam() {
    const container = document.getElementById('moduleViews');
    if (!container) return;
    let view = document.getElementById('examView');
    if (!view) {
      view = document.createElement('div');
      view.id = 'examView';
      view.className = 'module-view';
      container.appendChild(view);
    }

    const allModulesDone = state.completedLessons.length === MODULES.length;
    const passed = state.examScore !== null && state.examScore >= PASS_EXAM;

    let html =
      '<div class="exam-header">' +
      '<h3>📝 Final Exam</h3>' +
      '<p>Test your overall understanding of AI in the workplace.</p>' +
      '<div class="exam-requirements">' +
      '<span class="req ' + (allModulesDone ? 'met' : 'unmet') + '">' +
      (allModulesDone ? '✅' : '❌') + ' All ' + MODULES.length + ' modules completed</span>' +
      '<span class="req ' + (!state.examTaken ? 'met' : (state.examScore >= PASS_EXAM ? 'met' : 'unmet')) + '">' +
      (!state.examTaken ? '⏳' : (state.examScore >= PASS_EXAM ? '✅' : '❌')) + ' ' + PASS_EXAM + '/25 to pass</span>' +
      '</div></div>';

    if (state.examTaken && passed) {
      html +=
        '<div class="quiz-score" style="margin-bottom:24px;">' +
        '<div class="score-num">' + state.examScore + '/25</div>' +
        '<div class="score-label">🎉 Exam Passed! You can now claim your certificate.</div></div>';
    } else if (state.examTaken && !passed) {
      html +=
        '<div class="quiz-score" style="margin-bottom:24px;">' +
        '<div class="score-num">' + state.examScore + '/25</div>' +
        '<div class="score-label">❌ Not passed. You need ' + PASS_EXAM + '/25. Review the modules and try again.</div></div>';
    }

    if (state.examTaken) {
      html += '<h3>Exam Results</h3>';
      EXAM_QUESTIONS.forEach(function (q, qi) {
        const userAns = state.examAnswers[qi];
        const correct = userAns === q.answer;
        const userText = q.options[userAns] !== undefined ? q.options[userAns] : 'No answer';
        html +=
          '<div class="question" style="border-color: ' + (correct ? 'var(--success)' : 'var(--danger)') + '">' +
          '<div class="q-text">' + (qi + 1) + '. ' + escapeHtml(q.q) + '</div>' +
          '<p style="font-size:13px;color:' + (correct ? 'var(--success)' : 'var(--danger)') + ';margin-top:8px;">' +
          (correct ? '✅ Correct' : '❌ Your answer: ' + escapeHtml(userText) + ' · Correct: ' + escapeHtml(q.options[q.answer])) +
          '</p></div>';
      });
      html +=
        '<div style="text-align:center;margin-top:24px;">' +
        '<button type="button" class="btn btn-outline" id="btnRetakeExam">🔄 Retake Exam</button>' +
        (passed ? '<button type="button" class="btn btn-success btn-lg" id="btnClaimCert" style="margin-left:12px;">🎓 Claim Certificate</button>' : '') +
        '</div>';
    } else if (!allModulesDone) {
      html +=
        '<div class="callout warning"><strong>🔒 Locked</strong>' +
        '<p>Please complete all ' + MODULES.length + ' modules first before taking the final exam.</p></div>' +
        '<div style="text-align:center;margin-top:20px;">' +
        '<button type="button" class="btn btn-primary btn-lg" id="btnGoModule1">▶ Go to Module 1</button></div>';
    } else {
      html += '<p style="margin-bottom:20px;color:var(--gray-500);">Answer all 25 questions. You need at least ' + PASS_EXAM + '/25 to pass.</p>';
      EXAM_QUESTIONS.forEach(function (q, qi) {
        const optionsHtml = q.options.map(function (opt, oi) {
          return (
            '<label data-exam-option="' + qi + ',' + oi + '">' +
            '<input type="radio" name="exam_q' + qi + '" value="' + oi + '">' +
            escapeHtml(opt) +
            '</label>'
          );
        }).join('');
        html +=
          '<div class="question" id="exQ' + qi + '">' +
          '<div class="q-text">' + (qi + 1) + '. ' + escapeHtml(q.q) + '</div>' +
          '<div class="options">' + optionsHtml + '</div></div>';
      });
      html +=
        '<div class="quiz-actions">' +
        '<button type="button" class="btn btn-primary btn-lg" id="btnSubmitExam">✅ Submit Exam</button></div>';
    }

    view.innerHTML = html;
    view.classList.add('active');

    const retake = document.getElementById('btnRetakeExam');
    if (retake) retake.addEventListener('click', resetExam);
    const claim = document.getElementById('btnClaimCert');
    if (claim) claim.addEventListener('click', showCertificate);
    const go1 = document.getElementById('btnGoModule1');
    if (go1) go1.addEventListener('click', function () { navigateTo(1); });
    const submit = document.getElementById('btnSubmitExam');
    if (submit) submit.addEventListener('click', submitExam);
    view.querySelectorAll('[data-exam-option]').forEach(function (el) {
      el.addEventListener('click', function () {
        const parts = el.getAttribute('data-exam-option').split(',');
        selectExamOption(parseInt(parts[0], 10), parseInt(parts[1], 10));
      });
    });
  }

  function selectExamOption(qIdx, optIdx) {
    const labels = document.querySelectorAll('#exQ' + qIdx + ' .options label');
    labels.forEach(function (l) { l.classList.remove('selected'); });
    if (!labels[optIdx]) return;
    labels[optIdx].classList.add('selected');
    const radio = labels[optIdx].querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }

  function submitExam() {
    if (state.completedLessons.length !== MODULES.length) {
      toast('Complete all modules before submitting the exam.');
      return;
    }
    const btn = document.getElementById('btnSubmitExam');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Submitting…';
    }

    let correct = 0;
    const answers = {};

    EXAM_QUESTIONS.forEach(function (q, qi) {
      const selected = document.querySelector('input[name="exam_q' + qi + '"]:checked');
      if (selected) {
        const val = parseInt(selected.value, 10);
        answers[qi] = val;
        if (val === q.answer) correct++;
      } else {
        answers[qi] = -1;
      }
    });

    state.examScore = correct;
    state.examTaken = true;
    state.examAnswers = answers;
    saveState();
    updateProgress();
    renderExam();
    renderSidebar();
  }

  function resetExam() {
    state.examTaken = false;
    state.examScore = null;
    state.examAnswers = {};
    saveState();
    updateProgress();
    renderExam();
    renderSidebar();
  }

  // ===== CERTIFICATE =====
  function showCertificate() {
    if (!state.examTaken || state.examScore === null || state.examScore < PASS_EXAM) {
      toast('Pass the final exam to claim your certificate.');
      return;
    }
    state.currentModule = 'cert';
    const dashboard = document.getElementById('dashboard');
    const pageHeader = document.getElementById('pageHeader');
    const certView = document.getElementById('certificateView');
    if (dashboard) dashboard.style.display = 'none';
    document.querySelectorAll('.module-view').forEach(function (el) { el.classList.remove('active'); });
    if (pageHeader) pageHeader.style.display = 'none';
    if (certView) certView.classList.add('active');

    const nameEl = document.getElementById('certName');
    const dateEl = document.getElementById('certDate');
    const scoreEl = document.getElementById('certScore');
    if (nameEl) nameEl.textContent = state.learnerName;
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
    if (scoreEl) scoreEl.textContent = state.examScore + '/25';
    saveState();
    closeSidebarIfMobile();
    window.scrollTo(0, 0);
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function restoreCertStyles(cert, glow, origW, origH) {
    if (glow) glow.style.animation = '';
    cert.style.width = origW;
    cert.style.height = origH;
  }

  function downloadCertificatePNG() {
    const cert = document.getElementById('certificateContent');
    if (!cert) {
      toast('Certificate not found.');
      return;
    }
    if (typeof html2canvas !== 'function') {
      toast('Export library unavailable. Opening print dialog…');
      window.print();
      return;
    }

    const glow = cert.querySelector('.certificate-border-glow');
    if (glow) glow.style.animation = 'none';

    const LANDSCAPE_W = 920;
    const LANDSCAPE_H = 650;
    const origW = cert.style.width;
    const origH = cert.style.height;
    cert.style.width = LANDSCAPE_W + 'px';
    cert.style.height = LANDSCAPE_H + 'px';

    const filename = 'AI-Awareness-Certificate-' + safeFileName(state.learnerName) + '.png';
    const btn = document.querySelector('.cert-actions .btn-primary');
    if (btn) {
      btn.disabled = true;
      btn.dataset.prevText = btn.textContent;
      btn.textContent = 'Generating…';
    }

    html2canvas(cert, {
      scale: 2,
      backgroundColor: '#080c24',
      allowTaint: false,
      useCORS: true,
      logging: false,
      width: LANDSCAPE_W,
      height: LANDSCAPE_H
    }).then(function (canvas) {
      restoreCertStyles(cert, glow, origW, origH);
      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.prevText || '📥 Download Certificate (PNG)';
      }
      if (canvas.toBlob) {
        canvas.toBlob(function (blob) {
          if (blob) {
            downloadBlob(blob, filename);
          } else {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
          }
        }, 'image/png');
      } else {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }).catch(function () {
      restoreCertStyles(cert, glow, origW, origH);
      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.prevText || '📥 Download Certificate (PNG)';
      }
      toast('PNG export failed. Opening print dialog…');
      window.print();
    });
  }

  // ===== DASHBOARD =====
  function renderDashboardCards() {
    const grid = document.getElementById('moduleCards');
    if (!grid) return;
    let html = '';
    MODULES.forEach(function (mod, i) {
      const idx = i + 1;
      const done = state.completedLessons.indexOf(idx) !== -1;
      html +=
        '<div class="dash-card" data-nav="' + idx + '" style="cursor:pointer;" role="button" tabindex="0">' +
        '<div class="icon" style="display:flex;justify-content:space-between;align-items:center;">' +
        '<span>' + mod.icon + '</span>' +
        (done
          ? '<span style="font-size:16px;color:var(--success);">✅</span>'
          : '<span style="font-size:16px;color:var(--gray-300);">⏳</span>') +
        '</div>' +
        '<h3>' + idx + '. ' + escapeHtml(mod.title) + '</h3>' +
        '<p>' + escapeHtml(mod.subtitle) + ' · ' + escapeHtml(mod.duration) + '</p></div>';
    });
    grid.innerHTML = html;
    grid.querySelectorAll('[data-nav]').forEach(function (el) {
      const go = function () { navigateTo(parseInt(el.getAttribute('data-nav'), 10)); };
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          go();
        }
      });
    });
  }

  // ===== SERVICE WORKER =====
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    // Only over http(s), not file://
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* offline SW optional — ignore */
      });
    });
  }

  // ===== GLOBALS (onclick in HTML shell) =====
  window.navigateTo = navigateTo;
  window.saveName = saveName;
  window.showNamePrompt = showNamePrompt;
  window.downloadCertificatePNG = downloadCertificatePNG;
  window.showCertificate = showCertificate;
  window.submitQuiz = submitQuiz;
  window.resetQuiz = resetQuiz;
  window.selectOption = selectOption;
  window.submitExam = submitExam;
  window.resetExam = resetExam;
  window.selectExamOption = selectExamOption;

  // ===== INIT =====
  function init() {
    if (typeof MODULES === 'undefined' || !MODULES.length) {
      toast('Course data failed to load. Check that modules-data.js is available.');
      return;
    }
    loadState();
    initMobileNav();
    initNameModal();
    renderSidebar();
    renderDashboardCards();

    if (!state.learnerName) {
      showNamePrompt();
    }

    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
