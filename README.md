# Personal Portfolio Website

A fast, responsive single-page portfolio for **Clamor** — QC Engineer in
telecom / fiber design (B.Tech EEE) and full-stack builder. This is the
public home on the web: the first link on a resume and GitHub profile.

## Features

- **Time-aware hero greeting** — "Good morning / afternoon / evening / night, I am"
  based on the visitor's local hour.
- **Weather-based accent colours** — the site's accent colour follows the live
  weather (Open-Meteo, free, no API key; geolocation with a Noida fallback).
- **Live clock/date strip** — current time and date across the top of every visit.
- **Dark/light theme toggle** — persisted in `localStorage`, defaults to the
  visitor's system preference.
- **Animated project cards with filters** — filter by Web / Tools / Data.
- **Contact form with validation** — client-side validation; wire it to a real
  Formspree form ID in `src/index.html` to receive messages (no backend needed).
- **Downloadable résumé button** and SEO meta tags (description, Open Graph).

## Tech stack

HTML, CSS (custom properties, Flexbox/Grid), vanilla JavaScript.
No build step, no framework. Deploys anywhere static — GitHub Pages or Netlify.

## How to run

Open `src/index.html` in any browser — that's it. For the live weather,
serve over HTTP(S) or allow the page's network request; everything else
works from a plain `file://` open.

```bash
# optional: serve locally
python3 -m http.server --directory src 8000
# then visit http://localhost:8000
```

## Screenshots

See [`screenshots/SCREENSHOTS.md`](screenshots/SCREENSHOTS.md).

## License

MIT — see [LICENSE](LICENSE).
