import { type ReactNode } from 'react';
import { TrafficLights } from './TrafficLights';

type WindowProps = {
  /** Title shown in the centered title bar (e.g. "about.app") */
  title: string;
  /** Section anchor id for nav links */
  id?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps content in the classic macOS window chrome — frosted panel,
 * title bar with traffic lights, centered title.
 */
export function Window({ title, id, children, className = '' }: WindowProps) {
  return (
    <section
      id={id}
      className={`mac-panel rounded-xl overflow-hidden scroll-mt-20 ${className}`}
    >
      <header
        className="flex items-center px-4 h-9 border-b border-black/5 dark:border-white/5
                   bg-white/30 dark:bg-zinc-900/30"
      >
        <TrafficLights />
        <h2 className="flex-1 text-center text-[12px] font-medium text-zinc-700 dark:text-zinc-300 tracking-tight">
          {title}
        </h2>
        {/* Spacer so the title is truly centered (matches traffic-lights width) */}
        <div className="w-[52px]" aria-hidden="true" />
      </header>

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}
