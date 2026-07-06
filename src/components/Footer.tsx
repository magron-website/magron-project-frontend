import '@/assets/design/footer.css'
import { homeImages } from '@/assets/images/homeImages'

function PhoneIcon() {
  return (
    <svg
      className="home-footer__icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 1.5h2.2l1.1 2.7a1 1 0 0 1-.24 1.02l-1.3 1.3a9.5 9.5 0 0 0 4.42 4.42l1.3-1.3a1 1 0 0 1 1.02-.24l2.7 1.1v2.2a1 1 0 0 1-1 1A12 12 0 0 1 2.5 2.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      className="home-footer__icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M2 5.5 8 9.5l6-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const INSTAGRAM_URL = 'https://www.instagram.com/ferrofluidmagron/'
const YOUTUBE_URL = 'https://www.youtube.com/@magronkorea7396'

type SocialLink = {
  href: string
  label: string
  image: string
  brand?: 'instagram' | 'youtube'
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: '#', label: 'LinkedIn', image: homeImages.socialLinkedIn },
  {
    href: INSTAGRAM_URL,
    label: 'Instagram',
    image: homeImages.socialInstagram,
    brand: 'instagram',
  },
  {
    href: YOUTUBE_URL,
    label: 'YouTube',
    image: homeImages.socialYoutube,
    brand: 'youtube',
  },
]

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <div className="home-footer__company">
          <p className="home-footer__company-name">㈜마그론 / MAGRON</p>
          <p className="home-footer__company-detail">
            (15588) 경기도 안산시 상록구 해안로 706 경기테크노파크 3동 403호
            <br />
            copyright © 2024 MAGRON
            <br />
            All Rights Reserved.
          </p>
        </div>

        <div className="home-footer__meta">
          <div className="home-footer__contact">
            <PhoneIcon />
            <p className="home-footer__contact-text">
              TEL : (Domestic) 031-500-4633
              <br />
              <span className="home-footer__contact-indent">
                (Overseas) +82-31-500-4632
              </span>
              <br />
              FAX : 02-31-500-4631
            </p>
          </div>

          <div className="home-footer__divider" aria-hidden="true" />

          <div className="home-footer__actions">
            <a className="home-footer__email" href="mailto:magron@magron.co.kr">
              <EmailIcon />
              <span>magron@magron.co.kr</span>
            </a>

            <div className="home-footer__social">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  className={
                    item.brand
                      ? `home-footer__social-link home-footer__social-link--${item.brand}`
                      : 'home-footer__social-link'
                  }
                  href={item.href}
                  aria-label={item.label}
                  {...(item.brand
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.brand ? (
                    <span
                      className={`home-footer__social-icon home-footer__social-icon--${item.brand}`}
                      style={{
                        WebkitMaskImage: `url(${item.image})`,
                        maskImage: `url(${item.image})`,
                      }}
                    />
                  ) : (
                    <img className="home-footer__social-icon" src={item.image} alt="" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
