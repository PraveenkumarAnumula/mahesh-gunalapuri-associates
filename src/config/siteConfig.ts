/**
 * ============================================================================
 *  AMS TAX ASSOCIATES — CENTRAL SITE CONFIGURATION
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
    name: 'AMS Tax Associates',
    shortName: 'AMS',
    tagline: 'Chartered Accountants',
    /** Year the firm was established, e.g. '2012'. Leave '' to hide. */
    established: '',
    /**
     * Path to the logo image inside /public, e.g. '/images/logo.svg'.
     * Leave '' to use the built-in text monogram.
     */
    logo: '',
    description:
      'AMS Tax Associates is a Chartered Accountancy practice offering income tax, GST, audit, accounting and business advisory services to individuals, professionals and growing businesses.',
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
    name: 'CA [Founder Name]',
    designation: 'Founder & Principal, Chartered Accountant',
    /** Membership number issued by ICAI. Leave '' until provided. Never invent one. */
    icaiMembershipNo: '',
    /** Path to a portrait inside /public, e.g. '/images/founder.jpg'. Leave '' for the placeholder. */
    photo: '',
    photoAlt: 'Portrait of the founder of AMS Tax Associates',
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
        organisation: 'AMS Tax Associates',
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
    phone: '',
    /** WhatsApp number with country code, digits only, e.g. '919876543210'. Leave '' to keep the button disabled. */
    whatsapp: '',
    email: '',
    address: {
      line1: '[Office address line 1]',
      line2: '[Office address line 2]',
      city: '[City]',
      state: '[State]',
      postalCode: '[PIN code]',
      country: 'India',
    },
    /** Set true only once the address above is real. Controls address display in structured data. */
    addressIsReal: false,
    /**
     * Google Maps embed URL (Google Maps → Share → Embed a map → copy the src="..." value).
     * Leave '' to show a placeholder panel.
     */
    mapEmbedUrl: '',
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
    { value: '[10+]', label: 'Years of experience', isSample: true },
    { value: '[500+]', label: 'Clients served', isSample: true },
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
    defaultTitle: 'AMS Tax Associates | Chartered Accountants — Income Tax, GST & Audit',
    defaultDescription:
      'AMS Tax Associates is a Chartered Accountancy practice offering income tax filing, GST registration and compliance, audit, accounting and business advisory services.',
    keywords: 'Chartered Accountant, CA services, income tax consultant, GST consultant, tax advisory, audit, AMS Tax Associates',
    ogImage: '/og-image.png',
  },
};

export type SiteConfig = typeof siteConfig;
