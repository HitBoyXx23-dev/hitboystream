let videoGrid = document.getElementById("videoGrid")
  , title = document.getElementById("back")
  , provided_ids = window.location.hash.substring(2).toLowerCase().split("/")
  , show_id = provided_ids[1]
  , season_id = provided_ids[2];
function parseRuntime(e) {
    var t = Math.floor(e / 60)
      , e = e % 60 + "m";
    return 0 < t ? t + "h" + ("0m" != e ? " " + e : "") : "0m" == e ? "N/A" : e
}
let titleDocument = function(e, t) {
    e.first_air_date ? document.title = `${e.name} (${e.first_air_date.split("-")[0]}) Season ${t} · Heartive` : document.title = e.name + ` Season ${t} · Heartive`
};
function getImage(e) {
    return null == e ? "../previews/no-episode.png" : "https://image.tmdb.org/t/p/" + getTmdbImageQuality() + e
}
themoviedb(`tv/${show_id}?language=${getTmdbLanguage()}&append_to_response=external_ids`).then(e => e.json()).then(m => {
    let p = m.seasons.find(e => e.id == season_id).season_number;
    titleDocument(m, p),
    title.innerHTML = `<img draggable="false" class="emoji" alt="" src="../previews/branding/favicon-128x128.png"> Heartive - ${oranj(m.name)} <i class="fas fa-layer-group"></i> ` + oranj("Season " + p),
    title.setAttribute("href", `../seasons/#/${tvSlugify(m.name, m.original_name)}/` + show_id),
    themoviedb(`tv/${show_id}/season/${p}?language=` + getTmdbLanguage()).then(e => e.json()).then(e => {
        e.episodes.forEach(e => {
            let t = {
                type: "Series",
                title: m.name,
                year: m.first_air_date.split("-")[0],
                poster: getImage(e.still_path),
                season: p.toString(),
                totalSeasons: (m?.number_of_seasons || 0).toString(),
                episode: e.episode_number.toString(),
                totalEpisodes: (m?.number_of_episodes || 0).toString(),
                seasonNumber: Number(p),
                totalSeasonsNumber: Number(m?.number_of_seasons || 0),
                episodeNumber: Number(e.episode_number),
                totalEpisodesNumber: Number(m?.number_of_episodes || 0),
                seasonId: season_id.toString(),
                episodeId: e.id.toString(),
                tmdbId: show_id.toString(),
                imdbId: m?.external_ids?.imdb_id || null
            };
            var a = document.createElement("div");
            a.classList.add("videoItem");
            let n = document.createElement("a");
            n.classList.add("thumbnail"),
            n.target = "_blank",
            n.rel = "noopener noreferrer";
            var i = document.createElement("img")
              , d = (i.loading = "lazy",
            i.src = getImage(e.still_path),
            n.appendChild(i),
            hasOverride(t, n))
              , i = (n.addEventListener("click", async () => {
                document.body.querySelector(".modal") || (d || loadEmbeds(t),
                watched.add("e-" + t.episodeId),
                addCheckmark("e-" + t.episodeId, n))
            }
            ),
            document.createElement("div"));
            i.classList.add("playIcon"),
            i.innerHTML = "<i class='fas fa-play'></i>",
            n.appendChild(i);
            let s = document.createElement("div");
            s.classList.add("timeOverlay"),
            "N/A" !== parseRuntime(e.runtime) ? (t.runtime = e.runtime,
            s.innerText = parseRuntime(e.runtime) + " ● " + parseEndTime(e.runtime),
            setInterval( () => {
                try {
                    s.innerText = parseRuntime(e.runtime) + " ● " + parseEndTime(e.runtime)
                } catch (e) {}
            }
            , 2250)) : s.innerText = parseRuntime(e.runtime),
            n.appendChild(s),
            s.addEventListener("click", e => {
                e.stopPropagation()
            }
            ),
            watched.has("e-" + t.episodeId) && addCheckmark("e-" + t.episodeId, n),
            t.imdbId && !inFuture(e.air_date) && ((i = document.createElement("div")).classList.add("tor"),
            i.addEventListener("click", e => {
                e.stopPropagation()
            }
            ),
            (r = document.createElement("a")).innerHTML = '<i class="fa-solid fa-magnet"></i>',
            r.href = `../torrents?id=${t.imdbId}&season=${t.season}&episode=` + t.episode,
            r.target = "_blank",
            r.rel = "noopener noreferrer",
            i.appendChild(r),
            n.appendChild(i),
            tippy) && tippy(r, {
                content: "View torrents in new tab",
                animation: "shift-away-subtle"
            });
            var i = document.createElement("h3")
              , r = document.createElement("span")
              , o = (r.innerHTML = oranj(e.episode_number + ". "),
            document.createTextNode(e.name))
              , l = (!inFuture(e.air_date) && dateIsRecent(e.air_date) && ((l = document.createElement("img")).setAttribute("draggable", !1),
            l.classList.add("emoji"),
            l.setAttribute("alt", ""),
            l.setAttribute("src", "../previews/icons/new-24x24.png"),
            i.appendChild(l)),
            i.appendChild(r),
            i.appendChild(o),
            document.createElement("p"));
            l.innerText = e.overview,
            a.appendChild(n),
            a.appendChild(i),
            a.appendChild(l),
            inFuture(e.air_date) && (a.style.opacity = "0.5",
            a.style.filter = "grayscale(100%)",
            a.style.pointerEvents = "none",
            (r = document.createElement("div")).textContent = e.air_date ? properDate(e.air_date) : "",
            r.style.position = "absolute",
            r.style.top = "50%",
            r.style.left = "50%",
            r.style.transform = "translate(-50%, -50%)",
            r.style.fontSize = "24px",
            r.style.textShadow = "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 2px 2px 0 black, -2px -2px 0 black",
            n.appendChild(r)),
            videoGrid.appendChild(a)
        }
        )
    }
    )
}
);
