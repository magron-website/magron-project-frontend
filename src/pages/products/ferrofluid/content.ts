export const HERO_CARDS = [
  {
    title: 'Corrosive Gas 차단',
    description: '부식성 가스, 유해가스, 공정가스의 외부 누설을 억제합니다.',
  },
  {
    title: 'Dust & Particle Blocking',
    description: '외부 분진과 파티클이 장비 내부로 유입되는 것을 방지합니다.',
  },
  {
    title: 'Low Friction / Long Life',
    description: '비접촉에 가까운 씰링 구조로 마모와 유지보수 부담을 줄입니다.',
  },
] as const

export const MECHANICAL_SEAL_POINTS = [
  '접촉 마찰 발생',
  '마모에 따른 누설 가능',
  '파티클 발생 가능',
  '정기 교체 필요',
  '고청정 공정에서 한계 발생',
] as const

export const FERROFLUID_SEAL_POINTS = [
  '비접촉에 가까운 저마찰 구조',
  '안정적인 진공 및 가스 차단',
  '낮은 파티클 발생',
  '장시간 운전 안정성',
  '반도체/디스플레이/진공 공정에 적합',
] as const

export const PRODUCT_INFO = [
  { label: 'Product', value: 'Ferrofluid for Corrosive Gas' },
  { label: 'Carrier Fluid', value: 'Perfluoro Polyether [PFPE]' },
  {
    label: 'Application',
    value: 'Corrosive Gas, Toxic Gas, Vacuum Equipment, Dust Blocking',
  },
  {
    label: 'Main Function',
    value: '회전축 주변 가스 누설 차단 및 외부 오염물 유입 방지',
  },
  {
    label: 'Key Features',
    value: '낮은 증기압, 높은 화학 안정성, 안정적인 진공 유지, 장시간 운전 대응',
  },
] as const

export const CORROSIVE_SPEC_COLUMNS = [
  { key: 'model', label: 'Model' },
  { key: 'magnetization', label: 'Saturation Magnetization (Gauss)', align: 'right' as const },
  { key: 'viscosity', label: 'Viscosity mPa·sec (cP) at 27℃', align: 'right' as const },
  { key: 'vaporPa', label: 'Vapor Pressure Pa at 20℃', align: 'right' as const },
  { key: 'vaporTorr', label: 'Vapor Pressure Torr at 20℃', align: 'right' as const },
  { key: 'helium', label: 'Torr Life Helium gas leak' },
  { key: 'tga', label: '1 wt% loss Temp (TGA) ℃', align: 'right' as const },
  { key: 'pour', label: 'Pour point ℃', align: 'right' as const },
  { key: 'density', label: 'Density g/cm³', align: 'right' as const },
]

export const CORROSIVE_SPEC_ROWS = [
  {
    model: 'MFF-M4251',
    magnetization: '420',
    viscosity: '5,100',
    vaporPa: '<1.5E-10',
    vaporTorr: '<1.2E-12',
    helium: 'OK',
    tga: '>280',
    pour: '<-40',
    density: '2.198',
  },
  {
    model: 'MFF-M5070',
    magnetization: '500',
    viscosity: '7,000',
    vaporPa: '<1.5E-10',
    vaporTorr: '<1.2E-12',
    helium: 'OK',
    tga: '>280',
    pour: '<-40',
    density: '2.240',
  },
  {
    model: 'MFF-R6085',
    magnetization: '600',
    viscosity: '8,500',
    vaporPa: '<1.5E-10',
    vaporTorr: '<1.2E-12',
    helium: 'OK',
    tga: '>140',
    pour: '<-40',
    density: '2.25',
  },
  {
    model: 'MFF-R5050',
    magnetization: '500',
    viscosity: '5,000',
    vaporPa: '<1.5E-10',
    vaporTorr: '<1.2E-12',
    helium: 'OK',
    tga: '>140',
    pour: '<-40',
    density: '2.20',
  },
  {
    model: 'MFF-R4020',
    magnetization: '400',
    viscosity: '2,000',
    vaporPa: '<1.5E-10',
    vaporTorr: '<1.2E-12',
    helium: 'OK',
    tga: '>140',
    pour: '<-40',
    density: '2.14',
  },
]

export const LEAK_TEST_CARDS = [
  {
    title: 'MFF-M4251 Leak Test Data',
    points: [
      'Main leak test data',
      '초기 구간 이후 누설 데이터가 안정적으로 유지되는 형태',
      '그래프에는 녹색 선과 압력/시간 축이 표시됨',
    ],
  },
  {
    title: 'MFF-M5070 Leak Test Data',
    points: [
      'Main leak test data',
      '빠른 안정화 이후 일정한 누설 수준 유지',
      '그래프에는 녹색 선과 압력/시간 축이 표시됨',
    ],
  },
] as const

