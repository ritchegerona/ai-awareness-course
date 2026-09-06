<p align="center">
  <img src="public/images/ai-awareness-course-logo.png" alt="AI Awareness Course Logo" width="600">
</p>

# AI Awareness Course

A lightweight **zero‑dependency** static file server that powers the *AI Awareness for the Workplace* interactive course. It serves public assets, protects a private folder, provides a health‑check endpoint, basic security headers, environment‑driven configuration, and simple in‑memory rate limiting.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Running locally](#running-locally)
- [Docker](#docker)
- [Testing](#testing)
- [CI/CD (GitHub Actions)](#cicd-github-actions)
- [Security & Rate limiting](#security--rate-limiting)
- [Architecture diagram](#architecture-diagram)
- [Exam navigation guard](#exam-navigation-guard)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites
- Node.js >= 16 (LTS recommended)
- npm (bundled with Node)
- Optional: Docker & Docker‑Compose for containerised workflow

---

## Running locally
```bash
# Install dependencies
npm ci

# Start the server (development mode)
npm start

# The server listens on http://127.0.0.1:3000 by default.
# Override with environment variables (see .env.example).
```

To run the server in test mode (exposes it for Jest/Supertest):
```bash
NODE_ENV=test npm test
```

---

## Docker
A multi‑stage Dockerfile is provided for production builds.
```bash
# Build the image
docker build -t ai-awareness-course .

# Run the container
docker run -p 3000:3000 -e PORT=3000 ai-awareness-course
```
Or use Docker‑Compose for a one‑command startup:
```bash
docker-compose up --build
```

---

## Testing
The project uses **Jest** with two projects:
- **node** – runs `test/server.test.js` and `test/rate.test.js`.
- **jsdom** – runs UI‑related tests such as `test/app.test.js`.
```bash
npm test
```
All test suites should pass (`2 suites, 4 tests`).

---

## CI/CD (GitHub Actions)
The workflow `.github/workflows/ci.yml` automatically:
1. Checks out the repository.
2. Sets up Node.js (v20.x).
3. Installs dependencies (`npm ci`).
4. Runs the full test suite (`npm test`).
5. Builds a Docker image (`docker build`).

---

## Security & Rate limiting
- **Headers:** `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Content‑Security‑Policy`.
- **Rate limiting:** Simple in‑memory limit of **100 requests per minute per IP**. Exceeding the limit returns `429 Too Many Requests`.
- **Environment variables** can be loaded from a `.env` file (no external dependencies).

---

## Architecture diagram
```mermaid
flowchart TD
    A[Client Request] --> B{Method}
    B -->|GET/HEAD| C[Parse URL]
    C --> D{Path}
    D -->|/health| E[Health‑check JSON]
    D -->|/private/*| F[PRIVATE_ROOT]
    D -->|/*| G[PUBLIC_ROOT]
    F --> H[safeJoin()]
    G --> H
    H --> I[fs.stat & readFile]
    I --> J{Exists?}
    J -->|file| K[Send file with correct MIME]
    J -->|dir| L[Try index.html or SPA fallback]
    J -->|no| M[404 Not Found]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
```

---

## Exam navigation guard

The client‑side guard (`guardExamAccess`) ensures a learner cannot access the exam page unless **all modules in the current track are completed**. This logic is covered by unit tests in `test/app.test.js`.

## Continue button behavior

The **Continue** button now points to the **first unfinished module** in the current track. When all modules are completed the continue bar is hidden. This replaces the previous behavior that used `state.lastModule`. The UI updates dynamically via `updateContinueBar()` in `public/js/app.js`.
The client‑side guard (`guardExamAccess`) ensures a learner cannot access the exam page unless **all modules in the current track are completed**. The logic lives in `public/js/app.js` and is covered by unit tests in `test/app.test.js`.

---

## Contributing
1. Fork the repository
2. Create a feature branch
3. Write tests for your changes
4. Ensure `npm test` passes
5. Open a Pull Request

---

## License
This project is **UNLICENSED** – private use only.
