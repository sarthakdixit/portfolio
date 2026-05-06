# AGENT.md

Guidance for AI coding agents (Claude, Cursor, Copilot, etc.) and human contributors working in this repository. Read this before making changes.

## Project overview

This is a personal portfolio site for a software engineer with a **macOS-inspired theme** — frosted vibrancy panels, traffic-light window chrome, magnifying dock navigation, SF system typography, soft wallpaper gradient. Single-page React application with anchored sections for **about**, **experience**, and **projects**. Statically built and deployed to GitHub Pages.

## Theme: macOS

The visual identity is non-negotiable for this project. If you change the chrome model or fundamental palette, you are off-brief.

- **Wallpaper**: warm-to-cool gradient on light mode (peach → pink → lavender → sky), deep navy/violet on dark. Set in `body` background in `global.css` and pinned with `background-attachment: fixed` so it doesn't scroll.
- **Frosted panels**: every section is a `<Window>` with a frosted background (`backdrop-filter: blur(40px) saturate(180%)`), traffic lights, and a centered title (`about.app`, `experience.app`, `projects.app`). Use the `.mac-panel` class (defined in `global.css`).
- **Inner cards** (project cards, social buttons) use `.mac-card` — a lighter translucent layer that doesn't compound blur cost.
- **Traffic lights** are decorative. They render `× − +` glyphs on group hover but never close, minimize, or zoom. Do not wire them to functions.
- **Dock**: bottom-floating, magnifies on hover (-translate-y + scale 1.1), with tooltip labels. On mobile, magnification is disabled (touch has no hover) but the dock still renders.
- **Menu bar**: stays at the top, includes a fake clock and ⌘K pill — like real macOS.
- **Typography**: system font stack starting with `-apple-system` so it uses SF Pro on Apple devices and Segoe/system on others. Slightly negative letter-spacing (`-0.011em` body, tighter on headings).
- **Accent colors**: soft blue (`blue-500`) and emerald are the primary accents — matching macOS Finder/Mail. Avoid the previous emerald-heavy theme.
- **No sharp corners**. Min `rounded-md` (8px), prefer `rounded-xl` (12px) for cards, `rounded-2xl` for the dock.

**Stack:**
- Vite (build tool)
- React 18 + TypeScript (strict mode)
- Tailwind CSS (utility-first styling, class-based dark mode)
- Framer Motion (animations)
- Lucide React (icons)
- `cmdk` (command palette primitive)

There is no backend. All content lives in typed data files under `src/data/` and is imported at build time.

## Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Type-check | `npm run typecheck` |
| Lint | `npm run lint` |
| Format | `npm run format` |
| Production build | `npm run build` |
| Preview build locally | `npm run preview` |
| Deploy to GH Pages | `npm run deploy` |

**Always run `npm run typecheck` and `npm run lint` before committing.** CI will fail otherwise.

## Repository layout

```
portfolio/
├── public/                 # static assets copied as-is to /
├── src/
│   ├── components/         # reusable UI components (PascalCase.tsx)
│   ├── sections/           # top-level page sections (Hero, Experience, Projects)
│   ├── theme/              # ThemeProvider, useTheme
│   ├── data/               # content.json (single source), types.ts, index.ts barrel
│   ├── lib/                # pure utilities (no React)
│   ├── hooks/              # custom hooks (useXxx)
│   ├── styles/             # global.css, tailwind directives
│   ├── App.tsx
│   └── main.tsx
├── index.html              # contains anti-flash theme script — do not remove
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── AGENT.md
```

**Where things go:**
- New section of the page → `src/sections/`
- Reusable UI piece (Button, Card, Tag) → `src/components/`
- Pure helper (formatDate, classnames) → `src/lib/`
- Stateful logic reused across components → `src/hooks/`
- Content the user edits often (projects, jobs) → `src/data/`

## Coding conventions

### TypeScript
- **Strict mode is on.** No `any`. If you need an escape hatch, use `unknown` and narrow.
- Prefer `type` over `interface` for component props; use `interface` only when extension is needed.
- Export types alongside the component that owns them.
- All data in `src/data/` must be typed against schemas in `src/data/types.ts`.

### React
- Functional components only. No class components.
- One component per file. Filename matches the component.
- Named exports for components, **not** default exports — better for refactoring.
- Keep components under ~150 lines. Split when they grow past that.
- Hooks rules apply (no conditional calls, no calls inside loops).

