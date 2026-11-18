import { CalendarClock } from 'lucide-react';

/** Fixed list of the usual statutory due dates. Plain text: nothing is calculated or fetched. */
const dates = [
  { when: '7th', title: 'TDS / TCS Deposit', note: 'Every Month, For The Previous Month' },
  { when: '11th', title: 'GSTR-1', note: 'Every Month, For Monthly Filers' },
  { when: '20th', title: 'GSTR-3B', note: 'Every Month, For Monthly Filers' },
  { when: '15th', title: 'Advance Tax Instalments', note: 'June, September, December And March' },
  { when: '31 Jul', title: 'Income Tax Return (ITR 1 & 2)', note: 'Every Year' },
  { when: '31 Aug', title: 'Income Tax Return (ITR 3 & 4)', note: 'Non-Audit Cases' },
];

export default function KeyDatesPanel() {
  return (
    <div role="region" aria-labelledby="key-dates-title" className="w-full rounded-md border border-white/10 bg-navy-950/60 p-5 shadow-panel sm:p-6">
      <h2 id="key-dates-title" className="flex items-center gap-2 pb-2 font-sans text-[14px] font-medium !text-white">
        <CalendarClock className="h-4 w-4 text-gold-300" aria-hidden="true" />
        Key compliance dates
      </h2>
      <ul className="flex flex-col gap-1">
        {dates.map((d) => (
          <li key={d.title} className="grid grid-cols-[72px_1fr] items-baseline gap-3 py-2.5">
            <span className="whitespace-nowrap font-mono text-[16.5px] font-semibold tabular-nums text-gold-300">{d.when}</span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[14.5px] text-white">{d.title}</span>
              <span className="text-[12.5px] text-navy-100/60">{d.note}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] leading-snug text-navy-100/50">
        Usual due dates for regular cases. The government sometimes extends them, so check with us before relying on a date.
      </p>
    </div>
  );
}
