import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import Icon from '../components/common/Icon';
import { CtaBand } from '../components/sections/HomeSections';
import { expertise } from '../content/expertise';
import { services } from '../content/services';

export default function Expertise() {
  return (
    <>
      <Seo
        title="Our Expertise"
        description="Areas of professional expertise: individual and business taxation, GST compliance, financial reporting, audit and assurance, business structuring and regulatory compliance."
      />
      <PageHeader
        eyebrow="Our expertise"
        title="Areas of professional expertise"
        intro="The subjects we work in every day, across taxation, reporting, audit and compliance."
        crumbs={[{ label: 'Our Expertise' }]}
      />
      <section aria-label="Expertise areas" className="bg-mist py-16 sm:py-20">
        <ul className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e) => {
            const service = services.find((s) => s.id === e.serviceId);
            return (
              <li key={e.id} id={e.id} className="flex flex-col gap-4 rounded-md border border-line bg-white p-6">
                <Icon name={e.icon} className="h-7 w-7 text-gold-700" />
                <h2 className="text-[22px] font-semibold">{e.title}</h2>
                <p className="text-[15px] text-slate">{e.summary}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`${e.title} topics`}>
                  {e.topics.map((t) => (
                    <li key={t} className="rounded-sm bg-navy-50 px-2.5 py-1 font-mono text-[12px] text-navy-800">{t}</li>
                  ))}
                </ul>
                {service && (
                  <Link to={`/services#${service.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[14px] font-medium text-navy-800 hover:text-navy-900">
                    Related service: {service.title} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
