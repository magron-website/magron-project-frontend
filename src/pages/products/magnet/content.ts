export type SpecColumn = {
  key: string
  label: string
}

export type SpecSection = {
  title: string
  body: string
  columns: SpecColumn[]
  rows: Record<string, string>[]
  placeholder: {
    id: string
    description: string
    src: string
  }
  notes?: string[]
}

export type SpecTabGroup = {
  id: string
  label: string
  sections: SpecSection[]
}

export const HERO_CARDS = [
  {
    title: 'NdFeB Magnet',
    description: '높은 자기 에너지와 강한 자력을 제공하는 대표적인 희토류 자석',
  },
  {
    title: 'SmCo Magnet',
    description: '고온 안정성과 내식성이 우수한 고성능 희토류 자석',
  },
  {
    title: 'AlNiCo Magnet',
    description: '온도 안정성이 우수하고 센서, 계측기, 특수 장비에 활용되는 금속계 자석',
  },
  {
    title: 'Ferrite Magnet',
    description: '경제성과 안정성이 우수하여 범용 산업 분야에 폭넓게 사용되는 세라믹 자석',
  },
] as const

export const MATERIAL_CARDS = [
  {
    title: 'NdFeB Magnet',
    description:
      'Neodymium Iron Boron 계열 자석입니다. 현재 상용화된 영구자석 중 매우 높은 자기 에너지적을 가지며, 소형화와 고출력이 필요한 제품에 적합합니다.',
    applications: [
      '모터',
      '센서',
      '자기 커플링',
      '스피커',
      '발전기',
      '자성유체 Seal',
      '전장부품',
      '자동화 장비',
    ],
  },
  {
    title: 'SmCo Magnet',
    description:
      'Samarium Cobalt 계열 희토류 자석입니다. 고온 환경에서 안정적인 자기 특성을 유지하며, 내식성이 비교적 우수하여 고신뢰성 장비에 적합합니다.',
    applications: [
      '고온 모터',
      '항공우주',
      '방산 장비',
      '고온 센서',
      '진공 장비',
      '정밀 계측기',
    ],
  },
  {
    title: 'AlNiCo Magnet',
    description:
      'Aluminum, Nickel, Cobalt 기반 금속계 자석입니다. 온도 안정성이 우수하고 자기 특성이 안정적이지만, 보자력이 낮아 설계 시 감자 조건을 고려해야 합니다.',
    applications: ['센서', '계측기', '스피커', '홀딩 장치', '고온 환경 장비'],
  },
  {
    title: 'Ferrite Magnet',
    description:
      '세라믹 계열 영구자석입니다. 가격 경쟁력이 높고 내식성이 우수하여 대량 생산 제품과 범용 산업용 부품에 많이 사용됩니다.',
    applications: [
      '모터',
      '스피커',
      '가전제품',
      '자동차 부품',
      '홀딩 마그넷',
      '교육용/범용 자석',
    ],
  },
] as const

export const COMPARISON_COLUMNS: SpecColumn[] = [
  { key: 'material', label: '소재' },
  { key: 'magneticForce', label: '자기력' },
  { key: 'heatResistance', label: '내열성' },
  { key: 'corrosion', label: '내식성' },
  { key: 'price', label: '가격' },
  { key: 'features', label: '주요 특징' },
]

export const COMPARISON_ROWS = [
  {
    material: 'NdFeB',
    magneticForce: '매우 높음',
    heatResistance: '보통',
    corrosion: '도금 필요',
    price: '중~높음',
    features: '가장 강력한 영구자석 계열, 소형 고출력 설계에 적합',
  },
  {
    material: 'SmCo',
    magneticForce: '높음',
    heatResistance: '매우 높음',
    corrosion: '우수',
    price: '높음',
    features: '고온 안정성, 내식성, 고신뢰 환경에 적합',
  },
  {
    material: 'AlNiCo',
    magneticForce: '중간',
    heatResistance: '높음',
    corrosion: '보통',
    price: '중간',
    features: '온도 안정성 우수, 보자력 낮음',
  },
  {
    material: 'Ferrite',
    magneticForce: '낮음~중간',
    heatResistance: '보통~높음',
    corrosion: '우수',
    price: '낮음',
    features: '경제성 우수, 범용 대량 생산에 적합',
  },
]

