import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}

/** Navy band that opens every inner page, with breadcrumbs. */
export default function PageHeader({ eyebrow, title, intro, crumbs = [], children }: Props) {
  return (
    <header className="ledger-lines bg-navy-900 text-white">
      <div className="container-page flex flex-col gap-5 py-14 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-navy-100/70">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow-on-dark">{eyebrow}</p>
        <h1 className="max-w-3xl text-[36px] font-semibold leading-[1.1] !text-white sm:text-[48px]">{title}</h1>
        {intro && <p className="max-w-2xl text-[17px] text-navy-100/80">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
