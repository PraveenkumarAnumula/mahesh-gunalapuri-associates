import {
  BookOpen,
  Briefcase,
  Building2,
  ChartColumn,
  Compass,
  Factory,
  FileBadge,
  FileCheck,
  HardHat,
  Landmark,
  ReceiptText,
  Search,
  ShieldCheck,
  User,
  UtensilsCrossed,
  type LucideProps,
} from 'lucide-react';

/** Names usable in content files (services.ts, expertise.ts). */
const icons = {
  receipt: ReceiptText,
  landmark: Landmark,
  compass: Compass,
  book: BookOpen,
  search: Search,
  briefcase: Briefcase,
  building: Building2,
  chart: ChartColumn,
  shield: ShieldCheck,
  user: User,
  factory: Factory,
  filebadge: FileBadge,
  filecheck: FileCheck,
  hardhat: HardHat,
  utensils: UtensilsCrossed,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Briefcase;
  return <Component aria-hidden="true" strokeWidth={1.6} {...props} />;
}
