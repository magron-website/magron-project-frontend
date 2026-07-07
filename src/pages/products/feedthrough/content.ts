export type MatrixTable = {
  topLeft: string
  columns: string[]
  rows: { label: string; cells: string[] }[]
}

export type KeyValueRow = { item: string; value: string }

const q = (cells: string[]) => cells

export const HERO_CARDS = [
  {
    title: 'Vacuum Sealing',
    description: '진공 챔버 내부의 압력과 청정도를 안정적으로 유지합니다.',
  },
  {
    title: 'Rotary Motion Transfer',
    description: '회전축을 통해 외부 동력을 장비 내부로 전달합니다.',
  },
  {
    title: 'Low Particle Generation',
    description: '비접촉에 가까운 자성유체 씰링 구조로 파티클 발생을 줄입니다.',
  },
  {
    title: 'Custom Specification',
    description: '장비 구조, 축 직경, 회전 속도, 진공도 조건에 맞춘 사양 검토가 가능합니다.',
  },
] as const

export const LINEUP_CARDS = [
  {
    title: 'Miniature Feedthrough',
    description: '소형 장비, 연구용 장비, 제한된 공간에 적합한 소형 Feedthrough',
  },
  {
    title: 'Through Hole Mount Feedthroughs',
    description: '관통형 장착 구조로 장비 벽면 또는 플레이트에 설치 가능',
  },
  {
    title: 'Flange Mount Feedthroughs',
    description: '플랜지 체결 구조로 안정적인 장착과 유지보수에 적합',
  },
  {
    title: 'Hollow Shaft Feedthroughs',
    description: '중공축 구조가 필요한 장비에 적용',
  },
  {
    title: 'Two Coaxial Type',
    description: '이중 동축 구조가 필요한 특수 장비용 Feedthrough',
  },
  {
    title: 'Three Axis Type',
    description: '다축 구동 또는 복합 회전 구조가 필요한 장비용 Feedthrough',
  },
  {
    title: 'Ultra High Vacuum Feedthroughs',
    description: '고진공 또는 초고진공 환경에 대응하는 Feedthrough',
  },
  {
    title: 'Three Coaxial and Linear Feedthroughs',
    description: '회전과 선형 동작이 복합적으로 필요한 장비용 Feedthrough',
  },
  {
    title: 'Purge Mode Type',
    description: '가스 퍼지 기능이 필요한 공정 장비용 Feedthrough',
  },
  {
    title: 'Rotary Gas Union',
    description: '회전축을 통해 가스를 전달해야 하는 장비용 Feedthrough',
  },
] as const

