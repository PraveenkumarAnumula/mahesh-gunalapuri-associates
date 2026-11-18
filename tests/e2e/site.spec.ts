import { expect, test, type Page } from '@playwright/test';

const pages = [
  { path: '/', h1: /trusted partner in taxation/i },
  { path: '/about', h1: /about mahesh gunalapuri & associates/i },
  { path: '/ca-profile', h1: /mahesh gunalapuri/i },
  { path: '/services', h1: /services for individuals/i },
  { path: '/expertise', h1: /areas of professional expertise/i },
  { path: '/insights', h1: /updates, reminders/i },
  { path: '/insights/choosing-between-old-and-new-tax-regime', h1: /old and new tax regimes/i },
  { path: '/contact', h1: /request a consultation/i },
  { path: '/privacy-policy', h1: /privacy policy/i },
  { path: '/terms', h1: /terms & conditions/i },
];

/** Fails the test on any console error or uncaught page error. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1366) < 1280;

for (const p of pages) {
  test(`${p.path} renders with SEO metadata, no console errors and no horizontal scroll`, async ({ page }) => {
    const errors = trackErrors(page);
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.h1);
    await expect(page).toHaveTitle(/Mahesh Gunalapuri & Associates/);
    await expect(page.locator('meta[name="description"]').first()).toHaveAttribute('content', /.{40,}/);
    await expect(page.locator('meta[property="og:title"]').first()).toHaveAttribute('content', /Mahesh Gunalapuri & Associates/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // every image has alt text and has loaded
    const imgs = await page.locator('img').evaluateAll((els) =>
      (els as HTMLImageElement[]).map((i) => ({ alt: i.getAttribute('alt'), ok: i.complete && i.naturalWidth > 0, lazy: i.loading })),
    );
    for (const img of imgs) {
      expect(img.alt).not.toBeNull();
      if (img.lazy !== 'lazy') expect(img.ok).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test('page titles are unique', async ({ page }) => {
  const titles = new Set<string>();
  for (const p of pages) {
    await page.goto(p.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    titles.add(await page.title());
  }
  expect(titles.size).toBe(pages.length);
});

test('unknown URLs show the 404 page with noindex', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/couldn’t find that page/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.getByRole('link', { name: /back to home/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('sitemap.xml and robots.txt are served', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain('<urlset');
  expect(xml).toContain('/insights/');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
  for (const asset of ['/favicon.svg', '/favicon.ico', '/og-image.png', '/apple-touch-icon.png', '/fonts/inter-400.woff2']) {
    expect((await request.get(asset)).ok(), asset).toBe(true);
  }
});

test('navigation reaches every main page', async ({ page }) => {
  await page.goto('/');
  for (const label of ['About Us', 'Our Services', 'Our Expertise', 'Insights', 'Contact']) {
    if (isMobile(page)) {
      await page.getByRole('button', { name: /open menu/i }).click();
      await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: label }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden();
    } else {
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label }).click();
    }
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toContainText(label);
  }
});

test('hero and founder CTAs lead to the right pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /schedule a consultation/i }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.goto('/');
  await page.getByRole('link', { name: /explore our services/i }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.goto('/');
  await page.getByRole('link', { name: /view full profile/i }).click();
  await expect(page).toHaveURL(/\/ca-profile$/);
});

test('service cards jump to the matching section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /GST Registration & Return Filing/ }).click();
  await expect(page).toHaveURL(/\/services#gst$/);
  await expect(page.locator('#gst')).toBeInViewport();
});

test('service enquiry button preselects the service on the contact form', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: /enquire about GST/i }).click();
  await expect(page.getByLabel(/service required/i)).toHaveValue('GST Registrations & Return Filings');
});

test('no broken internal links', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const p of pages) {
    await page.goto(p.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
    hrefs.forEach((h) => seen.add(h.split('#')[0].split('?')[0] || '/'));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
    await page.goto(href);
    await expect(page.getByRole('heading', { level: 1 }), href).not.toHaveText(/couldn’t find that page/i);
  }
});

test('mobile menu opens, closes on Escape and locks scroll', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /open menu/i });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden();
  await expect(page.getByRole('button', { name: /open menu/i })).toBeFocused();
});

test('keyboard users can skip to content and reach the nav', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: /skip to main content/i });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.goto('/');
  await page.keyboard.press('Tab'); // skip link
  await page.keyboard.press('Tab'); // logo
  await expect(page.getByRole('banner').getByRole('link', { name: /mahesh gunalapuri & associates — home/i })).toBeFocused();
});

test.describe('contact form (opens email app / WhatsApp, no server)', () => {
  test('validates fields before opening anything', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /send by email/i }).click();
    await expect(page.getByText(/enter your full name/i)).toBeVisible();
    await page.getByLabel(/email address/i).fill('bad@');
    await page.getByLabel(/phone number/i).fill('12345');
    await page.getByLabel(/phone number/i).blur();
    await expect(page.getByText(/valid email address/i)).toBeVisible();
    await expect(page.getByText(/valid 10-digit indian mobile/i)).toBeVisible();
    await expect(page.getByRole('status')).toHaveCount(0);
  });

  async function fill(page: Page) {
    await page.goto('/contact');
    // Stop the browser from actually launching an email app or new tab during the test.
    await page.evaluate(() => {
      window.open = () => null;
    });
    await page.getByLabel(/full name/i).fill('Playwright Test');
    await page.getByLabel(/phone number/i).fill('98765 43210');
    await page.getByLabel(/email address/i).fill('playwright@example.com');
    await page.getByLabel(/service required/i).selectOption('ITR Filing');
    await page.getByLabel(/^message/i).fill('Automated end-to-end test. Please ignore.');
  }

  test('WhatsApp button prepares a pre-filled chat with the firm', async ({ page }) => {
    await fill(page);
    await page.getByRole('button', { name: /send on whatsapp/i }).click();
    await expect(page.getByText(/whatsapp should now be open/i)).toBeVisible();
    const href = await page.getByRole('link', { name: /open whatsapp again/i }).getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\/919347944995\?text=/);
    expect(decodeURIComponent(href!)).toContain('Name: Playwright Test');
  });

  test('email fallback link carries the full message', async ({ page }) => {
    await fill(page);
    // Clicking "Send by email" hands a mailto: link to the operating system; check the link it builds instead.
    await page.getByRole('button', { name: /send by email/i }).click();
    const link = page.getByRole('link', { name: /open the email again/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^mailto:camaheshgunalapuri@gmail\.com\?subject=/);
    expect(decodeURIComponent(href!)).toContain('Automated end-to-end test');
  });
});

test('no requests leave the site except the visitor\'s own clicks', async ({ page, baseURL }) => {
  const external: string[] = [];
  const siteHost = new URL(baseURL!).hostname;
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.hostname !== siteHost) external.push(r.url());
  });
  for (const p of pages) {
    await page.goto(p.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  expect(external).toEqual([]);
});

test('pages are complete HTML before any JavaScript runs', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const p of pages) {
    await page.goto(p.path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.h1);
  }
  await page.goto('/contact');
  await expect(page.locator('a[href="tel:+919347944995"]').first()).toBeVisible();
  await expect(page.locator('a[href^="mailto:camaheshgunalapuri@gmail.com"]').first()).toBeVisible();
  await expect(page.locator('a[href^="https://wa.me/919347944995"]').first()).toBeVisible();
  await context.close();
});
