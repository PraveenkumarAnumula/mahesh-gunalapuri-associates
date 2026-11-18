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
  /** false hides the service from the footer list. Default: shown. */
  inFooter?: boolean;
}

export const services: Service[] = [
  {
    id: 'itr-filing',
    icon: 'receipt',
    title: 'ITR Filing',
    cardTitle: 'ITR Filing',
    short: 'Income tax return filing and tax compliance.',
    details: [
      'We prepare and file income tax returns after reviewing your income, deductions and taxes already paid against Form 26AS and the Annual Information Statement (AIS), so that what you report matches what the department already sees.',
      'We also help with advance tax, TDS, refunds and replies to notices and intimations from the Income Tax Department.',
    ],
    includes: [
      'ITR preparation and e-filing',
      'Choice between old and new tax regimes',
      'Advance tax and TDS computation',
      'Refund follow-up',
      'Replies to notices and intimations',
    ],
    forWhom: ['Salaried individuals', 'Professionals and freelancers', 'Proprietors and partnership firms', 'Companies and LLPs', 'NRIs with Indian income'],
    featured: true,
  },
  {
    id: 'gst',
    icon: 'landmark',
    title: 'GST Registrations & Return Filings',
    cardTitle: 'GST Registration & Returns',
    short: 'GST registration, return filing and GST compliance.',
    details: [
      'From registration to monthly, quarterly and annual returns, we handle GST compliance and reconcile your input tax credit against GSTR-2B so that mismatches are caught early.',
      'We also help with amendments, cancellations and replies to GST notices.',
    ],
    includes: ['New GST registration and amendments', 'GSTR-1, GSTR-3B and annual returns', 'Input tax credit reconciliation', 'E-invoicing and e-way bill guidance', 'Replies to GST notices'],
    forWhom: ['Traders and retailers', 'Manufacturers', 'Service providers', 'E-commerce sellers', 'Businesses crossing the registration threshold'],
    featured: true,
  },
  {
    id: 'business-registration',
    icon: 'building',
    title: 'Company / Partnership / Society / Trust Registrations',
    cardTitle: 'Company, Partnership, Society & Trust Registration',
    short: 'Start your business the right way.',
    details: [
      'We help you choose the right structure and complete the registration: private limited company, LLP, one-person company, partnership firm, society or trust.',
      'We also arrange the PAN, TAN, GST and bank-related documents a new entity usually needs to start operating.',
    ],
    includes: ['Private limited company and OPC incorporation', 'LLP incorporation', 'Partnership deed and firm registration', 'Society and trust registration', 'PAN, TAN and GST registration for the new entity'],
    forWhom: ['New ventures and startups', 'Proprietors moving to a firm, LLP or company', 'Charitable and community organisations'],
    featured: true,
  },
  {
    id: 'msme-registration',
    icon: 'factory',
    title: 'MSME Registrations',
    cardTitle: 'MSME Registration',
    short: 'Udyam registration and MSME-related assistance.',
    details: [
      'Udyam registration gives micro, small and medium enterprises access to government schemes and protections, including the rules on delayed payments to MSMEs.',
      'We complete the registration, keep it updated, and help you understand the benefits available to your business.',
    ],
    includes: ['Udyam registration', 'Updating and amending Udyam details', 'Guidance on MSME schemes and benefits', 'Support with delayed-payment matters'],
    forWhom: ['Manufacturers', 'Service businesses', 'Traders', 'Startups'],
    featured: true,
  },
  {
    id: 'labour-license',
    icon: 'hardhat',
    title: 'Labour License',
    cardTitle: 'Labour License',
    short: 'Labour registration and compliance support.',
    details: [
      'Businesses with employees often need registrations under labour laws, such as shops and establishments registration, along with PF and ESI where they apply.',
      'We help you identify the registrations your business needs, complete them, and keep up with renewals and periodic filings.',
    ],
    includes: ['Shops and establishments registration', 'Labour licence applications and renewals', 'PF and ESI registration support', 'Periodic labour compliance filings'],
    forWhom: ['Shops and commercial establishments', 'Businesses hiring staff', 'Contractors'],
    featured: true,
  },
  {
    id: 'fssai',
    icon: 'utensils',
    title: 'Food License (FSSAI)',
    cardTitle: 'Food License (FSSAI)',
    short: 'FSSAI registration and food business licensing.',
    details: [
      'Every food business needs FSSAI basic registration, a state licence or a central licence, depending on its size and activity.',
      'We determine which one applies to you, prepare the application, and help with renewals and modifications.',
    ],
    includes: ['FSSAI basic registration', 'State and central FSSAI licences', 'Renewals and modifications', 'Annual return guidance'],
    forWhom: ['Restaurants, hotels and caterers', 'Food manufacturers and processors', 'Grocery and food retailers', 'Home-based food businesses'],
    featured: true,
  },
  {
    id: 'loans',
    icon: 'handcoins',
    title: 'Business, OD, Home, Personal & Vehicle Loans',
    cardTitle: 'Business, Home & Personal Loans',
    short: 'Financial support for your goals.',
    details: [
      'We help you prepare the financial documents lenders ask for, such as income tax returns, financial statements, project reports and CMA data, and assist with your loan application.',
      'Loan approval, amount and interest rate are decided by the bank or financial institution.',
    ],
    includes: ['Business loans and overdraft (OD) limits', 'Home loans', 'Personal loans', 'Vehicle loans', 'Project reports and CMA data'],
    forWhom: ['Business owners seeking working capital', 'Families buying a home', 'Individuals planning a vehicle purchase'],
    featured: false,
    inFooter: false,
  },
  {
    id: 'audit',
    icon: 'search',
    title: 'Statutory, Tax & Internal Audit',
    cardTitle: 'Statutory & Internal Audit',
    short: 'Independent audits that strengthen controls and credibility.',
    details: [
      'Statutory and tax audits are carried out in line with the applicable Standards on Auditing and the relevant law, with clear communication throughout the engagement.',
      'Internal audits focus on your processes and controls, and end with practical recommendations ranked by risk.',
    ],
    includes: ['Statutory audit', 'Tax audit under the Income-tax Act', 'Internal audit and process reviews', 'Stock and fixed-asset verification'],
    forWhom: ['Companies', 'LLPs and partnership firms', 'Businesses subject to tax audit', 'Trusts, societies and NGOs'],
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
    ],
    includes: ['Bookkeeping and ledger maintenance', 'Bank and vendor reconciliations', 'Monthly MIS reports', 'Year-end finalisation'],
    forWhom: ['Small and medium businesses', 'Startups', 'Professional firms', 'Trusts and societies'],
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
    ],
    includes: ['Year-round tax planning reviews', 'Salary structuring guidance', 'Investment and deduction planning', 'Tax impact of major transactions'],
    forWhom: ['High-income individuals', 'Business owners', 'Professionals'],
    featured: false,
  },
  {
    id: 'roc-compliance',
    icon: 'shield',
    title: 'ROC and Regulatory Compliance',
    cardTitle: 'ROC & Regulatory Compliance',
    short: 'Annual filings and event-based compliance under company and LLP law.',
    details: [
      'We track and complete annual filings with the Registrar of Companies and event-based forms such as changes in directors, capital or registered office, so that your entity remains in good standing.',
    ],
    includes: ['Annual returns and financial statement filing', 'Director KYC', 'Event-based ROC filings', 'LLP annual compliance'],
    forWhom: ['Private limited companies', 'LLPs', 'One-person companies'],
    featured: false,
  },
];

export const serviceOptions = services.map((s) => s.title);
