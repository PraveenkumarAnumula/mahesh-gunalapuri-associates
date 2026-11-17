import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the production build (`vite preview`) by default.
 * Set E2E_BASE_URL to run the same suite against the live site, e.g.
 *   E2E_BASE_URL=https://ams-tax-associates.netlify.app npx playwright test
 */
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:4173';
const local = !process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: local ? 0 : 1,
  reporter: [['list']],
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: local
    ? {
        command: 'npm run build && npm run preview',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 180_000,
        // Dummy key so the form tries to submit; every e2e test intercepts the request, so nothing is sent.
        env: { VITE_WEB3FORMS_ACCESS_KEY: 'e2e-dummy-key' },
      }
    : undefined,
});
