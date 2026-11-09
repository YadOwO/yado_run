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

Static Astro site, zero framework runtime. The whole site is designed as a film told in chapters: dark-only, cinematic, minimal. The home page is the prologue (opening, manifesto, table of contents); each part of the site is a chapter with its own page (Portrait `/about/`, Filmography `/works/`, more later). The only client JS is `src/scripts/stage.ts` (~1KB): reveal-on-scroll, HUD scene label, scroll timecode, closing the index after a bfcache restore, skipping the opening.

```
src/
  styles/tokens.css    # the only source of color / type / motion tokens
  styles/global.css    # base, grain + vignette, reveal utilities, view transitions
  i18n/index.ts        # all UI strings (en + zh, zh typed from en)
  data/chapters.ts     # the chapters (parts of the site); drives home contents, HUD index, next-chapter links, sitemap
  data/about.ts        # Portrait chapter content (profile card, hobbies)
  data/products.ts     # every yado product; status drives labels everywhere; product pages live at /works/<slug>/
  layouts/Base.astro   # head, fonts, HUD, opening flag, the one script
  views/               # HomeView, AboutView, WorksView, ProductView — shared by en and zh pages
  pages/               # thin wrappers for en and zh/, plus sitemap.xml.ts (generated at build)
  components/          # TitleCard, Hud + IndexMenu, ChapterStill, NextChapter, KeyArt, Signature, Opening, Credits, home/*, works/*, product/*
  components/ink/      # hand-drawn strokes ported from the yadoA app (rule, box, blob, tick), generated as SVG paths at build time
```

### Key Patterns

- **Path alias:** use `@/` for imports from `src/`.
- **Frame vs. color:** the frame (HUD, type, grain) is always monochrome. Color only enters through a product's `accent` (set as `--accent` on its scene). Never hard-code product colors in components; derive from `--bg` / `--ink` (e.g. `color-mix(in srgb, var(--bg) 90%, transparent)`) rather than writing dark RGB values, so themed pages follow.
- **Product worlds:** a product page with `page.theme` (paper, surface, ink — the app's **dark** appearance) is drawn in the product's own look while staying dark like the rest of the site: `Base` sets `data-theme="app"` and the colors on `<html>`, `tokens.css` derives the ink levels and switches display type to the system serif, lines become hand-drawn (`components/ink/`), and the full-screen `KeyArt` becomes the dark app icon. Use the dark appearance, not the light one: a light page inside the dark site was tried and felt jarring. yadoA is the first.
- **Chapters:** add a new part of the site by adding an entry to `CHAPTERS`, a view in `views/`, and pages at `pages/<slug>` and `pages/zh/<slug>` (zh pages import Noto Serif SC). Give it a frame in `ChapterStill.astro`. Home contents, the HUD index, next-chapter links and the sitemap follow automatically. `RESERVE_NEXT_CHAPTER` shows an "in development" row at the end.
- **Hobbies (Portrait → Hobbies):** they change often; add/remove/reorder entries in `hobbies` in `data/about.ts`. `mark` is a single-color SVG in `src/assets/hobbies/` with no fill (it takes the text color); without a mark the title fills the frame. The strip fits any count (scrolls sideways when full).
- **Signature:** the writing animation copies the logo-only opening of yadoI's launch Lottie (`yadoI/BrandAssets/yadoI.json`): same stroke order, timing and easing per stroke. Keep them in sync.
- **Products:** add a product by adding an entry to `PRODUCTS`. `SLATE_PUBLIC = false` keeps the Filmography slate as anonymous poster slots. Link to product pages with `productPath()`.
- **i18n:** English at `/`, Chinese at `/zh/`. Every string needs both `en` and `zh`; build links with `href(lang, path)`.
- **Motion:** only animate `transform`, `opacity`, `clip-path`. Use `--ease-film` / `--ease-pen` and the `data-reveal`, `data-reveal-lines`, `data-enter`, `data-inview` utilities rather than new JS. Respect `prefers-reduced-motion`.
- **Scroll-driven animations:** put `animation-timeline` in its own rule (e.g. `.parent > .el { animation-timeline: ... }`), separate from the `animation` shorthand. The CSS minifier otherwise merges it into the shorthand, which Chrome rejects, dropping the whole declaration. Don't write `animation-range` with `entry`/`exit` (the minifier rewrites it wrongly). An `overflow: hidden` ancestor is a scroll container, so `view()` inside it never progresses; declare a named `view-timeline` on that ancestor instead.
- **Scenes:** sections carry `data-scene`, `data-scene-label`, optionally `data-scene-accent` — the HUD reads them.
- **Fonts:** self-hosted via Fontsource. Noto Serif SC is imported only in `pages/zh/*`.

Responsive Requirement: Ensure seamless compatibility and adaptive layout for both mobile and web platforms.
