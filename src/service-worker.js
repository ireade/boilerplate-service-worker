var cacheName = 'v2';
var cacheFiles = [
	'./',
	'./index.html',
	'./js/app.js',
	'./css/reset.css',
	'./css/style.css',
	'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic'
]

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // Delays the event until the Promise is resolved
    e.waitUntil(
	    caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(keys.map(function(key) {

				console.log('[ServiceWorker] Removing old cache', key);

				if (key !== cacheName) {
					return caches.delete(key);
				}
			}));
		})
	);

});


self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	// Respond to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					return response;
				}

				// Fetch the request
				fetch(e.request)

					//Then cache it 
					.then(function(response) {

						//  Cache data 
						caches.open(cacheName).then(function(cache) {

							cache.put(e.request, response);
							console.log('[ServiceWorker] New Data Cached', e.request.url);
				
				        });

				        return response.clone();

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Caching New Data', err);
					});


			})

			// If not in cache
			.catch(function() {
				console.log("catch")
				
			})
	);

});