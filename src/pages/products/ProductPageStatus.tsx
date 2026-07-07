import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import '@/assets/design/product-detail.css'

type ProductPageStatusProps = {
  loading?: boolean
  error?: string | null
}

export default function ProductPageStatus({ loading, error }: ProductPageStatusProps) {
  if (loading) {
    return (
      <div className="product-detail product-detail--status" aria-busy="true">
        <ClipLoader color="#111111" size={48} aria-label="로딩 중" />
      </div>
    )
  }

  return (
    <div className="product-detail product-detail--status">
      <p className="product-detail__message">{error ?? '제품을 찾을 수 없습니다.'}</p>
      <Link className="product-detail__back" to="/">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
