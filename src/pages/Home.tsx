import { useMemo, useState } from 'react'
import { BookCover } from 'book-cover-3d'
import { homeImages } from '@/assets/images/homeImages'
import BookFlipViewer from '@/components/BookFlipViewer'
import QuoteRequestModal from '@/components/QuoteRequestModal'
import HeroCarousel from '@/components/HeroCarousel'
import ChatbotFloater from '@/components/ChatbotFloater'
import { useInView } from '@/hooks/useInView'
import { ProductSection } from '@/pages/products'
import { useBooks } from '@/hooks/useBooks'
import type { Book } from '@/types/book'
import '@/assets/design/animation.css'

const catalogItems = [
  { sortOrder: 1, title: 'Ferrofluid For Gas&Dust Sealing' },
  { sortOrder: 2, title: 'Feedthrough' },
  { sortOrder: 3, title: 'Mag-oil' },
  { sortOrder: 4, title: 'Magnet' },
  { sortOrder: 5, title: 'What is Ferrofluid?' },
  { sortOrder: 6, title: 'For display kit' },
] as const

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
          <h2 className="home-catalog__title">카탈로그</h2>
        </div>
        {error ? (
          <p className="home-catalog__message" role="alert">
            {error}
          </p>
        ) : null}
        <div className="home-catalog__grid">
          {catalogItems.map((item) => {
            const book = booksBySortOrder[item.sortOrder]
            const imageUrl = book?.imageUrl
            return (
              <div key={item.title} className="home-catalog__item">
                <div className="home-catalog__item-title">&lt; {item.title} &gt;</div>
                <button
                  type="button"
                  className="home-catalog__book-button"
                  onClick={() => book && setViewerBook(book)}
                  disabled={!book?.pdfUrl}
                  aria-label={`${item.title} PDF 보기`}
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
                  <p className="home-catalog__book-hint">클릭시 책을 열람할수 있습니다.</p>
                </button>
                {book?.pdfUrl ? (
                  <a
                    className="home-catalog__download"
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <span className="home-catalog__download-text">Download</span>
                  </a>
                ) : (
                  <div className="home-catalog__download home-catalog__download--disabled">
                    <span className="home-catalog__download-text">Download</span>
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
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
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
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <div className="home-contact__bg-wrap">
        <img className="home-contact__bg" src={homeImages.contactBg} alt="" />
        <div className="home-contact__inner">
          <div className="home-contact__header">
            <div className="home-contact__title-line" />
            <h2 className="home-contact__title">Contact Us</h2>
          </div>

          <div className="home-contact__card">
            <p className="home-contact__address">
              경기도 안산시 상록구 해안로 705 경기테크노파크 3동 403호 (우편번호: 15588)
            </p>

            <div className="home-contact__grid">
              <div className="home-contact__col">
                <div className="home-contact__block">
                  <span className="home-contact__label">TEL</span>
                  <p className="home-contact__text">
                    Domestic 031-500-4633
                    <br />
                    Export 031-500-4632
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

          <button
            type="button"
            className="home-contact__quote-btn"
            onClick={() => setIsQuoteOpen(true)}
          >
            견적서 요청
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="home-page">
      <HomeHero />
      <ChatbotFloater />
      <HomeProducts />
      <HomeCatalog />
      <HomeContact />
    </div>
  )
}
