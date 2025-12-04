const CACHE_NAME = "app-cache-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/css/main.chunk.css"
];


self.addEventListener("install", (event) => {
  console.log("SW installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});


self.addEventListener("activate", (event) => {
  console.log("SW activated");
  event.waitUntil(self.clients.claim());
});


self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin === "https://api.tvmaze.com") {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((res) => res || fetch(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(
        (res) => res || fetch(event.request)
      )
    );
  }
});
