/* ==========================================================================
   자성유체 키트 (Ferrofluid Kit) — 교육/실험용 자성유체 제작 키트
   Product photos are the catalogue images (education_1 ~ education_9).
   Video slots are intentionally left as placeholders (to be linked later).
   ========================================================================== */

import heroKit from '@/assets/images/education/education_1.avif'
import bottleFerrofluid from '@/assets/images/education/education_2.avif'
import bottleClear from '@/assets/images/education/education_3.avif'
import bottleEtching from '@/assets/images/education/education_4.avif'
import bottleCoating from '@/assets/images/education/education_5.avif'
import shotFerrofluid from '@/assets/images/education/education_6.avif'
import shotClear from '@/assets/images/education/education_7.avif'
import shotEtching from '@/assets/images/education/education_8.avif'
import shotCoating from '@/assets/images/education/education_9.avif'

export { heroKit }

export type KitComponent = {
  name: string
  nameKr: string
  volume: string
  image: string
}

export type KitVideo = {
  label: string
  /** YouTube video id — omit to render a "준비중" placeholder slot */
  videoId?: string
}

export type ComponentDetail = {
  id: string
  index: number
  name: string
  nameKr: string
  image: string
  body: string
  bulletPoints: string[]
  note?: string
  videos: KitVideo[]
}

export const HERO_CARDS = [
  { title: '자기장 반응 관찰', description: '자석에 반응하는 자성유체의 스파이크 형태를 직접 관찰합니다.' },
  { title: '직접 제작 체험', description: '구성품을 이용해 자성유체를 만들고 다루는 과정을 경험합니다.' },
  { title: '교육·전시 활용', description: '과학 교육, 전시 체험, 콘텐츠 제작, 연구 데모에 활용됩니다.' },
] as const

// --- 제품 구성 (4 components) --------------------------------------------
export const KIT_COMPONENTS: KitComponent[] = [
  { name: 'Ferrofluid', nameKr: '자성유체', volume: '100㎖', image: bottleFerrofluid },
  { name: 'Clear liquid', nameKr: '세척액(투명액)', volume: '1,000㎖', image: bottleClear },
  { name: 'Etching agent', nameKr: '에칭제', volume: '1,000㎖', image: bottleEtching },
  { name: 'Coating agent', nameKr: '코팅제', volume: '1,000㎖', image: bottleCoating },
]

