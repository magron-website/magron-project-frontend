/* ==========================================================================
   Conductive & Piezo Ink catalogue data
   Transcribed from MAGRON's ink technical data sheets (Aug 2026 handover set).
   Spec labels stay in English to match the source datasheets; titleKr /
   description are merged in from the `piezoInk` i18n namespace by id.
   ========================================================================== */

export type SpecRow = { label: string; value: string }

export type InkProduct = {
  id: string
  code: string
  title: string
  titleKr: string
  description: string
  tags: string[]
  substrates?: string
  spec?: SpecRow[]
  /** Extra process note shown under the spec table (e.g. poling/annealing). */
  processNote?: string
  /** True when no datasheet exists yet — shown as "상세 스펙 문의" instead of a table. */
  hasDatasheet: boolean
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
    '스크린 프린팅용 실버 전도성 잉크로, 열성형(thermoforming) 전후 성능이 안정적으로 유지되어 In-Mold Electronics에 적합합니다. PVC, PET, TPU, 폴리카보네이트, 아크릴레이트, 폴리우레탄 등 다양한 소재에 인쇄할 수 있습니다.',
  tags: ['Bendable', 'Thermoforming / High Pressure Forming', 'Fast Curing', 'Easy Screen Printable'],
  substrates: 'Glass, PET, PVC, PC, PMMA, TPU, Textile',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Grey' },
    { label: 'Cure processing', value: 'Thermal cure' },
    { label: 'Viscosity', value: '4,000 – 8,000 cP' },
    { label: 'Sheet Resistance', value: '< 1 Ω/sq' },
    { label: 'Volume Resistivity', value: '< 3 mΩ·cm' },
    { label: 'Drying conditions', value: '60 – 100 ℃, 5 min' },
    { label: 'Shelf-life', value: '4 months (unopened, sealed)' },
  ],
}

const copperInk: InkProduct = {
  id: 'copper',
  code: 'CoPInk01NP®',
  title: 'Conductive Copper Ink',
  titleKr: '전도성 코퍼(구리) 잉크',
  description:
    '저온 경화가 가능한 스크린 프린팅 구리 전도성 잉크로, 벤더블 특성 덕분에 In-Mold Electronics에도 활용할 수 있습니다.',
  tags: ['Bendable', 'Low-Temperature Curing', 'Flexible', 'Fast Curing'],
  substrates: 'Glass, PET, PVC, PC, PMMA, TPU, Textile',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Copper / Orange' },
    { label: 'Cure processing', value: 'Thermal cure' },
    { label: 'Viscosity', value: '4,000 – 8,000 cP' },
    { label: 'Sheet Resistance', value: '< 3 Ω/sq' },
    { label: 'Volume Resistivity', value: '< 7 mΩ·cm' },
    { label: 'Drying conditions', value: '60 – 100 ℃, 5 min' },
    { label: 'Shelf-life', value: '4 months (unopened, sealed)' },
  ],
}

const transparentSilver: InkProduct = {
  id: 'transparent-silver',
  code: 'TInk02NP®',
  title: 'Transparent Silver Conductive Ink',
  titleKr: '투명 전도성 실버 잉크',
  description:
    '박막 태양전지, 디스플레이, 센서 등 투명 전극이 필요한 인쇄전자 응용에 사용하는 수성 투명 전도성 실버 잉크입니다. 90% 이상의 투명도와 낮은 면저항을 동시에 확보했습니다.',
  tags: ['High Transparency (>90%)', 'Water-based', 'Flexible', 'High Conductivity'],
  substrates: 'Glass, PET, PEN, MELINEX',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Grey (wet) → Transparent (cured)' },
    { label: 'Cure processing', value: 'Thermal cure' },
    { label: 'Solids content', value: '5%' },
    { label: 'Viscosity', value: '< 5,000 cP' },
    { label: 'Sheet resistivity', value: '< 100 µΩ/sq (140 ℃)' },
    { label: 'Transparency', value: '> 90%' },
    { label: 'Drying conditions', value: '140 ℃, 20 min' },
    { label: 'Storage', value: 'Sealed, refrigerated at 4 ℃' },
    { label: 'Shelf-life', value: '6 months (unopened, sealed)' },
  ],
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
    'PVDF-TrFe 기반의 스크린 프린팅 압전 잉크로, 압력·충격·가속도·변형을 감지할 수 있습니다. 인쇄 후 어닐링과 폴링(poling) 공정을 거쳐야 압전 특성이 활성화됩니다. 친환경 용제를 사용한 그린 버전 GPEInk01NP®도 있습니다.',
  tags: ['PVDF-TrFe Based', 'Piezoelectric', 'Flexible', 'Pressure / Impact / Deformation Sensing'],
  substrates: 'Glass, PET, PC, Paper',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Clear / Transparent' },
    { label: 'Cure processing', value: 'Thermal cure' },
    { label: 'Solid content', value: '25%' },
    { label: 'Viscosity', value: '4,000 – 8,000 cP' },
    { label: 'Piezoelectric coeff. d33', value: '18 – 23 pC/N' },
    { label: 'Pyroelectric coeff. ρ', value: '−23 µC/m²·K' },
    { label: 'Remnant polarization Pr', value: '80 mC/m²' },
    { label: 'Dielectric constant (1 kHz, 25 ℃)', value: '11.5' },
    { label: 'Coercive field', value: '450 kV/cm' },
    { label: 'Shelf-life', value: '3 months (unopened, sealed)' },
  ],
  processNote:
    '인쇄 후 활성화 공정이 필요합니다 — ① 어닐링: 135–140 ℃, 15분 (Curie 전이온도 이상). ② 폴링: 50 V/µm, 80–120 ℃, 60–90분 (Corona 또는 Contact 방식). 세부 폴링 가이드는 문의 시 안내해드립니다.',
}

