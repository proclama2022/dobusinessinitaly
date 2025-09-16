// Service Worker per ottimizzazione caching e performance
const CACHE_NAME = 'yourbusinessinitaly-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Risorse critiche da cachare immediatamente
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json'
];

// Risorse statiche da cachare
const STATIC_ASSETS = [
  '/assets/css/',
  '/assets/js/',
  '/assets/images/',
  'https://fonts.googleapis.com/css2',
  'https://fonts.gstatic.com/'
];

// Installazione del service worker
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache delle risorse critiche
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_ASSETS);
      }),
      // Preload immagini critiche ottimizzate per mobile
      caches.open(STATIC_CACHE).then(cache => {
        const mobileImages = [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&h=320&fit=crop&crop=center&auto=format&q=85&fm=webp',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=768&h=512&fit=crop&crop=center&auto=format&q=85&fm=webp',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&crop=center&auto=format&q=85&fm=webp'
        ];
        return Promise.all(mobileImages.map(url => cache.add(url).catch(() => console.log(`[SW] Failed to cache: ${url}`))));
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Attivazione del service worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Strategia di fetch con cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip per richieste non HTTP
  if (!request.url.startsWith('http')) return;

  // Strategia Cache First per risorse statiche
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategia Network First per immagini Unsplash
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategia Network First per API calls
  if (request.url.includes('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategia Stale While Revalidate per pagine HTML
  if (request.destination === 'document') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Default: Network First
  event.respondWith(networkFirst(request));
});

// Strategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache First failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Strategia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Strategia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Verifica se è una risorsa statica
function isStaticAsset(url) {
  return STATIC_ASSETS.some(pattern => url.includes(pattern)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.woff') ||
         url.includes('.woff2');
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
