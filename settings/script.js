let tmdbQuality = document.getElementById("tmdb-image-quality")
  , tmdbLanguage = (tmdbQuality.value = getTmdbImageQuality(),
tmdbQuality.addEventListener("change", () => {
    setTmdbImageQuality(tmdbQuality.value)
}
),
document.getElementById("tmdb-language"));
tmdbLanguage.value = getTmdbLanguage(),
tmdbLanguage.addEventListener("change", () => {
    setTmdbLanguage(tmdbLanguage.value)
}
);
