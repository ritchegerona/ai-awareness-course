# AI Awareness for the Workplace

Interactive, self-paced AI literacy course for office teams. Works on **Windows, macOS, and Linux** in any modern browser.

**For colleagues:** open the public link, learn, pass the exam, download a certificate. No install.

**Live course (GitHub Pages):**  
**https://ritchegerona.github.io/ai-awareness-course/**

See **[SHARE.md](./SHARE.md)** for a ready-to-paste Teams/email message.

---

## Recommended setup (office sharing)

| Role | What they use |
|------|----------------|
| **You (owner)** | This GitHub repo + optional local `node server.js` for testing |
| **Office mates** | Public URL only (browser) |
| **Backend** | None — progress stays in each person’s browser |
| **Google Drive** | Not used for hosting |

```text
GitHub repo  →  GitHub Pages  →  share one HTTPS link  →  team takes the course
```

---

## For office mates (learners)

1. Open: https://ritchegerona.github.io/ai-awareness-course/
2. Enter your name (appears on the certificate)
3. Complete **12 modules** (quiz pass mark: **4/5**)
4. Pass the **final exam** (**18/25**)
5. Download your **certificate PNG**

**Tips**

- Use the **same browser and computer** to keep progress  
- Avoid private/incognito if you want progress saved  
- ~4–5 hours total; pause anytime  

---

## Course content

| Feature | Detail |
|--------|--------|
| 12 modules | Workplace AI literacy |
| Quizzes | 5 questions each — pass with 4/5 |
| Final exam | 25 questions — pass with 18/25 |
| Certificate | Personalized PNG (offline-capable after first load) |
| Progress | Browser `localStorage` (per person, per device) |

Modules: What is AI? · Beyond Chatbots · How AI Works · Workplace · Generative AI & LLMs · Prompting · Ethics · Future · Privacy · Tools · Communication · Critical Thinking · Final Exam.

---

## Publish for the office (you — once)

Repo is set up for **GitHub Actions → Pages** (deploys the `public/` folder).

### 1. Push this project to GitHub

Remote expected: `https://github.com/ritchegerona/ai-awareness-course.git`

```bash
git add .
git commit -m "Publish AI Awareness Course web app for GitHub Pages"
git push -u origin master
```

(Use `main` if that is your default branch.)

### 2. Enable GitHub Pages (Actions)

1. Open the repo on GitHub → **Settings** → **Pages**  
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**  
3. Open the **Actions** tab and confirm workflow **Deploy to GitHub Pages** succeeded  
4. After a minute or two, open:  
   **https://ritchegerona.github.io/ai-awareness-course/**

### 3. Share

Copy the blurb from [SHARE.md](./SHARE.md) into Teams, Slack, or email.

---

## Local testing (developers / you only)

Colleagues do **not** need this.

| Dependency | Included? |
|------------|-----------|
| Node.js 16+ | Install once from [nodejs.org](https://nodejs.org/) |
| npm packages | **None** — `server.js` uses Node built-ins only |
| html2canvas | Yes — `public/js/vendor/` |

```bash
npm start
# or: node server.js
```

Open http://127.0.0.1:3000  

Windows: `start.bat` · macOS/Linux: `./start.sh`

---

## Project layout

```
public/                      ← deployed to GitHub Pages
  index.html
  css/ styles.css
  js/  app.js, modules-data.js, vendor/html2canvas.min.js
  sw.js, manifest.webmanifest
.github/workflows/deploy-pages.yml
server.js                    ← local static server only
SHARE.md                     ← message for the office
ai-awareness-course.html     ← original single-file archive
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Pages 404 | Settings → Pages → Source = **GitHub Actions**; wait for green workflow |
| Old content after update | Hard refresh; wait for Actions deploy to finish |
| Progress lost | Different browser/device, or site data cleared |
| Certificate export fails | Allow downloads; try another browser; Print as fallback |
| Port 3000 busy (local) | `PORT=3001 node server.js` |

---

## License

Course materials are for the project owner’s use. All rights reserved unless otherwise stated.
