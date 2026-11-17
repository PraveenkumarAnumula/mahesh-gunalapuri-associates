import { describe, expect, it, vi } from 'vitest';
import { isValidIndianPhone, contactSchema } from '../../src/utils/validation';
import { mailtoHref, telHref, whatsappHref } from '../../src/utils/contact';
import { daysUntil, upcomingDueDates } from '../../src/utils/complianceCalendar';
import { FormNotConfiguredError, submitContact, WEB3FORMS_ENDPOINT } from '../../src/utils/submitContact';
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
  consent: true,
  botcheck: '',
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
  it('requires consent', () => expect(contactSchema.safeParse({ ...validForm, consent: false }).success).toBe(false));
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

describe('compliance calendar', () => {
  it('lists the next due dates in order from a given day', () => {
    const items = upcomingDueDates(new Date(2026, 10, 17), 4); // 17 Nov 2026
    expect(items.map((i) => [i.date.getMonth(), i.date.getDate(), i.title])).toEqual([
      [10, 20, 'GSTR-3B (monthly filers)'],
      [11, 7, 'TDS / TCS deposit for previous month'],
      [11, 11, 'GSTR-1 (monthly filers)'],
      [11, 15, 'Advance tax instalment'],
    ]);
  });
  it('uses 30 April, not 7 April, for March TDS', () => {
    const items = upcomingDueDates(new Date(2027, 3, 1), 3);
    expect(items.some((i) => i.date.getMonth() === 3 && i.date.getDate() === 7)).toBe(false);
    expect(items.find((i) => i.title === 'TDS deposit for March')?.date.getDate()).toBe(30);
  });
  it('rolls over into the next year', () => {
    const items = upcomingDueDates(new Date(2026, 11, 21), 2);
    expect(items[0].date.getFullYear()).toBe(2027);
  });
  it('counts days between calendar dates', () => expect(daysUntil(new Date(2026, 10, 20), new Date(2026, 10, 17))).toBe(3));
});

describe('submitContact', () => {
  it('refuses to pretend success when no access key is configured', async () => {
    await expect(submitContact(validForm, { accessKey: '', firmName: 'AMS' })).rejects.toBeInstanceOf(FormNotConfiguredError);
  });
  it('resolves only when the service confirms success', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    await expect(submitContact(validForm, { accessKey: 'key', firmName: 'AMS', fetchImpl })).resolves.toBeUndefined();
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(WEB3FORMS_ENDPOINT);
    expect(JSON.parse(init.body)).toMatchObject({ access_key: 'key', email: 'test@example.com', botcheck: '' });
  });
  it('rejects with the service message on failure', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false, message: 'Invalid access key' }), { status: 400 }));
    await expect(submitContact(validForm, { accessKey: 'bad', firmName: 'AMS', fetchImpl })).rejects.toThrow('Invalid access key');
  });
  it('rejects with a network message when offline', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(submitContact(validForm, { accessKey: 'key', firmName: 'AMS', fetchImpl })).rejects.toThrow(/internet connection/);
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
  it('has the nine required services with unique ids', () => {
    expect(services).toHaveLength(9);
    expect(new Set(services.map((s) => s.id)).size).toBe(9);
  });
  it('links each expertise area to an existing service', () => {
    for (const e of expertise) expect(services.some((s) => s.id === e.serviceId)).toBe(true);
  });
  it('leaves placeholder contact details out of structured data', () => {
    const data = organizationSchema();
    expect(data).not.toHaveProperty('address');
    expect(data).not.toHaveProperty('telephone');
    expect(data['@type']).toBe('AccountingService');
  });
});