const piezoresistiveGeneral: InkProduct = {
  id: 'piezoresistive-general',
  code: 'InkPR02NP',
  title: 'Piezoresistive Ink — General',
  titleKr: '압저항 잉크 (일반형)',
  description:
    '다양한 용제에 쉽게 녹아 별도의 고가 후처리 공정 없이 압저항 특성을 낼 수 있는 카본 기반 잉크입니다.',
  tags: ['Carbon-based', 'Piezoresistive', 'Flexible', 'No Special Post-Treatment'],
  substrates: 'Glass, PET, PEN, MELINEX, Milar',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Black' },
    { label: 'Physical form', value: 'Solution' },
    { label: 'Cure processing', value: 'Thermal cure, 60 ℃ / 10 min' },
    { label: 'Solid content', value: '35%' },
    { label: 'Viscosity', value: '5,000 – 10,000 cP' },
    { label: 'Max. particle diameter', value: '< 10 µm' },
    { label: 'Shelf-life', value: '3 months (10–20 ℃, sealed)' },
  ],
}

const piezoresistiveSolventFree: InkProduct = {
  id: 'piezoresistive-solvent-free',
  code: 'SFInkPR03NP',
  title: 'Solvent-free Piezoresistive Ink',
  titleKr: '무용제형 압저항 잉크',
  description:
    '무용제·저온 경화가 가능한 카본 기반 압저항 잉크로, 인쇄전자용 압력 센서에 활용됩니다.',
  tags: ['Solvent-free', 'Low-Temperature Curable (100℃)', 'Stretchable'],
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Dark grey / Black' },
    { label: 'Cure processing', value: 'Thermal cure, 100 ℃ / 10 min' },
    { label: 'Solid content', value: '35%' },
    { label: 'Viscosity', value: '15,000 – 20,000 cP' },
    { label: 'Piezoresistive response', value: '0 – 1,000 N' },
    { label: 'Max. particle diameter', value: '< 15 µm' },
    { label: 'Shelf-life', value: '3 months (15–35 ℃, sealed)' },
  ],
}

const piezoresistiveTextile: InkProduct = {
  id: 'piezoresistive-textile',
  code: 'E-TeXPR01NP®',
  title: 'Piezoresistive Ink for Textiles',
  titleKr: '섬유용 압저항 잉크',
  description:
    '섬유 기재에 직접 인쇄할 수 있는 카본 기반 압저항 잉크로, 우수한 신축성과 부드러운 촉감을 갖춰 웨어러블 압력 센서에 적합합니다.',
  tags: ['Direct Textile Printing', 'Excellent Elasticity', 'Soft & Velvety Touch', 'Not Harmful for Health'],
  substrates: 'Textile (Cotton 100%, cotton blends, elastic substrates)',
  hasDatasheet: true,
  spec: [
    { label: 'Apparency', value: 'Dark grey / Black' },
    { label: 'Cure processing', value: 'Thermal cure, 130 ℃ / 5 min' },
    { label: 'Solid content', value: '45%' },
    { label: 'Viscosity', value: '8,000 – 12,000 cP' },
    { label: 'Max. particle diameter', value: '< 15 µm' },
    { label: 'Shelf-life', value: '3 months (15–35 ℃, sealed)' },
  ],
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
      '스크린 프린팅 방식으로 각종 소재 위에 전도성 회로를 직접 인쇄하는 잉크 라인업입니다. 대부분 In-Mold Electronics(사출성형 전자소자) 공정에도 바로 적용할 수 있습니다.',
    products: [bendableSilver, copperInk, transparentSilver],
  },
  {
    id: 'piezo',
    title: 'Piezo Ink',
    titleKr: '압전 · 압저항 잉크',
    intro:
      '압력·충격·변형을 전기 신호로 변환하는 기능성 잉크입니다. 압전(Piezoelectric) 방식과 압저항(Piezoresistive) 방식으로 나뉘며, 인쇄 공정만으로 센서를 직접 구현할 수 있습니다.',
    products: [piezoelectric, piezoresistiveGeneral, piezoresistiveSolventFree, piezoresistiveTextile],
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
