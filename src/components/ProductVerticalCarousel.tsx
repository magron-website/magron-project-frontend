import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { homeImages } from '@/assets/images/homeImages'
import '@/assets/design/product-vertical-carousel.css'

const SLIDE_COUNT = 4

type ProductSlide = {
  image: string
  title: string
  category: string
  description: string
}

const LEFT_SLIDES: ProductSlide[] = [
  {
    image: homeImages.ferrofluidLg,
    title: 'Industrial Ferrofluid',
    category: 'Sealing',
    description: '유해가스·분진 차단용 자성유체 (Ferrofluid For Feedthrough)',
  },
  {
    image: homeImages.feedthrough,
    title: 'Feedthrough',
    category: 'Component',
    description: '진공·압력 환경용 Feedthrough 부품 및 응용 솔루션',
  },
  {
    image: homeImages.magnet,
    title: 'Magnet',
    category: 'Material',
    description: 'Nd, AlNiCo, Ferrite, SmCo, FeCrCo 등 맞춤형 자석',
  },
  {
    image: homeImages.educationKit,
    title: 'Education Kit',
    category: 'Kit',
    description: '교육·체험용 자성유체 키트 및 데모 세트',
  },
]

const RIGHT_SLIDES: ProductSlide[] = [
  {
    image: homeImages.waterproof,
    title: 'Waterproof Ferrofluid',
    category: 'Application',
    description: '방수용 자성유체 (낚시 Reel Mag oil 등 생활 응용)',
  },
  {
    image: homeImages.displayLg,
    title: 'Ferrofluid Display',
    category: 'Display',
    description: '대형 자성유체 디스플레이 및 전시용 모듈',
  },
  {
    image: homeImages.catalogGasDust,
    title: 'Gas & Dust Catalog',
    category: 'Catalog',
    description: '가스·분진 차단 카탈로그 및 기술 자료',
  },
  {
    image: homeImages.catalogFeedthrough,
    title: 'Feedthrough Catalog',
    category: 'Catalog',
    description: 'Feedthrough 제품 라인업 및 사양 안내',
  },
]

function ProductCard({ slide }: { slide: ProductSlide }) {
  return (
    <article className="product-scroll-card">
      <div className="product-scroll-card__image">
        <img src={slide.image} alt="" />
      </div>
      <div className="product-scroll-card__body">
        <h3 className="product-scroll-card__title">{slide.title}</h3>
        <p className="product-scroll-card__category">{slide.category}</p>
        <p className="product-scroll-card__description">{slide.description}</p>
      </div>
    </article>
  )
}

function VerticalCarouselColumn({
  slides,
  emblaRef,
  direction,
}: {
  slides: ProductSlide[]
  emblaRef: ReturnType<typeof useEmblaCarousel>[0]
  direction: 'up' | 'down'
}) {
  return (
    <div
      className={`product-scroll__carousel product-scroll__carousel--${direction}`}
    >
      <div className="product-scroll__viewport" ref={emblaRef}>
        <div className="product-scroll__container">
          {slides.map((slide) => (
            <div className="product-scroll__slide" key={slide.title}>
              <ProductCard slide={slide} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductVerticalCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const [leftRef, leftApi] = useEmblaCarousel({
    axis: 'y',
    watchDrag: false,
    duration: 30,
  })
  const [rightRef, rightApi] = useEmblaCarousel({
    axis: 'y',
    watchDrag: false,
    duration: 30,
  })

  const syncCarousels = useCallback(
    (index: number) => {
      if (activeIndexRef.current === index) return
      activeIndexRef.current = index
      setActiveIndex(index)
      leftApi?.scrollTo(index)
      rightApi?.scrollTo(index)
    },
    [leftApi, rightApi],
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const updateFromScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const index = Math.min(
        SLIDE_COUNT - 1,
        Math.floor(progress * SLIDE_COUNT),
      )
      syncCarousels(index)
    }

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [syncCarousels])

  return (
    <section
      ref={sectionRef}
      className="product-scroll"
      aria-label="제품 소개"
    >
      <div className="product-scroll__sticky">
        <div className="product-scroll__title-wrap">
          <h2 className="product-scroll__title">
            What we
            <br />
            product?
          </h2>
          <div className="product-scroll__progress" aria-hidden="true">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <span
                key={i}
                className={`product-scroll__dot${i === activeIndex ? ' product-scroll__dot--active' : ''}`}
              />
            ))}
          </div>
        </div>

        <VerticalCarouselColumn
          slides={LEFT_SLIDES}
          emblaRef={leftRef}
          direction="up"
        />
        <VerticalCarouselColumn
          slides={RIGHT_SLIDES}
          emblaRef={rightRef}
          direction="down"
        />
      </div>
    </section>
  )
}