// --- 구성품별 상세 (1~4) -------------------------------------------------
export const COMPONENT_DETAILS: ComponentDetail[] = [
  {
    id: 'ferrofluid',
    index: 1,
    name: 'Ferrofluid',
    nameKr: '자성유체',
    image: shotFerrofluid,
    body:
      '자성을 띠는 나노 입자가 액체 안에 안정적으로 분산된 기능성 유체입니다. 자석을 가까이 가져가면 입자가 자기장 방향으로 정렬되어 뾰족한 스파이크 형태를 만듭니다.',
    bulletPoints: [
      '자석 반응 시 나노 입자가 자기장 방향으로 정렬되어 스파이크 형태를 형성합니다.',
      '비휘발성 베이스 오일을 사용하여 장시간 형태와 성능이 유지됩니다.',
      '키트의 핵심 구성품으로, 실험과 관찰의 기준이 되는 유체입니다.',
    ],
    videos: [
      { label: '자성유체 비휘발성 실험 영상', videoId: 'Irprr-TnHIs' },
      { label: '자성유체 내구성 비교 영상', videoId: 'MBN8HAp711M' },
    ],
  },
  {
    id: 'clear-liquid',
    index: 2,
    name: 'Clear liquid',
    nameKr: '세척액(투명액)',
    image: shotClear,
    body:
      '자성유체의 희석과 세척에 사용하는 투명 용액입니다. 실험 후 잔여 자성유체를 정리하거나 농도를 조절할 때 사용합니다.',
    bulletPoints: [
      '자성유체 희석 및 세척 용도로 사용합니다.',
      '실험 후 도구와 용기 세척에 활용할 수 있습니다.',
      '투명한 상태로 자성유체의 움직임을 관찰하기 좋습니다.',
    ],
    videos: [
      { label: '자성유체 지속 실험 영상', videoId: 'CDQTNwn3g6U' },
      { label: '자성유체 유동성 확인 영상', videoId: 'bIaRwrJUmyc' },
    ],
  },
  {
    id: 'etching-agent',
    index: 3,
    name: 'Etching agent',
    nameKr: '에칭제',
    image: shotEtching,
    body:
      '표면 식각(에칭) 처리를 위한 용액입니다. 대상 표면을 부식·가공하여 자성유체가 안정적으로 반응할 수 있는 상태를 만듭니다.',
    bulletPoints: [
      '표면 식각(에칭) 처리 용도로 사용합니다.',
      '처리 대상의 표면 상태에 따라 사용량과 시간이 달라집니다.',
    ],
    note: '※ 에칭 처리 후에는 반드시 세척과 후처리가 필요합니다. 취급 시 안전에 유의하세요.',
    videos: [],
  },
  {
    id: 'coating-agent',
    index: 4,
    name: 'Coating agent',
    nameKr: '코팅제',
    image: shotCoating,
    body:
      '표면 코팅·보호 처리를 위한 용액입니다. 표면에 보호막을 형성하여 내구성과 안정성을 높이는 목적으로 사용합니다.',
    bulletPoints: [
      '표면 코팅 및 보호 처리 용도로 사용합니다.',
      '코팅 후 자성유체의 반응 안정성을 높이는 데 도움을 줍니다.',
    ],
    note: '※ 정확한 사용 방법과 처리 순서는 문의 주시면 함께 안내해 드립니다.',
    videos: [],
  },
]

// --- 제품 수량 및 패키징 --------------------------------------------------
export const PACKAGING_VIDEOS: KitVideo[] = [
  { label: 'Ferrofluid 실험 영상', videoId: 'gvzHjHmVaB0' },
  { label: '1,000㎖ 제품 실험 영상', videoId: 'cG20uBQTysY' },
]

// --- 동작 원리 -----------------------------------------------------------
export const PRINCIPLE_TEXT = [
  '자성유체는 계면활성제로 코팅된 자성 나노 입자가 베이스 오일 안에 균일하게 분산되어 있는 유체입니다. 평소에는 일반 액체처럼 흐르지만, 외부 자기장이 가해지면 입자들이 자기력선 방향으로 정렬됩니다.',
  '이때 표면장력과 자기력이 균형을 이루면서 자성유체 특유의 뾰족한 스파이크 패턴이 나타납니다. 자석의 세기와 위치를 바꾸면 패턴의 모양과 움직임도 함께 변합니다.',
] as const

// --- 제작 방법 -----------------------------------------------------------
export const MAKING_STEPS = [
  '키트 구성품(자성유체·세척액·에칭제·코팅제)과 실험 도구를 준비합니다.',
  '실험 표면 또는 대상을 에칭제로 처리한 뒤 세척액으로 깨끗이 세척합니다.',
  '코팅제로 표면을 코팅하여 보호막을 형성합니다.',
  '자성유체를 원하는 위치에 적용하고 자석으로 반응을 확인합니다.',
  '실험이 끝나면 세척액으로 도구와 표면을 정리합니다.',
] as const

export const MAKING_VIDEO: KitVideo = {
  label: '자성유체 키트 사용법 영상',
  videoId: 'q2aOS8kWQsk',
}

export const INQUIRY_ITEMS = [
  '사용 목적: 교육 / 전시 / 체험 / 연구 데모',
  '필요한 구성과 수량',
  '자성유체 용량 (100㎖ / 1,000㎖ 등)',
  '납품 시기 및 배송 지역',
] as const
