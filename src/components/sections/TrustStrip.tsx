import { siteConfig } from '../../config/siteConfig';

export default function TrustStrip() {
  const qualitative = [
    { value: 'CA-led', label: 'Professional expertise', note: 'Work led and reviewed by a Chartered Accountant' },
    { value: 'On time', label: 'Commitment to compliance', note: 'Due dates tracked for every client engagement' },
  ];
  // With four or more real figures, the row is full; the qualitative items fill in when there are fewer.
  const extras = qualitative.slice(0, Math.max(0, 4 - siteConfig.stats.length));
  return (
    <section aria-label="At a glance" className="border-b border-line bg-white">
      <dl className="container-page grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
        {siteConfig.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5 px-2 py-8 lg:px-8">
            <dt className="order-2 text-[14px] text-slate">{s.label}</dt>
            <dd className="order-1 flex flex-wrap items-center gap-2 font-display text-[34px] font-semibold tabular-nums text-navy-900">
              {s.value}
              {s.isSample && <span className="sample-tag">Sample figure</span>}
            </dd>
          </div>
        ))}
        {extras.map((q) => (
          <div key={q.label} className="flex flex-col gap-1.5 px-2 py-8 lg:px-8">
            <dt className="order-2 text-[14px] text-slate">
              {q.label}
              <span className="block text-[12.5px] text-slate-soft">{q.note}</span>
            </dt>
            <dd className="order-1 font-display text-[34px] font-semibold text-navy-900">{q.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
