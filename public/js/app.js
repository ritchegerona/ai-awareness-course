/* AI Awareness Course — Unified Multi-Track Application Runtime
   Supports Foundations (Part 1), Intermediate (Part 2), Advanced (Part 3) tracks
   Sequential progression: Part 1 → Part 2 → Part 3
*/
(function () {
  'use strict';

  const STORAGE_KEY = 'aiCourseState_unified';
  const STORAGE_KEY_LEGACY = 'aiCourseState';
  const PASS_QUIZ = 4;
  const PASS_EXAM = 18;

  // ===== COURSE TRACKS =====
  const COURSE_TRACKS = {
    foundations: {
      id: 'foundations',
      version: 1,
      level: 'Foundations',
      title: 'AI Awareness for the Workplace',
      audience: 'General / New to AI',
      duration: '~4h 45min',
      examDescription: 'demonstrating a foundational understanding of artificial intelligence, workplace applications, ethics, and responsible professional use.'
    },
    intermediate: {
      id: 'intermediate',
      version: 2,
      level: 'Intermediate',
      title: 'AI Awareness — Intermediate',
      audience: 'Practitioners ready for deeper tools & workflows',
      duration: '~4h 45min',
      examDescription: 'demonstrating an intermediate understanding of AI tools, workflows, and practical applications.'
    },
    advanced: {
      id: 'advanced',
      version: 3,
      level: 'Advanced',
      title: 'AI Awareness — Advanced',
      audience: 'Specialists & strategic implementers',
      duration: '~5h 30min',
      examDescription: 'demonstrating an advanced understanding of AI architecture, governance, and strategic implementation.'
    }
  };

  // Current active track
  let activeTrack = 'foundations';
  const THEME_KEY = 'aiCourseTheme';
  const ADMIN_KEY = 'aiCourseAdminRoster_unified';

const defaultState = () => ({
  currentModule: 0,
  completedLessons: [],
  quizScores: {},
  examScores: {},
  examTaken: {},
  learnerName: '',
  examAnswers: {},
  lastModule: 0,
  trackProgress: {
    foundations: 0,
    intermediate: 0,
    advanced: 0
  },
  unlockedTracks: ['foundations'],
  quizAttempts: {}
});

  let state = defaultState();

  // ===== UTILITIES =====
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
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

  function downloadBlob(blob, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // ===== STATE MANAGEMENT =====
  function normalizeState(parsed) {
    const base = defaultState();
    if (!parsed || typeof parsed !== 'object') return base;

    if (typeof parsed.learnerName === 'string') base.learnerName = parsed.learnerName.slice(0, 120);
    if (Array.isArray(parsed.completedLessons)) {
      base.completedLessons = parsed.completedLessons
        .map(Number)
        .filter(function (n) { return n >= 1 && n <= MODULES.length; });
      base.completedLessons = base.completedLessons.filter(function (v, i, a) { return a.indexOf(v) === i; });
    }
    if (parsed.quizScores && typeof parsed.quizScores === 'object') {
      Object.keys(parsed.quizScores).forEach(function (k) {
        const n = Number(parsed.quizScores[k]);
        if (!isNaN(n)) base.quizScores[k] = n;
      });
    }
    if (parsed.examScores && typeof parsed.examScores === 'object') {
      Object.keys(parsed.examScores).forEach(function (track) {
        const n = Number(parsed.examScores[track]);
        if (!isNaN(n)) base.examScores[track] = n;
      });
    }
    if (parsed.examTaken && typeof parsed.examTaken === 'object') {
      Object.keys(parsed.examTaken).forEach(function (track) {
        if (typeof parsed.examTaken[track] === 'boolean') base.examTaken[track] = parsed.examTaken[track];
      });
    }
    if (parsed.examAnswers && typeof parsed.examAnswers === 'object') base.examAnswers = parsed.examAnswers;
    if (parsed.trackProgress && typeof parsed.trackProgress === 'object') {
      Object.keys(parsed.trackProgress).forEach(function (track) {
        const n = Number(parsed.trackProgress[track]);
        if (!isNaN(n)) base.trackProgress[track] = n;
      });
    }
    if (Array.isArray(parsed.unlockedTracks)) {
      base.unlockedTracks = parsed.unlockedTracks.filter(function (t) {
        return t === 'foundations' || t === 'intermediate' || t === 'advanced';
      });
    }
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

  function loadState() {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
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

  // ===== THEME =====
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
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
    // Auto-share progress if online
    shareProgress();
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

  // ===== SHARE PROGRESS =====
  // CONFIG: Set your Google Apps Script Web App URL below
  // Your Web App URL - set this again after proper deployment
  const BACKEND_URL = ''; // Re-deploy Google Apps Script to get working URL

  function isOnline() {
    return navigator.onLine !== false;
  }

  function shareProgress() {
    if (!isOnline() || !state.learnerName) return;

    const trackInfo = COURSE_TRACKS[activeTrack];
    const trackModules = getCurrentTrackModules();
    const doneModules = trackModules.filter(function (m) {
      return state.completedLessons.indexOf(m.id) !== -1;
    }).length;
    const pct = Math.round((doneModules / trackModules.length) * 100);
    const examScore = state.examScores[activeTrack];
    const examTaken = state.examTaken[activeTrack];

    const entry = {
      name: state.learnerName,
      track: activeTrack,
      status: examTaken && examScore >= PASS_EXAM ? 'completed' : (doneModules > 0 ? 'in_progress' : 'not_started'),
      modules: doneModules + '/' + trackModules.length + ' (Part ' + trackInfo.version + ')',
      progress: pct + '%',
      exam: examTaken ? examScore + '/25' : '—',
      date: new Date().toISOString().slice(0, 10),
      current: doneModules > 0 && !examTaken ? ('Module ' + state.lastModule) : '—'
    };

    // Save to local roster
    try {
      const ROSTER_KEY = 'aiCourseAdminRoster_unified';
      let roster = JSON.parse(localStorage.getItem(ROSTER_KEY) || '[]');
      const existingIndex = roster.findIndex(function (r) { return r.name === entry.name; });
      if (existingIndex >= 0) {
        roster[existingIndex] = entry;
      } else {
        roster.push(entry);
      }
      localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
    } catch (e) { /* ignore */ }

    // Send to Google Apps Script backend if configured
    if (BACKEND_URL) {
      fetch(BACKEND_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).then(function () {
        toast('Progress shared to server ✓');
      }).catch(function () {
        toast('Progress saved locally only');
      });
    } else {
      toast('Progress automatically shared ✓');
    }
  }

  // ===== AUTHOR MODAL =====
  function openAuthorModal() {
    const modal = document.getElementById('authorModal');
    if (modal) modal.classList.add('active');
  }

  function closeAuthorModal() {
    const modal = document.getElementById('authorModal');
    if (modal) modal.classList.remove('active');
  }

  // ===== TRACK MANAGEMENT =====
  function getCurrentTrackModules() {
    return MODULES.filter(function (m) { return m.track === activeTrack; });
  }

  function isTrackUnlocked(track) {
    return state.unlockedTracks.indexOf(track) !== -1;
  }

  function unlockNextTrack() {
    const currentTrackModules = getCurrentTrackModules();
    const allDone = currentTrackModules.every(function (mod) {
      return state.completedLessons.indexOf(mod.id) !== -1;
    });

    // Unlock next track when all modules in current track are completed
    // Exam is taken at the final part (Part 3), not between parts
    if (allDone && activeTrack === 'foundations' && !state.unlockedTracks.includes('intermediate')) {
      state.unlockedTracks.push('intermediate');
      toast('Part 2 (Intermediate) is now unlocked!');
      saveState();
      // Auto-switch to the newly unlocked track
      setActiveTrack('intermediate');
    }
    if (allDone && activeTrack === 'intermediate' && !state.unlockedTracks.includes('advanced')) {
      state.unlockedTracks.push('advanced');
      toast('Part 3 (Advanced) is now unlocked!');
      saveState();
      // Auto-switch to the newly unlocked track
      setActiveTrack('advanced');
    }
  }

  function setActiveTrack(track) {
    if (!isTrackUnlocked(track)) {
      toast('Complete the previous track to unlock this one.');
      return false;
    }
    activeTrack = track;
    const trackInfo = COURSE_TRACKS[activeTrack];
    const pill = document.getElementById('headerVersionPill');
    const badge = document.getElementById('sidebarVersionBadge');
    const label = 'Part ' + trackInfo.version + ' • ' + trackInfo.level;
    if (pill) pill.textContent = label;
    if (badge) badge.textContent = label;

    const trackModulesTitle = document.getElementById('trackModulesTitle');
    if (trackModulesTitle) trackModulesTitle.textContent = 'Part ' + trackInfo.version + ' Modules';

    renderSidebar();
    renderDashboardCards();
    updateProgress();
    // Update version path cards
    const versionPath = document.getElementById('versionPath');
    if (versionPath) {
      versionPath.querySelectorAll('.version-card').forEach(function (card) {
        const cardTrack = card.getAttribute('data-track');
        if (cardTrack === activeTrack) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }
    return true;
  }

  // ===== PROGRESS =====
  function updateProgress() {
    const trackModules = getCurrentTrackModules();
    const totalModules = trackModules.length;
    const doneModules = trackModules.filter(function (m) {
      return state.completedLessons.indexOf(m.id) !== -1;
    }).length;
    const totalUnits = totalModules + 1;
    const doneUnits = doneModules + (state.examTaken[activeTrack] ? 1 : 0);
    const pct = Math.round((doneUnits / totalUnits) * 100);

    const pctEl = document.getElementById('progressText');
    const barEl = document.getElementById('progressBar');
    if (pctEl) pctEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';

    // Update hero progress
    const heroPct = document.getElementById('heroProgressPct');
    const heroSub = document.getElementById('heroProgressSub');
    const heroDone = document.getElementById('heroModulesDone');
    const heroExam = document.getElementById('heroExamStatus');
    if (heroPct) heroPct.textContent = pct;
    if (heroDone) heroDone.textContent = doneModules;
    if (heroExam) heroExam.textContent = state.examTaken[activeTrack] ? 'Exam passed' : 'Exam locked';
    if (heroSub) heroSub.textContent = state.completedLessons.length === 0 ? 'Start Part 1 to begin' : 'Keep going!';
  }

  // ===== CONTINUE BAR =====
  function updateContinueBar() {
    const bar = document.getElementById('continueBar');
    if (!bar) return;

    const last = state.lastModule;
    const trackModules = getCurrentTrackModules();

    if (last && trackModules.find(function (m) { return m.id === last; })) {
      bar.style.display = 'flex';
      const mod = MODULES.find(function (m) { return m.id === last; });
      if (mod) {
        document.getElementById('continueTitle').textContent = 'Continue: Module ' + last;
        document.getElementById('continueSubtitle').textContent = mod.title;
      }
      const btn = document.getElementById('continueBtn');
      if (btn) btn.onclick = function () { navigateTo(last); };
    } else {
      bar.style.display = 'none';
    }
  }

  // ===== SIDEBAR =====
  function renderSidebar() {
    const list = document.getElementById('moduleList');
    if (!list) return;
    const trackModules = getCurrentTrackModules();
    let html = '';
    trackModules.forEach(function (mod, i) {
      const idx = i + 1;
      const done = state.completedLessons.indexOf(mod.id) !== -1;
      const attempts = state.quizAttempts[mod.id] || 0;
      const failed = attempts > 0 && !done;
      const status = done ? '' : (failed ? ' · Attempt ' + attempts + '/FAILED' : '');
      html += 
        '<li class="module-item' + (done ? ' done' : (failed ? ' failed' : '')) + '" data-nav="' + mod.id + '">' +
        '<span class="module-num">' + (idx < 10 ? '0' + idx : idx) + '</span>' +
        '<span class="module-title">' + escapeHtml(mod.title) + status + '</span>' +
        '</li>';
    });
    // Add exam and about items
    html += '<li class="module-item exam-item" data-nav="exam"><span class="module-num">E</span><span class="module-title">Final Exam</span></li>';
    html += '<li class="module-item about-item" onclick="openAuthorModal()"><span class="num">i</span><span class="module-title">About Author</span></li>';

    list.innerHTML = html;
    list.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        navigateTo(el.getAttribute('data-nav'));
      });
    });
  }

  // ===== MODULE CHECKLIST =====
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

  // ===== MODULE RENDERING =====
  function renderModule(moduleId) {
    const mod = MODULES.find(function (m) { return m.id === moduleId; });
    if (!mod) return;

    const container = document.getElementById('moduleViews');
    if (!container) return;

    let checklistHtml = '';
    const isCompleted = state.completedLessons.indexOf(mod.id) !== -1;
    const items = moduleChecklistItems(mod, mod.id, isCompleted);
    checklistHtml = items.map(function (it) {
      return '<li><span class="chk">' + (it.done ? '✓' : '') + '</span><span>' + it.text + '</span></li>';
    }).join('');

    let html = 
      '<section class="module-view active" id="module-' + mod.id + '">' +
      '<h2 class="module-title">' + escapeHtml(mod.title) + '</h2>' +
      '<p class="module-subtitle">' + escapeHtml(mod.subtitle) + '</p>' +
      '<div class="module-content">' + mod.content + '</div>' +
      '<div class="module-checklist"><h3>Module Checklist</h3><ul>' + checklistHtml + '</ul></div>' +
      '<div class="quiz-section"><h3>Module Quiz</h3>' + buildQuizHtml(mod) + '</div>' +
      '<div class="section-nav">' +
      '<button class="btn btn-outline" onclick="navigateTo(0)">Back to Dashboard</button>' +
      '<button class="btn btn-primary" onclick="quizCompleted(' + mod.id + ')">Mark Complete & Take Quiz</button>' +
      '</div></section>';

    container.innerHTML = html;
    attachOptionHandlers();
  }

  function buildQuizHtml(mod) {
    if (!mod.questions || !mod.questions.length) {
      return '<p class="empty-state">No quiz questions available.</p>';
    }
    let html = '<form id="quiz-form-' + mod.id + '">';
    mod.questions.forEach(function (q, i) {
      html += '<div class="question" id="question-' + mod.id + '-' + i + '">';
      html += '<div class="q-text">' + (i + 1) + '. ' + escapeHtml(q.q) + '</div>';
      html += '<div class="options">';
      q.options.forEach(function (opt, j) {
        html += '<label><input type="radio" name="quiz-' + mod.id + '-' + i + '" value="' + j + '" ' +
          (state.examAnswers[mod.id + '-' + i] == j ? 'checked' : '') + '>' + escapeHtml(opt) + '</label>';
      });
      html += '</div></div>';
    });
    html += '</form><div class="quiz-actions"><button class="btn btn-primary" onclick="submitQuiz(' + mod.id + ')">Submit Quiz</button></div>';
    return html;
  }

  function attachOptionHandlers() {
    document.querySelectorAll('.question .options label').forEach(function (label) {
      label.addEventListener('click', function () {
        const input = this.querySelector('input[type="radio"]');
        if (input) {
          this.closest('.question').querySelectorAll('label').forEach(function (l) { l.classList.remove('selected'); });
          this.classList.add('selected');
        }
      });
    });
  }

  function quizCompleted(moduleId) {
    const mod = MODULES.find(function (m) { return m.id === moduleId; });
    if (!mod || !mod.questions) return;

    const checked = document.querySelectorAll('input[type="radio"]:checked');
    if (checked.length < mod.questions.length) {
      toast('Please answer all questions before marking complete.');
      return;
    }
    submitQuiz(moduleId);
  }

  // ===== CERTIFICATE =====
  function getCertificateId() {
    try {
      let id = localStorage.getItem('aiCertId');
      if (!id) {
        id = 'AI-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
        localStorage.setItem('aiCertId', id);
      }
      return id;
    } catch (_) {
      return 'AI-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
  }

  function showCertificate(track) {
    const cert = document.getElementById('certificateView');
    const trackInfo = COURSE_TRACKS[track];
    const trackModules = MODULES.filter(function (m) { return m.track === track; });
    const ribbonSub = document.getElementById('certRibbonSub');
    const versionLabel = document.getElementById('certVersionLabel');
    const levelEl = document.getElementById('certLevel');
    const trackLabel = document.getElementById('certTrackLabel');

    if (ribbonSub) ribbonSub.textContent = 'PART ' + trackInfo.version;
    if (versionLabel) versionLabel.textContent = 'Part ' + trackInfo.version + ' • ' + trackInfo.level;
    if (levelEl) levelEl.textContent = trackInfo.level;
    if (trackLabel) trackLabel.textContent = 'Part ' + trackInfo.version + ' • ' + trackInfo.level + ' Track';

    const skillsList = document.getElementById('certSkills');
    if (skillsList) {
      skillsList.innerHTML = trackModules.map(function (mod, i) {
        return '<li><span class="sk-num">' + ((i + 1) < 10 ? '0' + (i + 1) : (i + 1)) + 
               '</span><div><strong>' + escapeHtml(mod.title) + '</strong></div></li>';
      }).join('');
    }

    const completionText = document.querySelector('.completion-text');
    if (completionText) {
      completionText.textContent = 'This certificate recognizes successful completion of all 12 modules, module quizzes, and the final examination, demonstrating ' + 
        (track === 'foundations' ? 'a foundational understanding of artificial intelligence, workplace applications, ethics, and responsible professional use.' :
         track === 'intermediate' ? 'an intermediate understanding of AI tools, workflows, and practical applications.' :
         'an advanced understanding of AI architecture, governance, and strategic implementation.') + ' ';
    }

    const certName = document.getElementById('certName');
    if (certName && state.learnerName) certName.textContent = state.learnerName;

    const certDate = document.getElementById('certDate');
    if (certDate) certDate.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const certId = document.getElementById('certId');
    if (certId) certId.textContent = getCertificateId();

    const certScore = document.getElementById('certScore');
    if (certScore) certScore.textContent = (state.examScores[track] || 0) + '/25';

    const sealText = document.querySelector('.cert-gold-seal text');
    if (sealText && sealText.nextElementSibling) {
      sealText.nextElementSibling.textContent = trackInfo.level.toUpperCase();
    }

    if (cert) {
      cert.style.display = 'block';
      cert.scrollIntoView({ behavior: 'smooth' });
    }
    saveState();
    // Auto-share progress when certificate is shown
    shareProgress();
  }

  function downloadCertificatePNG() {
    const cert = document.getElementById('certificateContent');
    if (!cert) return;

    const LANDSCAPE_W = 1000;
    const LANDSCAPE_H = 700;
    const origW = cert.style.width;
    const origH = cert.style.height;
    cert.style.width = LANDSCAPE_W + 'px';
    cert.style.height = LANDSCAPE_H + 'px';

    const trackInfo = COURSE_TRACKS[activeTrack];
    const filename = 'AI-Awareness-Part' + trackInfo.version + '-Certificate-' + safeFileName(state.learnerName) + '.png';
    const btn = document.querySelector('.cert-actions .btn-primary');
    if (btn) {
      btn.disabled = true;
      btn.dataset.prevText = btn.textContent;
      btn.textContent = 'Generating…';
    }

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
        cert.style.width = origW;
        cert.style.height = origH;
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.prevText || 'Download Certificate (PNG)';
        }
        if (canvas.toBlob) {
          canvas.toBlob(function (blob) {
            if (blob) downloadBlob(blob, filename);
          }, 'image/png');
        } else {
          const link = document.createElement('a');
          link.download = filename;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }).catch(function () {
        cert.style.width = origW;
        cert.style.height = origH;
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.prevText || 'Download Certificate (PNG)';
        }
        toast('PNG export failed. Opening print dialog…');
        window.print();
      });
    }, 400);
  }

  // ===== QUIZ & EXAM =====
  function selectOption(moduleId, qIdx, optIdx) {
    const qKey = moduleId + '-' + qIdx;
    state.examAnswers[qKey] = optIdx;
    saveState();
  }

  function submitQuiz(moduleId) {
    const mod = MODULES.find(function (m) { return m.id === moduleId; });
    if (!mod || !mod.questions) return;

    let score = 0;
    mod.questions.forEach(function (q, i) {
      const selected = document.querySelector('input[name="quiz-' + moduleId + '-' + i + '"]:checked');
      if (selected && parseInt(selected.value, 10) === q.answer) {
        score++;
      }
    });

    state.quizScores[moduleId] = score;

    // Track attempts for failed quizzes and only mark complete on pass
    if (score >= PASS_QUIZ) {
      state.completedLessons.push(moduleId);
      state.completedLessons = state.completedLessons.filter(function (v, i, a) { return a.indexOf(v) === i; });
    } else {
      // Increment attempt count for failed quizzes
      state.quizAttempts[moduleId] = (state.quizAttempts[moduleId] || 0) + 1;
    }

    saveState();
    updateProgress();
    renderSidebar();
    unlockNextTrack();
    // Auto-share progress after quiz
    shareProgress();

    toast(score >= PASS_QUIZ ? 'Quiz passed! (' + score + '/5)' : 'Quiz score: ' + score + '/5 · Attempt ' + (state.quizAttempts[moduleId] || 1) + '/FAILED');
    navigateTo(0);
  }

  function showExam() {
    const dash = document.getElementById('dashboard');
    const container = document.getElementById('moduleViews');
    if (dash) dash.style.display = 'none';
    if (!container) return;

    let html = 
      '<section class="module-view active" id="examContainer">' +
      '<div class="exam-header">' +
      '<h2>Final Examination</h2>' +
      '<p>Test your knowledge across all modules. Pass mark: 18/25</p>' +
      '</div>' +
      '<div class="exam-content">' + buildExamHtml() + '</div>' +
      '<div class="section-nav">' +
      '<button class="btn btn-outline" onclick="navigateTo(0)">Back to Dashboard</button>' +
      '<button class="btn btn-primary" onclick="submitExam()">Submit Exam</button>' +
      '</div>' +
      '</section>';

    container.innerHTML = html;
    attachExamOptionHandlers();
  }

  function buildExamHtml() {
    if (!EXAM_QUESTIONS || !EXAM_QUESTIONS.length) {
      return '<p class="empty-state">No exam questions available.</p>';
    }
    let html = '<form id="exam-form">';
    EXAM_QUESTIONS.forEach(function (q, i) {
      html += '<div class="question">';
      html += '<div class="q-text">' + (i + 1) + '. ' + escapeHtml(q.q) + '</div>';
      html += '<div class="options">';
      q.options.forEach(function (opt, j) {
        html += '<label><input type="radio" name="exam-' + i + '" value="' + j + '">' + escapeHtml(opt) + '</label>';
      });
      html += '</div></div>';
    });
    html += '</form>';
    return html;
  }

  function attachExamOptionHandlers() {
    document.querySelectorAll('#examContainer .question .options label').forEach(function (label) {
      label.addEventListener('click', function () {
        this.closest('.question').querySelectorAll('label').forEach(function (l) { l.classList.remove('selected'); });
        this.classList.add('selected');
      });
    });
  }

  function submitExam() {
    let score = 0;
    EXAM_QUESTIONS.forEach(function (q, i) {
      const selected = document.querySelector('input[name="exam-' + i + '"]:checked');
      if (selected && parseInt(selected.value, 10) === q.answer) {
        score++;
      }
    });

    state.examScores[activeTrack] = score;
    state.examTaken[activeTrack] = true;
    saveState();
    updateProgress();
    unlockNextTrack();
    // Auto-share progress after exam
    shareProgress();

    const examEl = document.getElementById('examContainer');
    if (examEl) examEl.style.display = 'none';
    if (score >= PASS_EXAM) {
      toast('Congratulations! Exam passed (' + score + '/25). Certificate unlocked.');
      showCertificate(activeTrack);
    } else {
      toast('Exam score: ' + score + '/25. ' + (PASS_EXAM - score) + ' points needed to pass.');
      navigateTo(0);
    }
  }

  // ===== DASHBOARD =====
  function renderDashboardCards() {
    const grid = document.getElementById('moduleCards');
    if (!grid) return;
    const trackModules = getCurrentTrackModules();
    let html = '';
    trackModules.forEach(function (mod, i) {
      const idx = i + 1;
      const done = state.completedLessons.indexOf(mod.id) !== -1;
      const attempts = state.quizAttempts[mod.id] || 0;
      const failed = attempts > 0 && !done;
      let statusText = 'Not started';
      let cardClass = '';
      if (done) {
        statusText = 'Completed';
        cardClass = ' done';
      } else if (failed) {
        statusText = attempts + '/FAILED - TRY AGAIN';
        cardClass = ' failed';
      }
      html +=
        '<div class="dash-card module-card interactive-card' + cardClass + '" data-nav="' + mod.id + '" role="button" tabindex="0" style="--i:' + i + '">' +
        '<div class="module-card-top">' +
        '<div class="icon">' + (idx < 10 ? '0' + idx : idx) + '</div>' +
        '<span class="mod-status">' + statusText + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(mod.title) + '</h3>' +
        '<p>' + escapeHtml(mod.subtitle) + ' · ' + escapeHtml(mod.duration) + '</p>' +
        '<div class="mini-bar" aria-hidden="true"><i></i></div>' +
        '</div>';
    });
    grid.innerHTML = html;

    requestAnimationFrame(function () {
      grid.querySelectorAll('.module-card.done .mini-bar > i').forEach(function (el) {
        el.style.width = '100%';
      });
    });

    grid.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        navigateTo(parseInt(el.getAttribute('data-nav'), 10));
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateTo(parseInt(el.getAttribute('data-nav'), 10));
        }
      });
    });
  }

  // ===== MODULE ACCESS =====
  function canAccessModule(moduleId) {
    const trackModules = getCurrentTrackModules();
    const modIndex = trackModules.findIndex(function (m) { return m.id === moduleId; });
    
    // First module is always accessible
    if (modIndex === 0) return true;
    
    // Check if all previous modules are completed
    for (var i = 0; i < modIndex; i++) {
      if (state.completedLessons.indexOf(trackModules[i].id) === -1) {
        return false;
      }
    }
    return true;
  }

  // ===== NAVIGATION =====
  function navigateTo(moduleOrPage) {
    const dash = document.getElementById('dashboard');
    const moduleViews = document.getElementById('moduleViews');

    if (moduleOrPage === 0) {
      if (dash) dash.style.display = 'block';
      if (moduleViews) moduleViews.innerHTML = '';
    } else if (moduleOrPage === 'exam') {
      if (dash) dash.style.display = 'none';
      showExam();
    } else if (moduleOrPage === 'cert') {
      showCertificate(activeTrack);
    } else {
      const moduleId = parseInt(moduleOrPage, 10);
      const mod = MODULES.find(function (m) { return m.id === moduleId; });
      if (mod && mod.track !== activeTrack) {
        toast('Switch to ' + mod.track + ' track to view this module.');
        return;
      }
      // Check sequential module access
      if (mod && !canAccessModule(moduleId)) {
        toast('Complete the previous module to unlock this one.');
        return;
      }
      if (dash) dash.style.display = 'none';
      renderModule(moduleId);
      closeSidebarIfMobile();
      state.currentModule = moduleId;
      state.lastModule = moduleId;
      saveState();
    }
  }

  // ===== SERVICE WORKER =====
  function registerServiceWorker() {
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

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

  // ===== INIT =====
  function init() {
    if (typeof MODULES === 'undefined' || !MODULES.length) {
      toast('Course data failed to load. Check that modules-data.js is available.');
      return;
    }
    loadState();
    applyTheme(getTheme());
    initThemeToggle();
    initMobileNav();
    initNameModal();

    if (!activeTrack) activeTrack = 'foundations';
    const trackInfo = COURSE_TRACKS[activeTrack];
    const pill = document.getElementById('headerVersionPill');
    const badge = document.getElementById('sidebarVersionBadge');
    const label = 'Part ' + trackInfo.version + ' • ' + trackInfo.level;
    if (pill) pill.textContent = label;
    if (badge) badge.textContent = label;

    const trackModulesTitle = document.getElementById('trackModulesTitle');
    if (trackModulesTitle) trackModulesTitle.textContent = 'Part ' + trackInfo.version + ' Modules';

    // Add click handlers for track selection
    const versionPath = document.getElementById('versionPath');
    if (versionPath) {
      versionPath.querySelectorAll('.version-card').forEach(function (card) {
        const track = card.getAttribute('data-track');
        card.addEventListener('click', function () {
          if (!isTrackUnlocked(track)) {
            toast('Complete the previous track to unlock this one.');
            return;
          }
          setActiveTrack(track);
        });
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isTrackUnlocked(track)) {
              toast('Complete the previous track to unlock this one.');
              return;
            }
            setActiveTrack(track);
          }
        });
      });
    }

    renderSidebar();
    renderDashboardCards();
    updateProgress();
    updateContinueBar();

    const heroRing = document.getElementById('heroProgressRing');
    if (heroRing) {
      const heroDone = document.getElementById('heroModulesDone');
      const pct = parseInt(heroDone?.textContent || '0', 10);
      const dash = Math.max(0, Math.min(1, (12 - pct) / 12));
      heroRing.style.strokeDasharray = '251.2';
      heroRing.style.strokeDashoffset = 251.2 * dash;
    }

    if (dash) dash.style.display = 'block';

    if (!state.learnerName) {
      showNamePrompt();
    } else {
      updateContinueBar();
    }

    registerServiceWorker();
  }

  // ===== GLOBALS =====
  window.navigateTo = navigateTo;
  window.setActiveTrack = setActiveTrack;
  window.submitQuiz = submitQuiz;
  window.submitExam = submitExam;
  window.toggleTheme = toggleTheme;
  window.downloadCertificatePNG = downloadCertificatePNG;
  window.showNamePrompt = showNamePrompt;
  window.saveName = saveName;
  window.openAuthorModal = openAuthorModal;
  window.closeAuthorModal = closeAuthorModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  console.info('AI Awareness Course — Unified Multi-Track — Ready');
})();