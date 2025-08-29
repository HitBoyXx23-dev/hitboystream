// ====== TMDB IMAGE QUALITY ======
const tmdbQuality = document.getElementById("tmdb-image-quality");

if (tmdbQuality) {
    // Initialize quality
    tmdbQuality.value = getTmdbImageQuality();

    // Update quality on change
    tmdbQuality.addEventListener("change", () => {
        const quality = tmdbQuality.value === "w50" ? "w92" : tmdbQuality.value;
        setTmdbImageQuality(tmdbQuality.value);

        document.querySelectorAll(".tmdb-poster").forEach(img => {
            const path = img.dataset.posterPath;
            img.src = `https://image.tmdb.org/t/p/${quality}${path}`;
        });
    });
}

// ====== TMDB LANGUAGE STORAGE ======
function getCurrentLanguage() {
    return localStorage.getItem("tmdbLanguage") || "en-US"; // default language
}

function setCurrentLanguage(lang) {
    localStorage.setItem("tmdbLanguage", lang);
}

// ====== TMDB LANGUAGE DROPDOWN (Settings Page) ======
const tmdbLanguage = document.getElementById("tmdb-language");

if (tmdbLanguage) {
    tmdbLanguage.value = getCurrentLanguage();

    tmdbLanguage.addEventListener("change", () => {
        const lang = tmdbLanguage.value;
        setCurrentLanguage(lang);
        applyGibberish();
    });
}

// ====== GIBBERISH LOGIC ======
function applyGibberish() {
    const lang = getCurrentLanguage();

    if (lang === "gb-FZ") {
        // Transform text to gibberish
        document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a").forEach(el => {
            el.dataset.originalText = el.dataset.originalText || el.textContent;
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
const observer = new MutationObserver(applyGibberish);
observer.observe(document.body, { childList: true, subtree: true });
