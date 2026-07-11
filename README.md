# AI Awareness for the Workplace

**Version 1.0.0 · Foundations**  
**Author:** [Ritche Gerona](https://github.com/ritchegerona)

Self-paced AI literacy course for office teams. Runs in any modern browser on **Windows, macOS, and Linux** — no install.

**Live course:** https://ritchegerona.github.io/ai-awareness-course/  
**Certificate preview:** https://ritchegerona.github.io/ai-awareness-course/certificate-preview.html  
**Syllabus (print/PDF):** https://ritchegerona.github.io/ai-awareness-course/syllabus.html  
**Admin board (local roster):** https://ritchegerona.github.io/ai-awareness-course/admin.html  

Share text for Teams/email: [SHARE.md](./SHARE.md)

---

## For learners

1. Open the live course link  
2. Enter your name (shown on the certificate)  
3. Complete **12 modules** (quiz pass: **4/5**)  
4. Pass the **final exam** (**18/25**)  
5. Download your **certificate PNG**  

Optional: **Share Progress for Records** / **Export Progress Summary** on the home page.

Theme: use **Dark mode / Light mode** in the header or sidebar.

**Tips:** use the same browser/device to keep progress; avoid private/incognito mode if you want progress saved.

---

## Course series roadmap

| Version | Level | Status |
|---------|--------|--------|
| **V1** | Foundations (new to AI) | **Available now** |
| **V2** | Intermediate | Coming soon |
| **V3** | Advanced | Planned |

V1 modules: What is AI? · AI Beyond Chatbots · How AI Works · AI in the Workplace · Generative AI & LLMs · Prompting & Practical Use · AI Ethics & Responsibility · The Future of AI · Data Privacy & AI · AI Tools Hands-On Guide · AI & Communication at Work · Critical Thinking with AI · Final Exam.

---

## Learner records (private — owner only)

Names and progress are **not** in this public repo.

Private roster: **https://github.com/ritchegerona/ai-awareness-course-records** (private)  
→ `LEARNERS.md` (Completed / In progress)

---

## Local testing (owner / developers)

Requires **Node.js 16+** (no npm packages).

```bash
npm start
# or: node server.js
```

Open http://127.0.0.1:3000  
Windows: `start.bat` · macOS/Linux: `./start.sh`

---

## Project layout

```
public/                 ← deployed to GitHub Pages
  index.html            ← course app
  certificate-preview.html
  css/styles.css
  js/app.js
  js/modules-data.js
  js/vendor/html2canvas.min.js
  images/ritche-gerona.png
.github/workflows/deploy-pages.yml
server.js               ← local static server only
```

---

## About the Author

Ritche Gerona is an AI automation developer, technology enthusiast, and IT professional passionate about helping people work smarter through practical applications of artificial intelligence. Based in Pasig City, Philippines.

Full bio is available in the course via **About Author**.

---

## License

Course by **Ritche Gerona**. All rights reserved unless otherwise stated.
