/* ==========================================================================
   유해가스 및 분진 차단용 자성유체 (Ferrofluid Seal)
   All figures use the local catalogue images (ferrofluid_1 ~ ferrofluid_12)
   instead of loading from Supabase.
   ========================================================================== */

import imgProduct from '@/assets/images/ferrofluid/ferrofluid_1.avif'
import imgCorrosiveProduct from '@/assets/images/ferrofluid/ferrofluid_2.avif'
import imgCorrosiveSpec from '@/assets/images/ferrofluid/ferrofluid_3.avif'
import imgLeakM4251 from '@/assets/images/ferrofluid/ferrofluid_4.avif'
import imgLeakM5070 from '@/assets/images/ferrofluid/ferrofluid_5.avif'
import imgNonCorrosiveSpec from '@/assets/images/ferrofluid/ferrofluid_6.avif'
import imgTgaMff from '@/assets/images/ferrofluid/ferrofluid_7.avif'
import imgTgaMfsMfh from '@/assets/images/ferrofluid/ferrofluid_8.avif'
import imgSealSection from '@/assets/images/ferrofluid/ferrofluid_9.avif'
import imgApplicationField from '@/assets/images/ferrofluid/ferrofluid_10.avif'
import imgApplicationGrid from '@/assets/images/ferrofluid/ferrofluid_11.avif'
import imgApplicationExtra from '@/assets/images/ferrofluid/crops/applications-extra.png'
import imgCompanyBuilding from '@/assets/images/ferrofluid/crops/company-building.png'

export {
  imgProduct,
  imgCorrosiveProduct,
  imgCorrosiveSpec,
  imgLeakM4251,
  imgLeakM5070,
  imgNonCorrosiveSpec,
  imgTgaMff,
  imgTgaMfsMfh,
  imgSealSection,
  imgApplicationField,
  imgApplicationGrid,
  imgApplicationExtra,
  imgCompanyBuilding,
}

export const HERO_CARDS = [
  { title: '비접촉 밀봉', description: '자기장 안의 자성유체가 액체 O-ring 형태의 씰링막을 형성합니다.' },
  { title: '유해가스·분진 차단', description: '활성·비활성 가스와 분진의 이동을 안정적으로 차단합니다.' },
  { title: '고진공 유지', description: '진공 배기 시간이 짧고 진공도를 일정하게 유지합니다.' },
  { title: '긴 수명 · 무마모', description: '기계적 마찰이 없어 파티클 발생이 적고 수명이 깁니다.' },
] as const

export const CORROSIVE_POINTS = [
  { label: 'Ferrofluid For Corrosive Gas', value: '활성(부식성) 가스 환경용' },
  { label: 'Carrier fluid', value: 'Perfluoro-Polyether (PFPE)' },
] as const

export const NON_CORROSIVE_POINTS = [
  { label: 'Ferrofluid For Non-Corrosive Gas', value: '비활성(비부식성) 가스 환경용' },
  { label: 'Carrier fluid', value: 'MFS 시리즈 – Silicon / MFH 시리즈 – Hydrocarbon' },
] as const

export const COMPANY_INFO_ROWS = [
  { label: '주소', value: '(15588) 경기도 안산시 상록구 해안로 705 경기테크노파크 3동 403호' },
  { label: '연락처', value: 'TEL) 031-500-4633   FAX) 031-500-4631' },
  { label: '이메일', value: 'magron@magron.co.kr' },
  { label: '웹사이트', value: '(KO) www.ferrofluidmagron.co.kr   (EN) www.ferrofluidmagron.com' },
] as const

export const INQUIRY_ITEMS = [
  '사용 가스 종류 (활성 / 비활성)',
  '회전축 직경 및 회전 속도',
  '요구 진공도 및 온도 조건',
  '장비 종류 및 적용 공정',
  '필요 수량 및 납기',
] as const
