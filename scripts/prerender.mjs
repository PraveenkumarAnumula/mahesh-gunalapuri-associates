// Build step: turns every page into its own static HTML file inside dist/.
//   dist/index.html, dist/about/index.html, dist/insights/<slug>/index.html, ..., dist/404.html
// The result is plain files that any static host (Netlify, GitHub Pages, ...) can serve with no server code.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = 'dist';
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(join('dist-ssr', 'entry-server.js')).href);

function page(path) {
  const { html, head } = render(path);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

let count = 0;
for (const route of routes) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(route));
  count++;
}
// Any address that doesn't exist shows this page (Netlify and GitHub Pages both use 404.html automatically).
writeFileSync(join(dist, '404.html'), page('/404'));
rmSync('dist-ssr', { recursive: true, force: true });
console.log(`[prerender] wrote ${count} pages + 404.html`);