### Styling
- **Tailwind first.** Reach for arbitrary CSS only for animations or things Tailwind cannot express.
- Class-based dark mode: every visible element must have both light and dark styles. Mental check: would this be readable on `bg-zinc-950`?
- Use `zinc` for neutrals, not `gray`. Avoid pure `#000` and `#fff` — prefer `zinc-950` and `zinc-50`.
- Accent color: `emerald-500` family. Use it sparingly for emphasis (links, focus, current state).
- Long `className` strings: use the `cn()` helper from `src/lib/cn.ts`.
- Do not inline `style={{ }}` for theming — use Tailwind classes.

### Naming
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Functions and variables: `camelCase`
- Files: match the export.

### Imports
- Order: (1) React, (2) third-party, (3) `@/` absolute, (4) relative, (5) type-only last.
- Use the `@/` alias for anything in `src/`.
- Type-only imports use `import type { Foo } from '...'`.

### Accessibility
- Every interactive element needs an accessible name. Icon-only buttons require `aria-label`.
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<button>` (not `<div onClick>`).
- Color contrast must pass WCAG AA in both themes.
- Respect `prefers-reduced-motion` for any animation longer than ~200ms.
- All images need `alt` text; decorative images use `alt=""`.

### Performance
- Lazy-load anything heavy via `React.lazy` + `Suspense`.
- Images: WebP or AVIF, served at the displayed size. Use `loading="lazy"` for below-the-fold.
- Memoize only when there's a measured problem.
- Keep the production bundle under **200 KB gzipped**.
- Lighthouse target: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.

## Dark mode rules

This is the most common source of bugs. Read carefully.

1. The inline script in `index.html` sets the `dark` class on `<html>` **before** React hydrates. Do not remove it. Do not move it to a JS file.
2. `ThemeProvider` reads the existing class from the DOM as its initial state — the DOM is the source of truth.
3. Every component must work in both themes. Use `dark:` variants on every color-bearing class.
4. Never hardcode colors in inline styles.
5. Test both themes after any UI change.

## Animation rules

- Use Framer Motion for component-level animation. Use Tailwind transitions for simple hover/focus.
- Default durations: 150ms for hover, 200–300ms for enter/exit, never longer than 600ms.
- Stagger delays between siblings should be ≤ 50ms.
- All scroll-triggered animations use `IntersectionObserver` (via Framer Motion's `whileInView`).
- Wrap any non-essential animation in a `useReducedMotion()` check.

## Editing user-facing content

**All user-facing content lives in `src/data/content.json`.** This is the single source of truth — profile, experience, projects, and every label/string used in the UI.

- Never hardcode user-facing strings in components. Pull them from `labels` in `content.json`.
- To add a project, append to the `projects` array in `content.json`.
- To update the bio, edit `profile.bio` in `content.json`.
- The TypeScript type for the JSON shape lives in `src/data/types.ts`. If you change the JSON schema, update the type first.
- The shared barrel export is `src/data/index.ts` — import from `@/data`, not the JSON or types directly:
  ```ts
  import { profile, projects, experience, labels } from '@/data';
  ```
- Never invent content. Leave a `// TODO:` placeholder and ask the user.

## Git and commits

- Branch names: `feat/...`, `fix/...`, `chore/...`, `docs/...`
- Commits: present-tense imperative, ≤ 72 chars. `add command palette`, not `Added command palette.`
- One logical change per commit.
- Never commit `.env`, `node_modules/`, `dist/`, or editor metadata.

## Deployment

- `main` branch auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`.
- The `base` path in `vite.config.ts` must match the repo name.
- Custom domain: edit `public/CNAME`.

## What an agent should NOT do without asking

- Add a new top-level dependency (every package added must justify its bundle cost)
- Change the build tool, framework, or styling system
- Introduce a backend, database, or authentication
- Add analytics or tracking scripts
- Replace the macOS theme with anything else
- Add a third theme variant (light + dark are enough)
- Wire the traffic lights to actual functions (they are decorative)
- Generate placeholder content (lorem ipsum) — ask the user instead
- Remove the anti-flash inline script in `index.html`
- Disable strict TypeScript or any lint rule

## Definition of done

A change is done when:
1. `npm run typecheck` passes with zero errors.
2. `npm run lint` passes with zero warnings.
3. `npm run build` succeeds and the bundle is under 200 KB gzipped.
4. The change preserves the macOS aesthetic — no sharp-cornered cards, no opaque panels that break the vibrancy effect.
5. The change works in both light and dark mode.
6. The change works on a 375px-wide viewport (iPhone SE).
7. Keyboard navigation reaches every interactive element in a logical order.
8. The dock and command palette still function on the new view.
9. No new console errors or warnings in the browser.
