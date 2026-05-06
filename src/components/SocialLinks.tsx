import { FileText, Github, Linkedin, type LucideIcon } from 'lucide-react';
import type { ProfileLinks } from '@/data/types';

type SocialLinksProps = {
  links: ProfileLinks;
};

type LinkItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external: boolean;
  iconBg: string;
};

export function SocialLinks({ links }: SocialLinksProps) {
  const items: LinkItem[] = [
    {
      href: links.resume,
      label: 'Resume',
      icon: FileText,
      external: links.resume.startsWith('http'),
      iconBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      href: links.github,
      label: 'GitHub',
      icon: Github,
      external: true,
      iconBg: 'bg-gradient-to-br from-zinc-700 to-zinc-900',
    },
    {
      href: links.linkedin,
      label: 'LinkedIn',
      icon: Linkedin,
      external: true,
      iconBg: 'bg-gradient-to-br from-sky-500 to-sky-700',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className="mac-card flex items-center justify-center gap-2.5 px-3 py-3
                     rounded-xl hover:bg-white/80 dark:hover:bg-zinc-800/80
                     transition-colors"
        >
          <span
            className={`w-7 h-7 rounded-lg flex items-center justify-center text-white
                        ${item.iconBg}`}
          >
            <item.icon size={14} />
          </span>
          <span className="text-sm font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