const NDFEB_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'br', label: 'Remanence Br' },
  { key: 'bhc', label: 'Coercive Force bHc' },
  { key: 'ihc', label: 'Intrinsic Coercive Force iHc' },
  { key: 'bhmax', label: 'Max Energy Product BH(max)' },
  { key: 'temp', label: 'Max Working Temp' },
]

function ndfebRow(grade: string, temp: string) {
  return {
    grade,
    br: '?',
    bhc: '?',
    ihc: '?',
    bhmax: '?',
    temp,
  }
}

export const SINTERED_NDFEB: SpecSection = {
  title: 'Sintered NdFeB 자기특성표',
  body: 'Sintered NdFeB는 높은 자기 에너지적과 우수한 자기 성능을 제공하는 대표적인 희토류 영구자석입니다. 원본 이미지에는 N등급, M등급, H등급, SH등급, UH등급, EH등급, AH등급 계열로 보이는 등급표가 포함되어 있습니다.',
  columns: NDFEB_COLS,
  rows: [
    ...['N30', 'N33', 'N35', 'N38', 'N40', 'N42', 'N45', 'N48', 'N50', 'N52'].map((g) =>
      ndfebRow(g, '80℃'),
    ),
    ...['N35M', 'N38M', 'N40M', 'N42M', 'N45M', 'N48M', 'N50M'].map((g) =>
      ndfebRow(g, '100℃'),
    ),
    ...['N35H', 'N38H', 'N40H', 'N42H', 'N45H', 'N48H'].map((g) => ndfebRow(g, '120℃')),
    ...['N33SH', 'N35SH', 'N38SH', 'N40SH', 'N42SH', 'N45SH'].map((g) =>
      ndfebRow(g, '150℃'),
    ),
    ...['N30UH', 'N33UH', 'N35UH', 'N38UH', 'N40UH'].map((g) => ndfebRow(g, '180℃')),
    ...['N30EH', 'N33EH', 'N35EH', 'N38EH'].map((g) => ndfebRow(g, '200℃')),
    ...['N30AH', 'N33AH', 'N35AH'].map((g) => ndfebRow(g, '220℃')),
  ],
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_SINTERED_NDFEB_TABLE',
    description: '첫 번째 이미지 중간의 Sintered NdFeB 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/sintered-ndfeb-table.png',
  },
}

const BONDED_COMP_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'bhmax', label: 'Max Energy Product' },
  { key: 'br', label: 'Remanence' },
  { key: 'bhc', label: 'Coercive Force' },
  { key: 'ihc', label: 'Intrinsic Coercive Force' },
  { key: 'density', label: 'Density' },
  { key: 'tempCoef', label: 'Temp Coefficient' },
  { key: 'temp', label: 'Max Working Temp' },
]

function bondedCompRow(grade: string) {
  return {
    grade,
    bhmax: '?',
    br: '?',
    bhc: '?',
    ihc: '?',
    density: '5.6~6.1?',
    tempCoef: '?',
    temp: '120?',
  }
}

export const BONDED_COMPRESSION_NDFEB: SpecSection = {
  title: 'Bonded Compression NdFeB 자기특성표',
  body: 'Bonded Compression NdFeB는 NdFeB 분말과 바인더를 이용하여 성형한 자석으로, 복잡한 형상 구현과 치수 정밀성이 필요한 제품에 활용될 수 있습니다.',
  columns: BONDED_COMP_COLS,
  rows: [
    'BNP-6',
    'BNP-8L',
    'BNP-8',
    'BNP-8H',
    'BNP-9',
    'BNP-10',
    'BNP-11',
    'BNP-12L',
  ].map(bondedCompRow),
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_BONDED_COMPRESSION_NDFEB_TABLE',
    description:
      '첫 번째 이미지 하단의 Bonded Compression NdFeB 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/bonded-compression-ndfeb-table.png',
  },
}

const BONDED_INJ_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'bhmax', label: 'Max Energy Product' },
  { key: 'br', label: 'Remanence' },
  { key: 'flux', label: 'Coercive Force / Flux' },
  { key: 'ihc', label: 'Intrinsic Coercive Force' },
  { key: 'density', label: 'Density' },
  { key: 'tempCoef', label: 'Temp Coefficient' },
  { key: 'temp', label: 'Max Working Temp' },
]

