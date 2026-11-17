import { siteConfig } from '../../config/siteConfig';
import { asset } from '../../utils/site';

/** Founder photo from siteConfig.founder.photo, or a neutral placeholder until one is supplied. */
/** `priority` loads the photo immediately (use it where the photo is at the top of the page). */
export default function Portrait({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  const { founder } = siteConfig;
  if (founder.photo) {
    return (
      <img
        src={asset(founder.photo)}
        alt={founder.photoAlt}
        loading={priority ? 'eager' : 'lazy'}
        // Lower-case attribute: React 18 doesn't know the camelCase prop yet.
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        decoding="async"
        width={480}
        height={600}
        className={`aspect-[4/5] w-full max-w-full rounded-sm object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label="Placeholder for the founder's professional photograph"
      className={`relative aspect-[4/5] w-full max-w-full overflow-hidden rounded-sm bg-navy-100 ${className}`}
    >
      <svg viewBox="0 0 240 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="240" height="300" fill="#E5EAF2" />
        <circle cx="120" cy="118" r="46" fill="#C9D2E1" />
        <path d="M30 300c6-62 44-96 90-96s84 34 90 96z" fill="#C9D2E1" />
      </svg>
      <span className="absolute bottom-3 left-3 sample-tag bg-white/80">Photo placeholder</span>
    </div>
  );
}
