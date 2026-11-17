import { siteConfig } from '../config/siteConfig';

/** Live address of the site, e.g. https://example.netlify.app (no trailing slash). */
export const SITE_URL = siteConfig.siteUrl.replace(/\/$/, '');

/** Path prefix the site is served under: '/' normally, '/<repo>/' on a GitHub Pages project site. */
export const BASE_PATH = import.meta.env.BASE_URL;

/** Router basename without the trailing slash ('' at the domain root). */
export const ROUTER_BASENAME = BASE_PATH.replace(/\/$/, '');

/** Turns '/images/x.jpg' from siteConfig into a URL that works under BASE_PATH. External URLs pass through. */
export function asset(path: string): string {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.replace(/^\//, '')}`;
}

/** Full public URL for a page path, matching how static hosts serve folders (trailing slash). */
export function pageUrl(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? `${SITE_URL}/` : `${SITE_URL}${clean}/`;
}