function bondedInjRow(grade: string) {
  return {
    grade,
    bhmax: '?',
    br: '?',
    flux: '?',
    ihc: '?',
    density: '?',
    tempCoef: '?',
    temp: '120?',
  }
}

export const BONDED_INJECTION_NDFEB: SpecSection = {
  title: 'Bonded Injection NdFeB 자기특성표',
  body: 'Bonded Injection NdFeB는 사출 성형 방식으로 제작되는 NdFeB 계열 자석입니다. 복잡한 형상, 얇은 구조, 소형 부품, 대량 생산이 필요한 제품에 적합합니다.',
  columns: BONDED_INJ_COLS,
  rows: ['BNP-3', 'BNP-4', 'BNP-5', 'BNP-6', 'BNP-8', 'BNP-10'].map(bondedInjRow),
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_BONDED_INJECTION_NDFEB_TABLE',
    description:
      '첫 번째 이미지 맨 아래의 Bonded Injection NdFeB 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/bonded-injection-ndfeb-table.png',
  },
}

const SMCO_COLS: SpecColumn[] = [
  { key: 'material', label: 'Material' },
  { key: 'grade', label: 'Grade' },
  { key: 'br', label: 'Remanence Br' },
  { key: 'bhc', label: 'Coercive Force bHc' },
  { key: 'ihc', label: 'Intrinsic Coercive Force iHc' },
  { key: 'bhmax', label: 'Max Energy Product BH(max)' },
  { key: 'temp', label: 'Max Working Temp' },
]

function smcoRow(material: string, grade: string, temp: string) {
  return {
    material,
    grade,
    br: '?',
    bhc: '?',
    ihc: '?',
    bhmax: '?',
    temp,
  }
}

export const SMCO_SPEC: SpecSection = {
  title: 'SmCo 자기특성표',
  body: 'SmCo Magnet은 고온 안정성과 내식성이 우수한 희토류 자석입니다. 고온 모터, 항공우주, 방산, 진공 장비, 정밀 센서 등 고신뢰 환경에 적합합니다.',
  columns: SMCO_COLS,
  rows: [
    ...['XG16', 'XG18', 'XG20', 'XG22'].map((g) => smcoRow('SmCo5', g, '250℃')),
    ...['XG24H', 'XG26H', 'XG28H', 'XG30H', 'XG32H'].map((g) =>
      smcoRow('Sm2Co17', g, '300℃'),
    ),
    ...['XG26M', 'XG28M', 'XG30M'].map((g) => smcoRow('Sm2Co17', g, '350℃')),
    ...['XG28', 'XG30', 'XG32'].map((g) => smcoRow('Sm2Co17', g, '300℃')),
    ...['XG22LT', 'XG24LT', 'XG26LT'].map((g) =>
      smcoRow('Low Temp Coef Sm2Co17', g, '300℃'),
    ),
  ],
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_SMCO_TABLE',
    description: '두 번째 이미지 상단의 SmCo 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/smco-table.png',
  },
}

const POWDER_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'bhmax', label: 'Max Energy Product' },
  { key: 'br', label: 'Remanence' },
  { key: 'bhc', label: 'Coercive Force' },
  { key: 'ihc', label: 'Intrinsic Coercive Force' },
  { key: 'density', label: 'Density' },
  { key: 'curie', label: 'Curie Temp' },
  { key: 'temp', label: 'Max Working Temp' },
]

function powderRow(grade: string) {
  return {
    grade,
    bhmax: '?',
    br: '?',
    bhc: '?',
    ihc: '?',
    density: '7.4?',
    curie: '675?',
    temp: '120?',
  }
}

export const MAGNET_POWDER_SPEC: SpecSection = {
  title: 'Magnet Powder 특성표',
  body: 'Magnet Powder는 Bonded Magnet 또는 사출/압축 성형 자석 제조에 활용되는 자성 분말입니다. 분말의 자기 특성, 입도, 밀도, Curie 온도는 최종 자석의 성능과 제조 공정에 영향을 줍니다.',
  columns: POWDER_COLS,
  rows: [
    'MQ-A',
    'MQ-B',
    'MQ-C',
    'MQ-D',
    'MQ-E',
    'MQ-F',
    'MQP-B+',
    'MQFP-12-9',
  ].map(powderRow),
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_MAGNET_POWDER_TABLE',
    description: '두 번째 이미지 중상단의 Magnet powder 특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/magnet-powder-table.png',
  },
}

