import { expect, test } from '@playwright/test';

/**
 * Device checks run on every page for each phone/tablet project in playwright.config.ts:
 * no sideways scrolling, nothing spilling off-screen, readable form fields (iOS zooms below 16px),
 * finger-sized tap targets, and a working menu.
 */
const paths = [
  '/',
  '/about',
  '/ca-profile',
  '/services',
  '/expertise',
  '/insights',
  '/insights/choosing-between-old-and-new-tax-regime',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/no-such-page',
];

for (const path of paths) {
  test(`fits the screen: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const report = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const pageOverflow = document.documentElement.scrollWidth - vw;
      // Elements that stick out past the right edge, ignoring content inside intentional horizontal scrollers.
      const spill: string[] = [];
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
        if (el.closest('.swipe-row, [aria-hidden="true"], .sr-only')) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) spill.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 40)} (${Math.round(r.left)}→${Math.round(r.right)} of ${vw})`);
      }
      const smallFields = Array.from(document.querySelectorAll<HTMLElement>('input:not([tabindex="-1"]), select, textarea'))
        .filter((f) => parseFloat(getComputedStyle(f).fontSize) < 16)
        .map((f) => f.id);
      return { pageOverflow, spill: spill.slice(0, 5), smallFields };
    });

    expect(report.pageOverflow, 'page scrolls sideways').toBeLessThanOrEqual(0);
    expect(report.spill, 'elements spill off-screen').toEqual([]);
    expect(report.smallFields, 'form fields under 16px make iOS zoom in').toEqual([]);
  });
}

test('primary controls are finger-sized (at least 44px tall)', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const vw = page.viewportSize()!.width;
  const controls = [
    page.getByRole('button', { name: /send by email/i }),
    page.getByRole('button', { name: /send on whatsapp/i }),
    page.getByLabel(/full name/i),
    page.getByLabel(/service required/i),
    page.getByRole('link', { name: /chat on whatsapp/i }),
  ];
  if (vw < 1280) controls.push(page.getByRole('button', { name: /open menu/i }));
  for (const c of controls) {
    const box = await c.boundingBox();
    expect(box, 'control is visible').not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test('menu works at this screen size', async ({ page }) => {
  await page.goto('/');
  const vw = page.viewportSize()!.width;
  if (vw >= 1280) {
    await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
    return;
  }
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeHidden();
  await page.getByRole('button', { name: /open menu/i }).click();
  const menu = page.getByRole('navigation', { name: 'Mobile' });
  await expect(menu).toBeVisible();
  // Every menu item must be reachable inside the visible menu (it scrolls on short landscape screens).
  const last = menu.getByRole('link', { name: 'Get Consultation' });
  await last.scrollIntoViewIfNeeded();
  await expect(last).toBeInViewport();
  await menu.getByRole('link', { name: 'Our Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(menu).toBeHidden();
});

test('header stays visible while scrolling', async ({ page }) => {
  await page.goto('/services');
  await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' as ScrollBehavior }));
  await page.waitForFunction(() => window.scrollY > 1000);
  const header = page.getByRole('banner').first();
  const box = await header.boundingBox();
  // A few px of tolerance for sub-pixel rounding on high-density screens (e.g. Galaxy S9+ at 4.5x).
  expect(Math.abs(box!.y)).toBeLessThanOrEqual(4);
});

test('service shortcuts scroll sideways on phones and jump to the section', async ({ page }) => {
  await page.goto('/services');
  const nav = page.getByRole('navigation', { name: 'Services on this page' });
  const link = nav.getByRole('link', { name: 'Food License (FSSAI)' });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page.locator('#fssai')).toBeInViewport();
});
