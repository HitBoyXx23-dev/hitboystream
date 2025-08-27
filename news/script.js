let videoGrid = document.getElementById("videoGrid");
newsapi().then(e => {
    "ok" == e.status && ((e = e.articles.filter(e => "[Removed]" !== e.title).filter(e => null != e.urlToImage)).sort( (e, t) => new Date(t.publishedAt) - new Date(e.publishedAt)),
    e.forEach(e => {
        var e = {
            source: e.source.name ? e.source.name.split(".")[0] : "no source",
            title: e.title || "no title",
            poster: e.urlToImage,
            published: new Date(e.publishedAt).toDateString(),
            reference: e.url || "https://google.com",
            content: e.description || ""
        }
          , t = document.createElement("div")
          , n = (t.classList.add("videoItem"),
        document.createElement("a"));
        n.classList.add("thumbnail"),
        n.target = "_blank",
        n.rel = "noopener noreferrer",
        n.href = e.reference;
        let r = document.createElement("img");
        r.loading = "lazy",
        r.src = e.poster,
        r.addEventListener("error", () => {
            r.src = "../previews/no-episode.png"
        }
        ),
        n.appendChild(r);
        var d = document.createElement("div")
          , d = (d.classList.add("playIcon"),
        d.innerHTML = "<i class='fas fa-arrow-up-right-from-square'></i>",
        n.appendChild(d),
        document.createElement("div"))
          , d = (d.classList.add("dateOverlay"),
        d.innerText = e.source,
        n.appendChild(d),
        d.addEventListener("click", e => {
            e.stopPropagation()
        }
        ),
        document.createElement("div"))
          , d = (d.classList.add("timeOverlay"),
        d.innerText = e.published,
        n.appendChild(d),
        d.addEventListener("click", e => {
            e.stopPropagation()
        }
        ),
        document.createElement("h3"))
          , i = (d.innerText = e.title,
        document.createElement("p"));
        i.innerText = e.content,
        t.appendChild(n),
        t.appendChild(d),
        t.appendChild(i),
        videoGrid.appendChild(t)
    }
    ))
}
);
