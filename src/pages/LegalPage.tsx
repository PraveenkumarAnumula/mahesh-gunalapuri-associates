import type { ReactNode } from 'react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';

interface Props {
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}

/** Shared layout for the Privacy Policy and Terms pages. */
export default function LegalPage({ title, description, updated, sections }: Props) {
  return (
    <>
      <Seo title={title} description={description} />
      <PageHeader eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} crumbs={[{ label: title }]} />
      <div className="container-page py-14">
        <div className="mx-auto flex max-w-prose flex-col gap-8">
          <p className="rounded-md border border-dashed border-gold-500/70 bg-mist p-4 text-[14px] text-ink">
            Template text. Please have this page reviewed and adapted before the website is used for client enquiries.
          </p>
          {sections.map((s) => (
            <section key={s.heading} className="flex flex-col gap-3">
              <h2 className="text-[22px] font-semibold">{s.heading}</h2>
              <div className="flex flex-col gap-3 text-[16px] leading-[1.7] text-slate">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
