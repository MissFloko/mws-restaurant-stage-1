const version = "v1::" //Change if you want to regenerate cache
const staticCacheName = `${version}static-resources`;

// cache
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(
          [
            '/css/style.css',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/js/dbhelper.js',
            '/index.html',
            '/restaurant.html'
          ]
        );
      })
    );
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => {
                return Promise.all(
                    keys
                        .filter((key) => {
                            //If your cache name don't start with the current version...
                            return !key.startsWith(version);
                        })
                        .map((key) => {
                            //...YOU WILL BE DELETED
                            return caches.delete(key);
                        })
                );
            })
            .then(() => {
                console.log('WORKER:: activation completed. This is not even my final form');
            })
    )
});

//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         // Try the cache
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         }).catch(function() {
//             //Error stuff
//         })
//     );
// });