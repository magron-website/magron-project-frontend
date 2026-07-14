import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookCover } from 'book-cover-3d'
import { homeImages } from '@/assets/images/homeImages'
import BookFlipViewer from '@/components/BookFlipViewer'
import HeroCarousel from '@/components/HeroCarousel'
import { useInView } from '@/hooks/useInView'
import { ProductSection } from '@/pages/products'
import { useBooks } from '@/hooks/useBooks'
import type { Book } from '@/types/book'
import '@/assets/design/animation.css'

const catalogSortOrders = [1, 2, 3, 4, 5, 6] as const

const catalogBookProps = {
  width: 230,
  height: 330,
  thickness: 36,
  rotate: 28,
  rotateHover: 12,
  transitionDuration: 0.35,
  perspective: 700,
  radius: 3,
  bgColor: '#082f49',
} as const

function HomeHero() {
  return <HeroCarousel />
}

function HomeProducts() {
  return <ProductSection />
}

function HomeCatalog() {
  const { t } = useTranslation('home')
  const { books, isLoading, error } = useBooks()
  const [viewerBook, setViewerBook] = useState<Book | null>(null)
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08, once: false })

  const booksBySortOrder = useMemo(
    () => Object.fromEntries(books.map((book) => [book.sortOrder, book])),
    [books],
  )

  return (
    <section
      id="products"
      ref={ref}
      className={`home-catalog${inView ? ' is-revealed' : ''}`}
    >
      <BookFlipViewer
        isOpen={viewerBook !== null}
        title={viewerBook?.subtitle || viewerBook?.title || ''}
        pdfUrl={viewerBook?.pdfUrl ?? ''}
        onClose={() => setViewerBook(null)}
      />
      <div className="home-catalog__inner">
        <div className="home-catalog__header">
          <h2 className="home-catalog__title">{t('catalog.heading')}</h2>
        </div>
        {error ? (
          <p className="home-catalog__message" role="alert">
            {error}
          </p>
        ) : null}
        <div className="home-catalog__grid">
          {catalogSortOrders.map((sortOrder) => {
            const book = booksBySortOrder[sortOrder]
            const imageUrl = book?.imageUrl
            const title = t(`catalog.items.${sortOrder}`)
            return (
              <div key={sortOrder} className="home-catalog__item">
                <div className="home-catalog__item-title">&lt; {title} &gt;</div>
                <button
                  type="button"
                  className="home-catalog__book-button"
                  onClick={() => book && setViewerBook(book)}
                  disabled={!book?.pdfUrl}
                  aria-label={t('catalog.viewPdfAria', { title })}
                >
                  <div className="home-catalog__book">
                    <BookCover {...catalogBookProps}>
                      {imageUrl ? (
                        <img
                          className="home-catalog__book-img"
                          src={imageUrl}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="home-catalog__book-img home-catalog__book-img--placeholder"
                          aria-hidden="true"
                          aria-busy={isLoading}
                        />
                      )}
                    </BookCover>
                  </div>
                  <p className="home-catalog__book-hint">{t('catalog.bookHint')}</p>
                </button>
                {book?.pdfUrl ? (
                  <a
                    className="home-catalog__download"
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <span className="home-catalog__download-text">{t('catalog.download')}</span>
                  </a>
                ) : (
                  <div className="home-catalog__download home-catalog__download--disabled">
                    <span className="home-catalog__download-text">{t('catalog.download')}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className="home-catalog__keywords">
        ferrofluid, magnetic fluid, ferofluidic seal, ferro seal, magnetic fluid seal, ferro vaccum
        seal, 방수용 자성유체, waterprrof ferrofluid, Daiwa mag oil, Daiwa reel,
        <br />
        feedthrough
      </div>
    </section>
  )
}

function HomeContact() {
  const { t } = useTranslation('home')
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15, once: false })

  const webLinks = [
    {
      flag: homeImages.contactFlagKor,
      url: 'www.ferrofluidmagron.co.kr (www.magron.co.kr)',
    },
    {
      flag: homeImages.contactFlagEng,
      url: 'www.ferrofluidmagron.com (www.ferrozone.co.kr)',
    },
    {
      flag: homeImages.contactFlagChn,
      url: 'www.ferrofluidmagron.cn',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className={`home-contact${inView ? ' is-revealed' : ''}`}
    >
      <div className="home-contact__bg-wrap">
        <img className="home-contact__bg" src={homeImages.contactBg} alt="" />
        <div className="home-contact__inner">
          <div className="home-contact__header">
            <div className="home-contact__title-line" />
            <h2 className="home-contact__title">{t('contact.title')}</h2>
          </div>

          <div className="home-contact__card">
            <p className="home-contact__address">{t('contact.address')}</p>

            <div className="home-contact__grid">
              <div className="home-contact__col">
                <div className="home-contact__block">
                  <span className="home-contact__label">TEL</span>
                  <p className="home-contact__text">
                    {t('contact.telDomestic')}
                    <br />
                    {t('contact.telExport')}
                  </p>
                </div>
                <div className="home-contact__block">
                  <span className="home-contact__label">Mail</span>
                  <p className="home-contact__text">magron@magron.co.kr</p>
                </div>
              </div>

              <div className="home-contact__col">
                <div className="home-contact__block">
                  <span className="home-contact__label">Web</span>
                  <ul className="home-contact__web-list">
                    {webLinks.map((link) => (
                      <li key={link.url} className="home-contact__web-item">
                        <img className="home-contact__web-icon" src={link.flag} alt="" />
                        <span className="home-contact__text">{link.url}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="home-contact__block">
                  <span className="home-contact__label">FAX</span>
                  <p className="home-contact__text">82-31-500-4631</p>
                </div>
              </div>
            </div>
          </div>

          <p className="home-contact__inquiry">
            {t('contact.inquiryNote')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="home-page">
      <HomeHero />
      <HomeProducts />
      <HomeCatalog />
      <HomeContact />
    </div>
  )
}
