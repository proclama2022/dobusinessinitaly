// Service Worker per Your Business in Italy
// Ottimizzato per SEO e performance 2025

const CACHE_NAME = 'yourbusiness-italy-v1.0.0';
const STATIC_CACHE = 'yourbusiness-static-v1.0.0';
const DYNAMIC_CACHE = 'yourbusiness-dynamic-v1.0.0';

// Risorse critiche da mettere sempre in cache
const CRITICAL_RESOURCES = [
  '/',
  '/manifest.json',
  '/images/logo.png',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Risorse da mettere in cache al primo accesso
const STATIC_RESOURCES = [
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap-index.xml'
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installazione Service Worker');

  event.waitUntil(
    Promise.all([
      // Cache risorse critiche
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching risorse critiche');
        return cache.addAll(CRITICAL_RESOURCES);
      }),

      // Cache risorse statiche
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching risorse statiche');
        return cache.addAll(STATIC_RESOURCES);
      })
    ]).then(() => {
      // Forza attivazione immediata
      return self.skipWaiting();
    })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Attivazione Service Worker');

  event.waitUntil(
    Promise.all([
      // Pulizia cache vecchie
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Eliminazione cache vecchia:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),

      // Prendi controllo di tutti i client
      self.clients.claim()
    ])
  );
});

// Gestione delle richieste fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategia Cache First per risorse statiche
  if (isStaticResource(url)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Strategia Network First per contenuti dinamici
  if (isDynamicContent(url)) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Strategia Stale While Revalidate per API
  if (isApiRequest(url)) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }

  // Default: Network falling back to cache
  event.respondWith(networkFallingBackToCache(request));
});

// Strategie di caching

function cacheFirstStrategy(request) {
  // Skip chrome-extension and unsupported schemes
  if (request.url.startsWith('chrome-extension:') || 
      request.url.startsWith('moz-extension:') ||
      request.url.startsWith('safari-extension:')) {
    return fetch(request).catch(() => new Response('', { status: 404 }));
  }

  return caches.match(request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Cache solo risposte valide da HTTP/HTTPS
        if (response.status === 200 && 
            (response.type === 'basic' || response.type === 'cors') &&
            (request.url.startsWith('http:') || request.url.startsWith('https:'))) {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone).catch((err) => {
              console.warn('[SW] Failed to cache:', request.url, err);
            });
          });
        }
        return response;
      });
    })
    .catch(() => {
      // Fallback per risorse critiche
      if (request.url.includes('/images/')) {
        return caches.match('/images/logo.png');
      }
      return new Response('', { status: 404 });
    });
}

function networkFirstStrategy(request) {
  return fetch(request)
    .then((response) => {
      // Cache la risposta per uso futuro (solo tipi clonabili)
      try {
        if (
          response && response.status === 200 &&
          (response.type === 'basic' || response.type === 'cors')
        ) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone).catch(() => {});
          });
        }
      } catch (e) {
        console.warn('[SW] networkFirst clone/cache failed:', e);
      }
      return response;
    })
    .catch(() => {
      // Fallback alla cache
      return caches.match(request);
    });
}

function staleWhileRevalidateStrategy(request) {
  return caches.match(request)
    .then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          try {
            if (
              networkResponse && networkResponse.status === 200 &&
              (networkResponse.type === 'basic' || networkResponse.type === 'cors')
            ) {
              const clone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, clone).catch(() => {});
              });
            }
          } catch (e) {
            console.warn('[SW] staleWhileRevalidate clone/cache failed:', e);
          }
          return networkResponse;
        })
        .catch((err) => {
          return cachedResponse || Promise.reject(err);
        });

      // Ritorna cache se disponibile, altrimenti usa network
      return cachedResponse || fetchPromise;
    });
}

function networkFallingBackToCache(request) {
  return fetch(request)
    .catch(() => {
      return caches.match(request);
    });
}

// Utility functions

function isStaticResource(url) {
  return (
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/) ||
    url.pathname.includes('/images/') ||
    url.pathname.includes('/favicon') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('cdnjs.cloudflare.com')
  );
}

function isDynamicContent(url) {
  return (
    url.pathname.includes('/blog/') ||
    url.pathname.includes('/services/') ||
    url.pathname.includes('/about') ||
    url.pathname.includes('/contact')
  );
}

function isApiRequest(url) {
  return (
    url.pathname.includes('/api/') ||
    url.hostname.includes('api.')
  );
}

// Gestione messaggi dal main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.keys()),
      caches.open(DYNAMIC_CACHE).then(cache => cache.keys())
    ]).then(([staticKeys, dynamicKeys]) => {
      event.ports[0].postMessage({
        staticCacheSize: staticKeys.length,
        dynamicCacheSize: dynamicKeys.length,
        totalCacheSize: staticKeys.length + dynamicKeys.length
      });
    });
  }
});
