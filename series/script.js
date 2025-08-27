let searchInput = document.getElementById("searchInput"),
    videoGrid = document.getElementById("videoGrid"),
    searchResults = document.getElementById("searchResults");
var currentPage = 3;

async function get(e) {
    return themoviedb(`trending/tv/week?language=${getTmdbLanguage()}&page=` + e)
        .then(e => e.json())
        .then(e => e.results);
}

function getImage(e) {
    return null == e ? "../previews/no-poster.png" : "https://image.tmdb.org/t/p/" + getTmdbImageQuality() + e;
}

function create(e, t) {
    var a = document.createElement("div");
    a.classList.add("videoItem");
    
    let n = document.createElement("a");
    n.classList.add("thumbnail");
    // Updated href line
    n.setAttribute("href", `https://hitboyxx23-dev.github.io/hitboystream/seasons/seasons.html#/${tvSlugify(e.name, e.original_name)}/${e.id}`);
    
    var r = document.createElement("img"),
        r = (r.loading = "lazy",
            r.src = getImage(e.poster_path),
            n.appendChild(r),
            document.createElement("div"));
    r.classList.add("playIcon"),
    r.innerHTML = "<i class='fas fa-arrow-right-to-bracket'></i>",
    n.appendChild(r);
    
    let i = document.createElement("div");
    i.classList.add("dateOverlay"),
    i.innerText = e.first_air_date.split("-")[0],
    n.appendChild(i),
    i.addEventListener("click", e => {
        e.stopPropagation()
    });
    
    e.vote_average && ((r = document.createElement("div")).classList.add("ratingOverlay"),
    r.innerHTML = oranj('<i class="fas fa-star"></i>') + " " + e.vote_average.toFixed(1),
    n.appendChild(r),
    r.addEventListener("click", e => {
        e.stopPropagation()
    }));
    
    themoviedb(`tv/${e.id}?language=` + getTmdbLanguage())
        .then(e => e.json())
        .then(e => {
            var t, a;
            "Ended" === e?.status && (t = e.first_air_date.split("-")[0]) !== (a = e.last_air_date.split("-")[0]) && (i.innerText = t + "-" + a),
            e.networks && 0 < e.networks.length && e.homepage && ((t = document.createElement("div")).classList.add("networks"),
            n.appendChild(t),
            (a = document.createElement("a")).href = e.homepage,
            a.target = "_blank",
            a.rel = "noopener noreferrer",
            a.textContent = e.networks[e.networks.length - 1].name,
            t.appendChild(a))
        });
    
    var r = document.createElement("h3"),
        d = (r.innerText = e.name,
            document.createElement("p"));
    d.innerText = e.overview,
    a.appendChild(n),
    a.appendChild(r),
    a.appendChild(d),
    a.setAttribute("id", "tmdb-" + e.id.toString()),
    (t ? searchResults : videoGrid).appendChild(a);
}

async function display() {
    let e = [];
    for (var t = 1; t <= currentPage; t++) {
        var a = await get(t);
        e = e.concat(a);
    }
    e.filter(e => !inFuture(e.first_air_date)).forEach(e => {
        create(e);
    });
}

let searchTimeout;
searchInput.addEventListener("input", async () => {
    clearTimeout(searchTimeout),
    searchTimeout = setTimeout(() => {
        themoviedb(`search/tv?query=${searchInput.value.trim()}&include_adult=false&language=` + getTmdbLanguage())
            .then(e => e.json())
            .then(async e => {
                searchResults.innerHTML = "",
                e.results.filter(e => !inFuture(e.first_air_date)).forEach(e => {
                    create(e, !0)
                });
            });
    }, 500);
});

window.addEventListener("scroll", async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200)
        for (var e = (currentPage += 3) - 2; e <= currentPage; e++)
            (await get(e)).filter(e => !inFuture(e.first_air_date) && !document.getElementById("tmdb-" + e.id.toString())).forEach(e => {
                create(e, !1)
            });
});

display();
