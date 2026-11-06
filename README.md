# Creative Designer portfolio
Next.js 16 App Router, TypeScript strict, CSS Modules, GSAP and Lenis loaded lazily after first paint.
Run: `npm install`, then `npm run dev` (http://localhost:3000). Production: `npm run build && npm start`.
Edit all copy, projects and links in `content/*.ts`. Search for the markers NAME, EMAIL, CITY, SOCIAL_URLS. Set `NEXT_PUBLIC_SITE_URL` for SEO.
Hero plates: `public/images/hero/desk.webp` (1536x743) and `desk-mobile.webp` (1024x806), transparent WebP. Remove both to get the CSS and SVG silhouette.
If you change plate dimensions, update `DESK` and `DESK_M` in `components/Hero.tsx` and the `--plate-ar` and `--mon-*` values in `Hero.module.css`.
Portrait: `public/images/portrait-cutout.webp`. Delete it and About switches to the lettering and lamp fallback.
Projects: add `public/images/work/<slug>/cover.webp` and `preview-1.webp` (120 KB max each). Missing files render SVG placeholder art.
Optional scroll sequence: set `heroScene.frameSequence.enabled` and add frames to `public/images/hero/seq/0001.webp` onward.
Budget check: `npm run build && npm run budget`. A bare Next 16.4 + React 19.3 page is already 131.9 KB of JS, so expect about 133 KB. Assets under /images are cached as immutable: rename files when you replace them.
