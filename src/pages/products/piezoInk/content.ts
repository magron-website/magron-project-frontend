/* ==========================================================================
   Functional ink catalogue (Conductive · Piezo · Magnetic)
   Source: supplier-based MAGRON TDS set, 2026-11-14 (14 sheets,
   OneDrive 000AIC Nano paint\마그론 나노잉크 TDS). The full spec table of each
   ink lives in its TDS PDF — the card shows a short description and opens
   the PDF ("상세표 보기"). titleKr / description are merged in from the
   `piezoInk` i18n namespace by id; the Korean text here is the fallback.
   ========================================================================== */

const TDS_BASE = 'https://obrwkliqzuaebajjetak.supabase.co/storage/v1/object/public/magron-website/tech/MAGRON-Ink-TDS-'
const tds = (code: string) => `${TDS_BASE}${code}.pdf`

export type InkProduct = {
  id: string
  code: string
  title: string
  titleKr: string
  description: string
  tags: string[]
  substrates?: string
  /** TDS PDF (English) opened by the "상세표 보기" button */
  tdsUrl: string
}

export type Category = {
  id: string
  title: string
  titleKr: string
  intro: string
  products: InkProduct[]
}

// ==========================================================================
// 1. CONDUCTIVE INK
// ==========================================================================

const bendableSilver: InkProduct = {
  id: 'bendable-silver',
  code: 'BSInk02NP®',
  title: 'Bendable Conductive Silver Ink',
  titleKr: '벤더블 전도성 실버 잉크',
  description:
    '스크린 프린팅용 실버 전도성 잉크로, 열성형 전후 성능이 일정해 In-Mold Electronics에 쓰입니다. 면저항 30 mΩ/sq 미만(열성형 후 120 mΩ/sq 미만).',
  tags: ['Bendable', 'Thermoforming & High Pressure Forming', 'Fast Curing', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PVC, PC, PMMA, TPU, Textile',
  tdsUrl: tds('BSInk02NP'),
}

const copperInk: InkProduct = {
  id: 'copper',
  code: 'CopInk01NP®',
  title: 'Conductive Copper Ink for In-Mold Electronics',
  titleKr: '인몰드용 전도성 구리 잉크',
  description:
    'In-Mold Electronics에 쓸 수 있는 스크린 프린팅 구리 전도성 잉크입니다. 면저항 3 Ω/sq 미만, 체적저항 3 mΩ·cm 미만.',
  tags: ['Bendable', 'Low-Temperature Curing', 'Flexible', 'High Stability'],
  substrates: 'Paper, Glass, PET, MELINEX, PVC, PC, TPU, Textile',
  tdsUrl: tds('CopInk01NP'),
}

const transparentSilver: InkProduct = {
  id: 'transparent-silver',
  code: 'TInk02NP®',
  title: 'Transparent Silver Conductive Ink',
  titleKr: '투명 전도성 실버 잉크',
  description:
    '박막 태양전지, 디스플레이, 센서 등 인쇄전자용 투명 전도성 실버 잉크입니다. 투과율 94% 이상(600 nm), 면저항 100 Ω/sq 미만(140 ℃ 경화).',
  tags: ['High Transparency (>94%)', 'High Conductivity', 'Flexible', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PEN, MELINEX',
  tdsUrl: tds('TInk02NP'),
}

const stretchableSilver: InkProduct = {
  id: 'stretchable-silver',
  code: 'SInk01NP®',
  title: 'Stretchable Silver Conductive Ink',
  titleKr: '스트레처블 전도성 실버 잉크',
  description:
    '신축성을 갖춘 스크린 프린팅 실버 페이스트로, 웨어러블 전자기기·센서·의료기기에 쓰입니다. 체적저항 72 µΩ·cm 미만(120 ℃ 경화).',
  tags: ['Stretchable', 'High Conductivity', 'Flexible', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PEN, MELINEX, Textile',
  tdsUrl: tds('SInk01NP'),
}

const waterBasedCarbon: InkProduct = {
  id: 'water-based-carbon',
  code: 'WBC01S®',
  title: 'Stretchable Water-Based Carbon Conductive Ink',
  titleKr: '스트레처블 수성 카본 전도성 잉크',
  description:
    '신축성을 갖춘 수성 카본 페이스트로, 웨어러블 전자기기·센서·의료기기에 쓰입니다. 물·아세톤으로 세척할 수 있습니다.',
  tags: ['Water-based', 'Stretchable', 'Flexible', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PEN, MELINEX, Textile',
  tdsUrl: tds('WBC01S'),
}

const carbon: InkProduct = {
  id: 'carbon',
  code: 'CBInk06NP®',
  title: 'Carbon Conductive Ink',
  titleKr: '카본 전도성 잉크',
  description:
    '표면 처리된 PET·PI·PC·PVC 기재 위 회로 연결용 스크린 프린팅 카본 페이스트입니다. 유연하거나 고르지 않은 표면에서도 전도성과 접착력이 일정합니다.',
  tags: ['High Conductivity', 'Flexibility', 'Easy Processability', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PC, MELINEX, Mylar, PVC',
  tdsUrl: tds('CBInk06NP'),
}

const carbonInMold: InkProduct = {
  id: 'carbon-in-mold',
  code: 'CIMInk01NP®',
  title: 'Conductive Carbon Ink for In-Mold Electronics',
  titleKr: '인몰드용 카본 전도성 잉크',
  description:
    '벤더블 특성으로 In-Mold Electronics에도 쓸 수 있는 스크린 프린팅 카본 전도성 잉크입니다.',
  tags: ['Suitable for Thermoforming', 'Low Resistance', 'Fast Curing', 'Flexibility'],
  substrates: 'Glass, PET, PVC, PC, PMMA, TPU',
  tdsUrl: tds('CIMInk01NP'),
}

// ==========================================================================
// 2. PIEZO INK
// ==========================================================================

const piezoelectric: InkProduct = {
  id: 'piezoelectric',
  code: 'PEInk01NP®',
  title: 'Piezoelectric Ink',
  titleKr: '압전 잉크',
  description:
    'PVDF-TrFe 기반 압전 잉크로 압력·충격·가속도·변형을 감지합니다(d33 18–23 pC/N). 인쇄 후 어닐링과 폴링을 거쳐야 기능이 활성화됩니다. 친환경 용제를 쓴 GPEInk01NP®도 있습니다.',
  tags: ['PVDF-TrFe Based', 'Piezoelectric', 'Flexible', 'High Dielectric Constant'],
  substrates: 'Glass, PET, PC, Paper',
  tdsUrl: tds('PEInk01NP'),
}

const piezoresistiveGeneral: InkProduct = {
  id: 'piezoresistive-general',
  code: 'InkPR02NP®',
  title: 'Piezoresistive Ink — Force & Pressure Sensing',
  titleKr: '압저항 잉크 (힘·압력 감지)',
  description:
    '기계적 변형에 따라 전기저항이 크게 변해, 단단하거나 유연한 기재 위에 힘·응력 센서를 만들 수 있습니다. 여러 용제에 쉽게 녹고 별도 후처리가 필요 없습니다.',
  tags: ['Carbon-based', 'Piezoresistive', 'Flexible', 'Stretchable'],
  substrates: 'Glass, PET, PEN, MELINEX, Mylar',
  tdsUrl: tds('InkPR02NP'),
}

const piezoresistiveHard: InkProduct = {
  id: 'piezoresistive-hard',
  code: 'SBPR03InkNP®',
  title: 'Piezoresistive Ink — Thermoplastic (Hard)',
  titleKr: '열가소성 압저항 잉크 (하드)',
  description:
    '저온 경화형 열가소성 압저항 잉크로, 인쇄전자용 압력·힘 센서에 쓰입니다. MELINEX·PET·Mylar·폴리카보네이트·아크릴·PVC 등 플라스틱에 접착력이 뛰어납니다.',
  tags: ['Carbon-based', 'Thermoplastic', 'Moulding Resistance', 'Excellent Adhesion to Plastics'],
  substrates: 'MELINEX, PET, Mylar, PC, Acrylates, PVC',
  tdsUrl: tds('SBPR03InkNP'),
}

const piezoresistiveTextile: InkProduct = {
  id: 'piezoresistive-textile',
  code: 'E-TeXPR01NP®',
  title: 'Piezoresistive Ink for Textiles',
  titleKr: '섬유용 압저항 잉크',
  description:
    '섬유에 직접 인쇄하는 카본 기반 압저항 잉크로, 신축성과 부드러운 촉감을 갖춰 웨어러블 압력 센서에 적합합니다.',
  tags: ['Direct Textile Printing', 'Excellent Elasticity', 'Soft & Velvety Touch', 'Low Temperature Curable'],
  substrates: 'Textile (Cotton 100%, cotton mixed with synthetic fibres, elastic substrates)',
  tdsUrl: tds('E-TeXPR01NP'),
}

// ==========================================================================
// 3. MAGNETIC INK
// ==========================================================================

const ferromagnetic: InkProduct = {
  id: 'ferromagnetic',
  code: 'FMInk01NP®',
  title: 'Ferromagnetic Ink',
  titleKr: '강자성 잉크',
  description:
    '자기 응답이 큰 스크린 프린팅 강자성 잉크입니다. 입자 크기 35–45 nm, 보자력 2,500 Oe이며 60 ℃에서 10분 경화합니다.',
  tags: ['Ferromagnetic', 'High Magnetic Response', 'Great Flexibility', 'Custom Formulation'],
  substrates: 'Glass, PET, PEN, MELINEX, Mylar',
  tdsUrl: tds('FMInk01NP'),
}

const magneticStretchable: InkProduct = {
  id: 'ferromagnetic-stretchable',
  code: 'FMInk02NP®',
  title: 'Magnetic Ink — Water-based, Stretchable',
  titleKr: '수성 스트레처블 자성 잉크',
  description:
    '자석 효과를 내는 수성 스크린 프린팅 자성 잉크로, 알맞은 기재 위에서 늘어나며 섬유에도 인쇄할 수 있습니다.',
  tags: ['Water-based', 'Itself Magnetised', 'Stretchable', 'High Magnetic Response'],
  substrates: 'Glass, PET, PEN, MELINEX, Mylar, Textile',
  tdsUrl: tds('FMInk02NP'),
}

const superparamagnetic: InkProduct = {
  id: 'superparamagnetic',
  code: 'SPMInkNP®',
  title: 'Superparamagnetic Ink',
  titleKr: '초상자성 잉크',
  description:
    '여러 용제에 쉽게 녹는 스크린 프린팅 초상자성 잉크입니다. 단단하거나 유연한 기재 위에 자기 센서를 저비용으로 만들 수 있습니다.',
  tags: ['Superparamagnetic', 'High Magnetic Response', 'Flexible', 'Custom Formulation'],
  substrates: 'Glass, PET, PC, Paper',
  tdsUrl: tds('SPMInkNP'),
}

// ==========================================================================
// Catalogue
// ==========================================================================

export const CATEGORIES: Category[] = [
  {
    id: 'conductive',
    title: 'Conductive Ink',
    titleKr: '전도성 잉크',
    intro:
      '스크린 프린팅으로 각종 소재 위에 전도성 회로를 직접 인쇄하는 실버·구리·카본 잉크입니다. 벤더블·인몰드용부터 투명·신축용까지 있습니다.',
    products: [bendableSilver, copperInk, transparentSilver, stretchableSilver, waterBasedCarbon, carbon, carbonInMold],
  },
  {
    id: 'piezo',
    title: 'Piezo Ink',
    titleKr: '압전 · 압저항 잉크',
    intro:
      '압력·충격·변형을 전기 신호로 바꾸는 기능성 잉크입니다. 압전(Piezoelectric) 방식과 압저항(Piezoresistive) 방식으로 나뉘며, 인쇄만으로 센서를 만들 수 있습니다.',
    products: [piezoelectric, piezoresistiveGeneral, piezoresistiveHard, piezoresistiveTextile],
  },
  {
    id: 'magnetic',
    title: 'Magnetic Ink',
    titleKr: '자성 잉크',
    intro: '강자성·초상자성 입자를 분산한 잉크로, 인쇄만으로 자성 패턴과 자기 센서를 만들 수 있습니다.',
    products: [ferromagnetic, magneticStretchable, superparamagnetic],
  },
]

// --- In-Mold Electronics application ------------------------------------

export type ProcessStep = { id: string; title: string }
export type Advantage = { id: string; title: string }

export const IN_MOLD_STEPS: ProcessStep[] = [
  { id: 'print', title: 'Screen Printed graphics & functional inks' },
  { id: 'thermoform', title: 'Thermoformed' },
  { id: 'injection', title: 'Injection Molded' },
]

export const IN_MOLD_ADVANTAGES: Advantage[] = [
  { id: 'weight', title: 'Light Weight' },
  { id: 'design', title: 'Design Optimization' },
  { id: 'cost', title: 'Cost Reduction' },
  { id: 'reliability', title: 'Higher Reliability' },
]
