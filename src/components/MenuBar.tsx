import { useEffect, useState } from 'react';
import { Command } from 'lucide-react';
import { labels } from '@/data';

type MenuBarProps = {
  onOpenPalette: () => void;
};

/**
 * macOS-style top menu bar. Shows the "app name" (portfolio) on the left,
 * a live clock and command-palette pill on the right.
 */
export function MenuBar({ onOpenPalette }: MenuBarProps) {
  const time = useClock();

  return (
    <header
      className="sticky top-0 z-30 mac-panel border-b border-black/5 dark:border-white/10
                 backdrop-blur"
      style={{ borderRadius: 0 }}
      aria-label="Menu bar"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 h-7 flex items-center justify-between text-[12px]">
        {/* Left: app menu */}
        <div className="flex items-center gap-4">
          <span className="font-semibold tracking-tight">{labels.navHome}</span>
        </div>

        {/* Right: status indicators + ⌘K */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <Command size={11} />
            <span className="font-mono">K</span>
          </button>
          <span className="font-medium tabular-nums">{time}</span>
        </div>
      </div>
    </header>
  );
}

function useClock(): string {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const update = (): void => setTime(formatTime(new Date()));
    update();
    const id = window.setInterval(update, 30_000); // tick every 30s; minute precision is enough
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function formatTime(date: Date): string {
  const day = date.toLocaleDateString(undefined, { weekday: 'short' });
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${day} ${time}`;
}
