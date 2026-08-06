/**
 * MAGRON service worker — makes the site installable ("홈 화면에 추가") and keeps
 * it usable when the network is gone.
 *
 * Registered by src/pwa/registerServiceWorker.ts. It lives in public/ so it is
 * copied to the deploy root verbatim: a service worker can only control pages at
 * or below its own URL, so it has to sit at the site root, not in the hashed
 * assets/ folder.
 *
 * Caching strategy, chosen per request kind:
 *   - navigations  → network-first, falling back to the cached page and finally
 *                    to the app shell. HTML is prerendered per route and can
 *                    change on any deploy, so a stale page must never win while
 *                    the network is available.
 *   - build assets → cache-first. Vite fingerprints these filenames, so a given
 *                    URL's contents never change.
 *   - other local  → stale-while-revalidate (icons, manifest, public images).
 *   - CDN media    → stale-while-revalidate for the image/font hosts only.
 *   - anything else→ untouched. Supabase reads and PDF downloads must always hit
 *                    the network so the site never shows stale product data.
 *
 * Bump CACHE_VERSION whenever this file's caching rules change; the activate
 * handler deletes every cache that does not match.
 */

const CACHE_VERSION = 'v1'
const PRECACHE = `magron-precache-${CACHE_VERSION}`
const RUNTIME = `magron-runtime-${CACHE_VERSION}`
const CDN = `magron-cdn-${CACHE_VERSION}`

/** The deploy root ('/' on magron.kr, '/<repo>/' on a GitHub project page). */
const SCOPE = new URL('./', self.registration.scope)

/** Served for a navigation that misses both the network and the cache. */
const SHELL_URL = SCOPE.href

/** Enough to launch from the home screen with no connection at all. */
const PRECACHE_URLS = [
  SHELL_URL,
  new URL('./manifest.webmanifest', SCOPE).href,
  new URL('./icons/icon-192.png', SCOPE).href,
  new URL('./icons/icon-512.png', SCOPE).href,
  new URL('./icons/apple-touch-icon.png', SCOPE).href,
]

/** Third-party hosts that only ever serve immutable images and fonts. */
const CDN_HOSTS = ['static.wixstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com']

/** Keeps the CDN cache from growing without bound across a long browsing session. */
const CDN_MAX_ENTRIES = 120

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      // addAll is atomic: one 404 would throw away the whole install, so each
      // entry is added on its own and a missing file just goes uncached.
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {}),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  const keep = [PRECACHE, RUNTIME, CDN]
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => !keep.includes(name)).map((name) => caches.delete(name))),
      )
      .then(() => self.clients.claim()),
  )
})

/** Only successful same-origin responses and opaque CDN media are worth storing. */
function isCacheable(response) {
  return Boolean(response) && (response.ok || response.type === 'opaque')
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  // Cache keys are in insertion order, so the excess at the front is the oldest.
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)))
}

/** Network-first: fresh HTML when online, the last good copy when not. */
async function handleNavigation(request) {
  const cache = await caches.open(RUNTIME)

  try {
    const response = await fetch(request)
    if (isCacheable(response)) cache.put(request, response.clone())
    return response
  } catch {
    return (
      (await cache.match(request)) ||
      (await caches.match(SHELL_URL)) ||
      new Response('오프라인 상태입니다. 네트워크 연결을 확인해 주세요.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    )
  }
}

/** Cache-first, for fingerprinted URLs whose contents can never change. */
async function handleImmutable(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (isCacheable(response)) {
    const cache = await caches.open(cacheName)
    await cache.put(request, response.clone())
  }
  return response
}

/** Stale-while-revalidate: answer from cache instantly, refresh in the background. */
async function handleRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  const network = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) {
        await cache.put(request, response.clone())
        if (maxEntries) await trimCache(cacheName, maxEntries)
      }
      return response
    })
    .catch(() => undefined)

  if (cached) return cached

  const response = await network
  if (response) return response
  throw new Error(`Request failed and is not cached: ${request.url}`)
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  if (url.origin === self.location.origin) {
    // Anything outside the deploy root belongs to another site on the same host.
    if (!url.pathname.startsWith(SCOPE.pathname)) return

    if (url.pathname.startsWith(`${SCOPE.pathname}assets/`)) {
      event.respondWith(handleImmutable(request, RUNTIME))
    } else {
      event.respondWith(handleRevalidate(request, RUNTIME))
    }
    return
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(handleRevalidate(request, CDN, CDN_MAX_ENTRIES))
  }

  // Everything else (Supabase REST + storage, YouTube, …) falls through to the
  // network untouched.
})
