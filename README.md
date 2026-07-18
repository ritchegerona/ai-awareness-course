# AI Awareness for the Workplace

**Version 2.0.0 · 3-Track Unified Course**  
**Author:** [Ritche Gerona](https://github.com/ritchegerona)

Self-paced AI literacy course for office teams in a **unified dashboard**. Runs in any modern browser on **Windows, macOS, and Linux** — no install required.

---

## 🚀 Live links

| | |
|--|--|
| **Course** | https://ritchegerona.github.io/ai-awareness-course/ |
| **Certificate preview** | https://ritchegerona.github.io/ai-awareness-course/certificate-preview.html |
| **Printable syllabus** | https://ritchegerona.github.io/ai-awareness-course/syllabus.html |
| **Admin progress board** | https://ritchegerona.github.io/ai-awareness-course/admin.html |
| **Public repo** | https://github.com/ritchegerona/ai-awareness-course |
| **Private learner records** | https://github.com/ritchegerona/ai-awareness-course-records |

Share text for Teams/email: [SHARE.md](./SHARE.md)

---

## 🎓 For learners

1. Open the course link
2. Enter your name (appears on the certificate)
3. Complete **12 modules per track** (quiz pass: **4/5**)
4. Pass the **final exam** (**18/25**)
5. Download your **certificate PNG**

### Learning Path (Sequential)
- **Part 1 (Foundations)** → Available immediately
- **Part 2 (Intermediate)** → Unlocks after passing Part 1 exam
- **Part 3 (Advanced)** → Unlocks after passing Part 2 exam

**Optional**
- **Share Progress for Records** — copy a report for the instructor
- **Export Progress Summary** — print / save as PDF for HR
- **Dark mode** — toggle in the left sidebar

**Tips:** Use the same browser/device to keep progress. Avoid private/incognito if you want progress saved.

---

## 📚 Course Structure

### Part 1 — Foundations (12 modules)
**Audience:** General users new to AI  
**Total Duration:** ~4h 45min

| # | Title | Duration |
|---|-------|----------|
| 1 | What is AI? | 25 min |
| 2 | AI Beyond Chatbots | 30 min |
| 3 | How AI Works | 25 min |
| 4 | AI in the Workplace | 30 min |
| 5 | Generative AI & LLMs | 30 min |
| 6 | Prompting & Practical Use | 25 min |
| 7 | AI Ethics & Responsibility | 20 min |
| 8 | The Future of AI | 15 min |
| 9 | Data Privacy & AI | 20 min |
| 10 | AI Tools Hands-On Guide | 25 min |
| 11 | AI & Communication at Work | 20 min |
| 12 | Critical Thinking with AI | 20 min |

### Part 2 — Intermediate (12 modules)
**Audience:** Practitioners ready for deeper tools & workflows  
**Total Duration:** ~4h 45min

| # | Title | Duration |
|---|-------|----------|
| 1 | Prompt Engineering Fundamentals | 30 min |
| 2 | AI-Powered Data Analysis | 35 min |
| 3 | AI for Content Creation | 30 min |
| 4 | AI-Powered Automation | 35 min |
| 5 | AI for Decision Making | 30 min |
| 6 | AI Ethics and Responsible Use | 30 min |
| 7 | Advanced Prompt Engineering | 35 min |
| 8 | AI in Specific Industries | 40 min |
| 9 | Evaluating and Selecting AI Tools | 30 min |
| 10 | Change Management and AI Adoption | 35 min |
| 11 | Measuring ROI and Impact of AI | 30 min |
| 12 | Future Trends and Preparing for What's Next | 35 min |

### Part 3 — Advanced (12 modules)
**Audience:** Specialists & strategic implementers  
**Total Duration:** ~5h 30min

| # | Title | Duration |
|---|-------|----------|
| 1 | AI Architecture Fundamentals | 25 min |
| 2 | Prompt Engineering at Scale | 30 min |
| 3 | RAG Deep Dive | 35 min |
| 4 | Fine-Tuning Strategies | 30 min |
| 5 | AI Governance | 25 min |
| 6 | Security in AI | 25 min |
| 7 | MLOps for Generative AI | 40 min |
| 8 | AI Product Strategy & ROI | 35 min |
| 9 | Emerging Architectures | 40 min |
| 10 | AI Leadership & Strategic Vision | 35 min |
| 11 | Advanced Agent Design | 40 min |
| 12 | Capstone Project | 60 min |

---

## 🛠️ Technical Documentation

### Architecture
- **modules-data.js** — Contains all 36 modules with `track` property (foundations/intermediate/advanced)
- **app.js** — Main application runtime with:
  - Track switching and sequential unlock logic
  - Progress tracking per track
  - Quiz/exam submission and scoring
  - Certificate generation with track-specific labels
- **styles.css** — Premium minimal theme with dark/light mode support

### Key Features
- **Sequential Progression**: Part 2 unlocks after Part 1 completion + exam pass
- **Track Switching**: Dynamic module rendering based on selected track
- **Progress Persistence**: localStorage with `aiCourseState_unified` key
- **Responsive Design**: Mobile-friendly with slide-in sidebar
- **PWA Support**: Manifest and service worker for offline capability

### File Structure
```
public/                      ← GitHub Pages root
  index.html                 ← unified course app
  certificate-preview.html     ← certificate preview page
  syllabus.html              ← printable syllabus
  admin.html                 ← admin progress board
  css/styles.css             ← main stylesheet
  js/app.js                  ← application runtime
  js/modules-data.js         ← course data (all 36 modules)
  js/vendor/html2canvas.min.js
  images/ritche-gerona.png
server.js                    ← local development server
```

---

## 🔧 Local Development

Requires **Node.js 16+** (no npm packages).

```bash
npm start
# or: node server.js
```

Open http://127.0.0.1:3000  
Windows: `start.bat` · macOS/Linux: `./start.sh`

### Adding/Editing Modules
Modules are defined in `public/js/modules-data.js` with structure:
```javascript
{
  id: 1,
  track: 'foundations',  // or 'intermediate' or 'advanced'
  title: 'Module Title',
  subtitle: 'Brief description',
  duration: '25 min',
  icon: '🤖',
  content: '<div class="content-section">...</div>',
  questions: [
    { q: 'Question text', options: ['A', 'B', 'C', 'D'], answer: 2 }
  ]
}
```

---

## 📊 Learner records (private)

Names and progress are **not** stored in this public repository.

Private roster (owner only): **https://github.com/ritchegerona/ai-awareness-course-records**  
→ `LEARNERS.md` (Completed / In progress)

The public **Admin progress board** stores data only in the instructor's browser unless copied into that private repo.

---

## 👤 About the author

Ritche Gerona is an AI automation developer and IT professional based in Pasig City, Philippines. Full bio is in the course under **About the Author** (left panel).

---

## 📄 License

Course by **Ritche Gerona**. All rights reserved unless otherwise stated.