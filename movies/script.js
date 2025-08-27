let searchInput = document.getElementById("searchInput")
  , videoGrid = document.getElementById("videoGrid")
  , searchResults = document.getElementById("searchResults")
  , navregion = !!navigator.language && navigator.language.split("-")[1]
  , region = navregion || "US";
var currentPage = 3;
async function get(e) {
    return themoviedb(`trending/movie/week?language=${getTmdbLanguage()}&page=` + e).then(e => e.json()).then(e => e.results)
}
function getImage(e) {
    return null == e ? "../previews/no-poster.png" : "https://image.tmdb.org/t/p/" + getTmdbImageQuality() + e
}
function parseRuntime(e) {
    var t = Math.floor(e / 60)
      , e = e % 60 + "m";
    return 0 < t ? t + "h" + ("0m" != e ? " " + e : "") : "0m" == e ? null : e
}
function create(i, e) {
    let d = {
        type: "Movie",
        title: i.title,
        year: i.release_date.split("-")[0],
        poster: i.backdrop_path ? "https://image.tmdb.org/t/p/original" + i.backdrop_path : null,
        tmdbId: i.id.toString()
    };
    var t = document.createElement("div");
    t.classList.add("videoItem");
    let s = document.createElement("a");
    s.classList.add("thumbnail"),
    s.target = "_blank",
    s.rel = "noopener noreferrer";
    var a = document.createElement("img")
      , l = (a.loading = "lazy",
    a.src = getImage(i.poster_path),
    s.appendChild(a),
    !1)
      , a = (s.addEventListener("click", async () => {
        document.body.querySelector(".modal") || l || loadEmbeds(d)
    }
    ),
    document.createElement("div"));
    a.classList.add("playIcon"),
    a.innerHTML = "<i class='fas fa-play'></i>",
    s.appendChild(a);
    let o = document.createElement("div");
    o.classList.add("dateOverlay"),
    o.innerText = d.year,
    s.appendChild(o),
    o.addEventListener("click", e => {
        e.stopPropagation()
    }
    ),
    themoviedb(`movie/${i.id}?append_to_response=release_dates,videos`).then(e => e.json()).then(e => {
        d.imdbId = e?.imdb_id,
        l = hasOverride(d, s),
        e.runtime && parseRuntime(e.runtime) && (d.runtime = e.runtime,
        o.innerText = `${d.year} ● ${parseRuntime(e.runtime)} ● ` + parseEndTime(e.runtime),
        setInterval( () => {
            try {
                o.innerText = `${d.year} ● ${parseRuntime(e.runtime)} ● ` + parseEndTime(e.runtime)
            } catch (e) {}
        }
        , 2250)),
        i.vote_average && ((a = document.createElement("div")).classList.add("ratingOverlay"),
        a.innerHTML = oranj('<i class="fas fa-star"></i>') + " " + i.vote_average.toFixed(1),
        s.appendChild(a),
        a.addEventListener("click", e => {
            e.stopPropagation()
        }
        ));
        var t, a, n, r = !1;
        e.release_dates && e.release_dates.results && ((a = e.release_dates.results.find(e => Object.values(e)[0] == region)) && a.release_dates.every(function(e) {
            return !(4 <= e.type && !inFuture(e.release_date) && (r = !0))
        }),
        (r = r || d.year && 3 <= (new Date).getFullYear() - Number(d.year)) || ((a = document.createElement("div")).classList.add("cam"),
        s.appendChild(a),
        (t = document.createElement("a")).innerHTML = '<i class="fas fa-film"></i> IN CINEMA',
        a.appendChild(t),
        tippy && tippy(t, {
            content: "Streams might be cam or low quality",
            animation: "shift-away-subtle"
        }))),
        e.videos && e.videos.results && (a = e.videos.results.find(e => "Trailer" == e.type && e.official && ("Official Trailer" == e.name || "Main Trailer" == e.name)),
        t = e.videos.results.find(e => "Trailer" == e.type && e.official),
        n = e.videos.results.find(e => "Teaser" == e.type && e.official && e.name.toLowerCase().includes("teaser")),
        a = a || t || n) && "YouTube" == a.site && ((t = document.createElement("div")).classList.add("trailerOverlay"),
        (n = document.createElement("a")).textContent = "Open Trailer",
        n.title = a.name,
        n.href = "https://www.youtube.com/watch?v=" + a.key,
        n.target = "_blank",
        n.rel = "noopener noreferrer",
        t.appendChild(n),
        s.appendChild(t),
        t.addEventListener("click", e => {
            e.stopPropagation()
        }
        )),
        d.imdbId && ((a = document.createElement("div")).classList.add(r ? "torright" : "tor"),
        a.addEventListener("click", e => {
            e.stopPropagation()
        }
        ),
        (n = document.createElement("a")).innerHTML = '<i class="fa-solid fa-magnet"></i>',
        n.href = "../torrents?id=" + d.imdbId,
        n.target = "_blank",
        n.rel = "noopener noreferrer",
        a.appendChild(n),
        s.appendChild(a),
        tippy) && tippy(n, {
            content: "View torrents in new tab",
            animation: "shift-away-subtle"
        })
    }
    );
    var a = document.createElement("h3")
      , n = (a.innerText = d.title,
    document.createElement("p"));
    n.innerText = i.overview,
    t.appendChild(s),
    t.appendChild(a),
    t.appendChild(n),
    t.setAttribute("id", "tmdb-" + d.tmdbId),
    (e ? searchResults : videoGrid).appendChild(t)
}
async function display() {
    let e = [];
    for (var t = 1; t <= currentPage; t++) {
        var a = await get(t);
        e = e.concat(a)
    }
    e.filter(e => !inFuture(e.release_date)).forEach(e => {
        create(e)
    }
    )
}
let searchTimeout;
searchInput.addEventListener("input", async () => {
    clearTimeout(searchTimeout),
    searchTimeout = setTimeout( () => {
        themoviedb(`search/movie?query=${searchInput.value.trim()}&include_adult=false&language=` + getTmdbLanguage()).then(e => e.json()).then(async e => {
            searchResults.innerHTML = "",
            e.results.filter(e => !inFuture(e.release_date)).forEach(e => {
                create(e, !0)
            }
            )
        }
        )
    }
    , 500)
}
),
window.addEventListener("scroll", async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200)
        for (var e = (currentPage += 3) - 2; e <= currentPage; e++)
            (await get(e)).filter(e => !inFuture(e.release_date) && !document.getElementById("tmdb-" + e.id.toString())).forEach(e => {
                create(e, !1)
            }
            )
}
),
display();
