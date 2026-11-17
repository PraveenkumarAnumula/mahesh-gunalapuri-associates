/** Areas of expertise shown on /expertise. `icon` must match a name in components/common/Icon.tsx. */
export interface ExpertiseArea {
  id: string;
  icon: string;
  title: string;
  summary: string;
  topics: string[];
  /** Related service id for the "Related service" link. */
  serviceId: string;
}

export const expertise: ExpertiseArea[] = [
  {
    id: 'individual-taxation',
    icon: 'user',
    title: 'Individual Taxation',
    summary: 'Returns, planning and notices for salaried people, professionals, investors and NRIs.',
    topics: ['Old vs new regime', 'Capital gains', 'Foreign income and assets', 'Notices and rectifications'],
    serviceId: 'itr-filing',
  },
  {
    id: 'business-taxation',
    icon: 'briefcase',
    title: 'Business Taxation',
    summary: 'Tax computation, audit and planning for proprietorships, firms, LLPs and companies.',
    topics: ['Presumptive taxation', 'Tax audit', 'TDS and TCS compliance', 'Advance tax'],
    serviceId: 'itr-filing',
  },
  {
    id: 'gst-compliance',
    icon: 'landmark',
    title: 'GST Compliance',
    summary: 'End-to-end GST work, from registration to reconciliations and annual returns.',
    topics: ['Return filing', 'ITC reconciliation', 'E-invoicing', 'Notices and audits'],
    serviceId: 'gst',
  },
  {
    id: 'financial-reporting',
    icon: 'chart',
    title: 'Financial Reporting',
    summary: 'Financial statements prepared under the applicable accounting framework, with clear notes.',
    topics: ['Year-end finalisation', 'Schedule III presentation', 'MIS reporting', 'Accounting policies'],
    serviceId: 'accounting',
  },
  {
    id: 'audit-assurance',
    icon: 'search',
    title: 'Audit & Assurance',
    summary: 'Statutory, tax and internal audits carried out with independence and care.',
    topics: ['Statutory audit', 'Tax audit', 'Internal audit', 'Certifications'],
    serviceId: 'audit',
  },
  {
    id: 'business-structuring',
    icon: 'building',
    title: 'Business Structuring',
    summary: 'Choosing and setting up the right legal and tax structure for a venture.',
    topics: ['Entity selection', 'Incorporation', 'Conversion of entities', 'Partner arrangements'],
    serviceId: 'business-registration',
  },
  {
    id: 'regulatory-compliance',
    icon: 'shield',
    title: 'Regulatory Compliance',
    summary: 'Keeping companies and LLPs current with their annual and event-based obligations.',
    topics: ['ROC filings', 'Director KYC', 'Statutory registers', 'Compliance calendars'],
    serviceId: 'roc-compliance',
  },
];