export const NON_CORROSIVE_SPEC_COLUMNS = CORROSIVE_SPEC_COLUMNS

export const NON_CORROSIVE_SPEC_ROWS = [
  {
    model: 'MPS-F?20?',
    magnetization: '720',
    viscosity: '1,000',
    vaporPa: '<3E-11',
    vaporTorr: '<2.7?E-13',
    helium: 'OK',
    tga: '280?',
    pour: '<-40',
    density: '1.86',
  },
  {
    model: 'MPS-4090 / MPS-4085?',
    magnetization: '600',
    viscosity: '3,200',
    vaporPa: '?E-11',
    vaporTorr: '<3.7?E-13',
    helium: 'OK',
    tga: '288?',
    pour: '<-40',
    density: '1.34?',
  },
  {
    model: 'MPS-L6085 / MPS-570?',
    magnetization: '500',
    viscosity: '880?',
    vaporPa: '<2E-11',
    vaporTorr: '<1.7?E-13',
    helium: 'OK',
    tga: '194',
    pour: '<-40',
    density: '1.34',
  },
  {
    model: 'MPS-4005 / MPS-4051?',
    magnetization: '400',
    viscosity: '300?',
    vaporPa: '<6E-11',
    vaporTorr: '<2.7?E-13',
    helium: 'OK',
    tga: '273',
    pour: '<-40',
    density: '1.21',
  },
  {
    model: 'MPH-F725?',
    magnetization: '770',
    viscosity: '3,000',
    vaporPa: '<3E-11',
    vaporTorr: '<2.7?E-13',
    helium: 'OK',
    tga: '179',
    pour: '<-40',
    density: '1.30',
  },
  {
    model: 'MPH-6024',
    magnetization: '620',
    viscosity: '650',
    vaporPa: '<1E-11',
    vaporTorr: '<3.7?E-13',
    helium: 'OK',
    tga: '179',
    pour: '<-40',
    density: '1.28',
  },
  {
    model: 'MPH-660? / MPS-570?',
    magnetization: '500',
    viscosity: '248',
    vaporPa: '?E-11',
    vaporTorr: '<1.7?E-13',
    helium: 'OK',
    tga: '174',
    pour: '<-40',
    density: '1.28',
  },
  {
    model: 'MPH-4011',
    magnetization: '400',
    viscosity: '160?',
    vaporPa: '<6E-11',
    vaporTorr: '<2.7?E-13',
    helium: 'OK',
    tga: '174',
    pour: '<-40',
    density: '1.22',
  },
]

export const MFS_GREASE_COLUMNS = [
  { key: 'item', label: 'Item' },
  { key: 'baseOil', label: 'Base oil' },
  { key: 'evaporation', label: 'Evaporation' },
  { key: 'nlgi', label: 'NLGI' },
  { key: 'temp', label: 'Temp.' },
  { key: 'thixotropy', label: 'Thixotropy' },
  { key: 'color', label: 'Color' },
  { key: 'dropPoint', label: 'Drop point' },
  { key: 'quarter', label: '1/4?' },
]

export const MFS_GREASE_ROWS = [
  {
    item: 'MFS-G02',
    baseOil: 'PAO?',
    evaporation: 'Low',
    nlgi: '2',
    temp: '-40~?',
    thixotropy: 'High?',
    color: 'Black',
    dropPoint: '>?',
    quarter: '?',
  },
]

export const TGA_DTA_CARDS = [
  {
    title: 'TGA, Thermo Gravimetric Analysis',
    description:
      '시료를 가열하면서 온도 증가에 따른 중량 변화를 측정합니다. Ferrofluid의 증발, 열분해, 중량 손실 시작점을 확인하여 고온 안정성을 평가할 수 있습니다.',
  },
  {
    title: 'DTA, Differential Thermal Analysis',
    description:
      '시료와 기준 물질 간 온도 차이를 분석하여 흡열·발열 반응과 열적 변화를 확인합니다. Ferrofluid가 특정 온도 범위에서 안정적으로 유지되는지 판단하는 데 사용됩니다.',
  },
] as const

