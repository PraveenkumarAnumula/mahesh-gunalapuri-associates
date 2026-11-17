import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactSchema, type ContactFormValues } from '../../utils/validation';
import { submitContact } from '../../utils/submitContact';
import { serviceOptions } from '../../content/services';
import { siteConfig } from '../../config/siteConfig';
import { WEB3FORMS_ACCESS_KEY } from '../../utils/env';

type Status = { state: 'idle' } | { state: 'success' } | { state: 'error'; message: string };

interface Props {
  defaultService?: string;
  /** Injected in tests. Defaults to the Web3Forms access key from the environment. */
  accessKey?: string;
  fetchImpl?: typeof fetch;
}

const OTHER = 'Other / Not sure';

export default function ContactForm({ defaultService = '', accessKey = WEB3FORMS_ACCESS_KEY, fetchImpl }: Props) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const statusRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: [...serviceOptions, OTHER].includes(defaultService) ? defaultService : '',
      message: '',
      consent: false,
      botcheck: '',
    },
  });

  useEffect(() => {
    if (status.state !== 'idle') statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus({ state: 'idle' });
    // Honeypot filled in: almost certainly a bot. Do not send, and do not claim success.
    if (values.botcheck) {
      setStatus({ state: 'error', message: 'Your message could not be sent. Please try again.' });
      return;
    }
    try {
      await submitContact(values, { accessKey, firmName: siteConfig.firm.name, fetchImpl });
      setStatus({ state: 'success' });
      reset();
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    }
  };

  const fieldError = (name: keyof ContactFormValues) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-[13px] text-red-700">{errors[name]?.message}</p>
    ) : null;

  const aria = (name: keyof ContactFormValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Consultation request" className="flex flex-col gap-5">
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status.state === 'success' && (
          <p role="status" className="flex gap-3 rounded-md border border-emerald-700/30 bg-emerald-50 p-4 text-[15px] text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Thank you. Your enquiry has been sent, and we will get back to you soon.
          </p>
        )}
        {status.state === 'error' && (
          <p role="alert" className="flex gap-3 rounded-md border border-red-700/30 bg-red-50 p-4 text-[15px] text-red-900">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[14px] font-medium text-ink">Full name <span aria-hidden="true" className="text-red-700">*</span></label>
          <input id="name" type="text" autoComplete="name" className="field-input" {...aria('name')} {...register('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[14px] font-medium text-ink">Phone number <span aria-hidden="true" className="text-red-700">*</span></label>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field-input" {...aria('phone')} {...register('phone')} />
          {fieldError('phone')}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-ink">Email address <span aria-hidden="true" className="text-red-700">*</span></label>
        <input id="email" type="email" autoComplete="email" className="field-input" {...aria('email')} {...register('email')} />
        {fieldError('email')}
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-[14px] font-medium text-ink">Service required <span aria-hidden="true" className="text-red-700">*</span></label>
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
        <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium text-ink">Message <span aria-hidden="true" className="text-red-700">*</span></label>
        <textarea id="message" rows={5} className="field-input resize-y" placeholder="Briefly describe what you need help with." {...aria('message')} {...register('message')} />
        {fieldError('message')}
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" type="text" tabIndex={-1} autoComplete="off" {...register('botcheck')} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] text-slate">
          <input id="consent" type="checkbox" className="mt-1 h-4 w-4 rounded border-line accent-navy-900" {...aria('consent')} {...register('consent')} />
          <span>
            I agree to be contacted about this enquiry and have read the{' '}
            <Link to="/privacy-policy" className="text-navy-800 underline underline-offset-2">Privacy Policy</Link>.
          </span>
        </label>
        {fieldError('consent')}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-3.5 text-[15px] font-medium text-white hover:bg-navy-800 disabled:cursor-wait disabled:opacity-75 sm:w-auto"
        >
          {isSubmitting ? (
            <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
          ) : (
            <><Send className="h-4 w-4" aria-hidden="true" /> Send enquiry</>
          )}
        </button>
      </div>
    </form>
  );
}
