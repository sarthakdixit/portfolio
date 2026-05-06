import { useEffect } from 'react';
import { profile, labels } from '@/data';

export function Footer() {
  useEffect(() => {
    console.log(`%c${labels.consoleGreeting}`, 'font-size:16px;font-weight:500;color:#3b82f6;');
    console.log(`%c${labels.consoleSubtext} ${profile.email}`, 'color:#888;');
  }, []);

  return (
    <footer className="mx-auto max-w-3xl px-6 py-4 text-center">
      <p className="text-[11px] text-zinc-700/70 dark:text-zinc-300/60">
        © {new Date().getFullYear()} {profile.name} · {labels.footerTagline}
      </p>
    </footer>
  );
}
