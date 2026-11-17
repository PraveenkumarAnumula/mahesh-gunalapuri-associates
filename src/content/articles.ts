/**
 * ARTICLES (Insights)
 * ----------------------------------------------------------------------------
 * To publish a new article, copy one object below, give it a unique `slug`
 * (lowercase, hyphens only — it becomes the URL /insights/<slug>), fill in the
 * fields and save. Newest dates appear first automatically. The sitemap picks
 * up new articles at the next build.
 *
 * `body` is a list of blocks:
 *   { type: 'p', text: '...' }             paragraph
 *   { type: 'h2', text: '...' }            sub-heading
 *   { type: 'ul', items: ['...', '...'] }  bullet list
 *   { type: 'note', text: '...' }          highlighted note
 *
 * Set `isDemo: false` for real articles. Demo articles carry a visible
 * "Demonstration content" label. Delete them once real articles exist.
 * Keep this file free of React imports; the build reads it for the sitemap.
 * ----------------------------------------------------------------------------
 */

export type ArticleCategory =
  | 'Income Tax Updates'
  | 'GST Notifications'
  | 'Financial Planning'
  | 'Compliance Reminders'
  | 'Business Advisory';

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string };

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  /** ISO date, e.g. '2026-11-02'. */
  date: string;
  readMinutes: number;
  excerpt: string;
  isDemo: boolean;
  body: ArticleBlock[];
}

export const articleCategories: ArticleCategory[] = [
  'Income Tax Updates',
  'GST Notifications',
  'Financial Planning',
  'Compliance Reminders',
  'Business Advisory',
];

export const articles: Article[] = [
  {
    slug: 'choosing-between-old-and-new-tax-regime',
    title: 'Choosing between the old and new tax regimes',
    category: 'Income Tax Updates',
    date: '2026-11-02',
    readMinutes: 5,
    excerpt: 'A practical way to compare the two regimes using your own deductions, before you commit for the year.',
    isDemo: true,
    body: [
      { type: 'p', text: 'Every year, individual taxpayers can choose between the new tax regime, which is the default, and the old regime, which allows a wider range of deductions and exemptions. The right choice depends on your income and on the deductions you actually claim.' },
      { type: 'h2', text: 'Start with what you already claim' },
      { type: 'p', text: 'List the deductions you claimed last year, such as investments under Section 80C, health insurance premiums, home-loan interest and HRA exemption. If the total is small, the new regime is often simpler and cheaper.' },
      { type: 'ul', items: ['Compute tax under both regimes using the same income figures', 'Include surcharge and cess in both computations', 'Check whether salary-related exemptions apply to you'] },
      { type: 'note', text: 'This is demonstration content. Slabs, rebates and deductions change with each Finance Act. Confirm the current rules before deciding.' },
    ],
  },
  {
    slug: 'reconciling-input-tax-credit-with-gstr-2b',
    title: 'Why monthly ITC reconciliation with GSTR-2B matters',
    category: 'GST Notifications',
    date: '2026-10-18',
    readMinutes: 4,
    excerpt: 'Small mismatches between your purchase register and GSTR-2B add up. A monthly routine keeps them in check.',
    isDemo: true,
    body: [
      { type: 'p', text: 'Input tax credit can generally be claimed only when it appears in your GSTR-2B. Comparing your purchase register with GSTR-2B every month shows which suppliers have not filed or have reported invoices incorrectly.' },
      { type: 'h2', text: 'A simple monthly routine' },
      { type: 'ul', items: ['Download GSTR-2B once it is generated', 'Match invoices by supplier GSTIN, invoice number and tax amount', 'Follow up with suppliers on missing or mismatched invoices', 'Record the reconciliation for audit trail'] },
      { type: 'note', text: 'This is demonstration content and not advice on any specific notification.' },
    ],
  },
  {
    slug: 'advance-tax-instalments-explained',
    title: 'Advance tax instalments: dates and how to estimate',
    category: 'Compliance Reminders',
    date: '2026-09-05',
    readMinutes: 3,
    excerpt: 'If your tax liability for the year is above the threshold, advance tax is due in instalments through the year.',
    isDemo: true,
    body: [
      { type: 'p', text: 'Advance tax is generally payable in four instalments: by 15 June, 15 September, 15 December and 15 March, each covering a cumulative share of the estimated tax for the year.' },
      { type: 'p', text: 'Estimating income early, and revising the estimate each quarter, helps you avoid interest for short payment or deferment.' },
      { type: 'note', text: 'This is demonstration content. Thresholds, percentages and exceptions are set by law; confirm them for the current year.' },
    ],
  },
  {
    slug: 'building-an-emergency-fund-for-your-business',
    title: 'Planning cash reserves for a small business',
    category: 'Financial Planning',
    date: '2026-08-21',
    readMinutes: 4,
    excerpt: 'How many months of fixed costs should a small business keep in reserve, and where should it sit?',
    isDemo: true,
    body: [
      { type: 'p', text: 'A cash reserve gives a business time to respond when collections slow down or costs rise unexpectedly. A common starting point is to estimate monthly fixed costs and decide how many months of cover the business needs.' },
      { type: 'ul', items: ['List fixed monthly costs: rent, salaries, loan instalments, subscriptions', 'Decide a target number of months of cover', 'Keep the reserve separate from the operating account'] },
      { type: 'note', text: 'This is demonstration content for layout purposes.' },
    ],
  },
  {
    slug: 'proprietorship-llp-or-private-limited',
    title: 'Proprietorship, LLP or private limited company?',
    category: 'Business Advisory',
    date: '2026-07-30',
    readMinutes: 6,
    excerpt: 'The structure you choose affects liability, tax, compliance cost and how easily you can raise funds.',
    isDemo: true,
    body: [
      { type: 'p', text: 'Each business structure has trade-offs. A proprietorship is simple to start but offers no separation between the owner and the business. LLPs and private limited companies offer limited liability, with more compliance.' },
      { type: 'h2', text: 'Questions to ask before deciding' },
      { type: 'ul', items: ['Do you plan to raise equity investment?', 'How many owners will there be?', 'What compliance cost can the business carry?', 'How do you expect to take profits out?'] },
      { type: 'note', text: 'This is demonstration content and not advice for any particular business.' },
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
