/**
 * The public path the built site is served from — shared by vite.config.ts and
 * scripts/prerender.mjs so the bundle and the prerendered HTML never disagree.
 *
 * GitHub Pages serves a project repo under /<repo>/, so that is the default.
 * When the custom domain (www.magron.co.kr) is switched over, the site moves to
 * the root: set VITE_BASE_PATH=/ in the build environment, or change the
 * fallback below. Nothing else needs to change — SITE_URL in src/seo/routeMeta.ts
 * and scripts/prerender.mjs already points at the final domain.
 */
const raw = process.env.VITE_BASE_PATH ?? '/magron-project-frontend/'

/** Vite wants a leading and trailing slash; '/' stays '/'. */
export const BASE_PATH = `/${raw.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/')

/** Same value without the trailing slash, for router basenames and href joins. */
export const BASE_PREFIX = BASE_PATH === '/' ? '' : BASE_PATH.replace(/\/$/, '')
