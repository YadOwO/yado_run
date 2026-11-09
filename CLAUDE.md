# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server on port 3000 (runs in the background; stop with `pnpm astro dev stop`)
pnpm build      # Static production build into dist/
pnpm preview    # Preview production build locally
```

Node version is pinned in `.node-version` (26) and managed with fnm; pnpm is installed globally into that Node.

No test runner is configured. `astro check` is not set up: @astrojs/check 0.9 crashes with Astro 7 (and does not support TypeScript 7).

**Deployment:** Production deploys are triggered by pushing `v*` tags (e.g. `git tag v1.0.0 && git push --tags`), which runs the GitHub Actions workflow → Vercel (`vercel.json` declares the Astro framework).

## Architecture

Static Astro site, zero framework runtime. The whole site is designed as a short film: dark-only, cinematic, minimal. The only client JS is `src/scripts/stage.ts` (~1KB): reveal-on-scroll, HUD scene label, scroll timecode, skipping the opening.

```
src/
  styles/tokens.css    # the only source of color / type / motion tokens
  styles/global.css    # base, grain + vignette, reveal utilities, view transitions
  i18n/index.ts        # all user-facing strings (en + zh, zh typed from en)
  data/products.ts     # the slate: every yado product; status drives labels everywhere
  layouts/Base.astro   # head, fonts, HUD, opening flag, the one script
  views/               # HomeView, ProductView — shared by en and zh pages
  pages/               # thin wrappers: / and /zh/, /[product]/ and /zh/[product]/
  components/          # Signature, Opening, Hud, KeyArt, StatusChip, Credits, home/*, product/*
```

### Key Patterns

- **Path alias:** use `@/` for imports from `src/`.
- **Frame vs. color:** the frame (HUD, type, grain) is always monochrome. Color only enters through a product's `accent` (set as `--accent` on its scene). Never hard-code product colors in components.
- **Products:** add a product by adding an entry to `PRODUCTS`. `SLATE_PUBLIC = false` keeps the home slate as anonymous poster slots.
- **i18n:** English at `/`, Chinese at `/zh/`. Every string needs both `en` and `zh`; build links with `href(lang, path)`.
- **Motion:** only animate `transform`, `opacity`, `clip-path`. Use `--ease-film` / `--ease-pen` and the `data-reveal`, `data-reveal-lines`, `data-enter`, `data-inview` utilities rather than new JS. Respect `prefers-reduced-motion`.
- **Scenes:** sections carry `data-scene`, `data-scene-label`, optionally `data-scene-accent` — the HUD reads them.
- **Fonts:** self-hosted via Fontsource. Noto Serif SC is imported only in `pages/zh/*`.

Responsive Requirement: Ensure seamless compatibility and adaptive layout for both mobile and web platforms.
