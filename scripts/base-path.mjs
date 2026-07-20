/**
 * The public path the built site is served from — shared by vite.config.ts and
 * scripts/prerender.mjs so the bundle and the prerendered HTML never disagree.
 *
 * The custom domain (magron.kr) is live, so the site is served from the root.
 * public/CNAME is what keeps it pointed there — it lives in public/ rather than
 * docs/ because build.emptyOutDir wipes docs/ on every build, which would drop
 * the file and silently unset the domain on GitHub Pages.
 * To go back to the bare GitHub Pages project path, set
 * VITE_BASE_PATH=/magron-project-frontend/ in the build environment.
 */
const raw = process.env.VITE_BASE_PATH ?? '/'

/** Vite wants a leading and trailing slash; '/' stays '/'. */
export const BASE_PATH = `/${raw.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/')

/** Same value without the trailing slash, for router basenames and href joins. */
export const BASE_PREFIX = BASE_PATH === '/' ? '' : BASE_PATH.replace(/\/$/, '')
