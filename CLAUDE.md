# CLAUDE.md: Creative Designer portfolio

A portfolio site for a graphic designer, built in Next.js. It is black and blood red, and the scroll animation is meant to play like one continuous video. All copy lives in `content/*.ts`. The designer is Mohit in New Delhi (`NAME`, `CITY`, `TIME_ZONE = "Asia/Kolkata"` in `content/site.ts`). Placeholders still to replace: `EMAIL`, `SOCIAL_URLS` and `NEXT_PUBLIC_SITE_URL`.

## Stack (exact pins, do not add dependencies)
- Next 16.4.2 (App Router, Turbopack), React 19.3.1, TypeScript 5.9.3 in strict mode.
- Runtime dependencies are ONLY next, react, react-dom, gsap 3.15.0 and lenis 1.3.27.
- No Tailwind, no UI kits, no CSS-in-JS. Styling is `app/globals.css` (design tokens) plus CSS Modules.
- `.npmrc` sets `ignore-scripts=true` and `save-exact=true`.

## Commands
`npm run dev` · `npm run build` · `npm start` · `npm run typecheck` · `npm run budget` (run after a build)

## Architecture: read this first
- **Exactly one client component:** `components/SmoothScroll.tsx`. Everything else is a server component. This is deliberate, to stay near the 130 KB JS budget.
- `SmoothScroll` does two things on mount:
  1. It immediately imports `lib/ui/index.ts`. These are plain DOM behaviors: nav, magnetic buttons, copy, layers panel, folders, back button, before/after slider, image load handling, and the custom cursor.
  2. On idle, it loads `lib/engine.ts` (gsap, ScrollTrigger, Flip, and Lenis driven by `gsap.ticker`). It then loads `lib/scenes/home.ts` or `lib/scenes/project.ts`.
- **Behaviors find their markup through `data-*` attributes, not React state.** Examples: `[data-nav]`, `[data-btn]`, `[data-copy]`, `[data-layers-panel]`, `a[data-folder]`, `[data-back]`, `[data-ba]`, `img[data-blur]`, `[data-cursor]`. If an interaction is dead, check that the attribute exists in the server markup.
- **Scenes find their elements through** `data-scene="hero|about|layers|process|work|contact"` and per-scene attributes such as `data-hero="desk"` and `data-process="path"`.
- **Pinning is CSS `position: sticky`** inside tall wrappers (hero is 400svh, process is 330svh). GSAP only scrubs these; there are no ScrollTrigger pin spacers. Sections overlap ("slide over") using a negative `margin-top: calc(-1 * var(--ov))`. The section above reserves room for this with `padding-bottom: var(--ov-next)`.
- **The hero landing is pure CSS keyframes** with `animation-fill-mode: backwards`. GSAP animates *wrapper* elements (`data-hero="desk|text|plunge|deskpx|textpx"`). It never touches the CSS-animated children (`.char`, `.deskIntro`). Keep it that way, or the two will fight over `transform`.
- **Images use `getImageProps` + plain `<img>`, never `<Image>`.** The `<Image>` component pulls in client JS. The hero has art-directed `<picture>` sources plus a `ReactDOM.preload` call that carries a `media` query.
- **Page navigation is multi-page.** Internal links are plain `<a>`, and `@view-transition { navigation: auto }` is set. Clicking a folder sets `view-transition-name: work-<slug>` on its cover sheet, and the project hero figure carries the same name statically. Browsers without cross-document view transitions get a GSAP `Flip.fit` fallback, which a `pageshow` handler reverses on Back.

## File map
- `components/Hero.tsx` + `Hero.module.css`
  - Four layers: background, giant text, desk plate, and the front effects with the lockup.
  - The layout is designed so the eye reads, in order: the headline, the monitor (the work), then the name, pitch and CTA. Keep it that way, and do not fill the screen again.
  - **Desktop:** "CREATIVE DESIGNER" is set on ONE full-width line.
    - `--ink-all` and `--space` come from `antonFit` and `ANTON_SPACE`.
    - `--fs-all` is capped at `26svh` and centred.
    - Its baseline is tucked about 12% behind the monitor bezel: `top = monitor-top - 0.64 * fs-all`.
  - **Desktop lockup:** a quiet row under the nav (`.who` on the left; `.pitch` = intro + CTA on the right).
  - **Desktop plate:** `--plate-w: min(100vw + 48px, 160svh)`, so the desk sits on black. `.plate` is feathered with an intersected mask: the sides fade out, and the bottom clutter fades into black.
  - **Phones (portrait):** the words stack, with DESIGNER fully above the monitor. The lockup sits at the top with the big name.
    - `--lock-end` on `.stage` is a safe CSS estimate of the lockup's bottom (it assumes a 4-line intro).
    - `--plate-top` is `max(bottom-anchored, value that keeps the headline 1.4rem below --lock-end)`. On short phones the desk slides down (its bottom crops) instead of the headline running into "View my work".
    - The `--ink1`/`--ink2`/`--ink-all` vars are set on `.stage` so this calc can see them.
