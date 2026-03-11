# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server on port 3000
pnpm build      # TypeScript check + Vite production build
pnpm preview    # Preview production build locally
```

No test runner is configured in this project.

**Deployment:** Production deploys are triggered by pushing `v*` tags (e.g. `git tag v1.0.0 && git push --tags`), which runs the GitHub Actions workflow → Vercel.

## Architecture

This is a minimalist portfolio/personal site. It is a **single-page app with view-state-based navigation** (no router library).

### View States

Navigation is managed via React `useState` in the main layout. The four states are: `home`, `profile`, `arch`, `play`. Overlay sections (`ProfileSection`, `ArchitectureSection`, `PlaygroundSection`) are shown/hidden with Framer Motion `AnimatePresence`.

```
App (ThemeProvider + LanguageProvider)
└── MainLayout
    ├── PersistentPill (fixed, bottom-right: language + theme toggles)
    └── Scroll-snap container
        ├── IntroSection  (snap point 1)
        ├── MenuSection   (snap point 2 — navigates to overlay sections)
        ├── ProfileSection (full-screen overlay)
        ├── ArchitectureSection (full-screen overlay)
        └── PlaygroundSection (full-screen overlay)
```

### Key Patterns

- **Path alias:** Use `@/` for all imports from `src/` (configured in `tsconfig.json` and `vite.config.ts`)
- **Styling:** Tailwind CSS loaded via CDN in `index.html` (not PostCSS). Custom config (dark mode, colors) is defined inline in the CDN script tag.
- **Animations:** All motion uses `APPLE_SPRING` constants from `src/lib/constants.ts` (`stiffness: 150, damping: 20, mass: 1.2`) for consistency.
- **i18n:** `src/lib/i18n.ts` holds all EN/CN translation strings inline. All user-facing text must have both `en` and `cn` keys.
- **Class merging:** Use the `cn()` utility from `@/lib/utils` (combines `clsx` + `tailwind-merge`).
- **Dark mode:** Controlled by `ThemeContext`. The `index.html` has an inline script to apply the theme class before React hydrates (prevents flash).

Responsive Requirement: Ensure seamless compatibility and adaptive layout for both mobile and web platforms.