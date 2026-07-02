import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { homeImages } from '@/assets/images/homeImages'
import '@/assets/design/hero-carousel.css'

const AUTOPLAY_DELAY_MS = 4000
const SLIDES = homeImages.heroSlides

export default function HeroCarousel() {
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
          {SLIDES.map((src, index) => (
            <div className="roll" key={src}>
              <div className="v_txt basic_in">
                <h2>MAGRON</h2>
                <p>Ferrofluid&amp;Feedthrough</p>
              </div>
              <div className="v_bg">
                <div
                  className="bg pc"
                  style={{ backgroundImage: `url(${src})` }}
                  role="img"
                  aria-label={`히어로 슬라이드 ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="visual-info basic_in">
        <div className="progress-round__wrap">
          <button
            type="button"
            className={`btn${isPlaying ? ' btn--pause' : ' btn--play'}`}
            onClick={togglePlay}
            aria-label={isPlaying ? '슬라이드 일시정지' : '슬라이드 재생'}
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
            aria-label="이전 슬라이드"
          >
            prev
          </button>
          <ul className="slick-page">
            <li className="cur">{selectedIndex + 1}</li>
            <li className="and"> / </li>
            <li className="tot">{SLIDES.length}</li>
          </ul>
          <button
            type="button"
            className="arrow arrow--next"
            onClick={scrollNext}
            aria-label="다음 슬라이드"
          >
            next
          </button>
        </div>
      </div>
    </section>
  )
}
