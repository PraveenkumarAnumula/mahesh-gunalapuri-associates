import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { ButtonLink } from '../components/common/Button';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." noindex />
      <section className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-gold-700">Error 404</p>
        <h1 className="text-[40px] font-semibold leading-tight sm:text-[52px]">We couldn’t find that page.</h1>
        <p className="max-w-prose text-[17px] text-slate">
          The link may be out of date, or the address may have been typed incorrectly. These pages may help:
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <li><Link to="/services" className="text-navy-800 underline underline-offset-4">Our services</Link></li>
          <li><Link to="/insights" className="text-navy-800 underline underline-offset-4">Insights</Link></li>
          <li><Link to="/contact" className="text-navy-800 underline underline-offset-4">Contact us</Link></li>
        </ul>
        <ButtonLink to="/"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home</ButtonLink>
      </section>
    </>
  );
}
