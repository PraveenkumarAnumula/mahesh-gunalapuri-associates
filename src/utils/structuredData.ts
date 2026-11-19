import { siteConfig } from '../config/siteConfig';
import { services } from '../content/services';
import { isSet } from './contact';
import { SITE_URL } from './site';

/** schema.org AccountingService data. Only real (non-placeholder) details are included. */
export function organizationSchema(): Record<string, unknown> {
  const { firm, contact, social } = siteConfig;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: firm.name,
    description: firm.description,
    url: SITE_URL,
    image: `${SITE_URL}${siteConfig.seo.ogImage}`,
    knowsAbout: services.map((s) => s.title),
    areaServed: contact.areaServed.map((name) => ({ '@type': 'Place', name })),
    founder: { '@type': 'Person', name: siteConfig.founder.name, jobTitle: siteConfig.founder.designation },
  };
  if (isSet(contact.mapsLink)) data.hasMap = contact.mapsLink;
  if (contact.hours.length) data.openingHours = contact.hours.map((h) => `${h.days}: ${h.time}`);
  if (isSet(contact.phone)) data.telephone = contact.phone;
  if (isSet(contact.email)) data.email = contact.email;
  if (contact.addressIsReal) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: [contact.address.line1, contact.address.line2].filter(Boolean).join(', '),
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.postalCode,
      addressCountry: 'IN',
    };
  }
  const sameAs = [...Object.values(social), siteConfig.seo.googleBusinessProfileUrl].filter(isSet);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}
