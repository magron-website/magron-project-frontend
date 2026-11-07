import { useTranslation } from 'react-i18next'
import { openInquiry, type InquirySource } from '@/lib/inquiryOpener'
import '@/assets/design/inquiry-chooser.css'

/** 제품 페이지 "견적·사양 문의" 버튼 — 누르면 챗봇을 거치지 않고 큰 문의 창(방법 고르기)이 바로 뜬다. */
export default function ProductInquiryButton({
  target,
  source,
  model,
  material,
  variant = 'solid',
  size = 'normal',
  label,
}: {
  target: string
  source: InquirySource
  model?: string
  material?: string
  /** hero = 히어로·하단 배너용 큰 주황 버튼(남색 바탕에서 가장 먼저 눈에 띄게, 11/7) */
  variant?: 'solid' | 'ghost' | 'hero'
  size?: 'normal' | 'small'
  label?: string
}) {
  const { t } = useTranslation('product')
  const className = [
    'product-inquiry-btn',
    variant === 'ghost' ? 'product-inquiry-btn--ghost' : '',
    variant === 'hero' ? 'product-inquiry-btn--hero' : '',
    size === 'small' ? 'product-inquiry-btn--small' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const text = label ?? (model ? t('inquiryModelButton') : t('inquiryButton'))
  return (
    <button type="button" className={className} onClick={() => openInquiry({ target, source, model, material })}>
      <svg viewBox="0 0 16 16" width={variant === 'hero' ? 22 : 16} height={variant === 'hero' ? 22 : 16} fill="none" aria-hidden="true">
        <rect x="3" y="1.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 5h5M5.5 8h5M5.5 11h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {variant === 'hero' ? (
        <span className="product-inquiry-btn__text">
          <span className="product-inquiry-btn__main">{text} →</span>
          <span className="product-inquiry-btn__sub">{t('inquiryHeroSub')}</span>
        </span>
      ) : (
        text
      )}
    </button>
  )
}
