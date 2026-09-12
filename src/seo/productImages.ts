/**
 * 제품별 대표 이미지 — 구조화 데이터(Product.image)에 쓴다.
 *
 * 값은 홈 화면 제품 타일이 쓰는 Supabase 스토리지의 **공개 URL** 이다.
 * Supabase 를 런타임에 조회하지 않고 여기에 적어 두는 이유:
 *
 *  1. 조회하려면 Layout 에서 제품 목록을 받아와야 하는데, 그러면 제품과 무관한
 *     화면까지 30개 전부에 네트워크 요청이 하나씩 붙는다.
 *  2. 프리렌더는 데이터가 도착하기 전에 HTML 을 저장할 수 있다. 그러면 정작
 *     검색엔진이 읽는 정적 HTML 에만 image 가 빠진다.
 *  3. 스토리지 URL 은 경로 기반이라, 같은 경로에 사진을 갈아끼우면 URL 이 그대로다.
 *     즉 사진 교체는 코드 수정 없이 반영된다. 파일명이 바뀔 때만 여기를 고치면 된다.
 *
 * `/education` 은 홈 타일이 없어 Supabase 경로가 없다. 번들 이미지를 대신 쓰는 방법도
 * 있지만 개발 서버와 빌드 결과의 주소가 서로 달라 검증이 어렵고, 가지고 있는 파일도
 * 426px 이하라 대표 이미지로 쓰기에 작다. 그래서 image 를 넣지 않는다 —
 * 잘못된 주소를 넣는 것보다 빼는 편이 낫다. 제품 사진이 준비되면 여기에 추가한다.
 */

const SUPABASE_PRODUCTS =
  'https://obrwkliqzuaebajjetak.supabase.co/storage/v1/object/public/magron-website/products'

const IMAGES: Record<string, string> = {
  '/ferrofluid': `${SUPABASE_PRODUCTS}/product_ferrofluid.jpg`,
  '/feedthrough': `${SUPABASE_PRODUCTS}/feedthrough.png`,
  '/magoil': `${SUPABASE_PRODUCTS}/magoil_magseal_reel_waterproof.png`,
  '/magnet': `${SUPABASE_PRODUCTS}/Magnet.png`,
  '/piezo-ink': `${SUPABASE_PRODUCTS}/conductive%26piezoink%20pic.png`,
  '/display': `${SUPABASE_PRODUCTS}/Display.png`,
}

/** 제품 화면의 대표 이미지 URL. 없으면 undefined — 구조화 데이터에서 필드째 빠진다. */
export function getProductImage(routePath: string, siteUrl: string): string | undefined {
  const src = IMAGES[routePath]
  if (!src) return undefined
  // 스토리지 URL 은 이미 절대 주소다. 혹시 상대 경로가 들어오면 사이트 주소를 붙인다.
  return src.startsWith("http") ? src : `${siteUrl}${src}`
}
