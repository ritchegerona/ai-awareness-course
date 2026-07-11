# AI Awareness for the Workplace

**Version 1.0.0 · Foundations**  
**Author:** [Ritche Gerona](https://github.com/ritchegerona)

Self-paced AI literacy course for office teams. Runs in any modern browser on **Windows, macOS, and Linux** — no install required.

---

## Live links

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

## For learners

1. Open the course link  
2. Enter your name (appears on the certificate)  
3. Complete **12 modules** (quiz pass: **4/5**)  
4. Pass the **final exam** (**18/25**)  
5. Download your **certificate PNG**  

**Optional**
- **Share Progress for Records** — copy a report for the instructor  
- **Export Progress Summary** — print / save as PDF for HR  
- **Dark mode** — toggle in the left sidebar  

**Tips:** Use the same browser/device to keep progress. Avoid private/incognito if you want progress saved.

---

## Course series

| Version | Level | Status |
|---------|--------|--------|
| **V1** | Foundations (new to AI) | **Available** |
| **V2** | Intermediate | Coming soon |
| **V3** | Advanced | Planned |

### V1 modules
1. What is AI?  
2. AI Beyond Chatbots  
3. How AI Works  
4. AI in the Workplace  
5. Generative AI & LLMs  
6. Prompting & Practical Use  
7. AI Ethics & Responsibility  
8. The Future of AI  
9. Data Privacy & AI  
10. AI Tools Hands-On Guide  
11. AI & Communication at Work  
12. Critical Thinking with AI  

---

## Learner records (private)

Names and progress are **not** stored in this public repository.

Private roster (owner only): **https://github.com/ritchegerona/ai-awareness-course-records**  
→ `LEARNERS.md` (Completed / In progress)

The public **Admin progress board** stores data only in the instructor’s browser unless copied into that private repo.

---

## Local testing (owner)

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
public/                      ← GitHub Pages root
  index.html                 ← course app
  certificate-preview.html
  syllabus.html
  admin.html
  css/styles.css
  js/app.js
  js/modules-data.js
  js/vendor/html2canvas.min.js
  images/ritche-gerona.png
.github/workflows/deploy-pages.yml
server.js
```

---

## About the author

Ritche Gerona is an AI automation developer and IT professional based in Pasig City, Philippines. Full bio is in the course under **About the Author** (left panel).

---

## License

Course by **Ritche Gerona**. All rights reserved unless otherwise stated.
