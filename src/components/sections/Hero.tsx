import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../common/Button';
import DueDatesPanel from './DueDatesPanel';
import { siteConfig } from '../../config/siteConfig';

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="hero-title" className="ledger-lines relative overflow-hidden bg-navy-900 text-white">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <p className="eyebrow-on-dark">{siteConfig.firm.tagline} · Nalgonda</p>
          <h1 id="hero-title" className="text-[38px] font-semibold leading-[1.08] !text-white sm:text-[52px] lg:text-[58px]">
            Your trusted partner in taxation, compliance &amp; financial advisory.
          </h1>
          <p className="max-w-xl text-[17.5px] text-navy-100/80">
            {siteConfig.firm.slogan}. ITR filing, GST, business registrations, licences and loan assistance, handled with care and filed
            on time. {siteConfig.firm.subSlogan}.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink to="/contact" variant="gold">
              Schedule a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/services" variant="ghost-light">
              Explore Our Services
            </ButtonLink>
          </div>
        </motion.div>
        <DueDatesPanel />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gold-500/40" />
    </section>
  );
}
