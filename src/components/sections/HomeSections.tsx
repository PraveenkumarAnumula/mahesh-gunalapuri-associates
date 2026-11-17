import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { ButtonLink } from '../common/Button';
import Icon from '../common/Icon';
import Portrait from '../common/Portrait';
import { siteConfig } from '../../config/siteConfig';
import { services } from '../../content/services';
import { approachSteps } from '../../content/approach';

export function AboutIntro() {
  const { firm, values } = siteConfig;
  return (
    <section aria-labelledby="about-intro" className="bg-white py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">About the firm</p>
          <h2 id="about-intro" className="text-[30px] font-semibold leading-[1.15] sm:text-[38px]">
            A practice built on accuracy, clarity and accountability.
          </h2>
          <p className="text-[17px] text-slate">{firm.introduction}</p>
          <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-wider !text-gold-700">Mission</h3>
              <p className="text-[15px] text-slate">{firm.mission}</p>
            </div>
            <div>
              <h3 className="mb-2 font-sans text-[13px] font-semibold uppercase tracking-wider !text-gold-700">Vision</h3>
              <p className="text-[15px] text-slate">{firm.vision}</p>
            </div>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 text-[15px] font-medium text-navy-800 hover:text-navy-900">
            More about the firm <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-md bg-mist p-6 sm:p-8">
          <h3 className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-wider !text-navy-800">Our professional values</h3>
          <dl className="flex flex-col divide-y divide-line">
            {values.map((v) => (
              <div key={v.title} className="grid gap-1 py-4 sm:grid-cols-[140px_1fr] sm:gap-6">
                <dt className="font-display text-[19px] font-semibold text-navy-900">{v.title}</dt>
                <dd className="text-[15px] text-slate">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  const featured = services.filter((s) => s.featured);
  return (
    <section aria-labelledby="services-overview" className="bg-mist py-20 sm:py-24">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="eyebrow">Our services</p>
            <h2 id="services-overview" className="text-[30px] font-semibold leading-[1.15] sm:text-[38px]">
              Tax, compliance and accounting under one roof.
            </h2>
          </div>
          <ButtonLink to="/services" variant="secondary" className="self-start md:self-auto">
            View all services
          </ButtonLink>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <li key={s.id} className="bg-white">
              <Link to={`/services#${s.id}`} className="group flex h-full flex-col gap-4 p-6 hover:bg-navy-50">
                <Icon name={s.icon} className="h-7 w-7 text-gold-700" />
                <h3 className="font-display text-[19px] font-semibold leading-snug">{s.cardTitle}</h3>
                <p className="flex-1 text-[14.5px] text-slate">{s.short}</p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-navy-800">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const reasons = [
  { title: 'Professional expertise', text: 'Engagements are led by a qualified Chartered Accountant who reviews the work personally.' },
  { title: 'Client-focused approach', text: 'Advice is shaped around your situation and goals, not a one-size-fits-all checklist.' },
  { title: 'Transparent communication', text: 'Clear scope and fees agreed upfront, and regular updates on where your work stands.' },
  { title: 'Timely compliance', text: 'Due dates are tracked in advance, so filings are prepared without last-minute pressure.' },
  { title: 'Reliable financial guidance', text: 'Recommendations are documented with their reasoning, so you can decide with confidence.' },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-us" className="bg-white py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Why choose us"
          title="What clients can expect from working with us."
          intro="Five commitments that shape every engagement, from a single tax return to a full audit."
        />
        <ol className="flex flex-col">
          {reasons.map((r) => (
            <li key={r.title} className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-0">
              <Check className="mt-1 h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
              <div>
                <h3 className="font-display text-[19px] font-semibold">{r.title}</h3>
                <p className="mt-1 text-[15px] text-slate">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FounderIntro() {
  const { founder } = siteConfig;
  return (
    <section aria-labelledby="founder-intro" className="bg-mist py-20 sm:py-24">
      <div className="container-page grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="mx-auto w-full max-w-sm">
          <Portrait />
        </div>
        <div className="flex flex-col gap-5">
          <p className="eyebrow">Meet the founder</p>
          <h2 id="founder-intro" className="text-[30px] font-semibold leading-[1.15] sm:text-[38px]">{founder.name}</h2>
          <p className="text-[15px] font-medium text-navy-800">{founder.designation}</p>
          <ul className="flex flex-col gap-1.5 text-[15px] text-slate">
            {founder.qualifications.slice(0, 2).map((q) => (
              <li key={q} className="flex gap-2"><span aria-hidden="true" className="text-gold-700">—</span>{q}</li>
            ))}
            <li className="flex gap-2"><span aria-hidden="true" className="text-gold-700">—</span>{founder.experienceSummary}</li>
          </ul>
          <p className="max-w-prose text-[16px] text-slate">{founder.shortBio}</p>
          <div>
            <ButtonLink to="/ca-profile">View Full Profile <ArrowRight className="h-4 w-4" aria-hidden="true" /></ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section aria-labelledby="approach" className="bg-white py-20 sm:py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading eyebrow="Our approach" title="Four steps, every engagement." />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {approachSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-3 border-t-2 border-navy-900 pt-5">
              <span className="font-mono text-[13px] text-gold-700">Step {i + 1}</span>
              <h3 className="font-display text-[22px] font-semibold">{s.title}</h3>
              <p className="text-[15px] text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { testimonials } = siteConfig;
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials" className="bg-mist py-20 sm:py-24">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading eyebrow="Client feedback" title="What our clients say." />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="flex flex-col gap-4 rounded-md border border-line bg-white p-6">
              <blockquote className="text-[16px] text-ink">“{t.quote}”</blockquote>
              <p className="text-[14px] text-slate"><span className="font-medium text-navy-900">{t.name}</span>, {t.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBand({ title = `${siteConfig.firm.closingLine}.` }: { title?: string }) {
  return (
    <section aria-labelledby="cta-band" className="ledger-lines bg-navy-900">
      <div className="container-page flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 id="cta-band" className="text-[30px] font-semibold leading-[1.15] !text-white sm:text-[36px]">{title}</h2>
          <p className="text-[16.5px] text-navy-100/80">Tell us what you need help with. We will respond to discuss your requirement and next steps.</p>
        </div>
        <ButtonLink to="/contact" variant="gold" className="w-full shrink-0 md:w-auto">
          Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}
