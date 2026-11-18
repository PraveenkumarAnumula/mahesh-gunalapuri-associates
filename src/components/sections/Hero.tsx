import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../common/Button';
import KeyDatesPanel from './KeyDatesPanel';
import { siteConfig } from '../../config/siteConfig';

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-900 text-white">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <p className="eyebrow-on-dark">{siteConfig.firm.tagline} · Nalgonda</p>
          <h1 id="hero-title" className="text-[clamp(31px,9vw,38px)] font-semibold leading-[1.1] !text-white sm:text-[52px] lg:text-[58px]">
            Your trusted partner in taxation, compliance &amp; financial advisory.
          </h1>
          <p className="max-w-xl text-[17.5px] text-navy-100/80">
            {siteConfig.firm.slogan}. ITR filing, GST, business registrations and licences, handled with care and filed on
            time. {siteConfig.firm.subSlogan}.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink to="/contact" variant="gold">
              Schedule a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/services" variant="light">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
        <KeyDatesPanel />
      </div>
    </section>
  );
}
