/**
 * General statutory due dates under Indian tax law, used for the "Upcoming due dates" panel.
 * These are the usual dates for regular cases. The government can extend them by notification,
 * and the panel says so.
 */
export interface DueDate {
  date: Date;
  title: string;
  reference: string;
}

interface Rule {
  title: string;
  reference: string;
  /** Returns the occurrences of this rule in the given calendar year. */
  occurrences: (year: number) => Date[];
}

const monthly = (day: number) => (year: number) => Array.from({ length: 12 }, (_, m) => new Date(year, m, day));

const rules: Rule[] = [
  {
    title: 'TDS / TCS deposit for previous month',
    reference: 'Income-tax · monthly',
    // March deductions are due on 30 April instead of 7 April.
    occurrences: (y) => monthly(7)(y).filter((d) => d.getMonth() !== 3),
  },
  { title: 'TDS deposit for March', reference: 'Income-tax · annual', occurrences: (y) => [new Date(y, 3, 30)] },
  { title: 'GSTR-1 (monthly filers)', reference: 'GST · monthly', occurrences: monthly(11) },
  { title: 'GSTR-3B (monthly filers)', reference: 'GST · monthly', occurrences: monthly(20) },
  {
    title: 'Advance tax instalment',
    reference: 'Income-tax · quarterly',
    occurrences: (y) => [new Date(y, 2, 15), new Date(y, 5, 15), new Date(y, 8, 15), new Date(y, 11, 15)],
  },
  { title: 'ITR filing (non-audit cases)', reference: 'Income-tax · annual', occurrences: (y) => [new Date(y, 6, 31)] },
  { title: 'Tax audit report', reference: 'Income-tax · annual', occurrences: (y) => [new Date(y, 8, 30)] },
];

/** Returns the next `count` due dates on or after `from`, in date order. */
export function upcomingDueDates(from: Date, count = 4): DueDate[] {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const all: DueDate[] = [];
  for (const year of [start.getFullYear(), start.getFullYear() + 1]) {
    for (const rule of rules) {
      for (const date of rule.occurrences(year)) {
        if (date >= start) all.push({ date, title: rule.title, reference: rule.reference });
      }
    }
  }
  return all
    .sort((a, b) => a.date.getTime() - b.date.getTime() || a.title.localeCompare(b.title))
    .slice(0, count);
}

export function daysUntil(date: Date, from: Date): number {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((b - a) / 86_400_000);
}
