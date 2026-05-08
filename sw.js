// === FranBot Service Worker Autocurativo v5.0 ===
// Llave: Anomalous363 | Ecosistema estable

const CACHE_NAME = 'franbot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/estilo.css',
  '/js/franbot-core.js',
  '/js/franbot-online.js',
  '/js/super-local-memory.js',
  '/js/app.js',
  '/js/defensa.js',
  '/js/recursos.js',
  '/icon-192.png',
  '/manifest.json'
];

// ------------------- INSTALACIÓN CON VERIFICACIÓN -------------------
self.addEventListener('install', event => {
  console.log('[SW] Instalando FranBot v1 (modo autocurativo)...');
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const integrityMap = new Map();
      for (const url of urlsToCache) {
        try {
          const response = await fetch(url, { cache: 'no-cache' });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const clone = response.clone();
          const buffer = await clone.arrayBuffer();
          const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
          const hashHex = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0')).join('');
          integrityMap.set(url, hashHex);
          await cache.put(url, response);
          console.log(`[SW] Cacheado: ${url} (hash: ${hashHex.slice(0,8)}...)`);
        } catch (err) {
          console.error(`[SW] Fallo crítico cacheando ${url}:`, err);
          throw err;
        }
      }

      console.log('[SW] Simulando carga desde nueva caché...');
      for (const [url, expectedHash] of integrityMap.entries()) {
        const cachedResponse = await cache.match(url);
        if (!cachedResponse) throw new Error(`Falta en caché: ${url}`);
        const buf = await cachedResponse.clone().arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
        const actualHash = Array.from(new Uint8Array(hashBuffer))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        if (actualHash !== expectedHash) {
          throw new Error(`Hash corrupto para ${url}`);
        }
      }
      console.log('[SW] Simulación exitosa. Nueva versión operativa.');
      return self.skipWaiting();
    })()
  );
});

// ------------------- ACTIVACIÓN -------------------
self.addEventListener('activate', event => {
  console.log('[SW] Activando versión autocurativa...');
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
      return self.clients.claim();
    })()
  );
});

// ------------------- FETCH -------------------
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          event.waitUntil(
            fetch(event.request).then(netRes => {
              if (netRes && netRes.status === 200) {
                return caches.open(CACHE_NAME).then(cache => cache.put(event.request, netRes));
              }
            }).catch(() => {})
          );
          return cachedResponse;
        }
        try {
          const netRes = await fetch(event.request);
          if (netRes && netRes.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, netRes.clone());
          }
          return netRes;
        } catch (error) {
          if (event.request.mode === 'navigate') {
            const fallback = await caches.match('/offline.html');
            return fallback || new Response('Sin conexión', { status: 503 });
          }
          throw error;
        }
      })()
    );
  }
});

// ------------------- AUTODIAGNÓSTICO -------------------
self.addEventListener('sync', event => {
  if (event.tag === 'franbot-health-check') {
    console.log('[SW] Ejecutando autodiagnóstico...');
    event.waitUntil(runHealthCheck());
  }
});

async function runHealthCheck() {
  const cache = await caches.open(CACHE_NAME);
  let corruptionDetected = false;
  for (const url of urlsToCache) {
    const cached = await cache.match(url);
    if (!cached) {
      console.warn(`[Health] Recurso perdido: ${url}. Intentando recuperar...`);
      corruptionDetected = true;
      try {
        const netRes = await fetch(url);
        if (netRes.ok) {
          await cache.put(url, netRes);
          console.log(`[Health] Reparado: ${url}`);
        }
      } catch (e) {
        console.error(`[Health] No se pudo reparar: ${url}`, e);
      }
    }
  }
  const clients = await self.clients.matchAll();
  if (corruptionDetected) {
    clients.forEach(client => client.postMessage({
      type: 'HEALTH_WARNING',
      message: 'Se detectaron y repararon recursos dañados. Recarga recomendada.'
    }));
  } else {
    clients.forEach(client => client.postMessage({
      type: 'HEALTH_OK',
      message: `Caché íntegra (${new Date().toLocaleTimeString()})`
    }));
  }
}

// ------------------- MENSAJES -------------------
self.addEventListener('message', event => {
  if (event.data && event.data.command === 'CHECK_VERSION') {
    event.source.postMessage({ type: 'VERSION', version: '5.0-autocurativo' });
  }
  if (event.data && event.data.command === 'RUN_HEALTH_CHECK') {
    event.waitUntil(runHealthCheck());
  }
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
