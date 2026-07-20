# Rifqi Sigwan Nugraha — Editorial evidence portfolio

A dependency-free static portfolio tailored to full-stack AI development and pipeline-debugging roles. It combines the original calm editorial identity—Fraunces typography, warm-paper/charcoal themes, portrait-led composition, and restrained motion—with recruiter-readable product evidence.

## Run locally

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Release status

The public portfolio contains no testimonial section or placeholder quotes. The candidate chose to apply without testimonials rather than publish an unapproved or fabricated endorsement.

## Evidence notes

- NALAR is labelled as a prototype using synthetic data. Its public demo and repository are linked.
- The mobile incident is anonymised and contains no client source, identifiers, screenshots, or raw logs.
- Protein RADAR is explicitly described as a team build and Rifqi as project lead, not sole author. Only the live app is linked; its team repository remains unlinked until historical configuration findings can be resolved with collaborators.
- Qoffea links only to source because its former deployment is retired.
- CareCanvas links to a verified deterministic public demo and repository. Its Claude, fal.ai, Supabase, and Inngest paths are accurately described as environment-gated production-mode adapters; paid-provider execution is not claimed.
- The Shariah Trading Assistant links to its sanitised public repository after 24 tests and a frontend production build passed.

## Structure

```text
index.html              Semantic content, metadata, and structured data
assets/css/styles.css   Dual-theme visual system, reflow, motion, and print rules
assets/js/main.js       Theme, accessible navigation, reveal, and scroll state
assets/js/music.js      User-initiated generative ambient sound
assets/fonts/           Self-hosted Latin font subsets for fast first paint
assets/img/             Profile and real product-preview imagery
robots.txt              Search crawler policy
sitemap.xml             Canonical public URL
```

## Verified UI baseline

- No horizontal overflow at 320, 390, or 1440 CSS pixels.
- Keyboard menu opens on its first link and returns focus to the trigger on Escape.
- Reduced-motion mode removes reveal/parallax motion.
- Local Lighthouse baseline: 91 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.
- HTML validation passes with no errors.

## Pre-deploy checklist

- Validate HTML and CSS.
- Run an accessibility check at mobile and desktop widths.
- Test keyboard navigation, focus visibility, 400% reflow, and reduced motion.
- Open every external link in a private browser session.
- Confirm the CV asset exists and extracts to selectable text.
- Confirm no high/critical dependency or secret-scanning findings in linked repositories.
- Keep every unverified project claim out of the public release.
