// ====== TMDB IMAGE QUALITY ======
const tmdbQuality = document.getElementById("tmdb-image-quality");

if (tmdbQuality) {
  // Initialize quality
  tmdbQuality.value = getTmdbImageQuality();

  // Update quality on change
  tmdbQuality.addEventListener("change", () => {
    let quality = tmdbQuality.value;
    // Fix: fallback w50 to w92
    if (quality === "w50") quality = "w92";

    setTmdbImageQuality(tmdbQuality.value);

    document.querySelectorAll(".tmdb-poster").forEach(img => {
      const path = img.dataset.posterPath;
      if (path) {
        img.src = `https://image.tmdb.org/t/p/${quality}${path}`;
      }
    });
  });
}

// ====== TMDB LANGUAGE DROPDOWN (Settings page only) ======
const tmdbLanguage = document.getElementById("tmdb-language");

if (tmdbLanguage) {
  tmdbLanguage.value = getTmdbLanguage();

  tmdbLanguage.addEventListener("change", () => {
    setTmdbLanguage(tmdbLanguage.value);
    applyGibberish();
  });
}

// ====== GIBBERISH LOGIC ======
function applyGibberish() {
  const language = getTmdbLanguage();

  if (language === "gb-FZ") {
    // Transform text to gibberish
    document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
      if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
      el.textContent = el.dataset.originalText
        .split(" ")
        .map(word => Array.from({ length: word.length }, () =>
          String.fromCharCode(97 + Math.floor(Math.random() * 26))
        ).join(''))
        .join(" ");
    });
  } else {
    // Restore original text
    document.querySelectorAll("[data-original-text]").forEach(el => {
      el.textContent = el.dataset.originalText;
    });
  }
}

// ====== APPLY GIBBERISH ON PAGE LOAD ======
applyGibberish();

// ====== HANDLE DYNAMIC CONTENT ======
const observer = new MutationObserver(() => applyGibberish());
observer.observe(document.body, { childList: true, subtree: true });