- `components/About.tsx` on phones (≤767px), top to bottom:
  - `about.backdrop` is fitted to the width via `antonFit` (`--ink`/`--lsb` on `.pin`).
  - A band holds both notes; their arrows point down into the box, and their font is sized from `--box-w` so they never collide.
  - The portrait box is stretched from `--subject-top` to the bottom of the pin.
  - Nothing sits on the dashed selection line.
  - There used to be an outlined copy of DESIGNER in front of the plate. It was removed because it added noise once DESIGNER became readable.
  - `.monitorGlow` sits behind the plate (`z-index: -1`) as a backlight. Over the plate, its red screen-blend washed out the monitor artwork and made the image look blurred.
  - There is no scroll indicator. It was removed at the client's request.
- `components/Nav.tsx` + `Nav.module.css` + `lib/ui/nav.ts`
  - The bar is a 3-column grid with three items:
    - The brand.
    - The live status (≥900px): `navMeta.status`, `CITY`, and a clock in `TIME_ZONE` with a blinking colon. The client does not want a dot or square before the status. The status is a link to `#contact` that rolls up to `navMeta.statusHover` ("Let’s talk") on hover, in crimson with an arrow and an underline drawing in.
    - A magnetic `Menu` button (`data-btn`) whose bars cross into a close glyph.
  - A 1px progress line along the bar is scaled by `nav.ts`.
- Hero pitch: `hero.intro` is two lines (the claim in paper, the craft in paper-60, both with `text-wrap: balance`). The CTA under it is a typographic link (rolling label plus a red rule with an arrowhead that stretches on hover), not the boxed `Button`.
  - All navigation lives in the full-screen menu, at every width. It is a `clip-path: circle()` grown from the button centre (`--mx`/`--my`, set on open), with numbered giant links that rise in a stagger, dim their siblings and slide on hover, plus email, socials and the status.
  - On open, `nav.ts` marks the section under the viewport middle with `aria-current`, traps Tab inside the header, stops Lenis, and closes on Esc (returning focus to the button).
  - Plate geometry lives in CSS variables (`--plate-ar`, `--mon-*`, `--plate-top`, `--monitor-top`).
  - The mobile media query `(max-width: 767px), (max-aspect-ratio: 4/5)` MUST match `MOBILE_MQ` in `Hero.tsx`.
- `lib/fit.ts` holds the Anton glyph advance table. It sizes the hero words to the full width: `font-size = (container - 2*gutter) / ink`. This is per word on phones and for the whole phrase on desktop.
- Desk plates: `public/images/hero/desk.webp` (1536×743, aspect ratio 2.0673) and `desk-mobile.webp` (1024×806, aspect ratio 1.2705).
  - Both are transparent.
  - The originals had a fake checkerboard baked in, which was removed with a matte.
  - If you change the plates, update `DESK`/`DESK_M` in `Hero.tsx` and the `--plate-ar`/`--mon-*` variables.
- `lib/scenes/home.ts`:
  - `heroScene`: the dolly. The timeline duration must stay exactly 1, and `end = hero.offsetHeight - 2*stage.offsetHeight`.
  - `aboutScene`, `layersScene` and `workScene`.
  - `processScene`: the path uses `pathLength=1`, and anchor fractions are measured with a probe path.
- `lib/scenes/shared.ts` holds the shared helpers: `contactScene`, `fades` (used for reduced motion), `pauseOffscreen` (watches `[data-loop]`), and `willChange`.
- `content/process.ts` holds the bezier anchors and the logo `mark`, in a 1600×900 artboard coordinate space. `lib/path.ts` builds the path from them.
- `components/ProjectArt.tsx` uses `public/images/work/<slug>/{cover,preview-1}.webp` if those files exist. Otherwise it falls back to `PlaceholderArt` (SVG).
- `scripts/budget.mjs` gzip-sums the initial JS and CSS referenced by `.next/server/app/index.html`, excluding `noModule` scripts.

