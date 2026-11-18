import { siteConfig } from '../../config/siteConfig';

export default function TrustStrip() {
  const qualitative = [
    { value: 'CA-led', label: 'Professional expertise', note: 'Work led and reviewed by a Chartered Accountant' },
    { value: 'On time', label: 'Commitment to compliance', note: 'Due dates tracked for every client engagement' },
  ];
  // With four or more real figures, the row is full; the qualitative items fill in when there are fewer.
  const extras = qualitative.slice(0, Math.max(0, 4 - siteConfig.stats.length));
  return (
    <section aria-label="At a glance" className="bg-mist py-8 sm:py-10">
      {/* One bordered panel; the 1px gaps over a grey background draw a line between every figure, on all screen sizes. */}
      <div className="container-page">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line shadow-sm lg:grid-cols-4">
        {siteConfig.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5 bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
            <dt className="order-2 text-[14px] text-slate">{s.label}</dt>
            <dd className="order-1 flex flex-wrap items-center gap-2 font-display text-[30px] font-semibold tabular-nums text-navy-900 sm:text-[34px]">
              {s.value}
              {s.isSample && <span className="sample-tag">Sample figure</span>}
            </dd>
          </div>
        ))}
        {extras.map((q) => (
          <div key={q.label} className="flex flex-col gap-1.5 bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
            <dt className="order-2 text-[14px] text-slate">
              {q.label}
              <span className="block text-[12.5px] text-slate-soft">{q.note}</span>
            </dt>
            <dd className="order-1 font-display text-[34px] font-semibold text-navy-900">{q.value}</dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
