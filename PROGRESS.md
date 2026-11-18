# Progress

Last updated: 18 November 2026

**Live site:** https://mahesh-gunalapuri-associates.netlify.app (Netlify free plan, deployed by Netlify CLI on 17 Nov 2026; not connected to GitHub, so pushing never deploys)

**Branches**
- `fixes`: all work happens here.
- `main` on GitHub: older code from before the static conversion. Local `main` was last deployed at commit `6969594`.

## Done

- Static site: every page pre-rendered to HTML; no server, API, database, form service or environment variables.
- Pages: Home, About, CA Profile, Services (11), Expertise, Insights (5 demo articles), Contact, Privacy Policy, Terms, 404.
- Firm details from the visiting card and the ICAI certificate: FRN 032056S, proprietor CA Mahesh Gunalapuri (ACA, membership no. 297023), established August 2026, head office H No 6-2-0005, Sri Laxmi Nagar Colony, Road No 4, Near Shanmuka Apartment, Nalgonda 508001.
- Contact: click-to-call (93479 44995, 90595 96977), mailto (camaheshgunalapuri@gmail.com), WhatsApp (wa.me/919347944995); enquiry form opens the visitor's email app or WhatsApp.
- Founder photo, professional philosophy and motto; all placeholder text removed.
- Mobile layout tested on iPhone, Android and iPad sizes; self-hosted fonts; SEO tags, sitemap and robots.txt.
- Tests: 48 unit tests; Playwright end-to-end and device suite.

## Pending

- [ ] **Not yet live:** scrolling fix (commit `6d54c3c`). On slow phones, tapping a service shortcut during page load could jump back to the top. Low priority; publish with the next content update.
- [ ] Mahesh sir to review the site against ICAI website guidelines, especially the track-record figures (500+ ITR filings etc.) and the loans service.
- [ ] Mahesh sir to approve the philosophy and motto written in his voice (`founder.philosophy`, `founder.motto` in `siteConfig.ts`).
- [ ] Optional details (each is hidden until added): business hours (`contact.hours`), LinkedIn (`founder.linkedinUrl`), social media links (`social`), biography paragraphs (`founder.fullBio`).
- [ ] Optional: exact office pin for the "Open in Google Maps" button (`contact.mapsLink`).
- [ ] Replace the 5 demo articles with real ones (`src/content/articles.ts`).

## How to run locally

Needs Node.js 20+.

```bash
git checkout fixes
git pull
npm install
npm run build        # builds the static site into dist/
npm run preview      # serves it at http://localhost:4173
```

For live editing while changing code: `npm run dev` (http://localhost:5173).

Checks: `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run test:e2e` (first time: `npx playwright install chromium webkit`).
