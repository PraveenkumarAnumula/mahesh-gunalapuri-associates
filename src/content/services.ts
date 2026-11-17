/**
 * SERVICES
 * Each entry renders as a section on /services (anchor: /services#<id>) and,
 * when `featured` is true, as a card on the home page.
 * `icon` must be one of the names in src/components/common/Icon.tsx.
 * Keep this file free of React imports; the build reads it for the sitemap.
 */
export interface Service {
  id: string;
  icon: string;
  title: string;
  /** Shorter title used on home-page cards. */
  cardTitle: string;
  short: string;
  details: string[];
  includes: string[];
  forWhom: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    id: 'income-tax',
    icon: 'receipt',
    title: 'Income Tax Services',
    cardTitle: 'Income Tax Advisory & Filing',
    short: 'Return filing, computation and advisory for individuals, firms and companies.',
    details: [
      'We prepare and file income tax returns after reviewing your income sources, deductions and tax credits against Form 26AS and the Annual Information Statement (AIS), so that what you report matches what the department already sees.',
      'Where notices or intimations arrive, we review them, explain what is being asked, and help prepare a clear, documented response.',
    ],
    includes: [
      'ITR preparation and e-filing',
      'Choice between old and new tax regimes',
      'Advance tax and TDS computation',
      'Responses to notices and intimations',
      'Capital gains computation',
    ],
    forWhom: ['Salaried individuals', 'Professionals and freelancers', 'Proprietors and partnership firms', 'Companies and LLPs', 'NRIs with Indian income'],
    featured: true,
  },
  {
    id: 'gst',
    icon: 'landmark',
    title: 'GST Services',
    cardTitle: 'GST Registration & Compliance',
    short: 'Registration, periodic returns, reconciliations and GST advisory.',
    details: [
      'From registration to monthly and annual returns, we handle GST compliance with regular reconciliation of input tax credit against GSTR-2B, so mismatches are caught early.',
      'We also advise on classification, place of supply and transaction structure where the GST treatment is not straightforward.',
    ],
    includes: ['GST registration and amendments', 'GSTR-1, GSTR-3B and annual returns', 'Input tax credit reconciliation', 'E-invoicing and e-way bill guidance', 'Replies to GST notices'],
    forWhom: ['Traders and retailers', 'Manufacturers', 'Service providers', 'E-commerce sellers', 'Businesses crossing the registration threshold'],
    featured: true,
  },
  {
    id: 'tax-planning',
    icon: 'compass',
    title: 'Tax Planning and Advisory',
    cardTitle: 'Tax Planning & Advisory',
    short: 'Lawful, documented planning that keeps your tax position efficient.',
    details: [
      'Tax planning works best before the year ends. We review your income, investments and business structure and recommend options available under the law, with the trade-offs explained clearly.',
      'Our advice is documented, so you understand the reasoning and have it on record.',
    ],
    includes: ['Year-round tax planning reviews', 'Salary structuring guidance', 'Investment and deduction planning', 'Tax impact of major transactions', 'Succession and family arrangement inputs'],
    forWhom: ['High-income individuals', 'Business owners', 'Professionals', 'Families planning major transactions'],
    featured: true,
  },
  {
    id: 'accounting',
    icon: 'book',
    title: 'Accounting and Bookkeeping',
    cardTitle: 'Accounting & Bookkeeping',
    short: 'Accurate books, monthly closes and reports you can act on.',
    details: [
      'We maintain books of account on the software you prefer, reconcile bank and ledger balances, and close each month so that your numbers are ready when you need them.',
      'Monthly or quarterly MIS reports give you a clear view of revenue, costs and cash position.',
    ],
    includes: ['Bookkeeping and ledger maintenance', 'Bank and vendor reconciliations', 'Payroll accounting support', 'Monthly MIS reports', 'Year-end finalisation'],
    forWhom: ['Small and medium businesses', 'Startups', 'Professional firms', 'Trusts and societies'],
    featured: true,
  },
  {
    id: 'audit',
    icon: 'search',
    title: 'Internal and Statutory Auditing',
    cardTitle: 'Statutory & Internal Auditing',
    short: 'Independent audits that strengthen controls and credibility.',
    details: [
      'Statutory and tax audits are carried out in line with the applicable Standards on Auditing and the relevant law, with clear communication throughout the engagement.',
      'Internal audits focus on your processes and controls, and end with practical recommendations ranked by risk.',
    ],
    includes: ['Statutory audit', 'Tax audit under the Income-tax Act', 'Internal audit and process reviews', 'Stock and fixed-asset verification', 'Internal financial controls review'],
    forWhom: ['Companies', 'LLPs and partnership firms', 'Businesses subject to tax audit', 'Trusts, societies and NGOs'],
    featured: true,
  },
  {
    id: 'business-advisory',
    icon: 'briefcase',
    title: 'Business Advisory',
    cardTitle: 'Business Advisory',
    short: 'Practical guidance on structure, growth and financial decisions.',
    details: [
      'We help owners think through decisions such as choosing a business structure, entering a new market, or adding a partner, with attention to the tax and compliance consequences of each option.',
    ],
    includes: ['Choice of business entity', 'Business plan and projection reviews', 'Pricing and margin analysis', 'Compliance health checks'],
    forWhom: ['Founders and first-time entrepreneurs', 'Family-owned businesses', 'Growing SMEs'],
    featured: false,
  },
  {
    id: 'company-llp-registration',
    icon: 'building',
    title: 'Company and LLP Registration',
    cardTitle: 'Business Registration & Compliance',
    short: 'Help setting up the right entity and the registrations that go with it.',
    details: [
      'We assist with incorporating private limited companies, LLPs, one-person companies and partnership firms, along with the PAN, TAN, GST and other registrations a new business usually needs.',
    ],
    includes: ['Private limited company incorporation', 'LLP incorporation', 'Partnership firm registration support', 'PAN, TAN and GST registration', 'MSME (Udyam) registration'],
    forWhom: ['New ventures', 'Proprietors converting to a company or LLP', 'Startups'],
    featured: true,
  },
  {
    id: 'financial-consulting',
    icon: 'chart',
    title: 'Financial Consulting',
    cardTitle: 'Financial Consulting',
    short: 'Budgets, projections and financial analysis for better decisions.',
    details: [
      'We prepare and review budgets, cash-flow forecasts and project reports, and help you understand what the numbers mean for your next decision.',
    ],
    includes: ['Budgeting and forecasting', 'Cash-flow management', 'Project reports for bank finance', 'Financial statement analysis', 'Working-capital reviews'],
    forWhom: ['Businesses seeking finance', 'Owners planning expansion', 'Management teams'],
    featured: true,
  },
  {
    id: 'roc-compliance',
    icon: 'shield',
    title: 'ROC and Regulatory Compliance',
    cardTitle: 'Corporate & Regulatory Compliance',
    short: 'Annual filings and event-based compliance under company and LLP law.',
    details: [
      'We track and complete annual filings with the Registrar of Companies and event-based forms such as changes in directors, capital or registered office, so that your entity remains in good standing.',
    ],
    includes: ['Annual returns and financial statement filing', 'Director KYC', 'Event-based ROC filings', 'LLP annual compliance', 'Statutory registers support'],
    forWhom: ['Private limited companies', 'LLPs', 'One-person companies'],
    featured: true,
  },
];

export const serviceOptions = services.map((s) => s.title);
