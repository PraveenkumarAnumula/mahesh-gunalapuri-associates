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
  await page.goto('/no-such-page');
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
  for (const asset of ['/favicon.svg', '/favicon.ico', '/og-image.png', '/apple-touch-icon.png']) {
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
  await page.getByRole('link', { name: /GST Registration & Returns/ }).click();
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

test.describe('contact form', () => {
  test('validates fields before sending', async ({ page }) => {
    let called = false;
    await page.route('https://api.web3forms.com/**', (r) => {
      called = true;
      return r.abort();
    });
    await page.goto('/contact');
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(page.getByText(/enter your full name/i)).toBeVisible();
    await page.getByLabel(/email address/i).fill('bad@');
    await page.getByLabel(/phone number/i).fill('12345');
    await page.getByLabel(/phone number/i).blur();
    await expect(page.getByText(/valid email address/i)).toBeVisible();
    await expect(page.getByText(/valid 10-digit indian mobile/i)).toBeVisible();
    expect(called).toBe(false);
  });

  async function fill(page: Page) {
    await page.goto('/contact');
    await page.getByLabel(/full name/i).fill('Playwright Test');
    await page.getByLabel(/phone number/i).fill('98765 43210');
    await page.getByLabel(/email address/i).fill('playwright@example.com');
    await page.getByLabel(/service required/i).selectOption('ITR Filing');
    await page.getByLabel(/^message/i).fill('Automated end-to-end test. Please ignore.');
    await page.getByLabel(/agree to be contacted/i).check();
  }

  test('reports success only when the service confirms (mocked)', async ({ page }) => {
    await page.route('https://api.web3forms.com/**', async (r) => {
      await new Promise((res) => setTimeout(res, 300));
      await r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });
    await fill(page);
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(page.getByRole('button', { name: /sending/i })).toBeDisabled();
    await expect(page.getByText(/enquiry has been sent/i)).toBeVisible();
  });

  test('shows the error when the service fails (mocked)', async ({ page }) => {
    await page.route('https://api.web3forms.com/**', (r) =>
      r.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Server unavailable' }) }),
    );
    await fill(page);
    await page.getByRole('button', { name: /send enquiry/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByText(/enquiry has been sent/i)).toBeHidden();
  });
});
