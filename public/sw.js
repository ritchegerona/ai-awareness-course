/* AI Awareness Course — offline cache (works on GitHub project Pages subpaths) */
const CACHE_NAME = 'ai-course-v7';

// Resolve assets relative to this service worker’s directory
// e.g. https://user.github.io/ai-awareness-course/sw.js → base includes /ai-awareness-course/
const BASE = self.registration.scope;

const ASSET_PATHS = [
  '',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/modules-data.js',
  'js/vendor/html2canvas.min.js',
  'manifest.webmanifest',
  'favicon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'images/ritche-gerona.png'
];

function assetUrl(rel) {
  try {
    return new URL(rel, BASE).href;
  } catch (_) {
    return BASE + rel;
  }
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      const urls = ASSET_PATHS.map(assetUrl);
      return Promise.all(
        urls.map(function (url) {
          return cache.add(url).catch(function () {
            /* skip failed asset — rest still cache */
          });
        })
      );
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) {
          return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        if (event.request.mode === 'navigate') {
          return caches.match(assetUrl('index.html'));
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
