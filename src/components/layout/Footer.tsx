import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import ContactDetails from '../common/ContactDetails';
import SocialLinks from '../common/SocialLinks';
import { navRoutes } from '../../config/routes';
import { siteConfig } from '../../config/siteConfig';
import { services } from '../../content/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Logo variant="light" />
          <p className="max-w-xs text-[14.5px] text-navy-100/70">{siteConfig.firm.description}</p>
          <SocialLinks />
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow-on-dark mb-4 !font-mono">Quick links</h2>
          <ul className="flex flex-col gap-2.5 text-[14.5px]">
            {[...navRoutes, { path: '/ca-profile', label: 'CA Profile' }].map((r) => (
              <li key={r.path}>
                <Link to={r.path} className="text-navy-100/80 hover:text-white">{r.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow-on-dark mb-4 !font-mono">Services</h2>
          <ul className="flex flex-col gap-2.5 text-[14.5px]">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="text-navy-100/80 hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow-on-dark mb-4 !font-mono">Contact</h2>
          <ContactDetails onDark showHours={false} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-navy-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.firm.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
