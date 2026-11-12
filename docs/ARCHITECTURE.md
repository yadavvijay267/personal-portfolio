# Architecture — Personal Portfolio

## Layout

Single page, three files, no build step:

- `src/index.html` — semantic sections: clock strip, sticky nav, hero,
  projects, skills, experience, contact, footer. SEO + Open Graph meta tags.
- `src/styles.css` — CSS custom properties for theming. `--accent` is
  overridden per weather kind (`data-weather` on `<html>`) and per theme
  (`data-theme="dark"`). Layout is Grid/Flexbox; mobile breakpoint at 760px
  turns the nav into a hamburger drawer.
- `src/app.js` — one IIFE, no dependencies. Owns: clock tick (1s interval),
  greeting, theme toggle + persistence, mobile menu, weather fetch, project
  filters, contact-form validation.

## The stand-out touches

1. **Time-aware greeting** — `greetingFor(hour)` maps the visitor's hour to
   morning/afternoon/evening/night.
2. **Weather-based accent** — Open-Meteo `current=temperature_2m,weather_code`
   (free, no key). `weatherKind(code)` maps WMO codes to
   sunny/cloudy/rainy/snowy/storm/foggy. Geolocation is tried once; on denial
   or timeout it falls back to Noida (28.5355, 77.3910). Location is never stored.
3. **Live clock strip** — updates every second; date uses `toLocaleDateString`.

## Contact form

Validated in the browser (name ≥ 2 chars, email regex, message ≥ 10 chars).
The form's `action` points at a placeholder Formspree ID; the script shows a
success message instead of submitting to the placeholder. Replace
`your-form-id` in `src/index.html` with a real Formspree form ID to go live.

## Deployment

Any static host: GitHub Pages (publish `src/`), Netlify, or Cloudflare Pages.
