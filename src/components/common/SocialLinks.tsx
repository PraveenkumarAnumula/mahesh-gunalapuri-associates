import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { isSet } from '../../utils/contact';

const items = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'twitter', label: 'X (Twitter)', Icon: Twitter },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
] as const;

/** Renders only the profiles configured in siteConfig.social. */
export default function SocialLinks() {
  const active = items.filter((i) => isSet(siteConfig.social[i.key]));
  if (!active.length) {
    return <p className="text-[13px] text-navy-100/60">Social media profiles will appear here once added.</p>;
  }
  return (
    <ul className="flex gap-2">
      {active.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={siteConfig.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.firm.name} on ${label}`}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-navy-100 hover:border-gold-400 hover:text-gold-300"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
