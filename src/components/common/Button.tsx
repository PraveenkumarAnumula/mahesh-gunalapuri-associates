import { Link, type LinkProps } from 'react-router-dom';

/**
 * primary: navy button for light backgrounds.
 * gold / light: for navy backgrounds (gold for the main action, white for the second one).
 * Styles live in src/styles/index.css (.btn, .btn-*), so every button on the site matches.
 * Class names are written out in full: Tailwind drops styles whose names are built from pieces.
 */
const variants = {
  primary: 'btn btn-primary',
  gold: 'btn btn-gold',
  light: 'btn btn-light',
} as const;

export function ButtonLink({ variant = 'primary', className = '', ...props }: LinkProps & { variant?: keyof typeof variants }) {
  return <Link className={`${variants[variant]} ${className}`} {...props} />;
}
