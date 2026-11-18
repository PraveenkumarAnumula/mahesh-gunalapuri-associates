import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import Icon from '../components/common/Icon';
import { ButtonLink } from '../components/common/Button';
import { CtaBand } from '../components/sections/HomeSections';
import { services } from '../content/services';

export default function Services() {
  return (
    <>
      <Seo
        title="Our Services — Income Tax, GST, Audit & Accounting"
        description="Income tax filing, GST registration and returns, tax planning, accounting, audit, company and LLP registration, ROC compliance and financial consulting."
      />
      <PageHeader
        eyebrow="Our services"
        title="Services for individuals, professionals and businesses"
        intro="Each service below explains what is included and who it suits. If you are not sure which one you need, tell us your situation and we will guide you."
        crumbs={[{ label: 'Our Services' }]}
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[240px_1fr] lg:gap-16">
        <nav aria-label="Services on this page" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3">On this page</p>
          <ul className="swipe-row lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block whitespace-nowrap rounded-full border border-line px-3.5 py-2 text-[14px] text-slate hover:border-navy-700 hover:text-navy-900 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col">
          {services.map((s) => (
            <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="flex flex-col gap-6 border-b border-line py-12 first:pt-0 last:border-0">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy-900 sm:h-12 sm:w-12">
                  <Icon name={s.icon} className="h-6 w-6 text-gold-300" />
                </span>
                <div className="flex flex-col gap-1">
                  <h2 id={`${s.id}-title`} className="text-[23px] font-semibold leading-tight sm:text-[30px]">{s.title}</h2>
                  <p className="text-[16px] text-slate">{s.short}</p>
                </div>
              </div>
              <div className="flex max-w-prose flex-col gap-3">
                {s.details.map((d) => (
                  <p key={d} className="text-[16px] text-slate">{d}</p>
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-md bg-mist p-5">
                  <h3 className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-wider !text-navy-800">What’s included</h3>
                  <ul className="flex flex-col gap-2 text-[15px]">
                    {s.includes.map((i) => (
                      <li key={i} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-line p-5">
                  <h3 className="mb-3 font-sans text-[13px] font-semibold uppercase tracking-wider !text-navy-800">Who can benefit</h3>
                  <ul className="flex flex-wrap gap-2">
                    {s.forWhom.map((w) => (
                      <li key={w} className="rounded-full border border-line bg-white px-3 py-1 text-[13.5px] text-slate">{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <ButtonLink to={`/contact?service=${encodeURIComponent(s.title)}`} className="w-full sm:w-auto">
                  Enquire about {s.title.replace(/ Services$/, '')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
          ))}
          <p className="mt-4 text-[13.5px] text-slate-soft">
            Services are provided subject to applicable professional regulations and the scope agreed in each engagement letter.
            See our <Link to="/terms" className="link">Terms &amp; Conditions</Link>.
          </p>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