export const MINIATURE_TABLES: MatrixTable[] = [
  {
    topLeft: 'Shaft Diameter',
    columns: ['4?', '6?', '8?'],
    rows: [
      { label: 'A', cells: q(['?', '?', '?']) },
      { label: 'B', cells: q(['?', '?', '?']) },
      { label: 'C', cells: q(['?', '?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MFR? Series', 'MFR? Series', 'MFR? Series'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Torque', cells: q(['?', '?', '?']) },
      { label: 'Temperature range', cells: q(['-20 ~ 80℃?', '-20 ~ 80℃?', '-20 ~ 80℃?']) },
      { label: 'Bearing type', cells: q(['?', '?', '?']) },
      { label: 'Housing material', cells: q(['SUS304?', 'SUS304?', 'SUS304?']) },
      { label: 'Shaft material', cells: q(['SUS304?', 'SUS304?', 'SUS304?']) },
    ],
  },
]

export const THROUGH_HOLE_TABLES_1: MatrixTable[] = [
  {
    topLeft: 'Shaft Diameter',
    columns: ['8?', '10?', '12?', '15?'],
    rows: [
      { label: 'A', cells: q(['?', '?', '?', '?']) },
      { label: 'B', cells: q(['?', '?', '?', '?']) },
      { label: 'C', cells: q(['?', '?', '?', '?']) },
      { label: 'D', cells: q(['?', '?', '?', '?']) },
      { label: 'E', cells: q(['?', '?', '?', '?']) },
      { label: 'F', cells: q(['?', '?', '?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MRF?', 'MRF?', 'MRF?', 'MRF?'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Torque', cells: q(['?', '?', '?', '?']) },
      { label: 'Temperature range', cells: q(['-20 ~ 80℃?', '-20 ~ 80℃?', '-20 ~ 80℃?', '-20 ~ 80℃?']) },
      { label: 'Bearing type', cells: q(['?', '?', '?', '?']) },
      { label: 'Housing material', cells: q(['SUS304?', 'SUS304?', 'SUS304?', 'SUS304?']) },
      { label: 'Shaft material', cells: q(['SUS304?', 'SUS304?', 'SUS304?', 'SUS304?']) },
    ],
  },
]

export const THROUGH_HOLE_TABLES_2: MatrixTable[] = [
  {
    topLeft: 'Shaft Diameter',
    columns: ['40', '50'],
    rows: [
      { label: 'A', cells: ['172?', '221?'] },
      { label: 'B', cells: ['179?', '221?'] },
      { label: 'C', cells: ['101?', '131?'] },
      { label: 'D', cells: q(['?', '?']) },
      { label: 'E', cells: q(['?', '?']) },
      { label: 'F', cells: q(['?', '?']) },
      { label: 'G', cells: q(['?', '?']) },
      { label: 'H', cells: q(['?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MRF?', 'MRF?', 'MRF?', 'MRF?'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Temperature range', cells: ['-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃'] },
      { label: 'Gas compatibility', cells: ['Inert Gas', 'Active Gas?', 'Inert Gas', 'Active Gas?'] },
      { label: 'Bearing type', cells: q(['Ball?', 'Ball?', 'Ball?', 'Ball?']) },
      { label: 'Housing material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304'] },
      { label: 'Shaft material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304'] },
    ],
  },
]

export const FLANGE_MOUNT_TABLES: MatrixTable[] = [
  {
    topLeft: 'Shaft Diameter',
    columns: ['10?', '15?', '20?', '25?', '30?', '35?'],
    rows: [
      { label: 'A', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'B', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'C', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'D', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'E', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'F', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'G', cells: q(['?', '?', '?', '?', '?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MRF?', 'MRF?', 'MRF?', 'MRF?', 'MRF?', 'MRF?'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Temperature range', cells: ['-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃'] },
      { label: 'Gas compatibility', cells: ['Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas'] },
      { label: 'Bearing type', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'Housing material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
      { label: 'Shaft material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
    ],
  },
]

export const HOLLOW_FLANGE_TABLES: MatrixTable[] = [
  {
    topLeft: 'Shaft',
    columns: ['10?', '15?', '20?', '25?', '30?', '35?'],
    rows: [
      { label: 'A', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'B', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'C', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'D', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'E', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'F', cells: q(['?', '?', '?', '?', '?', '?']) },
      { label: 'G', cells: q(['?', '?', '?', '?', '?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MRF?', 'MRF?', 'MRF?', 'MRF?', 'MRF?', 'MRF?'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Temperature range', cells: ['-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃'] },
      { label: 'Gas compatibility', cells: ['Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas'] },
      { label: 'Bearing type', cells: q(['Ball?', 'Ball?', 'Ball?', 'Ball?', 'Ball?', 'Ball?']) },
      { label: 'Housing material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
      { label: 'Shaft material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
    ],
  },
]

export const HOLLOW_CANTILEVER_TABLES: MatrixTable[] = [
  {
    topLeft: 'Shaft',
    columns: ['50?', '60?', '80?', '100?', '120?'],
    rows: [
      { label: 'A', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'B', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'C', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'D', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'E', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'F', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'G', cells: q(['?', '?', '?', '?', '?']) },
      { label: 'H', cells: q(['?', '?', '?', '?', '?']) },
    ],
  },
  {
    topLeft: 'Model Number',
    columns: ['MRF?', 'MRF?', 'MRF?', 'MRF?', 'MRF?'],
    rows: [
      { label: 'Vacuum pressure', cells: q(['10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa', '10^-? Pa']) },
      { label: 'Leakage rate', cells: q(['<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec', '<10^-? Pa·m³/sec']) },
      { label: 'Pressure capacity', cells: q(['0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa', '0.2? MPa']) },
      { label: 'Temperature range', cells: ['-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃', '-20 ~ 80℃'] },
      { label: 'Gas compatibility', cells: ['Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas', 'Inert Gas'] },
      { label: 'Bearing type', cells: q(['Ball?', 'Ball?', 'Ball?', 'Ball?', 'Ball?']) },
      { label: 'Housing material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
      { label: 'Shaft material', cells: ['SUS304', 'SUS304', 'SUS304', 'SUS304', 'SUS304'] },
    ],
  },
]

export const TWO_COAXIAL_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRF? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.2? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Inert Gas' },
  { item: 'Bearing type', value: '볼베어링 / Ball Bearing?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304?' },
  { item: 'Oil seal', value: 'SUS? / ?' },
  { item: 'Shaft material', value: 'SUS304' },
]

export const THREE_AXIS_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRF? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.2? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Inert Gas' },
  { item: 'Bearing type', value: '볼베어링 / Ball Bearing?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304' },
  { item: 'Other material', value: 'SUS304' },
]

export const UHV_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRFV-? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.2? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Inert Gas' },
  { item: 'Bearing type', value: '볼베어링 / Ball Bearing?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304' },
  { item: 'Other material', value: 'SUS304' },
]

export const THREE_COAXIAL_LINEAR_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRF? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.2? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Active Gas? / Inert Gas?' },
  { item: 'Bearing type', value: '볼베어링 / Ball Bearing?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304' },
  { item: 'Other material', value: 'SUS304' },
]

export const PURGE_MODE_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRF? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.2? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Reactive Gas?' },
  { item: 'Bearing type', value: '?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304' },
]

export const ROTARY_GAS_UNION_SPEC: KeyValueRow[] = [
  { item: 'Model', value: 'MRF? Series' },
  { item: 'Vacuum pressure', value: '10^-? Pa' },
  { item: 'Leakage rate', value: '<10^-? Pa·m³/sec' },
  { item: 'Pressure capacity', value: '0.5? MPa' },
  { item: 'Temperature range', value: '-20 ~ 80℃' },
  { item: 'Gas compatibility', value: 'Inert Gas' },
  { item: 'Bearing type', value: '볼베어링 / Ball Bearing?' },
  { item: 'Housing material', value: 'SUS304' },
  { item: 'Shaft material', value: 'SUS304' },
  { item: 'Internal shaft', value: 'SUS304' },
]

export const FERROFLUID_SEAL_KEYWORDS = [
  'Shaft',
  'Bearing',
  'Permanent Magnet',
  'Pole Piece',
  'Ferrofluid',
  'Housing',
  'Seal Body',
] as const

export const FERROFLUID_ADVANTAGES = [
  {
    title: 'High Reliability',
    description: '안정적인 진공 씰링과 장시간 운전 안정성',
  },
  {
    title: 'Zero or Low Leak Rate',
    description: '낮은 누설률 기반의 고신뢰성 씰링',
  },
  {
    title: 'Non Contact / Low Friction',
    description: '마찰과 마모를 줄이는 비접촉성 구조',
  },
  {
    title: 'No Particle Generation',
    description: '고청정 공정에 적합한 낮은 파티클 발생',
  },
  {
    title: 'High Speed Rotation',
    description: '고속 회전 장비에 적용 가능',
  },
] as const

export const APPLICATION_CARDS = [
  { title: 'Semiconductor', description: '반도체 제조 장비의 진공 챔버, 회전축, 공정가스 차단부에 적용합니다.' },
  { title: 'Display', description: '디스플레이 제조 장비의 고청정 진공 공정과 이송 장비에 적용합니다.' },
  { title: 'Manufacturing Process', description: '정밀 제조 장비의 회전축 씰링과 오염 차단에 적용합니다.' },
  { title: 'Rechargeable Battery', description: '2차전지 제조 공정에서 분진, 가스, 오염물 차단이 필요한 구간에 적용합니다.' },
  { title: 'Aviation Industry', description: '높은 신뢰성과 내구성이 요구되는 항공 산업 장비에 적용합니다.' },
  { title: 'Chemical Vapor Deposition Equipment', description: 'CVD 장비의 가스 공정, 진공 유지, 회전축 씰링에 적용합니다.' },
  { title: 'Sputtering Equipment', description: '스퍼터링 장비의 회전 구동부와 진공 씰링 구간에 적용합니다.' },
  { title: 'Ion Implanter', description: '이온 주입 장비의 고진공 회전축 및 구동부에 적용합니다.' },
  { title: 'Etching Equipment', description: '식각 장비에서 부식성 가스와 공정 오염물의 누설을 억제합니다.' },
  { title: 'Vacuum Transfer Robot', description: '진공 로봇의 회전축과 구동부에서 진공 유지와 파티클 유입 방지를 지원합니다.' },
  { title: 'Arc Discharge', description: '아크 방전 장비의 회전 및 진공 구동부에 적용합니다.' },
  { title: 'Ion Beam Equipment', description: '이온빔 장비의 진공 유지 및 회전 구동부 씰링에 적용합니다.' },
  { title: 'LED / OLED Manufacturing Equipment', description: '고청정 디스플레이 제조 공정의 진공/분진 차단 솔루션으로 적용합니다.' },
  { title: 'Vacuum Chuck', description: '진공 흡착 장비와 정밀 이송 장비의 안정적인 씰링에 적용합니다.' },
  { title: 'Solar Panel', description: '태양광 패널 제조 장비 및 박막 공정 장비에 적용합니다.' },
  { title: 'New Energy Battery', description: '차세대 배터리 제조 장비의 청정 공정과 가스 차단부에 적용합니다.' },
  { title: 'Single Crystal Growth', description: '단결정 성장 장비의 고온·진공 회전 구동부에 적용합니다.' },
  { title: 'Vacuum Furnace', description: '진공로 장비의 회전축 및 고온 진공 씰링에 적용합니다.' },
  { title: 'Nuclear Power', description: '원자력 관련 장비의 고신뢰성 회전 씰링 부품으로 적용할 수 있습니다.' },
  { title: 'Nuclear Fusion', description: '핵융합 관련 진공 장비 및 연구 장비에 적용할 수 있습니다.' },
  { title: 'Military', description: '방산 장비 및 특수 목적 장비의 씰링 솔루션으로 적용합니다.' },
  { title: 'Medical Equipment', description: '의료 장비와 바이오 장비의 청정 구동부 및 진공 씰링에 적용합니다.' },
  { title: 'Aerospace', description: '항공우주 분야의 고신뢰성 진공 및 회전 전달 장비에 적용합니다.' },
] as const

export const CUSTOM_ITEMS = [
  'Shaft diameter',
  'Rotation speed',
  'Vacuum pressure',
  'Leakage rate requirement',
  'Mounting type',
  'Gas compatibility',
  'Temperature range',
  'Bearing type',
  'Housing material',
  'Shaft material',
  'Hollow shaft 필요 여부',
  'Purge gas 필요 여부',
  'Rotary gas union 필요 여부',
  'UHV 대응 필요 여부',
] as const

export const COMPANY_INFO_ROWS = [
  { label: 'Company', value: 'Magron? / 주식회사 마그론?' },
  { label: 'Address', value: '경기도 안산시? 한양대학교? 관련 주소로 보임' },
  { label: 'Tel', value: '031-?' },
  { label: 'E-mail', value: '?' },
  { label: 'Website', value: '?' },
  { label: 'Main Product', value: 'Ferrofluid, Ferrofluid Seal, Feedthrough, Magnetic Fluid Seal' },
] as const

export const INQUIRY_ITEMS = [
  '적용 장비명',
  '사용 공정',
  '요구 진공도',
  '허용 누설률',
  '회전축 직경',
  '회전 속도',
  '장착 방식',
  '사용 가스',
  '온도 조건',
  '재질 요구사항',
  '커스텀 제작 필요 여부',
] as const
