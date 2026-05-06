import { useCallback, useState } from 'react';
import { MenuBar } from '@/components/MenuBar';
import { Dock } from '@/components/Dock';
import { CommandPalette } from '@/components/CommandPalette';
import { Hero } from '@/sections/Hero';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { Footer } from '@/components/Footer';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

export function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const togglePalette = useCallback(() => setPaletteOpen((o) => !o), []);
  useKeyboardShortcut('k', togglePalette, { meta: true });

  return (
    <div className="min-h-screen flex flex-col">
      <MenuBar onOpenPalette={() => setPaletteOpen(true)} />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 space-y-5 pb-32">
        <Hero />
        <Experience />
        <Projects />
      </main>

      <Footer />

      <Dock onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
