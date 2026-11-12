// Personal Portfolio — Clamor. Original vanilla JS.
// Time-aware greeting, live clock/date strip, weather-based accent,
// dark/light theme toggle, project filters, contact-form validation.
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Time-aware greeting + live clock ---------- */
  function greetingFor(hour) {
    if (hour >= 5 && hour < 12) return "Good morning, I am";
    if (hour >= 12 && hour < 17) return "Good afternoon, I am";
    if (hour >= 17 && hour < 21) return "Good evening, I am";
    return "Good night, I am";
  }
  function tick() {
    var now = new Date();
    var pad = function (n) { return String(n).padStart(2, "0"); };
    $("clock").textContent = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    $("dateLine").textContent = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    $("greeting").textContent = greetingFor(now.getHours());
    $("localTime").textContent = "Local time " + pad(now.getHours()) + ":" + pad(now.getMinutes());
    $("year").textContent = now.getFullYear();
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Theme toggle (persisted, defaults to system) ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("portfolio-theme"); } catch (e) {}
  function applyTheme(mode) {
    if (mode === "dark" || mode === "light") root.setAttribute("data-theme", mode);
    else root.setAttribute("data-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var dark = root.getAttribute("data-theme") === "dark";
    $("themeToggle").textContent = dark ? "☀️ Light" : "🌙 Dark";
  }
  applyTheme(saved);
  $("themeToggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    applyTheme(next);
  });

  /* ---------- Mobile menu ---------- */
  $("menuToggle").addEventListener("click", function () {
    var open = $("navLinks").classList.toggle("open");
    this.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () { $("navLinks").classList.remove("open"); });
  });

  /* ---------- Weather-based accent (Open-Meteo, no key; Noida default) ---------- */
  function weatherKind(code) {
    if (code === 0 || code === 1) return "sunny";
    if (code === 2 || code === 3) return "cloudy";
    if (code === 45 || code === 48) return "foggy";
    if (code >= 51 && code <= 67) return "rainy";
    if (code >= 71 && code <= 77) return "snowy";
    if (code >= 80 && code <= 82) return "rainy";
    if (code >= 85 && code <= 86) return "snowy";
    if (code >= 95) return "storm";
    return "cloudy";
  }
  function fetchWeather(lat, lon, label) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=temperature_2m,weather_code&timezone=auto")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var kind = weatherKind(d.current.weather_code);
        root.setAttribute("data-weather", kind);
        $("weatherLine").textContent = "Weather in " + label + ": " + Math.round(d.current.temperature_2m) + "°C · " + kind;
        $("weatherAccentNote").textContent = "Accent colour follows today's weather (" + kind + ")";
      })
      .catch(function () { $("weatherLine").textContent = "Weather: unavailable (offline?)"; });
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (p) { fetchWeather(p.coords.latitude, p.coords.longitude, "your location"); },
      function () { fetchWeather(28.5355, 77.3910, "Noida"); },
      { timeout: 5000 });
  } else { fetchWeather(28.5355, 77.3910, "Noida"); }

  /* ---------- Project filters ---------- */
  var chips = document.querySelectorAll(".chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      var f = chip.getAttribute("data-filter");
      var shown = 0;
      document.querySelectorAll("#projectGrid .card").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.hidden = !show;
        if (show) shown++;
      });
      $("noResults").hidden = shown > 0;
    });
  });

  /* ---------- Contact form validation ---------- */
  $("contactForm").addEventListener("submit", function (e) {
    var name = $("fName").value.trim(), email = $("fEmail").value.trim(), msg = $("fMsg").value.trim();
    var err = "";
    if (name.length < 2) err = "Please enter your name (at least 2 characters).";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err = "Please enter a valid email address.";
    else if (msg.length < 10) err = "Please write a message of at least 10 characters.";
    if (err) {
      e.preventDefault();
      $("formError").textContent = err;
      $("formError").hidden = false;
      $("formOk").hidden = true;
      return;
    }
    // Demo mode: the placeholder Formspree ID is not real, so do not
    // submit to a dead endpoint — show success and stop here.
    if (this.action.indexOf("your-form-id") !== -1) {
      e.preventDefault();
      $("formError").hidden = true;
      $("formOk").hidden = false;
    }
  });
})();
