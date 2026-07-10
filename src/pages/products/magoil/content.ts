/* ==========================================================================
   DAWA MAGSEALED — 릴 수리용 자성유체 (MAG OIL)
   Images cropped from the original catalogue (magoil_1 ~ magoil_4);
   descriptions are written separately from the images.
   ========================================================================== */

import heroReel from '@/assets/images/magoil/magoil_1.avif'
import productPackage from '@/assets/images/magoil/crops/product-package.png'
import productBottle from '@/assets/images/magoil/crops/product-bottle.png'
import sealPrincipleDiagram from '@/assets/images/magoil/crops/seal-principle-diagram.png'
import sealPrincipleReel from '@/assets/images/magoil/crops/seal-principle-reel.png'
import sealStep1 from '@/assets/images/magoil/crops/seal-step-1.png'
import sealStep2 from '@/assets/images/magoil/crops/seal-step-2.png'
import sealStep3 from '@/assets/images/magoil/crops/seal-step-3.png'
import internalCrossSection from '@/assets/images/magoil/crops/internal-crosssection.png'
import internalCutaway from '@/assets/images/magoil/crops/internal-cutaway.png'

export {
  heroReel,
  productPackage,
  productBottle,
  sealPrincipleDiagram,
  sealPrincipleReel,
  internalCrossSection,
  internalCutaway,
}

export const HERO_POINTS = [
  { title: '방수 성능 유지', description: '물과 염분이 릴 내부로 침투하는 것을 줄여줍니다.' },
  {
    title: '먼지·이물질 차단',
    description: '릴 내부로 유입되는 먼지와 오염물을 줄여 부품 손상을 예방합니다.',
  },
  {
    title: '부드러운 회전감 유지',
    description: '내부 부품의 오염과 부식을 줄여 릴의 회전감을 안정적으로 유지합니다.',
  },
] as const

// --- 2. 금속 병 타입 (magoil_2) ------------------------------------------
export const PACKAGE_POINTS = [
  '메탈 케이스 + 자성유체 병 + 설명서 첨부',
  '소량 구매 가능, 대량 구매 시 본사로 문의 주십시오.',
] as const

export const CAPACITY_HIGHLIGHT = {
  title: '맥오일 0.7ml로 약 45회 수리 가능',
  detail: '0.7ml = 가로 7 × 세로 7 × 높이 7(mm) = 7mm³ 의 체적 용량',
} as const

export const PACKAGE_IMAGES = [
  { image: productPackage, caption: 'MF SEALED 자성유체 튜브 · 패키지' },
  { image: productBottle, caption: '메탈 케이스 + 자성유체 병' },
] as const

// --- 3. 방수 원리 (magoil_3) ---------------------------------------------
export const SEAL_STEPS = [
  { image: sealStep1, text: '자석을 조금씩 가깝게 하면 자성유체가 서로 끌어당겨 접근합니다.' },
  { image: sealStep2, text: '자석을 더욱 접근시키면 자성유체가 일체화하며 상하를 차단합니다.' },
  { image: sealStep3, text: '자성유체 막에 의해 물이 차단됩니다.' },
] as const

// --- 8. 문의 ------------------------------------------------------------
export const INQUIRY_ITEMS = [
  '릴 브랜드 / 모델명',
  'MAGSEALED 적용 여부',
  '사용 환경: 민물 / 바닷물',
  '수리 목적: 방수 성능 복원 / 보충 / 회전감 개선 / 부식 방지',
  '현재 증상: 소음, 뻑뻑함, 침수, 염분 유입, 내부 오염 등',
  '필요한 제품 용량',
] as const
