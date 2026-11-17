# Mahesh Gunalapuri & Associates — Website

Website for **Mahesh Gunalapuri & Associates**, Chartered Accountants, Nalgonda (ICAI FRN 032056S).

It is a **fully static website**: every page is a ready-made HTML file. There is no server, database, login, admin panel, API or form service, and nothing to maintain or renew. It can be hosted free on Netlify, GitHub Pages or any static host.

- Phone numbers are click-to-call links, the email address opens the visitor's email app, and WhatsApp opens a chat (wa.me).
- The enquiry form opens a ready-to-send message in the visitor's **own email app or WhatsApp**. Nothing is stored or sent by the website itself.
- Fonts, images and icons are stored inside the site; pages load nothing from other websites.

Built with React + TypeScript + Tailwind CSS, pre-rendered to plain HTML at build time.

---

## 1. Deploy (free)

You need [Node.js 20+](https://nodejs.org) once, to build the site.

```bash
npm install
npm run build          # creates the finished website in the dist/ folder
```

### Option A: Netlify (recommended)
**Drag and drop:** log in at [app.netlify.com](https://app.netlify.com), open **Sites → Add new site → Deploy manually**, and drop the `dist` folder onto the page.

**Or connect GitHub** for automatic updates: **Add new site → Import an existing project → GitHub →** choose this repository. The settings are read from `netlify.toml` (build `npm run build`, publish `dist`). Every push to `main` then redeploys.

Afterwards, set `siteUrl` in `src/config/siteConfig.ts` to your Netlify address (e.g. `https://mahesh-gunalapuri-associates.netlify.app`), then rebuild and redeploy once.

### Option B: GitHub Pages
1. In `src/config/siteConfig.ts`, set `siteUrl` to `https://<github-username>.github.io/<repository-name>` and push.
2. On GitHub: **Settings → Pages → Source: GitHub Actions**.
3. **Actions → Deploy to GitHub Pages → Run workflow.** It only runs when you start it.

### Option C: Any other host
Upload the contents of `dist/` to any web host. No server-side setup is needed.

**Custom domain:** buying a domain costs money; connecting one on Netlify or GitHub Pages is free and includes HTTPS. Put the domain in `siteUrl`.

## 2. Change content

All firm details are in **one file: `src/config/siteConfig.ts`**. Text in `[square brackets]` is still placeholder.

| What | Where |
|---|---|
| Firm name, taglines, history, mission, FRN | `firm` |
| CA name, ICAI no., qualifications, biography, photo | `founder` |
| Phones, WhatsApp, email, address, Google Maps link, hours | `contact` |
| Track-record figures | `stats` |
| Social media links (hidden while empty) | `social` |
| Live web address | `siteUrl` |

- Services: `src/content/services.ts`
- Expertise areas: `src/content/expertise.ts`
- Articles: `src/content/articles.ts` (copy an article, give it a new `slug`, set `isDemo: false`)
- Legal pages: `src/pages/PrivacyPolicy.tsx`, `src/pages/Terms.tsx`

**Photos and logo:** put the file in `public/images/` and set its path in `siteConfig.ts` (for example `founder.photo: '/images/mahesh-gunalapuri.jpg'`). Use JPG or WebP under 200 KB.

After any change, run `npm run build` and redeploy (or just `git push` if Netlify is connected).

## 3. Check before publishing

```bash
npm run dev          # live-editing preview at http://localhost:5173
npm run preview      # preview of the finished static site at http://localhost:4173
npm run lint && npm run typecheck && npm run test
npx playwright install chromium webkit   # first time only
npm run test:e2e     # end-to-end + iPhone / Android / iPad checks
```

## Project layout

```
src/config/siteConfig.ts   ← firm & CA details (edit this)
src/content/               ← services, expertise, articles, approach
src/pages/                 ← one file per page
src/components/            ← layout, sections, shared pieces
public/                    ← images, fonts, favicon, share image
scripts/prerender.mjs      ← build step that writes each page as HTML
scripts/serve-static.mjs   ← local preview that behaves like a static host
netlify.toml               ← Netlify build settings + security headers
.github/workflows/         ← optional, manual GitHub Pages deploy
```
