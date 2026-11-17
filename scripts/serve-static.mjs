// Local preview of the built site that behaves like Netlify / GitHub Pages:
// serves files as they are, folders through their index.html, and 404.html (status 404) for anything else.
// Usage: node scripts/serve-static.mjs [folder=dist] [port=4173]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const root = resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4173);

// Serve under the same path prefix the site was built for (e.g. /<repo>/ on GitHub Pages).
const configSrc = readFileSync('src/config/siteConfig.ts', 'utf8');
const siteUrl = /siteUrl:\s*'([^']+)'/.exec(configSrc)?.[1] ?? 'http://localhost/';
const base = new URL(siteUrl).pathname.replace(/\/$/, '');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

async function tryFile(path) {
  try {
    const s = await stat(path);
    if (s.isFile()) return path;
    if (s.isDirectory()) return tryFile(join(path, 'index.html'));
  } catch {
    /* not found */
  }
  return null;
}

createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (base && pathname.startsWith(base)) pathname = pathname.slice(base.length) || '/';
  const target = normalize(join(root, pathname));
  const file = target.startsWith(root) ? await tryFile(target) : null;
  if (file) {
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } else {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(join(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(port, () => console.log(`Static preview: http://localhost:${port}${base}/`));
