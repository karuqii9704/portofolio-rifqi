# Rifqi Sigwan Nugraha — Evidence-first portfolio

A dependency-free static portfolio tailored to full-stack AI development and pipeline-debugging roles. The site prioritises shipped work, incident reasoning, verification, and honest project status over generic skill claims.

## Run locally

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Remaining release blocker

`#testimonials` is `hidden` and marked `pending-approved-quote`. Remove `hidden` only after both contributors approve the exact quote, attribution, relationship description, and verification link.

## Evidence notes

- NALAR is labelled as a prototype using synthetic data. Its public demo and repository are linked.
- The mobile incident is anonymised and contains no client source, identifiers, screenshots, or raw logs.
- Protein RADAR is explicitly described as a team build and Rifqi as project lead, not sole author.
- Qoffea links only to source because its former deployment is retired.
- CareCanvas links to a verified deterministic public demo and repository. Its Claude, fal.ai, Supabase, and Inngest paths are accurately described as environment-gated production-mode adapters; paid-provider execution is not claimed.
- The Shariah Trading Assistant links to its sanitised public repository after 24 tests and a frontend production build passed.

## Structure

```text
index.html              Semantic content, metadata, and structured data
assets/css/styles.css   Responsive visual system and print rules
assets/js/main.js       Accessible mobile navigation and current year
assets/img/             Existing profile imagery
robots.txt              Search crawler policy
sitemap.xml             Canonical public URL
```

## Pre-deploy checklist

- Validate HTML and CSS.
- Run an accessibility check at mobile and desktop widths.
- Test keyboard navigation, focus visibility, 400% reflow, and reduced motion.
- Open every external link in a private browser session.
- Confirm the CV asset exists and extracts to selectable text.
- Confirm no high/critical dependency or secret-scanning findings in linked repositories.
- Keep all unverified projects and testimonials visibly pending or hidden.
