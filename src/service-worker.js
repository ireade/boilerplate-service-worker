var cacheName = 'v1';
var cacheFiles = [
	'/src/',
	'/src/index.html',
	'/src/app.js',
	'/src/css/reset.css',
	'/src/css/style.css'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(
	    caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Cached cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');
});


self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);


	e.respondWith(
		caches.match(e.request)

			.then(function(response) {
				console.log("[ServiceWorker] Found in Cache", e.request.url);
				return response;
			})

			.catch(function() {

				return fetch(e.request)

					.then(function(response) {

						// Cache data 
						return caches.open(cacheName).then(function(cache) {

							cache.put(e.request, response.clone());
							console.log('[ServiceWorker] New Data Cached', e.request.url);
							return response;

				        });

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Caching New Data', err);
					});
			})
	);

});