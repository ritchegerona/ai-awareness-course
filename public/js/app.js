/* AI Awareness Course — application runtime
   Cross-platform hardened: storage, downloads, mobile nav, offline SW
*/
(function () {
  'use strict';

  const STORAGE_KEY = 'aiCourseState_v1';
  const PASS_QUIZ = 4;
  const PASS_EXAM = 18;

  /** Course series catalog — V1 active; V2/V3 reserved for future topics */
  const COURSE_CATALOG = {
    v1: {
      id: 'v1',
      version: 1,
      level: 'Foundations',
      title: 'AI Awareness for the Workplace',
      audience: 'General / new to AI',
      status: 'active',
      duration: '~4h 45min',
      modules: 12
    },
    v2: {
      id: 'v2',
      version: 2,
      level: 'Intermediate',
      title: 'AI Awareness — Intermediate',
      audience: 'Practitioners ready for deeper tools & workflows',
      status: 'coming_soon'
    },
    v3: {
      id: 'v3',
      version: 3,
      level: 'Advanced',
      title: 'AI Awareness — Advanced',
      audience: 'Specialists & strategic implementers',
      status: 'planned'
    }
  };
  const ACTIVE_COURSE = COURSE_CATALOG.v1;
  const THEME_KEY = 'aiCourseTheme';
  const ADMIN_KEY = 'aiCourseAdminRoster_v1';

  const defaultState = () => ({
    currentModule: 0,
    completedLessons: [],
    quizScores: {},
    examScore: null,
    examTaken: false,
    learnerName: '',
    examAnswers: {},
    lastModule: 0
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
    el.classList.remove('celebrate', 'success');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove('visible', 'celebrate', 'success');
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
    const lm = parseInt(parsed.lastModule, 10);
    if (!isNaN(lm) && lm >= 0 && lm <= MODULES.length) base.lastModule = lm;
    else if (typeof base.currentModule === 'number' && base.currentModule >= 1) base.lastModule = base.currentModule;
    return base;
  }

  // ===== THEME =====
  function getTheme() {
    const t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* ignore */ }

    const isDark = next === 'dark';
    const side = document.getElementById('themeToggleSidebar');
    const label = document.getElementById('themeSwitchLabel');
    const mob = document.getElementById('themeToggleMobile');
    if (side) {
      side.checked = isDark;
      side.setAttribute('aria-checked', isDark ? 'true' : 'false');
    }
    if (label) label.textContent = isDark ? 'Dark mode' : 'Light mode';
    if (mob) mob.textContent = isDark ? 'Light' : 'Dark';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isDark ? '#0c0c0c' : '#f7f7f5');
  }

  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function initThemeToggle() {
    const side = document.getElementById('themeToggleSidebar');
    if (side) {
      side.addEventListener('change', function () {
        applyTheme(side.checked ? 'dark' : 'light');
      });
    }
  }

  function moduleChecklistItems(mod, idx, isCompleted) {
    const score = state.quizScores[idx];
    const attempted = typeof score === 'number';
    const quizDone = isCompleted || (attempted && score >= PASS_QUIZ);
    return [
      { text: 'Read the lesson content (' + (mod.duration || 'self-paced') + ')', done: attempted || isCompleted },
      { text: 'Review examples and key ideas', done: attempted || isCompleted },
      { text: 'Pass the module quiz (4/5 or higher)', done: !!quizDone }
    ];
  }

  function loadState() {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      // Migrate older progress key if present
      if (!saved) {
        const legacy = localStorage.getItem('aiCourseState');
        if (legacy) {
          saved = legacy;
          try { localStorage.setItem(STORAGE_KEY, legacy); } catch (_) { /* ignore */ }
        }
      }
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
    updateContinueBar();
    updateProgress();
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
        '<span class="title">' + escapeHtml(mod.title) + '</span>' +
        '<span class="duration">' + escapeHtml(mod.duration) + '</span>' +
        '</span></li>';
    });
    const isExamActive = state.currentModule === 'exam';
    html +=
      '<li class="module-item exam-item' + (isExamActive ? ' active' : '') + '" data-nav="exam">' +
      '<span class="num">' + (state.examTaken ? '✓' : 'E') + '</span>' +
      '<span class="info">' +
      '<span class="title">Final Exam</span>' +
      '<span class="duration">30 min · V' + ACTIVE_COURSE.version + '</span>' +
      '</span></li>';
    // About author opens modal (same as header menu)
    const aboutHtml =
      '<li class="module-item about-item" data-nav="about" role="button">' +
      '<span class="num">i</span>' +
      '<span class="info">' +
      '<span class="title">About the Author</span>' +
      '<span class="duration">Ritche Gerona</span>' +
      '</span></li>';
    list.innerHTML = aboutHtml + html;
    list.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        const t = el.getAttribute('data-nav');
        if (t === 'about') {
          openAuthorModal();
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

    // Hero progress ring + labels
    const ring = document.getElementById('heroProgressRing');
    const heroPct = document.getElementById('heroProgressPct');
    const heroSub = document.getElementById('heroProgressSub');
    const heroMods = document.getElementById('heroModulesDone');
    const heroExam = document.getElementById('heroExamStatus');
    const circumference = 2 * Math.PI * 40; // r=40
    if (ring) {
      ring.style.strokeDasharray = String(circumference);
      ring.style.strokeDashoffset = String(circumference * (1 - pct / 100));
    }
    if (heroPct) heroPct.textContent = String(pct);
    if (heroMods) heroMods.textContent = String(state.completedLessons.length);
    if (heroExam) {
      if (state.examTaken && state.examScore !== null && state.examScore >= PASS_EXAM) {
        heroExam.textContent = 'Exam passed · ' + state.examScore + '/25';
      } else if (state.examTaken) {
        heroExam.textContent = 'Exam retake · ' + state.examScore + '/25';
      } else if (state.completedLessons.length >= MODULES.length) {
        heroExam.textContent = 'Exam unlocked';
      } else {
        heroExam.textContent = 'Exam locked';
      }
    }
    if (heroSub) {
      if (pct >= 100) heroSub.textContent = 'Course complete — claim your certificate';
      else if (state.completedLessons.length === 0) heroSub.textContent = 'Start Module 1 to begin';
      else if (state.completedLessons.length < MODULES.length) {
        heroSub.textContent = (MODULES.length - state.completedLessons.length) + ' modules remaining';
      } else {
        heroSub.textContent = 'All modules done — take the final exam';
      }
    }
  }

  function celebrate(message) {
    toast(message || 'Great work!', 3600);
    const el = document.getElementById('appToast');
    if (el) el.classList.add('celebrate');
    setTimeout(function () {
      if (el) el.classList.remove('celebrate');
    }, 3600);

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layer = document.createElement('div');
    layer.className = 'confetti-layer';
    const colors = ['#0f766e', '#2dd4bf', '#c9a227', '#0b1b3a', '#5eead4', '#f5e6a6'];
    for (let i = 0; i < 36; i++) {
      const p = document.createElement('i');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.4 + Math.random() * 1.4) + 's';
      p.style.animationDelay = (Math.random() * 0.25) + 's';
      p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
    setTimeout(function () {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    }, 3200);
  }

  // ===== ABOUT AUTHOR MODAL =====
  function openAuthorModal() {
    const modal = document.getElementById('authorModal');
    if (modal) modal.classList.add('active');
    closeSidebarIfMobile();
  }

  function closeAuthorModal() {
    const modal = document.getElementById('authorModal');
    if (modal) modal.classList.remove('active');
  }

  function initAuthorModal() {
    const modal = document.getElementById('authorModal');
    if (!modal) return;
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeAuthorModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAuthorModal();
    });
  }

  // ===== NAVIGATION =====
  function navigateTo(target) {
    if (!state.learnerName) {
      showNamePrompt();
      return;
    }

    closeSidebarIfMobile();
    closeAuthorModal();

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
      updateContinueBar();
      saveState();
      window.scrollTo(0, 0);
      return;
    }

    if (target === 'exam') {
      state.currentModule = 'exam';
      state.lastModule = MODULES.length;
      if (pageHeader) pageHeader.style.display = 'none';
      renderExam();
      renderSidebar();
      updateContinueBar();
      saveState();
      window.scrollTo(0, 0);
      return;
    }

    const idx = parseInt(target, 10);
    if (isNaN(idx) || idx < 1 || idx > MODULES.length) return;

    state.currentModule = idx;
    state.lastModule = idx;
    renderModule(idx);
    renderSidebar();
    updateContinueBar();
    saveState();
    window.scrollTo(0, 0);
  }

  function getResumeTarget() {
    if (state.completedLessons.length >= MODULES.length) {
      if (state.examTaken && state.examScore !== null && state.examScore >= PASS_EXAM) return 'cert';
      return 'exam';
    }
    if (state.lastModule >= 1 && state.lastModule <= MODULES.length) return state.lastModule;
    // first incomplete module
    for (let i = 1; i <= MODULES.length; i++) {
      if (state.completedLessons.indexOf(i) === -1) return i;
    }
    return 1;
  }

  function updateContinueBar() {
    const bar = document.getElementById('continueBar');
    const title = document.getElementById('continueTitle');
    const sub = document.getElementById('continueSubtitle');
    const btn = document.getElementById('continueBtn');
    const startBtn = document.getElementById('startLearningBtn');
    if (!bar || !btn) return;

    const hasProgress = state.completedLessons.length > 0 || state.examTaken || (state.lastModule >= 1);
    if (!hasProgress || !state.learnerName) {
      bar.classList.remove('visible');
      if (startBtn) startBtn.textContent = 'Start Learning';
      return;
    }

    const target = getResumeTarget();
    let label = 'Continue learning';
    let detail = 'Pick up where you left off';
    if (target === 'cert') {
      label = 'Course complete';
      detail = 'Open your certificate';
      btn.textContent = 'View Certificate';
    } else if (target === 'exam') {
      label = 'Ready for the final exam';
      detail = 'All modules completed — take the exam';
      btn.textContent = 'Go to Final Exam';
    } else {
      const mod = MODULES[target - 1];
      label = 'Continue Module ' + target;
      detail = (mod ? mod.title : 'Module ' + target) + (mod ? ' · ' + mod.duration : '');
      btn.textContent = 'Continue';
    }
    if (title) title.textContent = label;
    if (sub) sub.textContent = detail;
    bar.classList.add('visible');
    if (startBtn) startBtn.textContent = target === 'cert' ? 'Review modules' : 'Continue Learning';

    btn.onclick = function () {
      if (target === 'cert') showCertificate();
      else navigateTo(target);
    };
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

    const checklist = moduleChecklistItems(mod, idx, isCompleted);
    const checklistHtml =
      '<div class="module-checklist">' +
      '<h3>This module checklist · ' + escapeHtml(mod.duration || '') + '</h3>' +
      '<ul>' +
      checklist.map(function (item) {
        return (
          '<li class="' + (item.done ? 'done' : '') + '">' +
          '<span class="chk" aria-hidden="true">' + (item.done ? '✓' : '') + '</span>' +
          '<span>' + escapeHtml(item.text) + '</span></li>'
        );
      }).join('') +
      '</ul></div>';

    view.innerHTML =
      '<div class="module-content">' +
      '<h2>Module ' + idx + ': ' + escapeHtml(mod.title) + '</h2>' +
      '<p class="subtitle">' + escapeHtml(mod.subtitle) + ' · ' + escapeHtml(mod.duration) + '</p>' +
      checklistHtml +
      mod.content +
      '<div class="quiz-section" id="quiz' + idx + '">' +
      '<h3>Module ' + idx + ' Quiz</h3>' +
      '<p style="color:var(--text-muted);margin-bottom:16px;">Test your understanding of this module. You need ' + PASS_QUIZ + '/5 correct to pass.</p>' +
      questionsHtml +
      '<div class="quiz-actions">' +
      '<button type="button" class="btn btn-primary" data-submit-quiz="' + idx + '">Submit Quiz</button>' +
      '<button type="button" class="btn btn-outline" data-reset-quiz="' + idx + '">Reset</button>' +
      '</div>' +
      '<div class="quiz-score" id="quizScore' + idx + '" style="display:' + (isCompleted ? 'block' : 'none') + '">' +
      '<div class="score-num">' + (score !== undefined ? score : '—') + '/5</div>' +
      '<div class="score-label">' + scoreLabel + '</div>' +
      '</div></div></div>' +
      '<div class="section-nav">' +
      '<button type="button" class="btn btn-outline" data-nav-to="' + (idx > 1 ? idx - 1 : 0) + '"' + (idx <= 1 ? ' disabled' : '') + '>Previous</button>' +
      '<button type="button" class="btn btn-outline btn-dashboard" data-nav-to="0">Main Dashboard</button>' +
      '<button type="button" class="btn btn-primary" data-nav-to="' + (idx < MODULES.length ? idx + 1 : 'exam') + '">' +
      (idx < MODULES.length ? 'Next Module →' : 'Go to Final Exam →') +
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
      const firstPass = state.completedLessons.indexOf(modIdx) === -1;
      if (firstPass) {
        state.completedLessons.push(modIdx);
      }
      saveState();
      renderSidebar();
      renderDashboardCards();
      if (firstPass) {
        celebrate('Module ' + modIdx + ' complete');
      }
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
      '<h3>Final Exam</h3>' +
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
        '<div class="score-label">Exam passed. You can claim your certificate.</div></div>';
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
        '<div class="section-nav" style="justify-content:center;border-top:none;padding-top:8px;">' +
        '<button type="button" class="btn btn-outline" id="btnRetakeExam">Retake Exam</button>' +
        (passed ? '<button type="button" class="btn btn-success btn-lg" id="btnClaimCert">Claim Certificate</button>' : '') +
        '<button type="button" class="btn btn-outline btn-dashboard" id="btnExamDashboard">Main Dashboard</button>' +
        '</div>';
    } else if (!allModulesDone) {
      html +=
        '<div class="empty-state">' +
        '<div class="empty-ico">🔒</div>' +
        '<h3>Final exam is locked</h3>' +
        '<p>Complete all ' + MODULES.length + ' modules (pass each quiz with 4/5) to unlock the final exam. You have finished ' +
        state.completedLessons.length + ' of ' + MODULES.length + ' modules so far.</p>' +
        '<div class="section-nav" style="justify-content:center;border-top:none;padding-top:0;margin-top:0;">' +
        '<button type="button" class="btn btn-primary btn-lg" id="btnGoModule1">Continue learning</button>' +
        '<button type="button" class="btn btn-outline btn-dashboard" id="btnExamDashboard">Main Dashboard</button>' +
        '</div></div>';
    } else {
      html += '<p style="margin-bottom:20px;color:var(--text-muted);">Answer all 25 questions. You need at least ' + PASS_EXAM + '/25 to pass.</p>';
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
        '<button type="button" class="btn btn-primary btn-lg" id="btnSubmitExam">Submit Exam</button>' +
        '<button type="button" class="btn btn-outline btn-dashboard" id="btnExamDashboard">Main Dashboard</button>' +
        '</div>';
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
    const examDash = document.getElementById('btnExamDashboard');
    if (examDash) examDash.addEventListener('click', function () { navigateTo(0); });
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
    renderDashboardCards();
    if (correct >= PASS_EXAM) {
      celebrate('Exam passed — claim your certificate');
    } else {
      toast('Not quite — review and retake when ready.');
    }
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
  function buildCertificateId(name, score) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    let hash = 0;
    const raw = String(name || '') + '|' + String(score) + '|' + y + m + d;
    for (let i = 0; i < raw.length; i++) {
      hash = ((hash << 5) - hash) + raw.charCodeAt(i);
      hash |= 0;
    }
    const serial = Math.abs(hash).toString(36).toUpperCase().slice(0, 4).padStart(4, '0');
    return 'AIA-V' + ACTIVE_COURSE.version + '-' + y + m + d + '-' + serial;
  }

  function updateCertificateQr(certId) {
    const img = document.getElementById('certQr');
    if (!img) return;
    const payload = 'https://ritchegerona.github.io/ai-awareness-course/?cert=' +
      encodeURIComponent(certId || 'V1');
    // External QR image (CORS-friendly) for PNG export
    img.crossOrigin = 'anonymous';
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=8&data=' +
      encodeURIComponent(payload);
  }

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
    const verEl = document.getElementById('certVersionLabel');
    const idEl = document.getElementById('certId');
    const levelEl = document.getElementById('certLevel');
    const certId = buildCertificateId(state.learnerName, state.examScore);

    if (nameEl) nameEl.textContent = state.learnerName;
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
    if (scoreEl) scoreEl.textContent = state.examScore + '/25';
    if (verEl) {
      verEl.textContent = 'Version ' + ACTIVE_COURSE.version + ' · ' + ACTIVE_COURSE.level + ' · New to AI';
    }
    if (idEl) idEl.textContent = certId;
    if (levelEl) levelEl.textContent = ACTIVE_COURSE.level.toUpperCase();
    updateCertificateQr(certId);

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

  function restoreCertStyles(cert, origW, origH) {
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

    const LANDSCAPE_W = 1000;
    const LANDSCAPE_H = 700;
    const origW = cert.style.width;
    const origH = cert.style.height;
    cert.style.width = LANDSCAPE_W + 'px';
    cert.style.height = LANDSCAPE_H + 'px';

    const filename = 'AI-Awareness-V' + ACTIVE_COURSE.version + '-Certificate-' + safeFileName(state.learnerName) + '.png';
    const btn = document.querySelector('.cert-actions .btn-primary');
    if (btn) {
      btn.disabled = true;
      btn.dataset.prevText = btn.textContent;
      btn.textContent = 'Generating…';
    }

    // Wait briefly so QR image can load before capture
    setTimeout(function () {
      html2canvas(cert, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: true,
        useCORS: true,
        logging: false,
        width: LANDSCAPE_W,
        height: LANDSCAPE_H
      }).then(function (canvas) {
        restoreCertStyles(cert, origW, origH);
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.prevText || 'Download Certificate (PNG)';
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
        restoreCertStyles(cert, origW, origH);
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.prevText || 'Download Certificate (PNG)';
        }
        toast('PNG export failed. Opening print dialog…');
        window.print();
      });
    }, 400);
  }

  // ===== PROGRESS REPORT (for instructor private records) =====
  function getProgressSnapshot() {
    const totalModules = MODULES.length;
    const doneModules = state.completedLessons.length;
    const examPassed = state.examTaken && state.examScore !== null && state.examScore >= PASS_EXAM;
    const allModulesDone = doneModules >= totalModules;
    const completed = allModulesDone && examPassed;
    // Progress: modules + exam as final unit (same idea as sidebar bar)
    const totalUnits = totalModules + 1;
    const doneUnits = doneModules + (state.examTaken ? 1 : 0);
    const pct = Math.round((doneUnits / totalUnits) * 100);
    let currentLabel = 'Dashboard';
    if (state.currentModule === 'exam') currentLabel = 'Final Exam';
    else if (state.currentModule === 'cert') currentLabel = 'Certificate';
    else if (typeof state.currentModule === 'number' && state.currentModule >= 1) {
      currentLabel = 'Module ' + state.currentModule;
    }
    return {
      name: (state.learnerName || '').trim() || 'Unknown',
      completed: completed,
      status: completed ? 'completed' : (doneModules > 0 || state.examTaken ? 'in_progress' : 'not_started'),
      modulesDone: doneModules,
      totalModules: totalModules,
      progressPct: pct,
      currentLabel: currentLabel,
      examTaken: state.examTaken,
      examScore: state.examScore,
      examLabel: state.examTaken && state.examScore !== null ? (state.examScore + '/25') : 'Not taken',
      date: new Date().toISOString().slice(0, 10)
    };
  }

  function buildProgressReportMarkdown() {
    const s = getProgressSnapshot();
    const lines = [];
    lines.push('# AI Awareness V1 — Progress Report');
    lines.push('');
    lines.push('| Field | Value |');
    lines.push('|-------|-------|');
    lines.push('| Name | ' + s.name + ' |');
    lines.push('| Status | ' + s.status + ' |');
    lines.push('| Modules | ' + s.modulesDone + '/' + s.totalModules + ' |');
    lines.push('| Progress | ' + s.progressPct + '% |');
    lines.push('| Current | ' + s.currentLabel + ' |');
    lines.push('| Exam | ' + s.examLabel + ' |');
    lines.push('| Report date | ' + s.date + ' |');
    lines.push('| Course | AI Awareness V1 Foundations |');
    lines.push('');
    if (s.completed) {
      lines.push('## Suggested LEARNERS.md row (Completed)');
      lines.push('');
      lines.push('| Name | Started | Completed | Modules | Exam score | Certificate ID | Notes |');
      lines.push('|------|---------|-----------|--------:|------------|----------------|-------|');
      lines.push('| ' + s.name + ' | ' + s.date + ' | ' + s.date + ' | ' + s.modulesDone + '/' + s.totalModules + ' | ' + s.examLabel + ' | (from certificate) |  |');
    } else {
      lines.push('## Suggested LEARNERS.md row (In progress)');
      lines.push('');
      lines.push('| Name | Last update | Modules done | Progress % | Current module | Exam | Notes |');
      lines.push('|------|-------------|-------------:|-----------:|----------------|------|-------|');
      lines.push('| ' + s.name + ' | ' + s.date + ' | ' + s.modulesDone + '/' + s.totalModules + ' | ' + s.progressPct + '% | ' + s.currentLabel + ' | ' + s.examLabel + ' |  |');
    }
    lines.push('');
    lines.push('_Send this report to the course owner so they can update the private records file._');
    return lines.join('\n');
  }

  function shareProgressReport() {
    if (!state.learnerName) {
      showNamePrompt();
      toast('Enter your name first, then share progress.');
      return;
    }
    const report = buildProgressReportMarkdown();
    // Also stash a local copy the instructor can import on admin board (same browser only)
    try {
      const snap = getProgressSnapshot();
      const roster = JSON.parse(localStorage.getItem(ADMIN_KEY) || '[]');
      const entry = {
        name: snap.name,
        status: snap.status,
        modules: snap.modulesDone + '/' + snap.totalModules,
        progress: snap.progressPct + '%',
        exam: snap.examLabel,
        date: snap.date,
        current: snap.currentLabel
      };
      const idx = roster.findIndex(function (r) { return r.name === entry.name; });
      if (idx >= 0) roster[idx] = entry;
      else roster.push(entry);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(roster));
    } catch (_) { /* ignore */ }

    const done = function () {
      toast('Progress report copied. Paste it in an email or chat to the course owner.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(done).catch(function () {
        window.prompt('Copy this progress report:', report);
      });
    } else {
      window.prompt('Copy this progress report:', report);
    }
  }

  function exportProgressSummary() {
    if (!state.learnerName) {
      showNamePrompt();
      toast('Enter your name first.');
      return;
    }
    const s = getProgressSnapshot();
    const w = window.open('', '_blank');
    if (!w) {
      toast('Pop-up blocked. Allow pop-ups to export.');
      return;
    }
    const rows = MODULES.map(function (mod, i) {
      const idx = i + 1;
      const done = state.completedLessons.indexOf(idx) !== -1;
      const sc = state.quizScores[idx];
      return '<tr><td>' + idx + '</td><td>' + escapeHtml(mod.title) + '</td><td>' +
        (done ? 'Completed' : 'In progress') + '</td><td>' +
        (sc !== undefined ? sc + '/5' : '—') + '</td></tr>';
    }).join('');
    w.document.write(
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Progress Summary — ' + escapeHtml(s.name) + '</title>' +
      '<style>body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#1c1917}' +
      'h1{font-size:22px;margin:0 0 8px}p{color:#57534e}table{width:100%;border-collapse:collapse;margin-top:20px}' +
      'th,td{border:1px solid #e7e5e4;padding:8px 10px;text-align:left;font-size:13px}th{background:#fafaf9}' +
      '.meta{display:flex;gap:16px;flex-wrap:wrap;margin:16px 0;font-size:13px}' +
      '@media print{button{display:none}}</style></head><body>' +
      '<h1>AI Awareness V1 — Progress Summary</h1>' +
      '<p>Foundations track · Workplace AI literacy</p>' +
      '<div class="meta"><span><strong>Learner:</strong> ' + escapeHtml(s.name) + '</span>' +
      '<span><strong>Status:</strong> ' + escapeHtml(s.status) + '</span>' +
      '<span><strong>Progress:</strong> ' + s.progressPct + '%</span>' +
      '<span><strong>Exam:</strong> ' + escapeHtml(s.examLabel) + '</span>' +
      '<span><strong>Date:</strong> ' + s.date + '</span></div>' +
      '<table><thead><tr><th>#</th><th>Module</th><th>Status</th><th>Quiz</th></tr></thead><tbody>' +
      rows + '</tbody></table>' +
      '<p style="margin-top:24px;font-size:12px;color:#78716c">Generated from AI Awareness for the Workplace · Author: Ritche Gerona</p>' +
      '<button onclick="window.print()" style="margin-top:16px;padding:10px 16px">Print / Save as PDF</button>' +
      '</body></html>'
    );
    w.document.close();
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
        '<div class="dash-card module-card interactive-card' + (done ? ' done' : '') + '" data-nav="' + idx + '" role="button" tabindex="0" style="--i:' + i + '">' +
        '<div class="module-card-top">' +
        '<div class="icon">' + (idx < 10 ? '0' + idx : idx) + '</div>' +
        '<span class="mod-status">' + (done ? 'Completed' : 'Not started') + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(mod.title) + '</h3>' +
        '<p>' + escapeHtml(mod.subtitle) + ' · ' + escapeHtml(mod.duration) + '</p>' +
        '<div class="mini-bar" aria-hidden="true"><i></i></div>' +
        '</div>';
    });
    grid.innerHTML = html;
    // animate mini-bars after paint
    requestAnimationFrame(function () {
      grid.querySelectorAll('.module-card.done .mini-bar > i').forEach(function (el) {
        el.style.width = '100%';
      });
    });
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
  // Clear old SW caches so users always see the latest author/content updates.
  // (Previous SW was serving a stale course without the author section.)
  function registerServiceWorker() {
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

    // Unregister any existing service workers and wipe caches
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (reg) { reg.unregister(); });
      }).catch(function () { /* ignore */ });
    }
    if (typeof caches !== 'undefined' && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) { caches.delete(k); });
      }).catch(function () { /* ignore */ });
    }
  }

  function applyCourseVersionLabels() {
    const pill = document.getElementById('headerVersionPill');
    const badge = document.getElementById('sidebarVersionBadge');
    const label = 'Version ' + ACTIVE_COURSE.version + ' · ' + ACTIVE_COURSE.level;
    if (pill) pill.textContent = label;
    if (badge) badge.textContent = label;
  }

  // ===== GLOBALS (onclick in HTML shell) =====
  window.navigateTo = navigateTo;
  window.saveName = saveName;
  window.showNamePrompt = showNamePrompt;
  window.openAuthorModal = openAuthorModal;
  window.closeAuthorModal = closeAuthorModal;
  window.shareProgressReport = shareProgressReport;
  window.exportProgressSummary = exportProgressSummary;
  window.toggleTheme = toggleTheme;
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
    applyTheme(getTheme());
    initThemeToggle();
    applyCourseVersionLabels();
    initMobileNav();
    initNameModal();
    initAuthorModal();
    renderSidebar();
    renderDashboardCards();
    updateContinueBar();
    updateProgress();

    const dash = document.getElementById('dashboard');
    if (dash) dash.style.display = 'block';

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

  try {
    console.info('AI Awareness Course V1.0.0 Foundations — production ready');
  } catch (_) { /* ignore */ }
})();
