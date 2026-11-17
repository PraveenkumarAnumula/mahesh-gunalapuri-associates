import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import { siteConfig } from '../../config/siteConfig';
import { organizationSchema } from '../../utils/structuredData';

/** Scrolls to the top on page change, or to the #anchor when the URL has one. */
function useScrollManagement() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so lazily loaded pages have rendered their sections.
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
        else if (tries++ < 20) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);
}

export default function Layout() {
  useScrollManagement();
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
      </Helmet>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-navy-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      {siteConfig.showPreviewBanner && (
        <p className="bg-gold-300/40 px-4 py-1.5 text-center text-[12.5px] text-navy-900">
          Preview site: names, figures and contact details shown are placeholders.
        </p>
      )}
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
