import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the production build (`vite preview`) by default.
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
        // Separate output folder and port, so a running `npm run preview` is left alone.
        command: 'npx tsc -b && npx vite build --outDir dist-e2e && npx vite preview --outDir dist-e2e --port 4174 --strictPort',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 180_000,
        // Dummy key so the form tries to submit; every e2e test intercepts the request, so nothing is sent.
        env: { VITE_WEB3FORMS_ACCESS_KEY: 'e2e-dummy-key' },
      }
    : undefined,
});
