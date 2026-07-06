import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import '@/assets/design/quote-modal.css'

const requestItems = [
  { label: '유해가스 및 분진 차단용 자성 유체', small: false },
  { label: 'Feedthrough', small: true },
  { label: '낚시릴 수리용 맥오일', small: false },
  { label: '자석', small: false },
  { label: '대형 자성유체 디스플레이', small: false },
  { label: '자성유체 키트', small: false },
  { label: '기타', small: false },
]

type QuoteRequestModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteRequestModal({ isOpen, onClose }: QuoteRequestModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="quote-modal" role="dialog" aria-modal="true" aria-label="견적서 요청">
          <motion.button
            type="button"
            className="quote-modal__backdrop"
            aria-label="닫기"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="quote-modal__panel"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="quote-modal__header">
              <h2 className="quote-modal__title">견적서 요청</h2>
              <button type="button" className="quote-modal__close" onClick={onClose}>
                닫기
              </button>
            </div>

            <form className="quote-modal__form" onSubmit={(event) => event.preventDefault()}>
              <div className="quote-modal__row">
                <div className="quote-modal__field">
                  <label className="quote-modal__label" htmlFor="quote-first-name">
                    이름<span className="quote-modal__required">*</span>
                  </label>
                  <input id="quote-first-name" className="quote-modal__input" type="text" />
                </div>
                <div className="quote-modal__field">
                  <label className="quote-modal__label" htmlFor="quote-last-name">
                    성
                  </label>
                  <input id="quote-last-name" className="quote-modal__input" type="text" />
                </div>
              </div>

              <div className="quote-modal__field">
                <label className="quote-modal__label" htmlFor="quote-company">
                  회사명<span className="quote-modal__required">*</span>
                </label>
                <input id="quote-company" className="quote-modal__input" type="text" />
              </div>

              <div className="quote-modal__field">
                <label className="quote-modal__label" htmlFor="quote-location">
                  위치
                </label>
                <input id="quote-location" className="quote-modal__input" type="text" />
              </div>

              <div className="quote-modal__field">
                <label className="quote-modal__label" htmlFor="quote-email">
                  이메일<span className="quote-modal__required">*</span>
                </label>
                <input id="quote-email" className="quote-modal__input" type="email" />
              </div>

              <fieldset className="quote-modal__fieldset">
                <legend className="quote-modal__label">
                  요청 항목<span className="quote-modal__required">*</span>
                </legend>
                <div className="quote-modal__checkboxes">
                  {requestItems.map((item) => (
                    <label key={item.label} className="quote-modal__checkbox-row">
                      <input className="quote-modal__checkbox" type="checkbox" />
                      <span
                        className={
                          item.small
                            ? 'quote-modal__checkbox-label quote-modal__checkbox-label--sm'
                            : 'quote-modal__checkbox-label'
                        }
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="quote-modal__field">
                <label className="quote-modal__label" htmlFor="quote-other">
                  기타 (금액 및 용량)
                </label>
                <textarea id="quote-other" className="quote-modal__textarea" rows={3} />
              </div>

              <p className="quote-modal__privacy">
                제출 시, 당사의 [개인정보 처리방침]에 동의하며 요청하신 문의 사항과 관련하여 연락을
                취하는 것에 동의하는 것으로 간주됩니다.
              </p>

              <button type="submit" className="quote-modal__submit">
                제출
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
