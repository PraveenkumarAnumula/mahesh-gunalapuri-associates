# Progress

Last updated: 18 November 2026

**Live site:** https://mahesh-gunalapuri-associates.netlify.app (Netlify free plan, deployed by Netlify CLI; last deploy 19 Nov 2026 from commit `0c2fcc5`; not connected to GitHub, so pushing never deploys)

**Branches**
- `fixes`: all work happens here.
- `main` on GitHub: `0c2fcc5`, matches the live site (19 Nov 2026).

## Done

- Static site: every page pre-rendered to HTML; no server, API, database, form service or environment variables.
- Pages: Home, About, CA Profile, Services (12), Expertise, Insights (5 demo articles), Contact, Privacy Policy, Terms, 404.
- Firm details from the visiting card and the ICAI certificate: FRN 032056S, proprietor CA Mahesh Gunalapuri (ACA, membership no. 297023), established August 2026, head office H No 6-2-0005, Sri Laxmi Nagar Colony, Road No 4, Near Shanmuka Apartment, Nalgonda 508001.
- Contact: click-to-call (93479 44995, 90595 96977), mailto (camaheshgunalapuri@gmail.com), WhatsApp (wa.me/919347944995); enquiry form opens the visitor's email app or WhatsApp.
- Founder photo, professional philosophy and motto; all placeholder text removed.
- Mobile layout tested on iPhone, Android and iPad sizes; self-hosted fonts; SEO tags, sitemap and robots.txt.
- Tests: 48 unit tests; Playwright end-to-end and device suite (214 passing, 18 Nov 2026); axe accessibility scan clean on all pages.

### Fixes of 18 Nov 2026 (live since the 18 Nov deploy)

- Scrolling: tapping a service shortcut while a page was still loading could jump back to the top (`6d54c3c`).
- Removed the horizontal stripe lines from all navy sections, on mobile and desktop; also the gold line under the home hero and the dividers in the key-dates panel (`edf191c`).
- Buttons and links made clearly clickable: solid buttons at least 48px tall with hover and pressed effects; "Learn more" and "Read article" are buttons; new "Call 93479 44995" buttons on Contact and in the "Let's Grow Together" band; phone, email and inline links are underlined in the brand colour (`5f07bc6`).
- Qualification line shortened to "Chartered Accountant (ACA), Associate Member of ICAI" (removed "since August 2026").
- Home page figures (1000+ ITR filings etc.) shown in a bordered panel with a line between each figure, on mobile and desktop.
- Home: due dates now list 31 Jul – ITR 1 & 2 and 31 Aug – ITR 3 & 4 (non-audit); loans removed from the hero line, home service cards (replaced by Accounting & Bookkeeping), footer services list and firm description. The loans service has since been removed from the whole site (Services page, contact form, footer).
- New **Tax Audit** service (own card, document-with-checkmark icon). Services order everywhere (home, Services page, footer, contact form): ITR Filing, GST Registration & Return Filing, Company / Partnership / Society / Trust Registration, Tax Audit, Statutory / Internal Audit, then the rest. Tax audit removed from the Statutory / Internal Audit service; home grid shows nine cards, three across (`b96d783`).
- Key compliance dates in Title Case; dates bold and larger (`c6dfba9`).
- Home figures' labels in Title Case (`082dfcf`).
- Home figures updated to 1000+ / 200+ (later removed on 19 Nov with the whole counters section).
- New **Financial / Other Certificates** service (net worth certificates, project reports for MSME loans, other statutory certificates), added last everywhere: home cards, Services page, footer, contact form. Home services grid now shows ten cards as two rows of five on wide screens.
- Footer: removed the "social media profiles will appear here" note (`dca0489`). Copyright year updates itself: "© 2026" now, "© 2026–2027" from January, with no rebuild needed.
- CA Profile: removed the "Professional experience" section (hidden while `founder.experience` is empty).
- Accessibility: no nested landmark regions (`b0a5e0a`, plus the contact sidebar in `5f07bc6`).

## Pending

- [x] **Logo:** CA India logo (`public/images/mga-logo.jpg`) confirmed as allowed for ICAI members / registered firms that follow ICAI's design and ethical guidelines; used unaltered next to the firm name.
- [ ] **Promotional wording review (19 Nov):** list of remaining phrases with suggested neutral replacements sent to the user; change only after approval.
- [x] **Google Search Console:** ownership verified 19 Nov 2026 (HTML tag). Keep `seo.googleSiteVerification` in `siteConfig.ts`; removing it loses verification.
- [ ] **Search Console next steps (user):** Sitemaps → submit `sitemap.xml`; URL inspection → request indexing for the home page.
- [ ] **Google Business Profile** (for "chartered accountant near me"): user creates and verifies it at business.google.com (category: Chartered accountant), then send the profile link → `seo.googleBusinessProfileUrl`. Business hours also needed (`contact.hours`).
- [ ] Mahesh sir to review the site against ICAI website guidelines, especially the track-record figures (1000+ ITR filings etc.). (Loans service already removed.)
- [ ] Mahesh sir to approve the philosophy and motto written in his voice (`founder.philosophy`, `founder.motto` in `siteConfig.ts`).
- [ ] Optional details (each is hidden until added): business hours (`contact.hours`), LinkedIn (`founder.linkedinUrl`), social media links (`social`), biography paragraphs (`founder.fullBio`).
- [ ] Optional: exact office pin for the "Open in Google Maps" button (`contact.mapsLink`).
- [ ] Replace the 5 demo articles with real ones (`src/content/articles.ts`).

## Testing rule

Every change must work on **Android, iPhone and laptop/PC**. Before handing over: `npm run test`, then `npx playwright test` (desktop, Android, and the device matrix: iPhone SE / 14 / 14 Pro Max / 14 landscape, Galaxy S8 / S9+, Pixel 7 landscape, iPad Mini, iPad Pro; iPhones and iPads run in Safari's WebKit engine).

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
