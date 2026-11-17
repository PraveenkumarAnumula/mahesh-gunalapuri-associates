import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { SITE_URL } from '../../utils/env';

interface SeoProps {
  /** Page-specific title. The firm name is appended automatically. */
  title?: string;
  description?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

export default function Seo({ title, description, noindex = false, type = 'website', jsonLd }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | ${siteConfig.firm.name}` : siteConfig.seo.defaultTitle;
  const desc = description ?? siteConfig.seo.defaultDescription;
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  const image = `${SITE_URL}${siteConfig.seo.ogImage}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={siteConfig.seo.keywords} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
