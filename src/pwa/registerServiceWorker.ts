/**
 * Registers public/sw.js, which is what makes the site installable to a phone's
 * home screen and lets it open without a connection.
 *
 * The worker is served from the deploy root so its scope covers every route;
 * BASE_URL keeps that true under both magron.kr and a GitHub project path.
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  // The dev server has no sw.js (public/ is served but the app is unbundled) and
  // a worker caching modules would fight HMR.
  if (import.meta.env.DEV) return

  // scripts/prerender.mjs snapshots the production build in headless Chromium.
  // A worker installed there could answer a later route's navigation from cache
  // and bake the wrong page into that route's HTML.
  if (navigator.webdriver) return

  // Registering during load would compete with the app's own requests for
  // bandwidth on the first visit, which is exactly when it matters least.
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch((error) => {
      console.warn('Service worker registration failed:', error)
    })
  })
}
