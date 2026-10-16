import { useTranslation } from 'react-i18next'
import '@/assets/design/legal.css'

type Channel = { label: string; value: string; href?: string }

/** 지도는 iframe 대신 각 지도 서비스의 검색 링크 — 외부 쿠키 없이 바로 열린다. */
function mapLinks(query: string) {
  const q = encodeURIComponent(query)
  return [
    { label: 'Naver Map', href: `https://map.naver.com/p/search/${q}` },
    { label: 'Kakao Map', href: `https://map.kakao.com/?q=${q}` },
    { label: 'Google Maps', href: `https://www.google.com/maps/search/?api=1&query=${q}` },
  ]
}

export default function Contact() {
  const { t } = useTranslation('contact')
  const channels = t('channels', { returnObjects: true }) as Channel[]
  const quoteItems = t('quoteItems', { returnObjects: true }) as string[]

  return (
    <article className="lg-page">
      <div className="lg-hero">
        <div className="lg-inner">
          <header className="lg-heading">
            <p className="lg-heading__eyebrow">{t('eyebrow')}</p>
            <h1 className="lg-heading__title">{t('title')}</h1>
            <p className="lg-heading__lead">{t('lead')}</p>
          </header>

          <section className="lg-section">
            <h2 className="lg-section__title">{t('channelsTitle')}</h2>
            <dl className="lg-cards">
              {channels.map((channel) => (
                <div className="lg-card" key={channel.label}>
                  <dt className="lg-card__label">{channel.label}</dt>
                  <dd className="lg-card__value">
                    {channel.href ? <a href={channel.href}>{channel.value}</a> : channel.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="lg-note">{t('chatbotNote')}</p>
          </section>

          <section className="lg-section">
            <h2 className="lg-section__title">{t('quoteTitle')}</h2>
            <ul className="lg-list">
              {quoteItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="lg-section">
            <h2 className="lg-section__title">{t('locationTitle')}</h2>
            <address className="lg-address">
              <strong>{t('company')}</strong>
              <br />
              {t('address')}
            </address>
            <p className="lg-maps">
              <span className="lg-maps__label">{t('mapsLabel')}</span>
              {mapLinks(t('mapQuery')).map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
