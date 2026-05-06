import { useEffect, useState } from 'react';
import {
  User,
  Briefcase,
  FolderGit2,
  Mail,
  Sun,
  Moon,
  Command,
  Github,
} from 'lucide-react';
import { useTheme } from '@/theme/ThemeProvider';
import { profile } from '@/data';

type DockProps = {
  onOpenPalette: () => void;
};

type DockItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  /** Tailwind classes for the gradient background of the icon */
  gradient: string;
  /** When true, the item is hidden on mobile (below sm breakpoint) */
  mobileHidden?: boolean;
};

export function Dock({ onOpenPalette }: DockProps) {
  const { theme, toggleTheme } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Clear stuck hover state when the user switches tabs/windows/apps.
  // Without this, mouseleave never fires when the page is hidden, so the icon
  // stays magnified when the user returns. This handles three cases:
  //  - tab switch (visibilitychange to 'hidden')
  //  - app switch / focus loss (blur)
  //  - return to page (focus / visible again)
  useEffect(() => {
    const clear = (): void => setHoveredId(null);
    const onVisibility = (): void => {
      // Clear in both directions — when leaving and when returning.
      setHoveredId(null);
    };
    window.addEventListener('blur', clear);
    window.addEventListener('focus', clear);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', clear);
      window.removeEventListener('focus', clear);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const scrollTo = (id: string) => (): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openLink = (url: string) => (): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navItems: DockItem[] = [
    { id: 'about', label: 'about', icon: User, onClick: scrollTo('about'), gradient: 'from-blue-400 to-blue-600' },
    { id: 'experience', label: 'experience', icon: Briefcase, onClick: scrollTo('experience'), gradient: 'from-amber-400 to-amber-600' },
    { id: 'projects', label: 'projects', icon: FolderGit2, onClick: scrollTo('projects'), gradient: 'from-emerald-400 to-emerald-600' },
    { id: 'contact', label: 'email', icon: Mail, onClick: openLink(`mailto:${profile.email}`), gradient: 'from-pink-400 to-pink-600', mobileHidden: true },
  ];

  const utilItems: DockItem[] = [
    {
      id: 'github',
      label: 'github',
      icon: Github,
      onClick: openLink(profile.links.github),
      gradient: 'from-zinc-700 to-zinc-900',
      mobileHidden: true,
    },
    {
      id: 'palette',
      label: 'commands (⌘K)',
      icon: Command,
      onClick: onOpenPalette,
      gradient: 'from-violet-400 to-violet-600',
      mobileHidden: true,
    },
    {
      id: 'theme',
      label: theme === 'dark' ? 'light mode' : 'dark mode',
      icon: theme === 'dark' ? Sun : Moon,
      onClick: toggleTheme,
      gradient: theme === 'dark' ? 'from-yellow-300 to-orange-500' : 'from-indigo-500 to-purple-700',
    },
  ];

  return (
    <nav
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40
                 mac-panel rounded-2xl px-2 py-1.5
                 flex items-end gap-1
                 max-w-[calc(100vw-1.5rem)]"
      aria-label="Dock navigation"
      onMouseLeave={() => setHoveredId(null)}
    >
      {navItems.map((item) => (
        <DockButton
          key={item.id}
          item={item}
          hovered={hoveredId === item.id}
          onHover={() => setHoveredId(item.id)}
        />
      ))}

      <span
        className="self-stretch w-px bg-black/10 dark:bg-white/10 mx-1 my-1.5"
        aria-hidden="true"
      />

      {utilItems.map((item) => (
        <DockButton
          key={item.id}
          item={item}
          hovered={hoveredId === item.id}
          onHover={() => setHoveredId(item.id)}
        />
      ))}
    </nav>
  );
}

type DockButtonProps = {
  item: DockItem;
  hovered: boolean;
  onHover: () => void;
};

function DockButton({ item, hovered, onHover }: DockButtonProps) {
  const Icon = item.icon;

  return (
    <button
      onClick={item.onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-label={item.label}
      className={`relative shrink-0 rounded-xl items-center justify-center
                  bg-gradient-to-br ${item.gradient} text-white
                  transition-transform duration-200 ease-out
                  ${hovered ? '-translate-y-2 scale-110' : ''}
                  w-10 h-10 sm:w-11 sm:h-11
                  shadow-md
                  ${item.mobileHidden ? 'hidden sm:flex' : 'flex'}`}
      style={{ willChange: 'transform' }}
    >
      <Icon size={20} className="drop-shadow-sm" />

      {/* Tooltip — only on non-touch (sm+) where hover is meaningful */}
      <span
        className={`hidden sm:block absolute bottom-full mb-2 px-2 py-0.5
                    bg-zinc-900/85 text-white text-xs rounded-md whitespace-nowrap
                    pointer-events-none transition-opacity
                    ${hovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {item.label}
      </span>

      {/* Active indicator dot — small dot below the icon, like a running app */}
      <span
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                   bg-zinc-700 dark:bg-zinc-300 opacity-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </button>
  );
}
