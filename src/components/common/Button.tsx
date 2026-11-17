import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost-light';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<Variant, string> = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-gold-500',
  secondary: 'border border-navy-900/20 bg-white text-navy-900 hover:border-navy-900/50 hover:bg-navy-50',
  gold: 'bg-gold-400 text-navy-950 hover:bg-gold-300',
  'ghost-light': 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
};

function buttonClass(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({ variant = 'primary', className = '', ...props }: LinkProps & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
