import { useTranslation } from 'react-i18next'
import { inquiryMailto } from '@/lib/inquiryOpener'

/** 하단 배너 "문의사항은 magron@magron.co.kr 로…" — 주소를 누르면 제품명이 제목에 들어간 메일이 열린다. */
export default function ProductContactNote({ target }: { target: string }) {
  const { t, i18n } = useTranslation('product')
  const email = 'magron@magron.co.kr'
  const [before, after] = t('contactNote').split(email)
  return (
    <p className="product-cta-note">
      {before}
      <a href={inquiryMailto(target, i18n.language)}>{email}</a>
      {after}
    </p>
  )
}
