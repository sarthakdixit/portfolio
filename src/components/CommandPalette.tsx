import { Command } from 'cmdk';
import { useEffect } from 'react';
import {
  User,
  Briefcase,
  FolderGit2,
  Sun,
  Moon,
  Github,
  Linkedin,
  Mail,
  Palette,
  FileText,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/theme/useTheme';
import { profile } from '@/data';

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const scrollTo = (id: string) => (): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onOpenChange(false);
  };

  const openLink = (url: string) => (): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] px-4
                 bg-black/30 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight"
    >
      <div
        className="w-full max-w-xl mac-panel rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Spotlight" className="w-full">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/10">
            <Search size={16} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
            <Command.Input
              placeholder="Spotlight Search"
              className="flex-1 bg-transparent text-base outline-none
                         placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-zinc-500">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 pt-1.5 pb-1 font-semibold"
            >
              <PaletteItem icon={User} label="Jump to about" onSelect={scrollTo('about')} />
              <PaletteItem
                icon={Briefcase}
                label="Jump to experience"
                onSelect={scrollTo('experience')}
              />
              <PaletteItem
                icon={FolderGit2}
                label="Jump to projects"
                onSelect={scrollTo('projects')}
              />
            </Command.Group>

            <Command.Group
              heading="Theme"
              className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 pt-1.5 pb-1 font-semibold"
            >
              <PaletteItem
                icon={theme === 'dark' ? Sun : Moon}
                label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                onSelect={() => {
                  toggleTheme();
                  onOpenChange(false);
                }}
              />
              <PaletteItem
                icon={Palette}
                label="Toggle theme"
                onSelect={() => {
                  toggleTheme();
                  onOpenChange(false);
                }}
              />
            </Command.Group>

            <Command.Group
              heading="Links"
              className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 pt-1.5 pb-1 font-semibold"
            >
              <PaletteItem
                icon={FileText}
                label="View resume"
                onSelect={openLink(profile.links.resume)}
              />
              <PaletteItem
                icon={Github}
                label="Open GitHub"
                onSelect={openLink(profile.links.github)}
              />
              <PaletteItem
                icon={Linkedin}
                label="Open LinkedIn"
                onSelect={openLink(profile.links.linkedin)}
              />
              <PaletteItem
                icon={Mail}
                label={`Email ${profile.email}`}
                onSelect={openLink(`mailto:${profile.email}`)}
              />
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

type PaletteItemProps = {
  icon: LucideIcon;
  label: string;
  onSelect: () => void;
};

function PaletteItem({ icon: Icon, label, onSelect }: PaletteItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer
                 text-zinc-800 dark:text-zinc-200
                 aria-selected:bg-blue-500 aria-selected:text-white"
    >
      <Icon size={14} />
      {label}
    </Command.Item>
  );
}
