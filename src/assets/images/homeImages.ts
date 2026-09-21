/* Header/footer chrome: logo, language flags, social icons.
 *
 * These used to be hot-linked from the predecessor's Wix CDN
 * (static.wixstatic.com). That account is outside our control — if it is ever
 * cleaned up the logo and every flag vanish at once — so the originals were
 * pulled down and are served from our own bundle. Each file is stored at 2x its
 * display size for retina; all seven together are ~21 KB. */
import contactBgImage from './contactus.webp'
import logoImage from './site/logo.png'
import flagKorImage from './site/flag-kor.png'
import flagEngImage from './site/flag-eng.png'
import flagChnImage from './site/flag-chn.png'
import socialLinkedInImage from './site/social-linkedin.png'
import socialInstagramImage from './site/social-instagram.png'
import socialYoutubeImage from './site/social-youtube.png'

export const homeImages = {
  logo: logoImage,
  flagKor: flagKorImage,
  flagEng: flagEngImage,
  flagChn: flagChnImage,
  contactBg: contactBgImage,
  /* The contact block draws the same flags a few pixels smaller. */
  contactFlagKor: flagKorImage,
  contactFlagEng: flagEngImage,
  contactFlagChn: flagChnImage,
  socialLinkedIn: socialLinkedInImage,
  socialInstagram: socialInstagramImage,
  socialYoutube: socialYoutubeImage,
} as const
