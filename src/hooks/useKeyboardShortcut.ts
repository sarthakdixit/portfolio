import { useEffect } from 'react';

type Modifiers = {
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
};

/**
 * Listens for a keyboard shortcut and invokes the handler.
 *
 * Pass `meta: true` to match Cmd on macOS / Ctrl on Windows/Linux.
 * The handler is invoked after `e.preventDefault()`.
 */
export function useKeyboardShortcut(
  key: string,
  handler: () => void,
  modifiers: Modifiers = {},
): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return;

      // `meta: true` = Cmd on Mac, Ctrl on others
      if (modifiers.meta && !(e.metaKey || e.ctrlKey)) return;
      if (modifiers.shift !== undefined && modifiers.shift !== e.shiftKey) return;
      if (modifiers.alt !== undefined && modifiers.alt !== e.altKey) return;

      e.preventDefault();
      handler();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, handler, modifiers.meta, modifiers.shift, modifiers.alt]);
}
