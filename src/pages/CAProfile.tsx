import { Award, BadgeCheck, Building2, GraduationCap, Linkedin } from 'lucide-react';
import Seo from '../components/common/Seo';
import Portrait from '../components/common/Portrait';
import { ButtonLink } from '../components/common/Button';
import { CtaBand } from '../components/sections/HomeSections';
import { siteConfig } from '../config/siteConfig';
import { isSet } from '../utils/contact';

export default function CAProfile() {
  const { founder, firm } = siteConfig;
  return (
    <>
      <Seo
        title={`${founder.name} — Chartered Accountant`}
        description={`Professional profile of ${founder.name}, ${founder.designation} at ${firm.name}: qualifications, experience and areas of specialisation.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: founder.name,
          jobTitle: founder.designation,
          worksFor: { '@type': 'Organization', name: firm.name },
          ...(isSet(founder.linkedinUrl) ? { sameAs: [founder.linkedinUrl] } : {}),
        }}
      />
      <header className="ledger-lines bg-navy-900">
        <div className="container-page grid items-end gap-10 pt-14 sm:pt-20 md:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="mx-auto w-full max-w-xs md:mx-0 md:translate-y-12">
            <Portrait priority className="border-4 border-white shadow-panel" />
          </div>
          <div className="flex flex-col gap-4 pb-12">
            <p className="eyebrow-on-dark">CA Profile · {firm.name}</p>
            <h1 className="text-[38px] font-semibold leading-[1.08] !text-white sm:text-[50px]">{founder.name}</h1>
            <p className="text-[17px] text-navy-100/85">{founder.designation}</p>
            <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-[14px]">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-navy-100/60">ICAI membership no.</dt>
                <dd className="font-mono tabular-nums text-white">{founder.icaiMembershipNo || 'To be added'}</dd>
              </div>
              {firm.frn && (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-navy-100/60">Firm Reg. No. (ICAI)</dt>
                  <dd className="font-mono tabular-nums text-white">{firm.frn}</dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-navy-100/60">Qualification</dt>
                <dd className="text-white">{founder.qualifications[0]}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3 pt-3">
              <ButtonLink to="/contact" variant="gold">Book a consultation</ButtonLink>
              {isSet(founder.linkedinUrl) ? (
                <a
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-[15px] font-medium text-white hover:border-white/70"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn profile
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-14 pb-20 pt-24 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
        <div className="flex min-w-0 flex-col gap-14">
          {founder.fullBio.length > 0 && (
            <section aria-labelledby="bio" className="flex flex-col gap-4">
              <h2 id="bio" className="text-[28px] font-semibold">Biography</h2>
              {founder.fullBio.map((p) => (
                <p key={p} className="max-w-prose text-[16.5px] text-slate">{p}</p>
              ))}
            </section>
          )}

          <section aria-labelledby="experience" className="flex flex-col gap-6">
            <h2 id="experience" className="text-[28px] font-semibold">Professional experience</h2>
            <ol className="flex flex-col border-l border-line">
              {founder.experience.map((e) => (
                <li key={e.role + e.period} className="relative flex flex-col gap-1 pb-8 pl-6 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-gold-500" />
                  <span className="font-mono text-[12.5px] tabular-nums text-gold-700">{e.period}</span>
                  <h3 className="font-display text-[19px] font-semibold">{e.role}</h3>
                  <p className="text-[14.5px] font-medium text-navy-800">{e.organisation}</p>
                  <p className="text-[15px] text-slate">{e.summary}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="specialisation" className="flex flex-col gap-5">
            <h2 id="specialisation" className="text-[28px] font-semibold">Areas of specialisation</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {founder.specializations.map((s) => (
                <li key={s} className="flex items-start gap-3 rounded-md border border-line p-4 text-[15px]">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />{s}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="philosophy" className="rounded-md bg-mist p-8">
            <h2 id="philosophy" className="eyebrow mb-3 !font-mono">Professional philosophy</h2>
            <blockquote className="font-display text-[22px] leading-snug text-navy-900">“{founder.philosophy}”</blockquote>
            <p className="mt-4 text-[14px] text-slate">— {founder.name}</p>
          </section>
        </div>

        <aside className="flex flex-col gap-8">
          <ProfileList icon={<GraduationCap className="h-5 w-5" />} title="Qualifications" items={founder.qualifications} />
          {founder.industries.length > 0 && (
            <ProfileList icon={<Building2 className="h-5 w-5" />} title="Industry experience" items={founder.industries} />
          )}
          {founder.achievements.length > 0 && (
            <ProfileList icon={<Award className="h-5 w-5" />} title="Professional achievements" items={founder.achievements} />
          )}
        </aside>
      </div>
      <CtaBand title={`Speak with ${founder.name}.`} />
    </>
  );
}

function ProfileList({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <section className="rounded-md border border-line p-6">
      <h2 className="mb-4 flex items-center gap-2.5 font-sans text-[14px] font-semibold uppercase tracking-wider !text-navy-900">
        <span className="text-gold-700" aria-hidden="true">{icon}</span>
        {title}
      </h2>
      <ul className="flex flex-col divide-y divide-line text-[15px] text-slate">
        {items.map((i, idx) => (
          <li key={`${idx}-${i}`} className="py-2.5 first:pt-0 last:pb-0">{i}</li>
        ))}
      </ul>
    </section>
  );
}
