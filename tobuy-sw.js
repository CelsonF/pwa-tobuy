var cacheName = "tobuy-v1.0";

self.addEventListener("install", function (event) {
	caches.open(cacheName).then((cache) => {
		cache.addAll([
			"/",
			"/index.html",
			"/manifest.webmanifest",
			"/tobuy-sw.js",
			"/assets/appicon/android-48.png",
			"/assets/appicon/android-72.png",
			"/assets/appicon/android-144.png",
			"/assets/appicon/android-196.png",
			"/asset/css/stylebuy.css",
			"/assets/css/theme.css",
			"/assets/js/cruditems.js",
			"/assets/js/navigation.js",
			"/assets/svgs/bag.png",
			"/assets/svgs/plus.svg",
		]);
	});
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener("fetch", function (event) {
	let resposta = caches.open(cacheName).then((cache) => {
		return cache.match(event.request).then((recurso) => {
			if (recurso) return recurso;
			return fetch(event.request).then((recurso) => {
				cache.put(event.request, recurso.clone());
				return recurso;
			});
		});
	});
	event.respondWith(resposta);
});
