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
              When you submit the contact form, we collect your name, email address, phone number, the service you are interested in and your
              message. We do not use advertising cookies or tracking pixels on this website.
            </p>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <p>
              We use this information only to respond to your enquiry and, if you become a client, to provide the services you request. We do
              not sell or rent personal information.
            </p>
          ),
        },
        {
          heading: 'Service providers',
          body: (
            <p>
              Contact-form submissions are delivered to us by email through Web3Forms, a third-party form service. The website is hosted on
              Netlify. These providers process data on our behalf under their own privacy terms.
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
              Digital Personal Data Protection Act, 2023. Contact us through the <Link to="/contact" className="text-navy-800 underline">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
