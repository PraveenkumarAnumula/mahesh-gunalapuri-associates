/**
 * Build-time only: renders each page to HTML so the site can be served as plain static files.
 * Used by scripts/prerender.mjs; never shipped to visitors.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { ROUTER_BASENAME } from './utils/site';
import { staticRoutes } from './config/routes';
import { articles } from './content/articles';

export const routes: string[] = [...staticRoutes.map((r) => r.path), ...articles.map((a) => `/insights/${a.slug}`)];

export function render(path: string): { html: string; head: string } {
  const context: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={`${ROUTER_BASENAME}${path}`} basename={ROUTER_BASENAME} future={{ v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = context.helmet!;
  const head = [h.title, h.priority, h.meta, h.link, h.script].map((part) => part?.toString() ?? '').join('\n    ');
  return { html, head };
}
