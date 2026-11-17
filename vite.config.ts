/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { staticRoutes } from './src/config/routes';
import { articles } from './src/content/articles';
import { services } from './src/content/services';

/** Emits sitemap.xml and robots.txt at build time from the same route and article data the app uses. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'ams-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const paths = [
        ...staticRoutes.filter((r) => r.inSitemap).map((r) => r.path),
        ...articles.map((a) => `/insights/${a.slug}`),
      ];
      const urls = paths
        .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      // Keeps the service count visible in build logs as a quick sanity check.
      console.log(`[seo] sitemap: ${paths.length} URLs, ${services.length} services`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://ams-tax-associates.netlify.app').replace(/\/$/, '');
  return {
    plugins: [
      react(),
      seoFiles(siteUrl),
      {
        name: 'ams-html-site-url',
        transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
      },
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/unit/setup.ts'],
      include: ['tests/unit/**/*.test.{ts,tsx}'],
      css: false,
    },
  };
});
