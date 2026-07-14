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

/** Media only — all text lives in the `education` i18n namespace, merged by id. */
export const KIT_COMPONENT_MEDIA = [
  { id: 'ferrofluid', name: 'Ferrofluid', volume: '100㎖', image: bottleFerrofluid },
  { id: 'clear-liquid', name: 'Clear liquid', volume: '1,000㎖', image: bottleClear },
  { id: 'etching-agent', name: 'Etching agent', volume: '1,000㎖', image: bottleEtching },
  { id: 'coating-agent', name: 'Coating agent', volume: '1,000㎖', image: bottleCoating },
] as const

export const COMPONENT_DETAIL_MEDIA: {
  id: string
  index: number
  name: string
  image: string
  videoIds: string[]
}[] = [
  { id: 'ferrofluid', index: 1, name: 'Ferrofluid', image: shotFerrofluid, videoIds: ['Irprr-TnHIs', 'MBN8HAp711M'] },
  { id: 'clear-liquid', index: 2, name: 'Clear liquid', image: shotClear, videoIds: ['CDQTNwn3g6U', 'bIaRwrJUmyc'] },
  { id: 'etching-agent', index: 3, name: 'Etching agent', image: shotEtching, videoIds: [] },
  { id: 'coating-agent', index: 4, name: 'Coating agent', image: shotCoating, videoIds: [] },
]

export const PACKAGING_VIDEO_IDS = ['gvzHjHmVaB0', 'cG20uBQTysY'] as const
export const MAKING_VIDEO_ID = 'q2aOS8kWQsk'
