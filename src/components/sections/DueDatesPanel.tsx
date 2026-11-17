import { useMemo, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { daysUntil, upcomingDueDates } from '../../utils/complianceCalendar';

const fmt = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short' });
const pad = (n: number) => String(n).padStart(2, '0');
/** Local calendar date as YYYY-MM-DD (toISOString would shift it to UTC). */
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** A register-style panel listing the next statutory due dates, computed from today's date. */
export default function DueDatesPanel({ date }: { date?: Date }) {
  const [today] = useState(() => date ?? new Date());
  const items = useMemo(() => upcomingDueDates(today, 4), [today]);
  return (
    <aside aria-labelledby="due-dates-title" className="w-full rounded-md border border-white/10 bg-navy-950/60 p-5 shadow-panel sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <h2 id="due-dates-title" className="flex items-center gap-2 font-sans text-[14px] font-medium !text-white">
          <CalendarClock className="h-4 w-4 text-gold-300" aria-hidden="true" />
          Upcoming statutory due dates
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-navy-100/60">Live</span>
      </div>
      <ol className="divide-y divide-white/10">
        {items.map((d) => {
          const days = daysUntil(d.date, today);
          return (
            <li key={`${d.title}-${d.date.toISOString()}`} className="grid grid-cols-[64px_1fr_auto] items-baseline gap-3 py-3.5">
              <time dateTime={isoDate(d.date)}className="font-mono text-[14px] tabular-nums text-gold-300">
                {fmt.format(d.date)}
              </time>
              <span className="flex min-w-0 flex-col">
                <span className="text-[14.5px] text-white">{d.title}</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-navy-100/50">{d.reference}</span>
              </span>
              <span className="whitespace-nowrap text-[12.5px] tabular-nums text-navy-100/70">
                {days === 0 ? 'Today' : `in ${days} day${days === 1 ? '' : 's'}`}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-[12px] leading-snug text-navy-100/50">
        General due dates for regular cases. Dates are often extended by government notification, so confirm before relying on them.
      </p>
    </aside>
  );
}
