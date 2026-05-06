# Portfolio · macOS edition

Personal portfolio site with a macOS-inspired theme — frosted vibrancy panels, traffic lights, magnifying dock, SF system typography. Built with React + TypeScript + Vite + Tailwind.

## Features

- **macOS chrome**: every section wrapped in a translucent window with traffic lights and a centered title
- **Magnifying dock**: hover to lift and scale icons, with tooltip labels
- **Spotlight-style command palette** (⌘K)
- **Live menu bar** with clock and ⌘K shortcut
- Single JSON file (`src/data/content.json`) drives every label and piece of content
- Dark / light theme with system preference detection and zero flash on load
- Animated ML-themed graphics cycling through loss curve, neural network, and decision boundary
- Project section:
  - Live search by tech (filters as you type, empty = show all)
  - Two-column grid on desktop, single column on mobile
  - All project links go to GitHub
- Fully responsive (mobile-first; dock disables magnification on touch)
- Accessible (WCAG AA, keyboard navigation, respects `prefers-reduced-motion`)
- Console easter egg for the curious

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Customizing your content

**All content lives in a single file: `src/data/content.json`.** Edit it to update everything — your name, bio, skills, experience, projects, and every label used on the site. No component changes required.

The structure:

```jsonc
{
  "profile": {
    "name": "...",
    "tagline": "...",
    "bio": "...",
    "skills": ["..."],
    "links": {
      "github": "...",
      "linkedin": "...",
      "resume": "/resume.pdf"
    }
  },
  "experience": [ /* most recent first */ ],
  "projects":   [ /* every project links to its `repo` URL */ ],
  "labels":     { /* every UI string */ }
}
```

To add your resume PDF, drop it in `public/` and reference it as `/resume.pdf` in `profile.links.resume`.

## Available commands

```bash
npm run dev          # start dev server
npm run build        # production build → dist/
npm run preview      # serve the production build locally
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --write .
npm run deploy       # build and push to gh-pages branch
```

## Deploying to GitHub Pages

1. Update the `base` path in `vite.config.ts` to match your repo name. For `https://yourname.github.io/portfolio`, set `base: '/portfolio/'`.
2. Push to GitHub. The workflow in `.github/workflows/deploy.yml` will build and deploy on every push to `main`.
3. In your repo settings, set Pages source to "GitHub Actions".

For a custom domain, add a `CNAME` file to `public/` containing your domain.

## Deploying to Vercel (recommended alternative)

```bash
npm install -g vercel
vercel
```

Faster builds, automatic preview deployments, no `base` path gymnastics.

## Project structure

See `AGENT.md` for the full layout and coding conventions.

## License

MIT
