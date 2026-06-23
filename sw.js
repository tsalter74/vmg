/* VMG service worker — network-first shell so updates appear when online,
   cache fallback so it still works offline.
   Bump VERSION whenever you change icons/manifest to force a clean re-cache. */
const VERSION = 'v23-2026-06-20';
const CACHE = 'vmg-' + VERSION;
const ASSETS = [
  './', 'index.html', 'manifest.webmanifest',
  'icon-192.png', 'icon-512.png', 'icon-180.png', 'icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isPage = req.mode === 'navigate' || req.destination === 'document';
  if (isPage) {
    // network-first: always try the live page, fall back to cache offline
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(h => h || caches.match('index.html')))
    );
    return;
  }

  // static assets: serve from cache fast, refresh in the background
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
