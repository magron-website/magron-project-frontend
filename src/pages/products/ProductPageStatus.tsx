import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'
import '@/assets/design/product-detail.css'

type ProductPageStatusProps = {
  loading?: boolean
  error?: string | null
}

export default function ProductPageStatus({ loading, error }: ProductPageStatusProps) {
  const { t } = useTranslation(['product', 'common'])

  if (loading) {
    return (
      <div className="product-detail product-detail--status" aria-busy="true">
        <ClipLoader color="#111111" size={48} aria-label={t('common:loading')} />
      </div>
    )
  }

  return (
    <div className="product-detail product-detail--status">
      <p className="product-detail__message">{error ?? t('product:statusNotFound')}</p>
      <Link className="product-detail__back" to="/">
        {t('product:statusBack')}
      </Link>
    </div>
  )
}
