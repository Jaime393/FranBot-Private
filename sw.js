const CACHE_NAME = 'franbot-oraculo-v1';
const urlsToCache = ['/', '/index.html', '/css/estilo.css', '/js/franbot-core.js', '/js/franbot-online.js', '/js/app.js', '/pack_fundadores_v1/arquitecto_resonancia.json'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', event => { event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request))); });
