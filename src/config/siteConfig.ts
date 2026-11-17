/**
 * ============================================================================
 *  MAHESH GUNALAPURI & ASSOCIATES — CENTRAL SITE CONFIGURATION
 * ============================================================================
 *  Almost every piece of firm or personal information on the website comes
 *  from this file. Edit the values below and the whole site updates.
 *
 *  RULES FOR PLACEHOLDERS
 *  - Text wrapped in [square brackets] is placeholder content. Replace it.
 *  - Leave a contact value as an empty string ('') until the real value is
 *    known. The site hides the related link or button, or shows
 *    "To be added", instead of linking to a fake number or address.
 *  - Set `isSample: false` on a statistic only once the figure is verified.
 *  - When everything is real, set `showPreviewBanner` to false.
 *
 *  Services live in src/content/services.ts, expertise areas in
 *  src/content/expertise.ts and articles in src/content/articles.ts.
 * ============================================================================
 */

export interface Stat {
  value: string;
  label: string;
  /** true = figure is a placeholder and is labelled "Sample figure" on the site. */
  isSample: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organisation: string;
  summary: string;
}

export const siteConfig = {
  /** Shows a thin notice at the top of every page saying the content is placeholder. */
  showPreviewBanner: true,

  firm: {
    name: 'Mahesh Gunalapuri & Associates',
    shortName: 'MGA',
    tagline: 'Chartered Accountants',
    /** Service line from the firm's card, shown under the hero eyebrow. */
    serviceLine: 'Tax · Compliance · Registration · Financial Solutions',
    /** Taglines from the firm's card. */
    slogan: 'Your Partner for Business Growth & Compliance',
    subSlogan: 'Supporting Your Today for a Brighter Tomorrow',
    closingLine: 'Let’s Grow Together',
    /** Year the firm was established, e.g. '2012'. Leave '' to hide. */
    established: '',
    /**
     * Path to the logo image inside /public, e.g. '/images/logo.svg'.
     * Leave '' to use the built-in text monogram.
     */
    logo: '',
    description:
      'Mahesh Gunalapuri & Associates is a Chartered Accountancy firm in Nalgonda offering ITR filing, GST registration and returns, business registrations, MSME, labour and FSSAI licences, and loan assistance for individuals and businesses.',
    introduction:
      'We help individuals and businesses meet their tax and regulatory obligations with clarity and confidence. Our work is built on careful analysis, plain-language advice and filings that are done right and on time.',
    history:
      '[Firm history placeholder — describe when and why the practice was founded, how it has grown, and the kinds of clients it serves today. Two or three short paragraphs work well.]',
    mission:
      'To give every client accurate, timely and practical financial guidance, so that compliance never stands in the way of their goals.',
    vision:
      'To be the practice our clients trust first for decisions involving tax, compliance and financial health.',
    philosophy:
      'Good advice starts with understanding the client’s situation in full. We explain the options in plain language, document our reasoning, and stay accountable for the outcome.',
  },

  founder: {
    /** Full name as it should appear, e.g. 'CA Firstname Lastname'. */
    name: 'CA Mahesh Gunalapuri',
    designation: 'Founder & Principal, Chartered Accountant',
    /** Membership number issued by ICAI. Leave '' until provided. Never invent one. */
    icaiMembershipNo: '',
    /** Path to a portrait inside /public, e.g. '/images/founder.jpg'. Leave '' for the placeholder. */
    photo: '',
    photoAlt: 'Portrait of CA Mahesh Gunalapuri',
    qualifications: ['Chartered Accountant (ACA / FCA) — [confirm]', '[Degree, University, Year]', '[Additional certification, if any]'],
    /** Short line used on cards, e.g. '12+ years in taxation and audit'. */
    experienceSummary: '[X] years of professional experience — placeholder',
    shortBio:
      '[Short biography placeholder — two or three sentences on the founder’s background, areas of focus and the kind of clients they work with.]',
    fullBio: [
      '[Biography paragraph 1 placeholder — professional background, articleship and early career.]',
      '[Biography paragraph 2 placeholder — practice areas, industries served and approach to client work.]',
    ],
    specializations: [
      'Individual and business income tax',
      'GST registration, returns and advisory',
      'Statutory, tax and internal audit',
      'Company and LLP compliance',
    ],
    experience: [
      {
        period: '[Year] – Present',
        role: 'Founder & Principal',
        organisation: 'Mahesh Gunalapuri & Associates',
        summary: '[Describe responsibilities and practice focus.]',
      },
      {
        period: '[Year] – [Year]',
        role: '[Previous role]',
        organisation: '[Previous firm or organisation]',
        summary: '[Describe responsibilities and key areas of work.]',
      },
    ] as ExperienceItem[],
    industries: ['[Industry 1, e.g. Manufacturing]', '[Industry 2, e.g. Retail & Trading]', '[Industry 3, e.g. Professional Services]', '[Industry 4, e.g. Startups]'],
    achievements: ['[Professional achievement placeholder]', '[Professional achievement placeholder]'],
    philosophy:
      '“[Personal professional philosophy placeholder — one or two sentences in the founder’s own words.]”',
    linkedinUrl: '',
  },

  contact: {
    /** Display form, e.g. '+91 98765 43210'. Leave '' until provided. */
    phone: '93479 44995',
    /** Optional second number. Leave '' to hide. */
    phoneAlt: '90595 96977',
    /** WhatsApp number with country code, digits only, e.g. '919876543210'. Leave '' to keep the button disabled. */
    whatsapp: '919347944995',
    email: 'camaheshgunalapuri@gmail.com',
    address: {
      line1: '4-11-522/1A, Beside Kanuka Durga Colony Arch',
      line2: 'DVK Road',
      city: 'Nalgonda',
      state: 'Telangana',
      postalCode: '508001',
      country: 'India',
    },
    /** Set true only once the address above is real. Controls address display in structured data. */
    addressIsReal: true,
    /**
     * Google Maps embed URL (Google Maps → Share → Embed a map → copy the src="..." value).
     * Leave '' to show a placeholder panel.
     */
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Kanuka%20Durga%20Colony%2C%20DVK%20Road%2C%20Nalgonda%20508001&z=16&output=embed',
    hours: [
      { days: 'Monday – Friday', time: '[10:00 AM – 7:00 PM]' },
      { days: 'Saturday', time: '[10:00 AM – 2:00 PM]' },
      { days: 'Sunday', time: 'Closed' },
    ],
  },

  /** Leave any value '' to hide that icon. */
  social: {
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
  },

  stats: [
    { value: '500+', label: 'ITR filings', isSample: false },
    { value: '100+', label: 'GST registrations and filings', isSample: false },
    { value: '50+', label: 'Company incorporations', isSample: false },
    { value: '70+', label: 'Partnership registrations', isSample: false },
  ] as Stat[],

  values: [
    { title: 'Integrity', text: 'We give honest advice, even when it is not what a client hoped to hear.' },
    { title: 'Accuracy', text: 'Every computation and filing is prepared carefully and reviewed before it goes out.' },
    { title: 'Timeliness', text: 'We track statutory due dates so that deadlines are met without last-minute pressure.' },
    { title: 'Confidentiality', text: 'Client information is handled with discretion and shared only when required.' },
  ],

  /** Add real client testimonials only with the client's written permission. The section stays hidden while empty. */
  testimonials: [] as Testimonial[],

  seo: {
    defaultTitle: 'Mahesh Gunalapuri & Associates | Chartered Accountants in Nalgonda — ITR, GST & Registrations',
    defaultDescription:
      'Chartered Accountants in Nalgonda, Telangana: ITR filing, GST registration and returns, company, partnership, society and trust registration, MSME, labour licence, FSSAI and loan assistance.',
    keywords: 'Chartered Accountant Nalgonda, CA in Nalgonda, ITR filing, GST registration, GST consultant, income tax consultant, FSSAI license, MSME Udyam registration, Mahesh Gunalapuri & Associates',
    ogImage: '/og-image.png',
  },
};

export type SiteConfig = typeof siteConfig;
