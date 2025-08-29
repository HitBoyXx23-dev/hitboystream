// Get TMDB quality and language elements
let tmdbQuality = document.getElementById("tmdb-image-quality");
let tmdbLanguage = document.getElementById("tmdb-language");

// Initialize quality and language
tmdbQuality.value = getTmdbImageQuality();
tmdbLanguage.value = getTmdbLanguage();

// Update TMDB image quality when changed
tmdbQuality.addEventListener("change", () => {
    let quality = tmdbQuality.value === "w50" ? "w92" : tmdbQuality.value;
    setTmdbImageQuality(tmdbQuality.value);

    document.querySelectorAll(".tmdb-poster").forEach(img => {
        const path = img.dataset.posterPath;
        img.src = `https://image.tmdb.org/t/p/${quality}${path}`;
    });
});

// Update TMDB language when changed
tmdbLanguage.addEventListener("change", () => {
    setTmdbLanguage(tmdbLanguage.value);

    if (tmdbLanguage.value === "gb-FZ") {
        // Reverse words for "gibberish" language
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
            el.dataset.originalText = el.dataset.originalText || el.textContent;
            el.textContent = el.dataset.originalText.split(" ").reverse().join(" ");
        });
    } else {
        // Restore original text
        document.querySelectorAll("[data-original-text]").forEach(el => {
            el.textContent = el.dataset.originalText;
        });
    }
});
