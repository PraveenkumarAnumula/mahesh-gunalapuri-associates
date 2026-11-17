import { ArrowRight } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import Portrait from '../components/common/Portrait';
import { ButtonLink } from '../components/common/Button';
import { CtaBand } from '../components/sections/HomeSections';
import { approachSteps } from '../content/approach';
import { siteConfig } from '../config/siteConfig';

export default function About() {
  const { firm, founder, values } = siteConfig;
  return (
    <>
      <Seo
        title="About Us"
        description={`Learn about ${firm.name}: our background, mission, values and how we work with individuals and businesses on tax and compliance.`}
      />
      <PageHeader eyebrow="About us" title={`About ${firm.name}`} intro={firm.introduction} crumbs={[{ label: 'About Us' }]} />

      <section aria-labelledby="history" className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Our story</p>
            <h2 id="history" className="text-[30px] font-semibold sm:text-[34px]">History and background</h2>
            {firm.established && <p className="text-[15px] text-slate">Established {firm.established}</p>}
          </div>
          <p className="max-w-prose text-[17px] text-slate">{firm.history}</p>
        </div>
      </section>

      <section aria-label="Mission and vision" className="bg-mist py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { label: 'Our mission', text: firm.mission },
            { label: 'Our vision', text: firm.vision },
          ].map((b) => (
            <div key={b.label} className="flex flex-col gap-4 rounded-md border border-line bg-white p-8">
              <h2 className="eyebrow !font-mono">{b.label}</h2>
              <p className="font-display text-[22px] leading-snug text-navy-900">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="values" className="py-20">
        <div className="container-page flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Core values</p>
            <h2 id="values" className="text-[30px] font-semibold sm:text-[34px]">The principles behind our work</h2>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-2 border-t border-line pt-5">
                <dt className="font-display text-[20px] font-semibold text-navy-900">{v.title}</dt>
                <dd className="text-[15px] text-slate">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="philosophy" className="ledger-lines bg-navy-900 py-20">
        <div className="container-page flex max-w-4xl flex-col gap-5">
          <p className="eyebrow-on-dark">Professional philosophy</p>
          <h2 id="philosophy" className="sr-only">Professional philosophy</h2>
          <p className="font-display text-[26px] leading-snug text-white sm:text-[32px]">{firm.philosophy}</p>
        </div>
      </section>

      <section aria-labelledby="founder" className="py-20">
        <div className="container-page grid items-center gap-12 md:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="mx-auto w-full max-w-xs"><Portrait /></div>
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Founder</p>
            <h2 id="founder" className="text-[30px] font-semibold sm:text-[34px]">{founder.name}</h2>
            <p className="text-[15px] font-medium text-navy-800">{founder.designation}</p>
            <p className="max-w-prose text-[16px] text-slate">{founder.shortBio}</p>
            <div><ButtonLink to="/ca-profile" variant="secondary">View Full Profile <ArrowRight className="h-4 w-4" aria-hidden="true" /></ButtonLink></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="serving" className="bg-mist py-20">
        <div className="container-page flex flex-col gap-10">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="eyebrow">How we serve clients</p>
            <h2 id="serving" className="text-[30px] font-semibold sm:text-[34px]">Our approach to every engagement</h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-2 border-t-2 border-navy-900 pt-5">
                <span className="font-mono text-[13px] text-gold-700">Step {i + 1}</span>
                <h3 className="font-display text-[21px] font-semibold">{s.title}</h3>
                <p className="text-[15px] text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
