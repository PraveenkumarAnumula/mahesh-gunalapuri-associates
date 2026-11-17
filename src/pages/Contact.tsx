import { useSearchParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import ContactDetails, { WhatsAppButton } from '../components/common/ContactDetails';
import ContactForm from '../components/sections/ContactForm';
import { siteConfig } from '../config/siteConfig';

export default function Contact() {
  const [params] = useSearchParams();
  const { contact, firm } = siteConfig;
  return (
    <>
      <Seo
        title="Contact Us — Request a Consultation"
        description={`Contact ${firm.name} to request a consultation on income tax, GST, audit, accounting or business compliance.`}
      />
      <PageHeader
        eyebrow="Contact"
        title="Request a consultation"
        intro="Share a few details about what you need. We will get back to you to discuss your requirement."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="min-w-0 rounded-md border border-line p-6 sm:p-8">
            <h2 className="mb-6 text-[26px] font-semibold">Send us an enquiry</h2>
            <ContactForm defaultService={params.get('service') ?? ''} />
          </div>
          <aside className="flex flex-col gap-8">
            <div className="rounded-md bg-mist p-6">
              <h2 className="mb-5 font-sans text-[13px] font-semibold uppercase tracking-wider !text-navy-800">Office details</h2>
              <ContactDetails />
            </div>
            <WhatsAppButton />
          </aside>
        </div>
      </section>
      <section aria-label="Office location map" className="container-page pb-20">
        {contact.mapEmbedUrl ? (
          <iframe
            title={`Map showing the location of ${firm.name}`}
            src={contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full rounded-md border border-line"
          />
        ) : (
          <div className="flex h-[260px] flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line bg-mist text-center">
            <MapPin className="h-6 w-6 text-gold-700" aria-hidden="true" />
            <p className="text-[15px] font-medium text-navy-900">Office map</p>
            <p className="max-w-sm px-4 text-[14px] text-slate">A Google Map of the office will appear here once the office address is confirmed.</p>
          </div>
        )}
      </section>
    </>
  );
}