const CAST_ALNICO_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'equiv', label: 'Equivalent Grade' },
  { key: 'bhmax', label: 'Max Energy Product' },
  { key: 'br', label: 'Remanence' },
  { key: 'bhc', label: 'Coercive Force' },
  { key: 'density', label: 'Density' },
  { key: 'curie', label: 'Curie Temp' },
  { key: 'temp', label: 'Max Working Temp' },
  { key: 'remark', label: 'Remark' },
]

function castAlnicoRow(grade: string, remark: string) {
  return {
    grade,
    equiv: 'AlNiCo?',
    bhmax: '?',
    br: '?',
    bhc: '?',
    density: '?',
    curie: '?',
    temp: '?',
    remark,
  }
}

export const CAST_ALNICO_SPEC: SpecSection = {
  title: 'Cast AlNiCo 자기특성표',
  body: 'Cast AlNiCo는 주조 방식으로 제작되는 AlNiCo 자석입니다. 온도 안정성이 우수하고 고온 환경에서도 안정적인 자기 특성을 유지할 수 있으나, 보자력이 낮아 감자 조건에 대한 설계 검토가 필요합니다.',
  columns: CAST_ALNICO_COLS,
  rows: [
    castAlnicoRow('LNGT?', 'Isotropic'),
    castAlnicoRow('LNG?', 'Isotropic'),
    castAlnicoRow('LNG12', 'Isotropic'),
    castAlnicoRow('LNG13', 'Isotropic'),
    castAlnicoRow('LNG37?', 'Anisotropic'),
    castAlnicoRow('LNG40', 'Anisotropic'),
    castAlnicoRow('LNG44', 'Anisotropic'),
    castAlnicoRow('LNG52', 'Anisotropic'),
    castAlnicoRow('LNG60', 'Anisotropic'),
  ],
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_CAST_ALNICO_TABLE',
    description: '두 번째 이미지 중간의 Cast AlNiCo 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/cast-alnico-table.png',
  },
}

const SINTERED_ALNICO_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'bhmax', label: 'Max Energy Product' },
  { key: 'br', label: 'Remanence' },
  { key: 'bhc', label: 'Coercive Force' },
  { key: 'ihc', label: 'Intrinsic Coercive Force' },
  { key: 'density', label: 'Density' },
  { key: 'tempCoef', label: 'Temp Coefficient' },
  { key: 'curie', label: 'Curie Temp' },
  { key: 'remark', label: 'Remark' },
]

function sinteredAlnicoRow(density: string, curie: string, remark: string) {
  return {
    grade: 'SANIC?',
    bhmax: '?',
    br: '?',
    bhc: '?',
    ihc: '?',
    density,
    tempCoef: '?',
    curie,
    remark,
  }
}

export const SINTERED_ALNICO_SPEC: SpecSection = {
  title: 'Sintered AlNiCo 자기특성표',
  body: 'Sintered AlNiCo는 소결 방식으로 제작되는 AlNiCo 자석입니다. 정밀 형상, 소형 부품, 안정적인 온도 특성이 필요한 제품에 사용할 수 있습니다.',
  columns: SINTERED_ALNICO_COLS,
  rows: [
    ...Array(4)
      .fill(null)
      .map(() => sinteredAlnicoRow('6.8?', '700?', 'Isotropy')),
    sinteredAlnicoRow('7.0?', '800?', 'Anisotropy'),
    sinteredAlnicoRow('7.1?', '800?', 'Anisotropy'),
    sinteredAlnicoRow('7.2?', '800?', 'Anisotropy'),
    sinteredAlnicoRow('7.25?', '850?', 'Anisotropy'),
  ],
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_SINTERED_ALNICO_TABLE',
    description: '두 번째 이미지 중하단의 Sintered AlNiCo 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/sintered-alnico-table.png',
  },
}

const FERRITE_COLS: SpecColumn[] = [
  { key: 'grade', label: 'Grade' },
  { key: 'br', label: 'Br' },
  { key: 'hcb', label: 'Hcb' },
  { key: 'hcj', label: 'Hcj' },
  { key: 'bhmax', label: 'BH(max)' },
]

function ferriteRow(grade: string) {
  return { grade, br: '?', hcb: '?', hcj: '?', bhmax: '?' }
}

