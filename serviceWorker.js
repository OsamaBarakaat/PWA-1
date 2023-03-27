self.addEventListener("install", (event) => {
    console.log("installed")
    event.waitUntil(caches.open("demo1").then(cache => {
        return cache.addAll(["index.html", "js/section.js", "pics/gulp.jpg"])
    }).catch(err => console.log(err))
    )
})

self.addEventListener("activate", () => {
    console.log("Activated")
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((file) => {
            if (file) {
                return file
            }
            console.log("Network request:", event.request.url)
            return fetch(event.request.url)
        }).catch(err => { console.log(err) })
    )
})