function create(e, isSearchResult) {
    const a = document.createElement("div");
    a.classList.add("videoItem");

    // Link for the series
    const link = document.createElement("a");
    link.classList.add("thumbnail");

    // Construct URL using slugified series name and ID
    const seriesSlug = tvSlugify(e.name, e.original_name);
    link.href = `../seasons/season.html#/${seriesSlug}/${e.id}`;

    // Image
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = getImage(e.poster_path);
    link.appendChild(img);

    // Play icon overlay
    const playIcon = document.createElement("div");
    playIcon.classList.add("playIcon");
    playIcon.innerHTML = "<i class='fas fa-arrow-right-to-bracket'></i>";
    link.appendChild(playIcon);

    // Date overlay
    const dateOverlay = document.createElement("div");
    dateOverlay.classList.add("dateOverlay");
    dateOverlay.innerText = e.first_air_date?.split("-")[0] || "";
    link.appendChild(dateOverlay);
    dateOverlay.addEventListener("click", (evt) => evt.stopPropagation());

    // Rating overlay
    if (e.vote_average) {
        const ratingOverlay = document.createElement("div");
        ratingOverlay.classList.add("ratingOverlay");
        ratingOverlay.innerHTML = oranj('<i class="fas fa-star"></i>') + " " + e.vote_average.toFixed(1);
        link.appendChild(ratingOverlay);
        ratingOverlay.addEventListener("click", (evt) => evt.stopPropagation());
    }

    // Fetch extra info from TMDB
    themoviedb(`tv/${e.id}?language=${getTmdbLanguage()}`)
        .then(res => res.json())
        .then(tvData => {
            if (tvData?.status === "Ended") {
                const start = tvData.first_air_date?.split("-")[0];
                const end = tvData.last_air_date?.split("-")[0];
                if (start && end && start !== end) dateOverlay.innerText = `${start}-${end}`;
            }

            if (tvData.networks?.length && tvData.homepage) {
                const networksDiv = document.createElement("div");
                networksDiv.classList.add("networks");
                const homepageLink = document.createElement("a");
                homepageLink.href = tvData.homepage;
                homepageLink.target = "_blank";
                homepageLink.rel = "noopener noreferrer";
                homepageLink.textContent = tvData.networks[tvData.networks.length - 1].name;
                networksDiv.appendChild(homepageLink);
                link.appendChild(networksDiv);
            }
        });

    // Title and overview
    const title = document.createElement("h3");
    title.innerText = e.name;
    const overview = document.createElement("p");
    overview.innerText = e.overview;

    a.appendChild(link);
    a.appendChild(title);
    a.appendChild(overview);
    a.setAttribute("id", "tmdb-" + e.id);

    (isSearchResult ? searchResults : videoGrid).appendChild(a);
}
