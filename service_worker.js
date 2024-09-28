// キャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    'https://ancient-earth-54146-ad024a0db8ed.herokuapp.com/',
    '/sinya0909.github.io/',
    '/sinya0909.github.io/test-2/',
];



// インストール処理
// self.addEventListener('install', function(event) {
//     event.waitUntil(
//         caches
//             .open(CACHE_NAME)
//             .then(function(cache) {
//                 return cache.addAll(urlsToCache);

//             })
//     );
// });

self.addEventListener('install', function(event) {
    event.waitUntil(
        (async function() {
            const cache = await caches.open(CACHE_NAME);
            for (const url of urlsToCache) {
                try {
                    await cache.add(url);
                } catch (error) {
                    console.error(`Failed to cache ${url}:`, error);
                    // 次のURLに移動
                }
            }
        })()
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
