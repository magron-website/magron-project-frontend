import type { Language } from '@/i18n'

export const SITE_URL = 'https://magron.kr'

type Localized = Record<Language, string>

export type RouteMeta = {
  title: Localized
  description: Localized
}

// 영문·중문 검색결과에 한글 "(주)마그론"이 그대로 노출되지 않도록 언어별로 둔다.
const BRAND: Localized = {
  ko: 'MAGRON (주)마그론',
  en: 'MAGRON Korea',
  zh: 'MAGRON 玛格龙',
}

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
      en: 'Since 2004, MAGRON has made ferrofluid and magnetic materials — ferrofluid seals, vacuum feedthroughs, Mag-oil, magnets, and ferrofluid displays.',
      zh: 'MAGRON 玛格龙成立于2004年，专业从事磁流体与磁性材料——磁流体密封、真空馈通、Mag-oil、磁铁及磁流体展示装置的研发与制造。',
    },
  },
  '/company': {
    title: {
      ko: `회사소개 | ${BRAND.ko}`,
      en: `About Us | ${BRAND.en}`,
      zh: `公司介绍 | ${BRAND.zh}`,
    },
    description: {
      ko: '2004년 설립된 (주)마그론은 자성유체와 관련 부품을 전문적으로 제작·공급하며 반도체·디스플레이·태양전지·전자·자동차 등 다양한 산업에 적용됩니다.',
      en: 'Founded in 2004, MAGRON makes ferrofluid and related components for the semiconductor, display, solar cell, electronics, and automotive industries.',
      zh: 'MAGRON 成立于2004年，专业研发与生产磁流体及相关部件，广泛应用于半导体、显示、太阳能电池、电子及汽车等行业。',
    },
  },
  '/tech': {
    title: {
      ko: `기술정보 · 자성유체 기술자료 및 시험성적서 | ${BRAND.ko}`,
      en: `Ferrofluid Technical Data & Test Reports | ${BRAND.en}`,
      zh: `技术信息 · 磁流体技术资料与检测报告 | ${BRAND.zh}`,
    },
    description: {
      ko: 'MFF-M 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 기술자료입니다. 증기압 기술노트, KOPTRI(한국고분자시험연구원) 측정 결과, TGA 원자료를 PDF로 열람·다운로드할 수 있습니다.',
      en: 'MFF-M ferrofluid heat resistance, vapor pressure, and vacuum stability data — vapor pressure notes, KOPTRI test reports, and TGA raw data as PDF.',
      zh: '支持 MFF-M 磁流体耐热性、蒸气压与真空稳定性的技术资料。可在线阅览并下载蒸气压技术说明、KOPTRI 测定结果及 TGA 原始数据 PDF。',
    },
  },
  '/ferrofluid': {
    title: {
      ko: `유해가스 및 분진 차단용 자성유체 | ${BRAND.ko}`,
      en: `Ferrofluid for Corrosive Gas & Dust Blocking | ${BRAND.en}`,
      zh: `有害气体及粉尘阻隔用磁流体 | ${BRAND.zh}`,
    },
    description: {
      ko: '회전축 주변의 유해가스 누출·분진 유입·진공도 저하를 자성유체 기반 비접촉 씰링으로 차단합니다. 부식성/비부식성 가스용 MFF·MFS·MFH 시리즈를 제공합니다.',
      en: 'Non-contact ferrofluid seals that stop gas leaks, dust ingress, and vacuum loss at rotating shafts. MFF/MFS/MFH series for corrosive or inert gases.',
      zh: '采用磁流体非接触密封，阻隔旋转轴周围的有害气体泄漏、粉尘侵入与真空度下降。提供适用于腐蚀性/非腐蚀性气体的 MFF·MFS·MFH 系列。',
    },
  },
  '/feedthrough': {
    title: {
      ko: `Ferrofluid 진공 피드스루 (Feedthrough) | ${BRAND.ko}`,
      en: `Ferrofluid Vacuum Feedthrough | ${BRAND.en}`,
      zh: `磁流体真空馈通 (Feedthrough) | ${BRAND.zh}`,
    },
    description: {
      ko: '자성유체 씰이 적용된 진공 회전 도입기(Feedthrough)로, 진공·가스 환경에서 회전 운동을 안정적으로 전달하면서 누설을 차단합니다.',
      en: 'Ferrofluid-sealed rotary vacuum feedthroughs that transmit rotary motion in vacuum/gas environments while sealing against leakage.',
      zh: '采用磁流体密封的真空旋转馈通装置，在真空/气体环境中稳定传递旋转运动，同时阻隔气体、粉尘与污染物的泄漏。',
    },
  },
  '/magoil': {
    title: {
      ko: `릴 수리용 맥오일 (Reel Mag oil) | ${BRAND.ko}`,
      en: `Reel Mag-oil for Fishing Reels | ${BRAND.en}`,
      zh: `渔轮维修用 Mag-oil | ${BRAND.zh}`,
    },
    description: {
      ko: 'DAIWA MAGSEALED 구조 릴의 방수·방진 성능을 유지하기 위한 릴 수리용 자성유체(맥오일)입니다. 물·염분·이물질 유입을 줄여 회전 성능과 내구성을 유지합니다.',
      en: 'Reel-repair ferrofluid (Mag-oil) that maintains the waterproof/dustproof performance of DAIWA MAGSEALED reels, reducing water, salt, and debris ingress.',
      zh: '用于维修 DAIWA MAGSEALED 结构渔轮的磁流体（Mag-oil），保持防水防尘性能，减少水、盐分与异物侵入。',
    },
  },
  '/magnet': {
    title: {
      ko: `자석 (Magnet) | ${BRAND.ko}`,
      en: `Magnets | ${BRAND.en}`,
      zh: `磁铁 (Magnet) | ${BRAND.zh}`,
    },
    description: {
      ko: '자성유체 응용 및 산업용 자석 제품을 제공합니다. 형상·크기·자력 등 용도에 맞춘 규격으로 주문제작이 가능하며, 사양과 견적은 이메일로 문의하실 수 있습니다.',
      en: 'Industrial and ferrofluid-application magnets, made to order in the shape, size, and strength you need. Contact us for specs and quotes.',
      zh: '提供磁流体应用及工业用磁铁产品，可按形状、尺寸、磁力等用途规格定制生产，欢迎通过邮件咨询规格与报价。',
    },
  },
  '/education': {
    title: {
      ko: `자성유체 교육 키트 (Education kit) | ${BRAND.ko}`,
      en: `Ferrofluid Education Kit | ${BRAND.en}`,
      zh: `磁流体教育套件 (Education kit) | ${BRAND.zh}`,
    },
    description: {
      ko: '자성유체의 원리와 특성을 직접 체험하고 학습할 수 있는 교육용 자성유체 키트입니다. 자석에 반응해 모양이 바뀌는 자성유체를 수업·실험·전시에 활용할 수 있습니다.',
      en: 'A hands-on ferrofluid education kit — watch ferrofluid change shape with a magnet and learn its principles in classes, labs, and exhibitions.',
      zh: '可亲身体验并学习磁流体原理与特性的教育用磁流体套件。磁流体会随磁铁改变形态，适用于课堂教学、实验与展示。',
    },
  },
  '/piezo-ink': {
    title: {
      ko: `PIEZO Ink · 압전/전도성 잉크 | ${BRAND.ko}`,
      en: `PIEZO Ink · Piezoelectric & Conductive Ink | ${BRAND.en}`,
      zh: `PIEZO Ink · 压电/导电油墨 | ${BRAND.zh}`,
    },
    description: {
      ko: '압력에 반응해 전기 신호를 발생시키는 압전(Piezo) 잉크와 인쇄 회로용 전도성(Conductive) 잉크입니다. 인쇄 전자, 웨어러블 센서 등에 적용됩니다.',
      en: 'Piezoelectric ink that turns pressure into an electrical signal, plus conductive ink for printed circuits — for printed electronics and wearable sensors.',
      zh: '受压时产生电信号的压电油墨与用于印刷电路的导电油墨，应用于印刷电子、可穿戴传感器等领域。',
    },
  },
  '/display': {
    title: {
      ko: `대형 자성유체 디스플레이 | ${BRAND.ko}`,
      en: `Large Ferrofluid Display | ${BRAND.en}`,
      zh: `大型磁流体展示装置 | ${BRAND.zh}`,
    },
    description: {
      ko: '자성유체의 역동적인 움직임을 활용한 대형 자성유체 디스플레이입니다. 전시·홍보·아트 설치 등에 활용됩니다.',
      en: 'A large ferrofluid display that harnesses the dynamic motion of ferrofluid for exhibitions, promotions, and art installations.',
      zh: '利用磁流体动态运动的大型磁流体展示装置，随磁场变化呈现独特造型，适用于展览、企业宣传及艺术装置等场景。',
    },
  },
}
