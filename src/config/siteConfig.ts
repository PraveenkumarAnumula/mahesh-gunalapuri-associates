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
  /** Optional, e.g. '2024 – Present'. Hidden when empty. */
  period?: string;
  role: string;
  organisation: string;
  summary: string;
}

export const siteConfig = {
  /**
   * The live web address of the site, with no trailing slash. Used for search-engine links,
   * the sitemap and social-media previews. Change it when you know the final address:
   *   Netlify:       'https://your-site-name.netlify.app'
   *   GitHub Pages:  'https://<github-username>.github.io/<repository-name>'
   *   Own domain:    'https://www.yourdomain.in'
   * For a GitHub Pages address ending in /<repository-name>, the build adjusts all links automatically.
   */
  siteUrl: 'https://mahesh-gunalapuri-associates.netlify.app',

  /** Shows a thin notice at the top of every page saying the content is placeholder. */
  showPreviewBanner: false,

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
    established: 'August 2026',
    /** ICAI Firm Registration Number (from the ICAI firm certificate). */
    frn: '032056S',
    /** Constitution of the firm as registered with ICAI. */
    constitution: 'Proprietorship firm',
    /**
     * Path to the logo image inside /public, e.g. '/images/logo.svg'.
     * Leave '' to use the built-in text monogram.
     */
    logo: '',
    description:
      'Mahesh Gunalapuri & Associates is a Chartered Accountancy firm in Nalgonda offering ITR filing, GST registration and returns, business registrations, and MSME, labour and FSSAI licences for individuals and businesses.',
    introduction:
      'We help individuals and businesses meet their tax and regulatory obligations with clarity and confidence. Our work is built on careful analysis, plain-language advice and filings that are done right and on time.',
    history:
      'Mahesh Gunalapuri & Associates was established in August 2026 in Nalgonda, Telangana, as a proprietorship firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (Firm Registration No. 032056S). The firm serves individuals, professionals and businesses with income tax, GST, registrations, licences and compliance work.',
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
    designation: 'Proprietor, Chartered Accountant',
    /** Membership number issued by ICAI. Leave '' until provided. Never invent one. */
    icaiMembershipNo: '297023',
    /** Path to a portrait inside /public, e.g. '/images/founder.jpg'. Leave '' for the placeholder. */
    photo: '/images/mahesh-gunalapuri.jpg',
    photoAlt: 'Portrait of CA Mahesh Gunalapuri',
    qualifications: ['Chartered Accountant (ACA), Associate Member of ICAI'],
    /** Short line used on cards. */
    experienceSummary: 'ICAI membership no. 297023',
    /** Optional biography paragraphs for the CA Profile page. The section is hidden while empty. */
    fullBio: [] as string[],
    specializations: [
      'Income tax return filing and tax compliance',
      'GST registration, returns and compliance',
      'Company, partnership, society and trust registration',
      'MSME, labour licence and FSSAI registration',
    ],
    experience: [
      {
        role: 'Proprietor',
        organisation: 'Mahesh Gunalapuri & Associates',
        summary:
          'Leads the firm’s income tax, GST, registration and compliance work for individuals, professionals and businesses in and around Nalgonda.',
      },
    ] as ExperienceItem[],
    /** Optional lists for the CA Profile page. Each box is hidden while its list is empty. */
    industries: [] as string[],
    achievements: [] as string[],
    /** Professional philosophy, written in the founder’s voice. */
    philosophy:
      'Every return I file and every registration I complete is a promise kept to a client. I believe good financial advice should be honest, easy to understand and always on time, so that you can focus on building your future with confidence.',
    /** Short motivational line shown in the founder sections on the Home and About pages. */
    motto: 'Compliance done right today builds the confidence to grow tomorrow.',
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
      line1: 'H No 6-2-0005, Sri Laxmi Nagar Colony, Road No 4',
      line2: 'Near Shanmuka Apartment',
      city: 'Nalgonda',
      state: 'Telangana',
      postalCode: '508001',
      country: 'India',
    },
    /** Set true only once the address above is real. Controls address display in structured data. */
    addressIsReal: true,
    /**
     * Link for the "Open in Google Maps" button. For the exact office pin, open the firm's
     * Google Maps listing, tap Share and paste that link here.
     */
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Sri%20Laxmi%20Nagar%20Colony%20Road%20No%204%2C%20Near%20Shanmuka%20Apartment%2C%20Nalgonda%20508001',
    /** Office hours, e.g. { days: 'Monday – Saturday', time: '10:00 AM – 7:00 PM' }. Hidden while empty. */
    hours: [] as { days: string; time: string }[],
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
    { value: '1000+', label: 'ITR Filings', isSample: false },
    { value: '200+', label: 'GST Registrations And Filings', isSample: false },
    { value: '50+', label: 'Company Incorporations', isSample: false },
    { value: '70+', label: 'Partnership Registrations', isSample: false },
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
      'Chartered Accountants in Nalgonda, Telangana: ITR filing, GST registration and returns, company, partnership, society and trust registration, MSME, labour licence and FSSAI.',
    keywords: 'Chartered Accountant Nalgonda, CA in Nalgonda, ITR filing, GST registration, GST consultant, income tax consultant, FSSAI license, MSME Udyam registration, Mahesh Gunalapuri & Associates',
    ogImage: '/og-image.png',
  },
};

export type SiteConfig = typeof siteConfig;
