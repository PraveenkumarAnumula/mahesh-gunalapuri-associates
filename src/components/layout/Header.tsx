import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import { ButtonLink } from '../common/Button';
import { navRoutes } from '../../config/routes';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu; body scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap py-2 text-[14.5px] transition-colors ${
      isActive ? 'text-navy-900 font-medium after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold-500' : 'text-slate hover:text-navy-900'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden shrink-0 xl:block">
          <ul className="flex items-center gap-5 min-[1400px]:gap-7">
            {navRoutes.map((r) => (
              <li key={r.path}>
                <NavLink to={r.path} end={r.path === '/'} className={linkCls}>
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <ButtonLink to="/contact" className="hidden whitespace-nowrap !px-4 !py-2.5 !text-[14px] sm:inline-flex">
            Get Consultation
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line text-navy-900 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full h-[calc(100vh-72px)] overflow-y-auto overscroll-contain border-t border-line bg-white pb-[env(safe-area-inset-bottom)] supports-[height:100dvh]:h-[calc(100dvh-72px)] xl:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navRoutes.map((r) => (
                <li key={r.path} className="border-b border-line last:border-0">
                  <NavLink
                    to={r.path}
                    end={r.path === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 font-display text-[20px] ${isActive ? 'text-navy-900' : 'text-slate hover:text-navy-900'}`
                    }
                  >
                    {r.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-6">
                <ButtonLink to="/contact" className="w-full" onClick={() => setOpen(false)}>
                  Get Consultation
                </ButtonLink>
              </li>
            </ul>
          </nav>
        )}
    </header>
  );
}
