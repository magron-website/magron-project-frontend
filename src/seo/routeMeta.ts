import type { Language } from '@/i18n'

export const SITE_URL = 'https://www.magron.co.kr'

type Localized = Record<Language, string>

export type RouteMeta = {
  title: Localized
  description: Localized
}

const BRAND = 'MAGRON (주)마그론'

/** Per-route <title> / description used both at runtime and by the prerender script. */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: {
      ko: '자성유체 | 자성소재 전문회사 (주)마그론 | 대한민국',
      en: 'Ferrofluid & Magnetic Materials Specialist | MAGRON, Korea',
      zh: '磁流体 · 磁性材料专业制造商 | MAGRON 玛格龙（韩国）',
    },
    description: {
      ko: '(주)마그론은 2004년 설립된 자성유체(Ferrofluid)·자성소재 전문 기업으로, 자성유체 씰, 진공 피드스루, 맥오일, 자석, 자성유체 디스플레이를 제조·공급합니다.',
      en: 'MAGRON, founded in 2004, is a specialist in ferrofluid and magnetic materials — ferrofluid seals, vacuum feedthroughs, Mag-oil, magnets, and ferrofluid displays.',
      zh: 'MAGRON 玛格龙成立于2004年，专业从事磁流体与磁性材料——磁流体密封、真空馈通、Mag-oil、磁铁及磁流体展示装置的研发与制造。',
    },
  },
  '/company': {
    title: {
      ko: `회사소개 | ${BRAND}`,
      en: `About Us | ${BRAND}`,
      zh: `公司介绍 | ${BRAND}`,
    },
    description: {
      ko: '2004년 설립된 (주)마그론은 자성유체와 관련 부품을 전문적으로 제작·공급하며 반도체·디스플레이·태양전지·전자·자동차 등 다양한 산업에 적용됩니다.',
      en: 'Founded in 2004, MAGRON specializes in manufacturing ferrofluid and related components used across semiconductor, display, solar cell, electronics, and automotive industries.',
      zh: 'MAGRON 成立于2004年，专业研发与生产磁流体及相关部件，广泛应用于半导体、显示、太阳能电池、电子及汽车等行业。',
    },
  },
  '/ferrofluid': {
    title: {
      ko: `유해가스 및 분진 차단용 자성유체 | ${BRAND}`,
      en: `Ferrofluid for Corrosive Gas & Dust Blocking | ${BRAND}`,
      zh: `有害气体及粉尘阻隔用磁流体 | ${BRAND}`,
    },
    description: {
      ko: '회전축 주변의 유해가스 누출·분진 유입·진공도 저하를 자성유체 기반 비접촉 씰링으로 차단합니다. 부식성/비부식성 가스용 MFF·MFS·MFH 시리즈를 제공합니다.',
      en: 'Non-contact ferrofluid sealing that blocks corrosive-gas leakage, dust ingress, and vacuum loss around rotating shafts. MFF/MFS/MFH series for corrosive and non-corrosive gases.',
      zh: '采用磁流体非接触密封，阻隔旋转轴周围的有害气体泄漏、粉尘侵入与真空度下降。提供适用于腐蚀性/非腐蚀性气体的 MFF·MFS·MFH 系列。',
    },
  },
  '/feedthrough': {
    title: {
      ko: `Ferrofluid 진공 피드스루 (Feedthrough) | ${BRAND}`,
      en: `Ferrofluid Vacuum Feedthrough | ${BRAND}`,
      zh: `磁流体真空馈通 (Feedthrough) | ${BRAND}`,
    },
    description: {
      ko: '자성유체 씰이 적용된 진공 회전 도입기(Feedthrough)로, 진공·가스 환경에서 회전 운동을 안정적으로 전달하면서 누설을 차단합니다.',
      en: 'Ferrofluid-sealed rotary vacuum feedthroughs that transmit rotary motion in vacuum/gas environments while sealing against leakage.',
      zh: '采用磁流体密封的真空旋转馈通装置，在真空/气体环境中稳定传递旋转运动，同时防止泄漏。',
    },
  },
  '/magoil': {
    title: {
      ko: `릴 수리용 맥오일 (Reel Mag oil) | ${BRAND}`,
      en: `Reel Mag-oil for Fishing Reels | ${BRAND}`,
      zh: `渔轮维修用 Mag-oil | ${BRAND}`,
    },
    description: {
      ko: 'DAIWA MAGSEALED 구조 릴의 방수·방진 성능을 유지하기 위한 릴 수리용 자성유체(맥오일)입니다. 물·염분·이물질 유입을 줄여 회전 성능과 내구성을 유지합니다.',
      en: 'Reel-repair ferrofluid (Mag-oil) that maintains the waterproof/dustproof performance of DAIWA MAGSEALED reels, reducing water, salt, and debris ingress.',
      zh: '用于维修 DAIWA MAGSEALED 结构渔轮的磁流体（Mag-oil），保持防水防尘性能，减少水、盐分与异物侵入。',
    },
  },
  '/magnet': {
    title: {
      ko: `자석 (Magnet) | ${BRAND}`,
      en: `Magnets | ${BRAND}`,
      zh: `磁铁 (Magnet) | ${BRAND}`,
    },
    description: {
      ko: '자성유체 응용 및 산업용 자석 제품을 제공합니다. 용도별 규격 주문제작이 가능합니다.',
      en: 'Industrial and ferrofluid-application magnets, available as custom-specified made-to-order products.',
      zh: '提供工业用及磁流体应用磁铁产品，可按用途规格定制生产。',
    },
  },
  '/education': {
    title: {
      ko: `자성유체 교육 키트 (Education kit) | ${BRAND}`,
      en: `Ferrofluid Education Kit | ${BRAND}`,
      zh: `磁流体教育套件 (Education kit) | ${BRAND}`,
    },
    description: {
      ko: '자성유체의 원리와 특성을 직접 체험하고 학습할 수 있는 교육용 자성유체 키트입니다.',
      en: 'A hands-on education kit for experiencing and learning the principles and properties of ferrofluid.',
      zh: '可亲身体验并学习磁流体原理与特性的教育用磁流体套件。',
    },
  },
  '/display': {
    title: {
      ko: `대형 자성유체 디스플레이 | ${BRAND}`,
      en: `Large Ferrofluid Display | ${BRAND}`,
      zh: `大型磁流体展示装置 | ${BRAND}`,
    },
    description: {
      ko: '자성유체의 역동적인 움직임을 활용한 대형 자성유체 디스플레이입니다. 전시·홍보·아트 설치 등에 활용됩니다.',
      en: 'A large ferrofluid display that harnesses the dynamic motion of ferrofluid for exhibitions, promotions, and art installations.',
      zh: '利用磁流体动态运动的大型磁流体展示装置，适用于展览、宣传及艺术装置等场景。',
    },
  },
}
