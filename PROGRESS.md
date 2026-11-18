# Progress

Last updated: 18 November 2026

**Live site:** https://mahesh-gunalapuri-associates.netlify.app (Netlify free plan, deployed by Netlify CLI on 17 Nov 2026; not connected to GitHub, so pushing never deploys)

**Branches**
- `fixes`: all work happens here.
- `main` on GitHub: older code from before the static conversion. Local `main` was last deployed at commit `6969594`.

## Done

- Static site: every page pre-rendered to HTML; no server, API, database, form service or environment variables.
- Pages: Home, About, CA Profile, Services (10), Expertise, Insights (5 demo articles), Contact, Privacy Policy, Terms, 404.
- Firm details from the visiting card and the ICAI certificate: FRN 032056S, proprietor CA Mahesh Gunalapuri (ACA, membership no. 297023), established August 2026, head office H No 6-2-0005, Sri Laxmi Nagar Colony, Road No 4, Near Shanmuka Apartment, Nalgonda 508001.
- Contact: click-to-call (93479 44995, 90595 96977), mailto (camaheshgunalapuri@gmail.com), WhatsApp (wa.me/919347944995); enquiry form opens the visitor's email app or WhatsApp.
- Founder photo, professional philosophy and motto; all placeholder text removed.
- Mobile layout tested on iPhone, Android and iPad sizes; self-hosted fonts; SEO tags, sitemap and robots.txt.
- Tests: 48 unit tests; Playwright end-to-end and device suite (214 passing, 18 Nov 2026); axe accessibility scan clean on all pages.

### Fixed on `fixes`, not yet live (18 Nov 2026)

- Scrolling: tapping a service shortcut while a page was still loading could jump back to the top (`6d54c3c`).
- Removed the horizontal stripe lines from all navy sections, on mobile and desktop; also the gold line under the home hero and the dividers in the key-dates panel (`edf191c`).
- Buttons and links made clearly clickable: solid buttons at least 48px tall with hover and pressed effects; "Learn more" and "Read article" are buttons; new "Call 93479 44995" buttons on Contact and in the "Let's Grow Together" band; phone, email and inline links are underlined in the brand colour (`5f07bc6`).
- Qualification line shortened to "Chartered Accountant (ACA), Associate Member of ICAI" (removed "since August 2026").
- Home page figures (500+ ITR filings etc.) shown in a bordered panel with a line between each figure, on mobile and desktop.
- Home: due dates now list 31 Jul – ITR 1 & 2 and 31 Aug – ITR 3 & 4 (non-audit); loans removed from the hero line, home service cards (replaced by Accounting & Bookkeeping), footer services list and firm description. The loans service has since been removed from the whole site (Services page, contact form, footer).
- Accessibility: no nested landmark regions (`b0a5e0a`, plus the contact sidebar in `5f07bc6`).

## Pending

- [ ] **Publish the fixes above** when the user says "deploy to live" (merge `fixes` into `main` only after the user says "deploy").
- [ ] Mahesh sir to review the site against ICAI website guidelines, especially the track-record figures (500+ ITR filings etc.). (Loans service already removed.)
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

## Netlify setup on a new computer (one time)

Only needed on a computer that will deploy. Deploys still happen only when the user says "deploy to live".

```bash
npx netlify-cli@17.38.1 login
npx netlify-cli@17.38.1 link --id bb94d8e7-7f7d-42be-bac9-753fbfb2ca2e   # links this folder to the existing live site
```

Do not run `netlify sites:create` or `netlify init`; they would create a second site.
