import { CalendarClock } from 'lucide-react';

/** Fixed list of the usual statutory due dates. Plain text: nothing is calculated or fetched. */
const dates = [
  { when: '7th', title: 'TDS / TCS deposit', note: 'Every month, for the previous month' },
  { when: '11th', title: 'GSTR-1', note: 'Every month, for monthly filers' },
  { when: '20th', title: 'GSTR-3B', note: 'Every month, for monthly filers' },
  { when: '15th', title: 'Advance tax instalments', note: 'June, September, December and March' },
  { when: '31 Jul', title: 'Income tax return', note: 'Non-audit cases' },
];

export default function KeyDatesPanel() {
  return (
    <aside aria-labelledby="key-dates-title" className="w-full rounded-md border border-white/10 bg-navy-950/60 p-5 shadow-panel sm:p-6">
      <h2 id="key-dates-title" className="flex items-center gap-2 border-b border-white/10 pb-4 font-sans text-[14px] font-medium !text-white">
        <CalendarClock className="h-4 w-4 text-gold-300" aria-hidden="true" />
        Key compliance dates
      </h2>
      <ul className="divide-y divide-white/10">
        {dates.map((d) => (
          <li key={d.title} className="grid grid-cols-[64px_1fr] items-baseline gap-3 py-3.5">
            <span className="font-mono text-[14px] tabular-nums text-gold-300">{d.when}</span>
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
    </aside>
  );
}
