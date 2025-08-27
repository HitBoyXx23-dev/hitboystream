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
                a = document.createElement("a");
            a.classList.add("thumbnail");

            // Updated href to point to view.html dynamically
            a.setAttribute("href", `https://hitboyxx23-dev.github.io/hitboystream/view/view.html#${tvSlugify(d.name, d.original_name)}/${show_id}/${e.id}`);

            var n = document.createElement("img");
            n.loading = "lazy";
            n.src = getImage(e.poster_path);
            a.appendChild(n);

            var playIcon = document.createElement("div");
            playIcon.classList.add("playIcon");
            playIcon.innerHTML = "<i class='fas fa-arrow-right-to-bracket'></i>";
            a.appendChild(playIcon);

            var dateOverlay = document.createElement("div");
            dateOverlay.classList.add("dateOverlay");
            dateOverlay.innerText = e.air_date.split("-")[0];
            a.appendChild(dateOverlay);
            dateOverlay.addEventListener("click", ev => { ev.stopPropagation(); });

            var h3 = document.createElement("h3");
            h3.innerHTML = oranj(e.season_number + ".") + " " + e.name;

            var p = document.createElement("p");
            p.innerText = e.overview;

            t.classList.add("videoItem");
            t.appendChild(a);
            t.appendChild(h3);
            t.appendChild(p);

            videoGrid.appendChild(t);
        });

        // Preload season details
        d.seasons.filter(e => 0 !== e.season_number).filter(e => !inFuture(e.air_date)).forEach(e => {
            try {
                themoviedb(`tv/${show_id}/season/${e.season_number}?language=` + getTmdbLanguage());
            } catch (e) { }
        });
    });
