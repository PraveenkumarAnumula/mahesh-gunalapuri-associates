/** Helpers that turn config values into working links. Each returns null when the value is not set,
 *  so the UI can hide the link instead of pointing at a fake number or address. */

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function telHref(phone: string): string | null {
  const d = digitsOnly(phone);
  if (d.length < 10) return null;
  return `tel:+${d.length === 10 ? `91${d}` : d}`;
}

export function mailtoHref(email: string, subject?: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}

export function whatsappHref(number: string, message?: string): string | null {
  const d = digitsOnly(number);
  if (d.length < 11) return null; // needs country code, e.g. 91XXXXXXXXXX
  return `https://wa.me/${d}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function isSet(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

export function formatAddress(a: { line1: string; line2: string; city: string; state: string; postalCode: string; country: string }): string[] {
  return [a.line1, a.line2, `${a.city}, ${a.state} ${a.postalCode}`, a.country].filter(Boolean);
}

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

/** Plain-text enquiry used for both the email body and the WhatsApp message. */
export function enquiryText(e: Enquiry): string {
  return [
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    `Email: ${e.email}`,
    `Service required: ${e.service}`,
    '',
    e.message,
  ].join('\n');
}

/** mailto: link that opens the visitor's email app with the enquiry filled in. */
export function enquiryMailto(to: string, e: Enquiry): string | null {
  if (!mailtoHref(to)) return null;
  const subject = encodeURIComponent(`Enquiry: ${e.service} - ${e.name}`);
  const body = encodeURIComponent(enquiryText(e));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

/** wa.me link that opens WhatsApp with the enquiry filled in. */
export function enquiryWhatsApp(number: string, e: Enquiry): string | null {
  return whatsappHref(number, `Hello, I would like to enquire about ${e.service}.\n\n${enquiryText(e)}`);
}
