import type { Language } from '@/i18n'

/**
 * 홈·회사소개에 싣는 "핵심 수치" 표.
 *
 * 왜 따로 두나: 10/17 GEO 진단에서 영어 홈(/en/)의 단위 붙은 수치가 0개였다.
 * AI 검색은 "사양·수치·시험조건"이 한 줄에 붙어 있는 문장을 근거로 인용하는데,
 * 홈에는 사진과 카탈로그 표지뿐이라 꺼내 쓸 문장이 없었다.
 *
 * 규칙: 여기 숫자는 **이미 제품 페이지·answers.ts·사양표에 공개된 값만** 쓴다.
 * 새 측정값(온도별 증기압, TGA 정확값, 리크 수렴시간 등)은 이사님 공개 승인 전까지 넣지 않는다.
 * 숫자를 바꿀 땐 같은 값을 쓰는 answers.ts 와 제품 사양표도 함께 고친다.
 */

type Localized = Record<Language, string>

/**
 * 핵심 사양 표(홈·회사소개)와 "자성유체 씰과 오일씰·기계식 씰 비교 보기" 링크(표 아래·제품 화면 FAQ 아래)를 보일지.
 * 2026-10-19 사용자 요청으로 "일단" 숨김. 다시 보이려면 true 로만 바꾸면 된다. /seal-comparison 화면 자체는 그대로 둔다.
 */
export const KEY_FIGURES_VISIBLE = false

export type KeyFigure = {
  /** 제품 페이지 경로(언어 접두어 없음) */
  path: string
  product: Localized
  item: Localized
  value: string
  basis: Localized
}

const CATALOG: Localized = {
  ko: 'MAGRON 카탈로그 사양',
  en: 'MAGRON catalogue specification',
  zh: 'MAGRON 产品目录规格',
}