export const TGA_GRAPH_CARDS = [
  {
    title: 'MFF-M Series',
    description:
      'PFPE Carrier Fluid 기반으로 보이는 고온 안정성 그래프. 그래프 내에 1 wt% loss point 표시가 있음',
  },
  {
    title: 'MPS Series',
    description:
      'Non-Corrosive Gas용 Series로 보이는 TGA/DTA 그래프. 중량 감소 곡선과 열분석 곡선이 함께 표시됨',
  },
  {
    title: 'MPH Series',
    description:
      'Hydrocarbon 또는 비부식성 계열로 보이는 Series. TGA/DTA 그래프가 표시됨',
  },
] as const

export const SEAL_STRUCTURE_ITEMS = [
  { term: 'Shaft', description: '회전 운동을 전달하는 중심축' },
  { term: 'Magnet', description: 'Ferrofluid를 고정하기 위한 자기장 형성' },
  { term: 'Pole Piece', description: '자기장을 집중시켜 씰링 영역 형성' },
  { term: 'Ferrofluid', description: '실제 차단막 역할을 하는 자성유체' },
  { term: 'Housing', description: '전체 구조를 고정하고 장비와 연결' },
] as const

export const APPLICATION_CARDS = [
  {
    title: 'Semiconductor',
    description:
      '반도체 공정 장비, 진공 챔버, Etching, Deposition 장비의 회전축 씰링에 적용합니다.',
  },
  {
    title: 'CVD',
    description:
      'Chemical Vapor Deposition 공정에서 가스와 진공 환경을 안정적으로 유지합니다.',
  },
  {
    title: 'Ion Implanter',
    description:
      '이온 주입 장비의 고진공 회전부 및 오염 차단이 필요한 구간에 적용합니다.',
  },
  {
    title: 'Display Panel',
    description: '디스플레이 제조 장비의 진공 이송, 증착, 봉지 공정에 적용합니다.',
  },
  {
    title: 'Sputtering Equipment',
    description: '스퍼터링 장비의 회전축, 진공 구동부, 오염 차단부에 적용합니다.',
  },
  {
    title: 'Etching Equipment',
    description: '식각 장비 내 부식성 가스와 공정 오염물의 누설을 억제합니다.',
  },
  {
    title: 'Vacuum Transfer Robot',
    description:
      '진공 로봇의 회전축 및 구동부에서 진공 유지와 파티클 유입 방지를 지원합니다.',
  },
  {
    title: 'Vacuum Chuck',
    description: '진공 흡착 장비 및 정밀 이송 장비의 안정적인 씰링에 적용합니다.',
  },
  {
    title: 'Ion Beam Application',
    description: '이온빔 장비의 진공 유지 및 회전 구동부 씰링에 적용합니다.',
  },
  {
    title: 'LED / OLED Fine Panel',
    description: '고청정 디스플레이 공정의 진공/분진 차단 솔루션으로 적용합니다.',
  },
  {
    title: 'Module of Toy Generator',
    description: '소형 발전 모듈 또는 회전 구동 모듈의 유체/분진 차단에 적용합니다.',
  },
  {
    title: 'Solar Panel',
    description: '태양광 패널 제조 장비 및 박막 공정 장비에 적용합니다.',
  },
  {
    title: 'Rechargeable Battery',
    description:
      '2차전지 제조 장비에서 분진, 오염물, 가스 차단이 필요한 구간에 적용합니다.',
  },
  {
    title: 'Bio Equipment',
    description:
      '청정성과 오염 방지가 필요한 바이오 장비, 의료 장비, 실험 장비에 적용합니다.',
  },
  {
    title: 'Aerospace / Defense',
    description:
      '높은 신뢰성과 내구성이 필요한 항공우주 및 방산 장비에 적용합니다.',
  },
] as const

export const SELECTION_CRITERIA = [
  '사용 가스가 부식성인지 비부식성인지',
  '공정 온도 범위',
  '요구 진공도 및 허용 누설률',
  '회전축 직경과 회전 속도',
  '장비 내부 압력과 외부 압력 차이',
  '분진, 파티클, 수분 유입 가능성',
  '장시간 연속 운전 여부',
  '유지보수 주기와 교체 접근성',
  'PFPE 계열 Carrier Fluid가 필요한지 여부',
  'Grease Type 제품이 적합한지 여부',
] as const

export const COMPANY_INFO_ROWS = [
  { label: '회사명', value: '주식회사 마그론? / Magron?' },
  { label: '설립일', value: '2019년?' },
  { label: '주소', value: '경기도 안산시? 한양대? 관련 주소로 보임' },
  {
    label: '주요 제품',
    value: '자성유체, 자성유체 Seal, Feedthrough, Ferrofluid 관련 제품',
  },
  {
    label: '주요 분야',
    value: '반도체, 디스플레이, 진공 장비, 자성유체 응용 분야',
  },
] as const
