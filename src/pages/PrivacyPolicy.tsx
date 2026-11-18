import { Link } from 'react-router-dom';
import LegalPage from './LegalPage';
import { siteConfig } from '../config/siteConfig';

export default function PrivacyPolicy() {
  const firm = siteConfig.firm.name;
  return (
    <LegalPage
      title="Privacy Policy"
      description={`How ${firm} collects, uses and protects personal information shared through this website.`}
      updated="17 November 2026"
      sections={[
        {
          heading: 'Information we collect',
          body: (
            <p>
              This website does not collect or store personal information. It has no database, no cookies and no tracking. When you use the
              enquiry form, your details are placed into a message in your own email app or WhatsApp, and they reach us only if you choose to
              send that message.
            </p>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <p>
              We use the details in messages you send us only to respond to your enquiry and, if you become a client, to provide the services
              you request. We do not sell or rent personal information.
            </p>
          ),
        },
        {
          heading: 'Service providers',
          body: (
            <p>
              The website is hosted on a static web hosting service, which may keep standard server logs. Messages you send by email or
              WhatsApp are handled by those services under their own privacy terms.
            </p>
          ),
        },
        {
          heading: 'Retention and security',
          body: (
            <p>
              We keep enquiry details only as long as needed to respond and for our legitimate records, and we take reasonable measures to
              protect them. As Chartered Accountants, we also follow professional confidentiality obligations.
            </p>
          ),
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              You may ask us to access, correct or delete the personal information you have shared, subject to applicable law including the
              Digital Personal Data Protection Act, 2023. Contact us through the <Link to="/contact" className="link">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
