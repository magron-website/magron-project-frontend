import portfolio1 from '@/assets/videos/display/display_1.mp4'
import portfolio2 from '@/assets/videos/display/display_2.mp4'
import portfolio3 from '@/assets/videos/display/display_3.mp4'
import portfolio4 from '@/assets/videos/display/display_4.mp4'

export const YOUTUBE_URL_PLACEHOLDER = 'YOUTUBE_URL_PLACEHOLDER'

export const YOUTUBE_MAIN_INTRO_URL = 'https://youtu.be/lqPjZRDO26E'

export const MAIN_VIDEO = {
  placeholderId: 'VIDEO_PLACEHOLDER_MAIN_INTRO',
  youtubeUrl: YOUTUBE_MAIN_INTRO_URL,
  thumbnailSrc: '/images/large-ferrofluid-display/main-intro-thumbnail.png',
} as const

/** Media only — titles kept in English; descriptions live in the `display` namespace (index-matched). */
export const PORTFOLIO_VIDEOS = [
  {
    title: 'Ferrofluid Display Motion 01',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_01',
    videoSrc: portfolio1,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-01.png',
  },
  {
    title: 'Interactive Ferrofluid Demo',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_02',
    videoSrc: portfolio2,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-02.png',
  },
  {
    title: 'Vertical Ferrofluid Display',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_03',
    videoSrc: portfolio3,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-03.png',
  },
  {
    title: 'Ferrofluid Spike Motion',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_04',
    videoSrc: portfolio4,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-04.png',
  },
] as const
