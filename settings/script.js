// ====== TMDB IMAGE QUALITY ======
const tmdbQuality = document.getElementById("tmdb-image-quality");

if (tmdbQuality) {
  tmdbQuality.value = getTmdbImageQuality();

  tmdbQuality.addEventListener("change", () => {
    let quality = tmdbQuality.value;
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

// ====== TMDB LANGUAGE DROPDOWN ======
const tmdbLanguage = document.getElementById("tmdb-language");

if (tmdbLanguage) {
  tmdbLanguage.value = getTmdbLanguage();

  // Apply gibberish initially if gi-FZ is selected
  applyGibberish();

  tmdbLanguage.addEventListener("change", () => {
    setTmdbLanguage(tmdbLanguage.value);
    applyGibberish(); // Reverse words only on gi-FZ
  });
}

// ====== GIBBERISH LOGIC (Reverse Words) ======
function applyGibberish() {
  if (!tmdbLanguage) return;

  const language = getTmdbLanguage();

  // Reverse each word in a string
  function reverseWords(text) {
    return text
      .split(" ")
      .map(word => word.split("").reverse().join(""))
      .join(" ");
  }

  if (language === "gi-FZ") {
    // Apply reverse-words gibberish
    document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
      if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
      el.textContent = reverseWords(el.dataset.originalText);
    });
  } else {
    // Restore original text for normal languages
    document.querySelectorAll("[data-original-text]").forEach(el => {
      el.textContent = el.dataset.originalText;
    });
  }
}
