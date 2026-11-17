import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the static build (served by scripts/serve-static.mjs) by default.
 * Set E2E_BASE_URL to run the same suite against the live site, e.g.
 *   E2E_BASE_URL=https://mahesh-gunalapuri-associates.netlify.app npx playwright test
 */
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:4174';
const local = !process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: local ? 0 : 1,
  reporter: [['list']],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    // Full functional suite
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    // Responsive checks on real device profiles. iPhones and iPads run in WebKit (Safari's engine).
    ...[
      'iPhone SE',
      'iPhone 14',
      'iPhone 14 Pro Max',
      'iPhone 14 landscape',
      'Galaxy S8',
      'Galaxy S9+',
      'Pixel 7 landscape',
      'iPad Mini',
      'iPad Pro 11 landscape',
    ].map((name) => ({
      name: `device: ${name}`,
      testMatch: /responsive\.spec\.ts/,
      use: { ...devices[name] },
    })),
  ],
  webServer: local
    ? {
        // Builds the static site and serves it the way Netlify / GitHub Pages do (real 404s, folder index pages).
        command: 'npm run build && node scripts/serve-static.mjs dist 4174',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 180_000,
      }
    : undefined,
});
