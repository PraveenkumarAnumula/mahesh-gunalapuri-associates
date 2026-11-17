import { useSearchParams } from 'react-router-dom';
import { ExternalLink, MapPin } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import ContactDetails, { WhatsAppButton } from '../components/common/ContactDetails';
import ContactForm from '../components/sections/ContactForm';
import { siteConfig } from '../config/siteConfig';
import { formatAddress } from '../utils/contact';

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
      <section aria-labelledby="find-us" className="container-page pb-20">
        <div className="flex flex-col items-start justify-between gap-5 rounded-md border border-line bg-mist p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold-700" aria-hidden="true" />
            <div>
              <h2 id="find-us" className="text-[22px] font-semibold">Find our office</h2>
              <p className="mt-1 text-[15px] text-slate">{formatAddress(contact.address).join(', ')}</p>
            </div>
          </div>
          <a
            href={contact.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-md border border-navy-900/20 bg-white px-5 py-3 text-[15px] font-medium text-navy-900 hover:border-navy-900/50 sm:w-auto"
          >
            Open in Google Maps <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
