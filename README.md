# CV Builder

A modern, European-standard CV builder that runs entirely in your browser — no backend, no accounts, no data ever leaves your device. Fill in a form, watch a live A4 preview update, and export straight to PDF.

**Live app:** `https://<your-github-username>.github.io/Cv-builder/` (once Pages is enabled, see below)

## Features

- Every field is optional — personal details, photo, contact info, LinkedIn/GitHub/website, summary, work experience, education, skills (with level bars), languages (CEFR scale), certifications and projects, each addable/removable freely
- Live, modern two-column CV preview (photo sidebar + main content) sized to A4
- One-click **Download PDF** using the browser's native print-to-PDF, so the output is real, crisp, selectable text — not a screenshot
- Your data is saved to `localStorage` automatically, so a refresh won't lose your work
- "Load example" button to see a filled-out CV, and "Clear all" to start over

## Tech stack

- **React + TypeScript + Vite** — static site, no server needed
- **Tailwind CSS** for styling
- No PDF/canvas libraries — PDF export uses `window.print()` with dedicated print CSS in `src/index.css`, which produces a proper vector PDF via the browser's built-in "Save as PDF"
- Deployed automatically to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`

## Deployment (one-time setup)

This repo deploys itself — you never need to build or run it locally.

1. In the repo, go to **Settings → Pages**, and under "Build and deployment" set **Source** to **GitHub Actions**.
2. Push/merge to the `main` branch. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages automatically.
3. The site will be live at `https://<your-github-username>.github.io/Cv-builder/`.

Every subsequent push to `main` redeploys automatically — there's nothing to run by hand.

## Local development (optional)

Not required to deploy, but if you ever want to run it locally:

```bash
npm install
npm run dev
```

Build output is produced with `npm run build` into `dist/`.