export const FERRITE_SPEC: SpecSection = {
  title: 'Ferrite 자기특성표',
  body: 'Ferrite Magnet은 세라믹 계열 영구자석으로 경제성과 내식성이 우수합니다. 범용 모터, 스피커, 가전제품, 홀딩 마그넷, 자동차 부품 등 다양한 분야에서 사용됩니다.',
  columns: FERRITE_COLS,
  rows: [
    'Y8T',
    'Y10T',
    'Y20',
    'Y22H',
    'Y25',
    'Y26H-1',
    'Y26H-2',
    'Y27H',
    'Y30H-1',
    'Y30H-2',
    'Y32',
    'Y33',
    'Y35',
    'Y30BH',
    'Y33BH',
    'Y35BH',
    'Y38',
    'Y40',
  ].map(ferriteRow),
  placeholder: {
    id: 'IMAGE_PLACEHOLDER_FERRITE_TABLE',
    description: '두 번째 이미지 하단의 Ferrite 자기특성표 원본 이미지를 배치한다.',
    src: '/images/magnet/ferrite-table.png',
  },
}

export const SPEC_TAB_GROUPS: SpecTabGroup[] = [
  {
    id: 'ndfeb',
    label: 'NdFeB',
    sections: [SINTERED_NDFEB, BONDED_COMPRESSION_NDFEB, BONDED_INJECTION_NDFEB],
  },
  {
    id: 'smco',
    label: 'SmCo',
    sections: [SMCO_SPEC],
  },
  {
    id: 'powder',
    label: 'Magnet Powder',
    sections: [MAGNET_POWDER_SPEC],
  },
  {
    id: 'alnico',
    label: 'AlNiCo',
    sections: [CAST_ALNICO_SPEC, SINTERED_ALNICO_SPEC],
  },
  {
    id: 'ferrite',
    label: 'Ferrite',
    sections: [FERRITE_SPEC],
  },
]

export const SELECTION_CRITERIA = [
  '필요한 자력 또는 자기장 세기',
  '제품 크기와 형상',
  '사용 온도 범위',
  '고온 연속 사용 여부',
  '부식 환경 여부',
  '도금 또는 코팅 필요 여부',
  '충격 또는 진동 조건',
  '가공 정밀도',
  '대량 생산 여부',
  '비용 조건',
  '모터/센서/홀딩/자기 커플링 등 적용 목적',
] as const

export const MATERIAL_RECOMMENDATIONS = [
  { condition: '가장 강한 자력이 필요하면', material: 'NdFeB Magnet' },
  { condition: '고온 안정성과 내식성이 중요하면', material: 'SmCo Magnet' },
  { condition: '온도 안정성과 특수 계측 용도라면', material: 'AlNiCo Magnet' },
  { condition: '경제성과 대량 생산이 중요하면', material: 'Ferrite Magnet' },
] as const

export const APPLICATION_CARDS = [
  {
    title: 'Motor & Generator',
    description: '모터, 발전기, 액추에이터, 로터/스테이터 부품',
  },
  {
    title: 'Sensor & Encoder',
    description: '위치 센서, 속도 센서, 엔코더, 홀 센서',
  },
  {
    title: 'Magnetic Coupling',
    description: '비접촉 동력 전달, Magnetic Drive, 자성유체 Seal',
  },
  {
    title: 'Speaker & Audio',
    description: '스피커, 이어폰, 음향 부품',
  },
  {
    title: 'Automotive',
    description: '전장부품, 모터, 센서, 전기차 부품',
  },
  {
    title: 'Semiconductor Equipment',
    description: '반도체 장비, 진공 장비, 자성유체 Seal 구조',
  },
  {
    title: 'Medical Equipment',
    description: '의료기기, 진단 장비, 정밀 구동부',
  },
  {
    title: 'Industrial Automation',
    description: '로봇, 자동화 장비, 정밀 구동 모듈',
  },
] as const

export const INQUIRY_ITEMS = [
  '필요한 자석 소재',
  '자석 형상: Ring, Disc, Block, Arc, Cylinder 등',
  '외경, 내경, 두께, 길이',
  '착자 방향',
  '사용 온도',
  '사용 환경: 실내, 실외, 습기, 염분, 부식성 환경 등',
  '필요한 자력 또는 자기 특성',
  '도금/코팅 필요 여부',
  '수량',
  '적용 장비 또는 사용 목적',
] as const