## Gotchas already hit (do not regress)
1. **`gsap.matchMedia().add({...})` only runs when at least ONE condition matches.** The `motion: "(prefers-reduced-motion: no-preference)"` key keeps phones working, so never remove it.
2. **GSAP rounds px values.** Sub-pixel tweens such as `strokeDashoffset` need `autoRound: false`.
3. **CSS Modules require "pure" selectors.** For a cross-component selector, put a local class plus a data attribute, for example `.grid:has([data-folder]:hover)`.
4. **Next 16 image specifics:** `images.qualities` must list every quality used (70 and 75). Use the `preload` prop, not the deprecated `priority`.
5. **Nav hrefs:** on the home page they are `#about`; on project pages they are `/#about` (`<Nav home />`). Lenis `anchors: true` handles the hash links.
6. **Fonts are self-hosted. Do not go back to `next/font/google`.** `lib/fonts.ts` loads the latin WOFF2 files in `app/fonts/` with `next/font/local`: Anton 400, and variable Manrope 200-800 and Caveat 400-700 (all SIL OFL). With `next/font/google`, Caveat at fixed weights intermittently failed the build with "next/font/google queries have exactly one entry", both locally and on a clean Vercel build. Google's CSS response varies by network. Local files need no network at build time.
7. **Do not toggle `will-change` on layers that scale.** The hero desk/plunge/text layers and the About letters/subject are permanently composited in CSS (inside `prefers-reduced-motion: no-preference`). Toggling them through `willChange()` made Chrome re-raster the 3.9x-scaled plate at the hero to About handoff, producing 100-350 ms frames. For the same reason, do not hide the hero layers with `visibility` once the fade is opaque: when they come back on the way up, they re-raster.
8. **Keep hero scrub short (0.3 desktop).** Lenis already smooths the wheel. The old 0.7 scrub on top of it made the dolly trail the scroll by over a second.
9. **Never give `.nav` a `transform` or `translate` while it is shown.** Even `translate: 0 0` makes the header the containing block for the `position: fixed` menu, which then collapses to the 64px bar. Only `[data-hidden]` sets `translate`, and opening the menu removes `data-hidden`.
10. **Keep `main { overflow-x: clip }` in `globals.css`.** Scrubbed titles start scaled (Work's "Selected files" starts at 1.3x). `body`'s `overflow-x` propagates to the viewport, so mobile browsers widened the whole layout to fit them: at 390px the page became 481px and the nav's Menu button fell off-screen. Check this with `document.documentElement.scrollWidth` at 390px.

## Hard rules from the client brief
- Copy:
  - No em or en dashes anywhere.
  - No eyebrow or kicker text above headings.
  - No emoji.
- Visual elements:
  - No cards or boxed tiles as content containers.
  - Only functional SVG glyphs: folder, tool cursors, close, arrow, eye.
- Colours come from the tokens in `globals.css`. Shadows are tinted red, never grey.
- Text:
  - The hero `h1` "Creative Designer" stays real DOM text (in `.sr-only`).
  - The visible letters are `aria-hidden`.

## Status
- Verified in headless Chrome at 360, 390, 768, 1440 and 1920 px:
  - hero landing and dolly
  - About selection and annotations
  - layers panel
  - process path draw and logo mark
  - folders
  - project page
  - no console errors
- Budgets:
  - **Initial JS is 132.9 KB against the 130 KB target. This FAILS, but the cause is the framework:** bare Next 16.4 + React 19 is 131.9 KB, and the site's own initial code is about 1 KB.
  - CSS is 12.9 KB (PASS).
  - First-load transfer is 393 KB, counted conservatively (PASS).
  - The hero AVIF the server actually sends is about 48 KB on desktop and 29 KB on mobile.
  - The desk plate is only 1536 px wide but is drawn at `100vw + 48px` (about 1950 px on a 1920 screen) and zoomed up to 3.9x. A 3072 px export would be sharper. Next only serves widths in `deviceSizes`, so adding 2560 and 3072 there would let HiDPI screens benefit.
- Scroll smoothness (headless Chrome on the dev machine's AMD iGPU, 1904x998, wheel through the hero into About):
  - Before the will-change fix: 15 frames over 50 ms, worst 350 ms, p95 50-83 ms.
  - After: p95 16.8 ms, worst 33-67 ms down and 19 ms up.
  - At 390x844 there is still one roughly 135 ms frame when About first arrives, probably the portrait's first raster. Not investigated.
- **Not yet tested:**
  - reduced-motion mode, visually
  - real iOS Safari or Firefox (including the Flip fallback path)
  - Lighthouse and real 4G LCP
  - frame-sequence mode (`heroScene.frameSequence`, never run with real frames)
  - the `DeskSilhouette` and lamp-portrait fallbacks
  - keyboard-only walkthrough of the layers panel and menu focus handling
- Good next debugging targets: the items above, plus `contain-intrinsic-size` accuracy on `<footer>` affecting anchor scroll to `#contact`.
