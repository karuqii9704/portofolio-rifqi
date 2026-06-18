# Rifqi Sigwan Nugraha — Portfolio

Calm, cool, elegant single-page portfolio. Light + dark themes, generative ambient music, scroll animations. Pure static — no build step, no dependencies.

## Run locally

Any static server works. Easiest:

```bash
# Python (already installed)
python -m http.server 5500
# then open http://localhost:5500

# or Node
npx serve .
```

## Structure

```
index.html              # all markup
assets/
  css/styles.css        # theme tokens + layout (light/dark via [data-theme])
  js/main.js            # theme toggle, scroll reveal, nav, progress
  js/music.js           # generative Web Audio ambient (no audio files)
  img/profile.jpg       # hero portrait
  Rifqi-...-CV.pdf       # downloadable CV
```

## Notes

- **Theme** persists in `localStorage`; first visit follows the OS preference.
- **Music** is fully generated in the browser (a slow four-chord ambient pad).
  Browsers block autoplay, so it starts only when you click the speaker icon.
- Respects `prefers-reduced-motion`.

## Editing content

All copy lives in `index.html`. Colours/spacing are CSS variables at the top of
`assets/css/styles.css` (`--accent`, `--bg`, etc.) — tweak there to retheme.
