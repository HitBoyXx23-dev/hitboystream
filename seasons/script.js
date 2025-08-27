let videoGrid = document.getElementById("videoGrid"),
    title = document.getElementById("back");

function getImage(e) {
    return null == e ? "../previews/no-poster.png" : "https://image.tmdb.org/t/p/" + getTmdbImageQuality() + e;
}

let titleDocument = function(e) {
    e.first_air_date ? document.title = `${e.name} (${e.first_air_date.split("-")[0]}) · Heartive` : document.title = e.name + " · Heartive";
};

let show_id = window.location.hash.substring(2).toLowerCase().split("/").pop();

show_id && 0 !== show_id.length && themoviedb(`tv/${show_id}?language=${getTmdbLanguage()}&append_to_response=external_ids`)
    .then(e => e.json())
    .then(d => {
        titleDocument(d);
        title.innerHTML = '<img draggable="false" class="emoji" alt="" src="../previews/branding/favicon-128x128.png"> Heartive - ' + oranj(d.name);

        d.seasons.filter(e => 0 !== e.season_number).filter(e => !inFuture(e.air_date)).forEach(e => {
            var t = document.createElement("div"),
                a = (t.classList.add("videoItem"), document.createElement("a")),
                n = (a.classList.add("thumbnail"),
                    // <-- updated link
                    a.setAttribute("href", `view/view.html#${tvSlugify(d.name, d.original_name)}/${show_id}/${e.id}`),
                    document.createElement("img")),
                n = (n.loading = "lazy",
                    n.src = getImage(e.poster_path),
                    a.appendChild(n),
                    document.createElement("div")),
                n = (n.classList.add("playIcon"),
                    n.innerHTML = "<i class='fas fa-arrow-right-to-bracket'></i>",
                    a.appendChild(n),
                    document.createElement("div")),
                n = (n.classList.add("dateOverlay"),
                    n.innerText = e.air_date.split("-")[0],
                    a.appendChild(n),
                    n.addEventListener("click", e => { e.stopPropagation() }),
                    document.createElement("h3")),
                i = (n.innerHTML = oranj(e.season_number + ".") + " " + e.name,
                    document.createElement("p"));
            i.innerText = e.overview;
            t.appendChild(a);
            t.appendChild(n);
            t.appendChild(i);
            videoGrid.appendChild(t);
        });

        d.seasons.filter(e => 0 !== e.season_number).filter(e => !inFuture(e.air_date)).forEach(e => {
            try {
                themoviedb(`tv/${show_id}/season/${e.season_number}?language=` + getTmdbLanguage());
            } catch (e) { }
        });
    });
