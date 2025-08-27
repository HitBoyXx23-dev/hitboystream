function create(e, t) {
    var a = document.createElement("div");
    a.classList.add("videoItem");

    let n = document.createElement("a");
    n.classList.add("thumbnail");

    // Changed href to point to seasons/season.html
    n.setAttribute("href", `seasons/season.html#${tvSlugify(e.name, e.original_name)}/${e.id}`);

    var r = document.createElement("img");
    r.loading = "lazy";
    r.src = getImage(e.poster_path);
    n.appendChild(r);

    var playIcon = document.createElement("div");
    playIcon.classList.add("playIcon");
    playIcon.innerHTML = "<i class='fas fa-arrow-right-to-bracket'></i>";
    n.appendChild(playIcon);

    let i = document.createElement("div");
    i.classList.add("dateOverlay");
    i.innerText = e.first_air_date.split("-")[0];
    n.appendChild(i);
    i.addEventListener("click", e => e.stopPropagation());

    if (e.vote_average) {
        var rating = document.createElement("div");
        rating.classList.add("ratingOverlay");
        rating.innerHTML = `<i class="fas fa-star"></i> ${e.vote_average.toFixed(1)}`;
        n.appendChild(rating);
        rating.addEventListener("click", e => e.stopPropagation());
    }

    themoviedb(`tv/${e.id}?language=` + getTmdbLanguage())
        .then(e => e.json())
        .then(e => {
            if ("Ended" === e?.status) {
                let start = e.first_air_date.split("-")[0],
                    end = e.last_air_date.split("-")[0];
                if (start !== end) i.innerText = start + "-" + end;
            }
            if (e.networks?.length > 0 && e.homepage) {
                let networkDiv = document.createElement("div");
                networkDiv.classList.add("networks");
                n.appendChild(networkDiv);

                let aLink = document.createElement("a");
                aLink.href = e.homepage;
                aLink.target = "_blank";
                aLink.rel = "noopener noreferrer";
                aLink.textContent = e.networks[e.networks.length - 1].name;
                networkDiv.appendChild(aLink);
            }
        });

    var title = document.createElement("h3");
    title.innerText = e.name;
    var overview = document.createElement("p");
    overview.innerText = e.overview;

    a.appendChild(n);
    a.appendChild(title);
    a.appendChild(overview);

    a.setAttribute("id", "tmdb-" + e.id.toString());
    (t ? searchResults : videoGrid).appendChild(a);
}
