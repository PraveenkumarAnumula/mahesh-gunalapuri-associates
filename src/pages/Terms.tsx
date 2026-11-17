import LegalPage from './LegalPage';
import { siteConfig } from '../config/siteConfig';

export default function Terms() {
  const firm = siteConfig.firm.name;
  return (
    <LegalPage
      title="Terms & Conditions"
      description={`Terms governing the use of the ${firm} website.`}
      updated="17 November 2026"
      sections={[
        {
          heading: 'Information only',
          body: (
            <p>
              The content on this website, including articles in the Insights section, is general information. It is not professional advice
              and does not create a client relationship. Tax and regulatory rules change often; please consult us before acting on any information.
            </p>
          ),
        },
        {
          heading: 'Engagements',
          body: (
            <p>
              Professional services are provided only under a written engagement letter that sets out the scope, fees and responsibilities of
              both parties, and in accordance with the regulations of the Institute of Chartered Accountants of India.
            </p>
          ),
        },
        {
          heading: 'No solicitation',
          body: (
            <p>
              This website is intended to provide information about {firm} to those who seek it. It is not intended as advertising or
              solicitation of professional work.
            </p>
          ),
        },
        {
          heading: 'Limitation of liability',
          body: (
            <p>
              While we take care to keep the information accurate, {firm} is not liable for any loss arising from reliance on the content of
              this website.
            </p>
          ),
        },
        {
          heading: 'External links',
          body: <p>Links to external websites are provided for convenience. We are not responsible for their content.</p>,
        },
      ]}
    />
  );
}
