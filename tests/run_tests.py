#!/usr/bin/env python3
"""Automated sanity checks for the Personal Portfolio project.

Run:  python3 tests/run_tests.py
Exit code 0 = all checks passed.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
failures = []


def check(name, ok):
    print(("PASS " if ok else "FAIL ") + name)
    if not ok:
        failures.append(name)


html = (SRC / "index.html").read_text(encoding="utf-8")
css = (SRC / "styles.css").read_text(encoding="utf-8")
js = (SRC / "app.js").read_text(encoding="utf-8")

check("index.html exists and links styles.css", 'href="styles.css"' in html)
check("index.html loads app.js", 'src="app.js"' in html)
check("SEO meta description present", 'name="description"' in html)
check("Open Graph tags present", 'property="og:title"' in html)
check("hero greeting element present", 'id="greeting"' in html)
check("live clock strip present", 'id="clock"' in html and 'id="dateLine"' in html)
check("theme toggle present", 'id="themeToggle"' in html)
check("project filter chips present", html.count('data-filter=') >= 4)
check("project cards present (6)", html.count('class="card"') == 6)
check("contact form has name/email/message fields",
      all(x in html for x in ('id="fName"', 'id="fEmail"', 'id="fMsg"')))
check("resume download link present", 'Clamor-Resume.txt' in html)
check("no personal email or phone in HTML (example.com placeholder allowed)",
      not re.search(r"[A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,}", html))
check("CSS defines dark theme", '[data-theme="dark"]' in css)
check("CSS defines weather accents", '[data-weather="rainy"]' in css)
check("JS has greeting logic", "greetingFor" in js)
check("JS has weather mapping", "weatherKind" in js)
check("JS has form validation", "formError" in js)
check("JS braces balanced", js.count("{") == js.count("}"))
check("README exists", (ROOT / "README.md").exists())
check("LICENSE exists", (ROOT / "LICENSE").exists())
check("assets: favicon + resume exist",
      (ROOT / "assets" / "favicon.svg").exists() and (ROOT / "assets" / "Clamor-Resume.txt").exists())

print(f"\n{len(failures)} failure(s).")
sys.exit(1 if failures else 0)
