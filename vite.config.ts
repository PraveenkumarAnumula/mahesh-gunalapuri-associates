/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { siteConfig } from './src/config/siteConfig';
import { staticRoutes } from './src/config/routes';
import { articles } from './src/content/articles';

const siteUrl = siteConfig.siteUrl.replace(/\/$/, '');
/** A GitHub Pages project site lives under /<repo>/; everything else is served from the root. */
const basePath = `${new URL(siteUrl).pathname.replace(/\/$/, '')}/`;

/** Writes sitemap.xml and robots.txt into the build from the same page list the site uses. */
function seoFiles(): Plugin {
  let isSsrBuild = false;
  return {
    name: 'mga-seo-files',
    apply: 'build',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    generateBundle() {
      if (isSsrBuild) return;
      const today = new Date().toISOString().slice(0, 10);
      const paths = [...staticRoutes.filter((r) => r.inSitemap).map((r) => r.path), ...articles.map((a) => `/insights/${a.slug}`)];
      const urls = paths
        .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : `${p}/`}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), seoFiles()],
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  // Bundle these into the build-time renderer; they don't load cleanly as plain Node modules.
  ssr: { noExternal: ['react-helmet-async', 'react-router-dom', 'react-router', 'lucide-react'] },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    css: false,
  },
});
