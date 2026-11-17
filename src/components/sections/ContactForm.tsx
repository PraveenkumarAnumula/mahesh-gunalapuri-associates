import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle } from 'lucide-react';
import { contactSchema, type ContactFormValues } from '../../utils/validation';
import { enquiryMailto, enquiryWhatsApp } from '../../utils/contact';
import { serviceOptions } from '../../content/services';
import { siteConfig } from '../../config/siteConfig';

type Channel = 'email' | 'whatsapp';
interface Opened {
  channel: Channel;
  href: string;
}

interface Props {
  defaultService?: string;
  /** Opens the generated link. Replaced in tests. */
  openLink?: (href: string, channel: Channel) => void;
}

const OTHER = 'Other / Not sure';

function defaultOpen(href: string, channel: Channel) {
  if (channel === 'whatsapp') window.open(href, '_blank', 'noopener,noreferrer');
  else window.location.href = href;
}

/**
 * Enquiry form with no server. On submit it builds the message and opens the visitor's own
 * email app or WhatsApp with everything filled in; the visitor presses Send there.
 */
export default function ContactForm({ defaultService = '', openLink = defaultOpen }: Props) {
  const [opened, setOpened] = useState<Opened | null>(null);
  const channelRef = useRef<Channel>('email');
  const statusRef = useRef<HTMLDivElement>(null);
  const { contact } = siteConfig;
  const canWhatsApp = Boolean(enquiryWhatsApp(contact.whatsapp, { name: '', email: '', phone: '', service: '', message: '' }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: [...serviceOptions, OTHER].includes(defaultService) ? defaultService : '',
      message: '',
    },
  });

  useEffect(() => {
    if (opened) statusRef.current?.focus();
  }, [opened]);

  const onSubmit = (values: ContactFormValues) => {
    const channel = channelRef.current;
    const href = channel === 'whatsapp' ? enquiryWhatsApp(contact.whatsapp, values) : enquiryMailto(contact.email, values);
    if (!href) return;
    setOpened({ channel, href });
    openLink(href, channel);
  };

  const fieldError = (name: keyof ContactFormValues) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-[13px] text-red-700">{errors[name]?.message}</p>
    ) : null;

  const aria = (name: keyof ContactFormValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const required = <span aria-hidden="true" className="text-red-700">*</span>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Consultation request" className="flex flex-col gap-5">
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {opened && (
          <div role="status" className="flex flex-col gap-2 rounded-md border border-navy-700/20 bg-navy-50 p-4 text-[15px] text-ink">
            <p className="font-medium text-navy-900">
              {opened.channel === 'email'
                ? 'Your email app should now be open with your message ready. Press Send there to send it to us.'
                : 'WhatsApp should now be open with your message ready. Press Send there to send it to us.'}
            </p>
            <p className="text-slate">
              Nothing opened?{' '}
              <a href={opened.href} target={opened.channel === 'whatsapp' ? '_blank' : undefined} rel="noopener noreferrer" className="font-medium text-navy-800 underline underline-offset-2">
                {opened.channel === 'email' ? 'Open the email again' : 'Open WhatsApp again'}
              </a>
              , or call us on {contact.phone}.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-medium text-ink">Full name {required}</label>
          <input id="name" type="text" autoComplete="name" className="field-input" {...aria('name')} {...register('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[14px] font-medium text-ink">Phone number {required}</label>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field-input" {...aria('phone')} {...register('phone')} />
          {fieldError('phone')}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-ink">Email address {required}</label>
        <input id="email" type="email" autoComplete="email" className="field-input" {...aria('email')} {...register('email')} />
        {fieldError('email')}
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-[14px] font-medium text-ink">Service required {required}</label>
        <select id="service" className="field-input" {...aria('service')} {...register('service')}>
          <option value="">Choose a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
          <option value={OTHER}>{OTHER}</option>
        </select>
        {fieldError('service')}
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium text-ink">Message {required}</label>
        <textarea id="message" rows={5} className="field-input resize-y" placeholder="Briefly describe what you need help with." {...aria('message')} {...register('message')} />
        {fieldError('message')}
      </div>

      <p className="text-[13.5px] text-slate">
        Choose how to send: your message opens in your own email app or in WhatsApp, ready to send. This website does not store anything you type.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          onClick={() => (channelRef.current = 'email')}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-3 text-[15px] font-medium text-white hover:bg-navy-800 sm:w-auto"
        >
          <Mail className="h-4 w-4" aria-hidden="true" /> Send by email
        </button>
        {canWhatsApp && (
          <button
            type="submit"
            onClick={() => (channelRef.current = 'whatsapp')}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[#1F7A4D] px-6 py-3 text-[15px] font-medium text-white hover:bg-[#19663F] sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Send on WhatsApp
          </button>
        )}
      </div>
    </form>
  );
}
