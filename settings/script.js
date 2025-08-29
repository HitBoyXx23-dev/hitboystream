let tmdbQuality = document.getElementById("tmdb-image-quality"),
    tmdbLanguage = (tmdbQuality.value = getTmdbImageQuality(),
        tmdbQuality.addEventListener("change", () => {
            let quality = tmdbQuality.value === "w50" ? "w92" : tmdbQuality.value;
            setTmdbImageQuality(tmdbQuality.value);
            document.querySelectorAll(".tmdb-poster").forEach(img => {
                const path = img.dataset.posterPath;
                img.src = `https://image.tmdb.org/t/p/${quality}${path}`;
            });
        }),
        document.getElementById("tmdb-language"));

tmdbLanguage.value = getTmdbLanguage();
tmdbLanguage.addEventListener("change", () => {
    setTmdbLanguage(tmdbLanguage.value);

    // Check for Gibberish and reverse words
    if (tmdbLanguage.value === "gb-FZ") {
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
            el.dataset.originalText = el.dataset.originalText || el.textContent;
            el.textContent = el.dataset.originalText.split(" ").reverse().join(" ");
        });
    } else {
        // Restore original text if not Gibberish
        document.querySelectorAll("[data-original-text]").forEach(el => {
            el.textContent = el.dataset.originalText;
        });
    }
});
