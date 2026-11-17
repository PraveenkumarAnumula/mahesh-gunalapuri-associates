interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
  as?: 'h1' | 'h2';
}

export default function SectionHeading({ eyebrow, title, intro, align = 'left', onDark = false, as = 'h2' }: Props) {
  const Tag = as;
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${align === 'center' ? 'mx-auto items-center text-center' : ''}`}>
      {eyebrow && <p className={onDark ? 'eyebrow-on-dark' : 'eyebrow'}>{eyebrow}</p>}
      <Tag className={`text-[clamp(26px,7.5vw,30px)] font-semibold leading-[1.15] sm:text-[38px] ${onDark ? '!text-white' : ''}`}>{title}</Tag>
      {intro && <p className={`text-[17px] ${onDark ? 'text-navy-100/80' : 'text-slate'}`}>{intro}</p>}
    </div>
  );
}
