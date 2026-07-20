export const YOUTUBE_URL_PLACEHOLDER = 'YOUTUBE_URL_PLACEHOLDER'

export const YOUTUBE_MAIN_INTRO_URL = 'https://youtu.be/lqPjZRDO26E'

export const MAIN_VIDEO = {
  placeholderId: 'VIDEO_PLACEHOLDER_MAIN_INTRO',
  youtubeUrl: YOUTUBE_MAIN_INTRO_URL,
  thumbnailSrc: '/images/large-ferrofluid-display/main-intro-thumbnail.png',
} as const

/**
 * Presentation only — titles kept in English; descriptions live in the `display`
 * namespace (index-matched).
 *
 * The video files themselves come from the `display_videos` table via
 * `useDisplayVideos`, matched to these entries by position: entry `n` here pairs
 * with the row at `sort_order` `n + 1`. Until that fetch lands (or if it fails)
 * each card shows its `thumbnailSrc` placeholder.
 */
export const PORTFOLIO_VIDEOS = [
  {
    title: 'Ferrofluid Display Motion 01',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_01',
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-01.png',
  },
  {
    title: 'Interactive Ferrofluid Demo',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_02',
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-02.png',
  },
  {
    title: 'Vertical Ferrofluid Display',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_03',
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-03.png',
  },
  {
    title: 'Ferrofluid Spike Motion',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_04',
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-04.png',
  },
] as const
