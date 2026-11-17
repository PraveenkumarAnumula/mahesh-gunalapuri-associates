import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

/** Firm logo. Uses siteConfig.firm.logo if set, otherwise a text monogram. */
export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { firm } = siteConfig;
  const onLight = variant === 'dark';
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label={`${firm.name} — home`}>
      {firm.logo ? (
        <img src={firm.logo} alt="" className="h-10 w-auto" width={120} height={40} />
      ) : (
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 place-items-center rounded-sm border font-display text-[15px] font-semibold tracking-wide ${
            onLight ? 'border-navy-900 bg-navy-900 text-gold-300' : 'border-gold-400/60 text-gold-300'
          }`}
        >
          {firm.shortName}
        </span>
      )}
      <span className="flex flex-col leading-tight">
        <span className={`font-display text-[17px] font-semibold ${onLight ? 'text-navy-900' : 'text-white'}`}>{firm.name}</span>
        <span className={`font-mono text-[10.5px] uppercase tracking-[0.16em] ${onLight ? 'text-gold-700' : 'text-gold-300'}`}>
          {firm.tagline}
        </span>
      </span>
    </Link>
  );
}
