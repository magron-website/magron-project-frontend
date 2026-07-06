import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import chatbotImage from '@/assets/images/chatbot.png'
import '@/assets/design/chatbot-floater.css'

const HERO_MARGIN = 24
const HEADER_OFFSET = 96

type FloaterMode = 'hero' | 'top'

export default function ChatbotFloater() {
  const floaterRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<FloaterMode>('hero')
  const [heroCoords, setHeroCoords] = useState({ top: 0, right: HERO_MARGIN })
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    const updatePosition = () => {
      const hero = document.getElementById('visual')
      const productSection = document.querySelector('.product-scroll')
      const floater = floaterRef.current

      if (!hero || !floater) {
        setIsVisible(false)
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const productRect = productSection?.getBoundingClientRect()
      const floaterHeight = floater.offsetHeight
      const anchorTop = heroRect.bottom - floaterHeight - HERO_MARGIN

      if (productRect && productRect.top <= HEADER_OFFSET) {
        setMode('top')
      } else {
        setMode('hero')
        setHeroCoords({
          top: Math.max(anchorTop, HERO_MARGIN),
          right: HERO_MARGIN,
        })
      }

      setIsVisible(true)
    }

    updatePosition()

    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updatePosition) : null

    const hero = document.getElementById('visual')
    const productSection = document.querySelector('.product-scroll')

    if (resizeObserver) {
      if (hero) resizeObserver.observe(hero)
      if (productSection) resizeObserver.observe(productSection)
    }

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
      resizeObserver?.disconnect()
    }
  }, [])

  return createPortal(
    <div
      ref={floaterRef}
      className={`chatbot-floater chatbot-floater--${mode}${isVisible ? '' : ' chatbot-floater--hidden'}`}
      style={mode === 'hero' ? { top: heroCoords.top, right: heroCoords.right } : undefined}
    >
      <div className="chatbot-floater__panel">
        <p className="chatbot-floater__text">
          궁금한건
          <br />
          챗봇에게
          <br />
          물어보세요!
        </p>
      </div>
      <button type="button" className="chatbot-floater__button" aria-label="챗봇 열기">
        <img className="chatbot-floater__icon" src={chatbotImage} alt="" />
      </button>
    </div>,
    document.body,
  )
}
