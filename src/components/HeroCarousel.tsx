import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useEmblaCarousel from 'embla-carousel-react'
import { ClipLoader } from 'react-spinners'
import { resolveHeroButtonLink, useHeroSlides } from '@/hooks/useHeroSlides'
import type { HeroSlide } from '@/types/heroSlide'
import '@/assets/design/hero-carousel.css'

const AUTOPLAY_DELAY_MS = 4000

function usesNaturalImage(slide: HeroSlide) {
  return slide.sortOrder === 2 || slide.sortOrder === 3
}

/** The company-intro slide shows its cover cropped to a smaller square tile. */
function usesSquareImage(slide: HeroSlide) {
  return slide.sortOrder === 1
}

function HeroVisualShell({
  variant,
  message,
}: {
  variant: 'loading' | 'empty'
  message?: string | null
}) {
  const { t } = useTranslation(['hero', 'common'])
  return (
    <section
      id="visual"
      className={`home-visual home-visual--${variant}`}
      aria-busy={variant === 'loading'}
      aria-live="polite"
    >
      {variant === 'loading' ? (
        <ClipLoader color="#ffffff" size={52} aria-label={t('common:loading')} />
      ) : (
        <p className="home-visual__message">
          {message ?? t('hero:carouselError')}
        </p>
      )}
    </section>
  )
}

function HeroCarouselContent({ slides }: { slides: HeroSlide[] }) {
  const { t } = useTranslation('hero')
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progressKey, setProgressKey] = useState(0)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
    setProgressKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
    setSelectedIndex(0)
    setProgressKey((key) => key + 1)
  }, [emblaApi, slides])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setProgressKey((key) => key + 1)
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !isPlaying) return

    const timer = window.setInterval(() => {
      emblaApi.scrollNext()
    }, AUTOPLAY_DELAY_MS)

    return () => window.clearInterval(timer)
  }, [emblaApi, isPlaying, selectedIndex, progressKey])

  return (
    <section id="visual" className="home-visual">
      <div className="visual_in" ref={emblaRef}>
        <div className="visual_container">
          {slides.map((slide, index) => (
            <div className="roll" key={slide.id}>
              <div className="roll__inner">
                <div className="roll__content">
                  <div className="roll__ornament roll__ornament--top" aria-hidden="true">
                    <span className="roll__ornament-line" />
                    <span className="roll__ornament-dot" />
                    <span className="roll__ornament-dot" />
                  </div>

                  <h2 className="roll__title">{slide.title}</h2>

                  {slide.subtitle ? (
                    <p className="roll__subtitle">{slide.subtitle}</p>
                  ) : null}

                  {slide.description ? (
                    <p className="roll__description">{slide.description}</p>
                  ) : null}

                  {slide.buttonText && slide.buttonLink ? (
                    <a
                      className="roll__button"
                      href={resolveHeroButtonLink(slide.buttonLink)}
                    >
                      {slide.buttonText}
                    </a>
                  ) : null}

                  <div className="roll__ornament roll__ornament--bottom" aria-hidden="true">
                    <span className="roll__ornament-line roll__ornament-line--short" />
                  </div>
                </div>

                <div className="roll__media">
                  <div
                    className={`roll__media-frame${
                      usesNaturalImage(slide) ? ' roll__media-frame--natural' : ''
                    }${usesSquareImage(slide) ? ' roll__media-frame--square' : ''}`}
                  >
                    {usesNaturalImage(slide) ? (
                      <img
                        className="roll__image roll__image--natural"
                        src={slide.imageUrl}
                        alt=""
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="roll__media-crop">
                        <img
                          className="roll__image"
                          src={slide.imageUrl}
                          alt=""
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="visual-info">
        <div className="progress-round__wrap">
          <button
            type="button"
            className={`btn${isPlaying ? ' btn--pause' : ' btn--play'}`}
            onClick={togglePlay}
            aria-label={isPlaying ? t('pause') : t('play')}
          />
          <svg key={progressKey} className="progress" viewBox="0 0 64 64" aria-hidden="true">
            <circle className="progress__track" r="32" cx="32" cy="32" />
            <circle
              className={`progress__bar${isPlaying ? ' progress__bar--active' : ''}`}
              r="32"
              cx="32"
              cy="32"
              pathLength="100"
            />
          </svg>
        </div>

        <div className="info-in">
          <button
            type="button"
            className="arrow arrow--prev"
            onClick={scrollPrev}
            aria-label={t('prevSlide')}
          >
            prev
          </button>
          <ul className="slick-page">
            <li className="cur">{selectedIndex + 1}</li>
            <li className="and"> / </li>
            <li className="tot">{slides.length}</li>
          </ul>
          <button
            type="button"
            className="arrow arrow--next"
            onClick={scrollNext}
            aria-label={t('nextSlide')}
          >
            next
          </button>
        </div>
      </div>
    </section>
  )
}

export default function HeroCarousel() {
  const { slides, isLoading, error } = useHeroSlides()

  if (isLoading) {
    return <HeroVisualShell variant="loading" />
  }

  if (slides.length === 0) {
    return <HeroVisualShell variant="empty" message={error} />
  }

  return <HeroCarouselContent slides={slides} />
}
