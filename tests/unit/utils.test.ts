import { describe, expect, it } from 'vitest';
import { isValidIndianPhone, contactSchema } from '../../src/utils/validation';
import { enquiryMailto, enquiryWhatsApp, mailtoHref, telHref, whatsappHref } from '../../src/utils/contact';
import { organizationSchema } from '../../src/utils/structuredData';
import { articles } from '../../src/content/articles';
import { services } from '../../src/content/services';
import { expertise } from '../../src/content/expertise';

const validForm = {
  name: 'Test Person',
  email: 'test@example.com',
  phone: '98765 43210',
  service: 'GST Services',
  message: 'I need help with GST registration.',
};

describe('Indian phone validation', () => {
  it.each(['9876543210', '98765 43210', '+91 98765 43210', '+919876543210', '09876543210', '91-98765-43210'])('accepts %s', (v) =>
    expect(isValidIndianPhone(v)).toBe(true),
  );
  it.each(['12345', '5876543210', '98765432101', 'abcdefghij', '+1 9876543210', ''])('rejects %s', (v) =>
    expect(isValidIndianPhone(v)).toBe(false),
  );
});

describe('contact schema', () => {
  it('accepts a valid enquiry', () => expect(contactSchema.safeParse(validForm).success).toBe(true));
  it('rejects a malformed email', () => expect(contactSchema.safeParse({ ...validForm, email: 'not-an-email' }).success).toBe(false));
  it('requires a service', () => expect(contactSchema.safeParse({ ...validForm, service: '' }).success).toBe(false));
});

describe('contact links', () => {
  it('builds tel links only for real numbers', () => {
    expect(telHref('98765 43210')).toBe('tel:+919876543210');
    expect(telHref('+91 98765 43210')).toBe('tel:+919876543210');
    expect(telHref('')).toBeNull();
  });
  it('builds mailto links only for valid addresses', () => {
    expect(mailtoHref('office@example.com', 'Hi there')).toBe('mailto:office@example.com?subject=Hi%20there');
    expect(mailtoHref('')).toBeNull();
  });
  it('requires a country code for WhatsApp', () => {
    expect(whatsappHref('919876543210')).toBe('https://wa.me/919876543210');
    expect(whatsappHref('9876543210')).toBeNull();
    expect(whatsappHref('')).toBeNull();
  });
});

describe('enquiry links (form without a server)', () => {
  it('builds a mailto link with subject and full message', () => {
    const href = enquiryMailto('office@example.com', validForm)!;
    expect(href.startsWith('mailto:office@example.com?subject=')).toBe(true);
    const decoded = decodeURIComponent(href);
    expect(decoded).toContain('Enquiry: GST Services - Test Person');
    expect(decoded).toContain('Phone: 98765 43210');
    expect(decoded).toContain('I need help with GST registration.');
  });
  it('builds a WhatsApp link with the enquiry text', () => {
    const href = enquiryWhatsApp('919347944995', validForm)!;
    expect(href.startsWith('https://wa.me/919347944995?text=')).toBe(true);
    expect(decodeURIComponent(href)).toContain('Email: test@example.com');
  });
  it('returns null when the address or number is missing', () => {
    expect(enquiryMailto('', validForm)).toBeNull();
    expect(enquiryWhatsApp('', validForm)).toBeNull();
  });
});

describe('content integrity', () => {
  it('has unique, URL-safe article slugs and valid dates', () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of articles) {
      expect(a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(Number.isNaN(new Date(a.date).getTime())).toBe(false);
    }
  });
  it('has unique service ids, in the agreed order, with no loans service', () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
    expect(services.slice(0, 5).map((s) => s.id)).toEqual(['itr-filing', 'gst', 'business-registration', 'tax-audit', 'audit']);
    expect(services.some((s) => /loan/i.test(s.title))).toBe(false);
  });
  it('links each expertise area to an existing service', () => {
    for (const e of expertise) expect(services.some((s) => s.id === e.serviceId)).toBe(true);
  });
  it('includes the real office address and contact details in structured data', () => {
    const data = organizationSchema();
    expect(data['@type']).toBe('AccountingService');
    expect(data.address).toMatchObject({ addressLocality: 'Nalgonda', postalCode: '508001' });
    expect(data.telephone).toBe('93479 44995');
    expect(data.email).toBe('camaheshgunalapuri@gmail.com');
  });
  it('tells search engines the firm serves Nalgonda and links the map', () => {
    const data = organizationSchema();
    expect(JSON.stringify(data.areaServed)).toContain('Nalgonda');
    expect(String(data.hasMap)).toContain('google.com/maps');
  });
});
