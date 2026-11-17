/** Route list shared by the navigation, footer and build-time sitemap. Keep this file free of React imports. */
export interface StaticRoute {
  path: string;
  label: string;
  inNav: boolean;
  inSitemap: boolean;
}

export const staticRoutes: StaticRoute[] = [
  { path: '/', label: 'Home', inNav: true, inSitemap: true },
  { path: '/about', label: 'About Us', inNav: true, inSitemap: true },
  { path: '/services', label: 'Our Services', inNav: true, inSitemap: true },
  { path: '/expertise', label: 'Our Expertise', inNav: true, inSitemap: true },
  { path: '/insights', label: 'Insights', inNav: true, inSitemap: true },
  { path: '/contact', label: 'Contact', inNav: true, inSitemap: true },
  { path: '/ca-profile', label: 'CA Profile', inNav: false, inSitemap: true },
  { path: '/privacy-policy', label: 'Privacy Policy', inNav: false, inSitemap: true },
  { path: '/terms', label: 'Terms & Conditions', inNav: false, inSitemap: true },
];

export const navRoutes = staticRoutes.filter((r) => r.inNav);
