# Testing — Personal Portfolio

## Automated checks

```bash
python3 tests/run_tests.py
```

Verifies: file wiring (HTML ↔ CSS/JS), SEO meta, greeting/clock/theme/filter
elements, 6 project cards, contact-form fields, weather + greeting logic in
`app.js`, balanced braces, and that no email address leaked into the HTML.

## Manual checklist

- [ ] Open `src/index.html`: hero greeting matches the current time of day.
- [ ] Clock strip ticks every second; date is today's date.
- [ ] Toggle dark/light — choice survives a page reload.
- [ ] Resize to 390px wide: hamburger menu opens, cards stack in one column.
- [ ] Click each project filter — only matching cards show.
- [ ] Submit the contact form empty → error shown; valid input → success note.
- [ ] With internet on: weather line shows a temperature and the accent colour changes.
- [ ] "Download résumé" downloads `Clamor-Resume.txt`.