export const KEY_FIGURES: KeyFigure[] = [
  {
    path: '/ferrofluid',
    product: { ko: '자성유체 MFF-M (PFPE)', en: 'Ferrofluid MFF-M (PFPE)', zh: '磁流体 MFF-M（PFPE）' },
    item: { ko: '증기압 (20℃)', en: 'Vapor pressure at 20℃', zh: '蒸气压（20℃）' },
    value: '≤ 1.5×10⁻¹⁰ Pa',
    basis: {
      ko: '한국고분자시험연구소(KOPTRI), OECD TG 104 유출법',
      en: 'KOPTRI, OECD TG 104 effusion method',
      zh: '韩国高分子试验研究所（KOPTRI），OECD TG 104 逸出法',
    },
  },
  {
    path: '/ferrofluid',
    product: { ko: '자성유체 MFF-M (PFPE)', en: 'Ferrofluid MFF-M (PFPE)', zh: '磁流体 MFF-M（PFPE）' },
    item: { ko: '1wt% 중량손실 온도', en: '1 wt% weight-loss temperature', zh: '1wt% 失重温度' },
    value: '> 280℃',
    basis: {
      ko: '한국생산기술연구원(KITECH), TGA 10℃/min',
      en: 'KITECH, TGA at 10℃/min',
      zh: '韩国生产技术研究院（KITECH），TGA 10℃/min',
    },
  },
  {
    path: '/feedthrough',
    product: { ko: '자성유체 진공 피드스루', en: 'Ferrofluid vacuum feedthrough', zh: '磁流体真空馈通' },
    item: { ko: '헬륨 누설율', en: 'Helium leak rate', zh: '氦气泄漏率' },
    value: '< 10⁻¹² Pa·m³/s (10⁻¹¹ Torr·ℓ/s)',
    basis: CATALOG,
  },
  {
    path: '/feedthrough',
    product: { ko: '자성유체 진공 피드스루', en: 'Ferrofluid vacuum feedthrough', zh: '磁流体真空馈通' },
    item: { ko: '도달 진공도', en: 'Attainable vacuum', zh: '可达真空度' },
    value: '10⁻⁶ Pa (10⁻⁸ Torr)',
    basis: CATALOG,
  },
  {
    path: '/feedthrough',
    product: { ko: '자성유체 진공 피드스루', en: 'Ferrofluid vacuum feedthrough', zh: '磁流体真空馈通' },
    item: { ko: '사용 온도', en: 'Operating temperature', zh: '使用温度' },
    value: '0 – 150℃',
    basis: CATALOG,
  },
  {
    path: '/feedthrough',
    product: { ko: '복합 구동 피드스루', en: 'Combined-drive feedthrough', zh: '复合驱动馈通' },
    item: { ko: '구성', en: 'Configuration', zh: '构成' },
    value: '3-axis coaxial + 50 mm linear stroke',
    basis: {
      ko: 'Cluster Tool·300mm 웨이퍼·진공 이송 로봇용',
      en: 'For Cluster Tools, 300 mm wafers, in-vacuum transfer robots',
      zh: '用于 Cluster Tool、300mm 晶圆、真空传送机器人',
    },
  },
  {
    path: '/magoil',
    product: { ko: '맥오일 (실리콘 자성유체)', en: 'Mag-oil (silicone ferrofluid)', zh: 'Mag-oil（硅系磁流体）' },
    item: { ko: '입자 크기 / 용량', en: 'Particle size / fill', zh: '粒径 / 容量' },
    value: '≈ 10 nm / 1 ml (1.2 g)',
    basis: CATALOG,
  },
  {
    path: '/magnet',
    product: { ko: '소결 NdFeB 자석', en: 'Sintered NdFeB magnet', zh: '烧结钕铁硼磁体' },
    item: { ko: '등급 / 최대 사용온도', en: 'Grades / max. operating temperature', zh: '等级 / 最高使用温度' },
    value: 'N33 – N52 / EH 200℃',
    basis: CATALOG,
  },
  {
    path: '/magnet',
    product: { ko: 'SmCo 자석', en: 'SmCo magnet', zh: 'SmCo 磁体' },
    item: { ko: '사용 온도', en: 'Operating temperature', zh: '使用温度' },
    value: '250 – 350℃',
    basis: CATALOG,
  },
  {
    path: '/education',
    product: { ko: '자성유체 교육 키트', en: 'Ferrofluid education kit', zh: '磁流体教育套件' },
    item: { ko: '내구성 시험', en: 'Durability test', zh: '耐久试验' },
    value: '500 rpm × 1,000 h',
    basis: { ko: '자체 시험, RoHS 인증', en: 'In-house test, RoHS certified', zh: '自有试验，RoHS 认证' },
  },
]

export const KEY_FIGURES_TEXT: Record<
  Language,
  { heading: string; lead: string; product: string; item: string; value: string; basis: string; compare: string }
> = {
  ko: {
    heading: '핵심 사양 한눈에 보기',
    lead: '2004년부터 자성유체와 자성유체 씰 부품을 만들어 온 (주)마그론의 대표 제품 수치입니다. 시험기관과 시험법을 함께 적었습니다.',
    product: '제품',
    item: '항목',
    value: '값',
    basis: '근거',
    compare: '자성유체 씰과 오일씰·기계식 씰 비교 보기',
  },
  en: {
    heading: 'Key specifications at a glance',
    lead: 'Headline figures for the products MAGRON has made since 2004 — ferrofluid and ferrofluid-sealed components — with the test laboratory and method for each.',
    product: 'Product',
    item: 'Item',
    value: 'Value',
    basis: 'Basis',
    compare: 'Compare ferrofluid seals with lip and mechanical seals',
  },
  zh: {
    heading: '核心规格一览',
    lead: 'MAGRON 自 2004 年起生产磁流体及磁流体密封部件，以下为主要产品的关键数值，并注明检测机构与方法。',
    product: '产品',
    item: '项目',
    value: '数值',
    basis: '依据',
    compare: '查看磁流体密封与油封、机械密封的比较',
  },
}
