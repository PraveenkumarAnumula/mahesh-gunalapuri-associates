import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { formatAddress, mailtoHref, telHref, whatsappHref } from '../../utils/contact';

const { contact, firm } = siteConfig;


const pending = 'To be added';

/** Phone, email, address and hours. Links appear only for values that are actually set. */
export default function ContactDetails({ onDark = false, showHours = true }: { onDark?: boolean; showHours?: boolean }) {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email, `Enquiry for ${firm.name}`);
  const muted = onDark ? 'text-navy-100/70' : 'text-slate';
  const strong = onDark ? 'text-white' : 'text-ink';
  const link = onDark ? 'text-white underline-offset-4 hover:underline' : 'text-navy-800 underline-offset-4 hover:underline';
  const iconCls = `mt-0.5 h-4 w-4 shrink-0 ${onDark ? 'text-gold-300' : 'text-gold-700'}`;

  return (
    <ul className="flex flex-col gap-4 text-[15px]">
      <li className="flex gap-3">
        <Phone className={iconCls} aria-hidden="true" />
        <span className="flex flex-col">
          <span className={`text-[12px] uppercase tracking-wider ${muted}`}>Phone</span>
          {tel ? <a href={tel} className={link}>{contact.phone}</a> : <span className={muted}>{pending}</span>}
        </span>
      </li>
      <li className="flex gap-3">
        <Mail className={iconCls} aria-hidden="true" />
        <span className="flex min-w-0 flex-col">
          <span className={`text-[12px] uppercase tracking-wider ${muted}`}>Email</span>
          {mail ? <a href={mail} className={`${link} break-all`}>{contact.email}</a> : <span className={muted}>{pending}</span>}
        </span>
      </li>
      <li className="flex gap-3">
        <MapPin className={iconCls} aria-hidden="true" />
        <span className="flex flex-col">
          <span className={`text-[12px] uppercase tracking-wider ${muted}`}>Office</span>
          <address className={`not-italic ${strong}`}>
            {formatAddress(contact.address).map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </address>
        </span>
      </li>
      {showHours && (
        <li className="flex gap-3">
          <Clock className={iconCls} aria-hidden="true" />
          <span className="flex flex-col">
            <span className={`text-[12px] uppercase tracking-wider ${muted}`}>Business hours</span>
            {contact.hours.map((h) => (
              <span key={h.days} className={strong}>
                {h.days}: <span className="tabular-nums">{h.time}</span>
              </span>
            ))}
          </span>
        </li>
      )}
    </ul>
  );
}

/** WhatsApp button. Disabled, with an explanation, until siteConfig.contact.whatsapp is set. */
export function WhatsAppButton({ className = '' }: { className?: string }) {
  const href = whatsappHref(contact.whatsapp, `Hello ${firm.name}, I would like to enquire about your services.`);
  const cls = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-medium ${className}`;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} bg-[#1F7A4D] text-white hover:bg-[#19663F]`}>
        <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
      </a>
    );
  }
  return (
    <span className="flex flex-col gap-1.5">
      <button type="button" disabled aria-describedby="wa-note" className={`${cls} cursor-not-allowed border border-dashed border-line bg-mist text-slate-soft`}>
        <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
      </button>
      <span id="wa-note" className="text-[12.5px] text-slate-soft">WhatsApp chat will be available once the firm’s number is added.</span>
    </span>
  );
}
