# Rifqi Sigwan Nugraha — Portfolio

A dark, motion-led single-page portfolio for Rifqi's software engineering work.
Built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

## Structure

```text
index.html                 Vite entry, metadata, structured data, font preloads
src/App.tsx                Section order
src/data/content.ts        All copy, projects, services, and links in one place
src/components/            FadeIn, Magnet, AnimatedText, buttons, WorkTile
src/sections/              Hero, Marquee, About, Services, Projects, Contact
public/assets/img/         Portrait and real product-preview imagery
public/assets/fonts/       Self-hosted Kanit subsets (latin + latin-ext)
public/assets/decor/       Locally drawn decorative SVGs for the About section
public/legacy.html         The previous editorial portfolio, kept for reference
public/privacy.html        Privacy page (served at /privacy)
public/terms.html          Terms page (served at /terms)
```

Content lives in `src/data/content.ts`. Editing copy, swapping a project, or
adding a service should not require touching a component.

## Evidence notes

The claims on this page are kept to what can be checked:

- CareCanvas links to a verified deterministic public demo. Its Claude, fal.ai,
  Supabase, and Inngest paths are environment-gated production-mode adapters;
  paid-provider execution is not claimed.
- NALAR is labelled a prototype and runs on synthetic data.
- The research card links to the indexed IEEE Xplore record for the
  synthetic-IoT-data paper, not to any other project.
- Marquee row one is Rifqi's own work. Row two is third-party motion reference
  hotlinked from `motionsites.ai` and is labelled as such on the page. Tiles
  that fail to load are dropped so the row never renders broken images.

## Assets

- The hero portrait is derived from `public/assets/img/profile.jpg` with a
  spotlight grade and an alpha falloff so it dissolves into the `#0C0C0C`
  background instead of reading as a photo card.
- Kanit is self-hosted so first paint does not depend on a third-party font
  host. Weights 300/400/500/600/900 cover every weight the UI uses.
- The About section's decorative marks are locally drawn SVGs.

## Verified UI baseline

- No horizontal overflow at 390 or 1440 CSS pixels.
- `npm run build` passes with TypeScript in strict mode.
- `npm audit` reports 0 vulnerabilities.
- Reduced-motion mode disables the magnetic portrait and collapses transitions.
- Keyboard focus is visible on every link and button; a skip link precedes the page.

## Pre-deploy checklist

- Run `npm run build` and confirm the typecheck passes.
- Check an accessibility pass at mobile and desktop widths.
- Test keyboard navigation, focus visibility, 400% reflow, and reduced motion.
- Open every external link in a private browser session.
- Confirm the CV asset exists and extracts to selectable text.
- Keep every unverified project claim out of the public release.
