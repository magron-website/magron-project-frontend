export const YOUTUBE_FERROFLUID_SPIKE_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_FERROFLUID_MOVEMENT_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_STAR_MAGNET_1_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_STAR_MAGNET_2_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_KIT_DEMO_1_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_KIT_DEMO_2_URL = 'YOUTUBE_URL_PLACEHOLDER'
export const YOUTUBE_KIT_DEMO_3_URL = 'YOUTUBE_URL_PLACEHOLDER'

export const HERO_CARDS = [
  {
    title: '자기장 반응 관찰',
    description:
      '자석을 가까이 가져가면 자성유체가 자기장 방향을 따라 움직이는 모습을 확인할 수 있습니다.',
  },
  {
    title: '교육·전시용 실험',
    description:
      '학교, 과학관, 전시 부스, 체험 수업에서 시각적으로 이해하기 쉬운 실험 콘텐츠로 활용할 수 있습니다.',
  },
  {
    title: '다양한 실험 구성',
    description:
      'Ferrofluid, Star Magnet, Pulling Magnet, Catching Magnet 등 구성품별로 다른 실험을 진행할 수 있습니다.',
  },
] as const

export const COMPONENT_CARDS = [
  { title: '자성유체', subtitle: 'Ferrofluid' },
  { title: '스타 자석', subtitle: 'Star Magnet' },
  { title: '당기는 자석', subtitle: 'Pulling Magnet' },
  { title: '잡는 자석', subtitle: 'Catching Magnet' },
] as const

export const FERROFLUID_EXPLAIN_CARDS = [
  {
    title: '자기장 반응',
    description: '자석의 위치와 세기에 따라 자성유체의 모양이 변합니다.',
  },
  {
    title: '스파이크 패턴',
    description:
      '강한 자기장에서는 액체 표면이 뾰족한 산처럼 솟아오르는 패턴을 만들 수 있습니다.',
  },
  {
    title: '움직이는 액체',
    description:
      '자석을 움직이면 자성유체도 함께 움직이며 유체와 자기장의 관계를 시각적으로 보여줍니다.',
  },
] as const

export type KitItemVideo = {
  id: string
  description: string
  urlConstant: string
}

export type KitItemSection = {
  title: string
  body: string
  bulletPoints?: readonly string[]
  image: {
    id: string
    description: string
    src: string
    aspectRatio?: string
  }
  videos?: readonly KitItemVideo[]
  videoNote?: string
  experimentSteps?: readonly { step: string; description: string }[]
  warning?: string
  caution?: string
  extraNote?: string
}

export const KIT_ITEM_FERROFLUID: KitItemSection = {
  title: '1. 자성유체 Ferrofluid',
  body: '자성유체는 키트의 핵심 구성품입니다. 자석을 가까이 가져가면 검은 액체가 자기장에 반응하여 움직이고, 자석의 위치에 따라 형태가 달라집니다.',
  bulletPoints: [
    '자성유체',
    'Ferrofluid',
    '자석에 강하게 반응하는 검은색 액체',
    '자석을 가까이 가져가면 특유의 스파이크 패턴과 움직임을 관찰 가능',
  ],
  image: {
    id: 'IMAGE_PLACEHOLDER_FERROFLUID_BOTTLE',
    description: '첫 번째 이미지 중간의 자성유체 병 제품 사진을 넣는다.',
    src: '/images/ferrofluid-kit/ferrofluid-bottle.png',
    aspectRatio: '4 / 5',
  },
  videos: [
    {
      id: 'YOUTUBE_PLACEHOLDER_FERROFLUID_SPIKE',
      description:
        '첫 번째 자성유체 실험 영상. 원본 이미지에서 왼쪽 하단의 YouTube 썸네일 영역. 자성유체가 자석에 반응해 움직이는 영상으로 연결할 예정.',
      urlConstant: YOUTUBE_FERROFLUID_SPIKE_URL,
    },
    {
      id: 'YOUTUBE_PLACEHOLDER_FERROFLUID_MOVEMENT',
      description:
        '첫 번째 자성유체 실험 영상 오른쪽 YouTube 썸네일 영역. 자성유체와 자석의 반응 또는 분산/움직임 실험 영상으로 연결할 예정.',
      urlConstant: YOUTUBE_FERROFLUID_MOVEMENT_URL,
    },
  ],
  videoNote: '동영상 링크는 추후 직접 연결할 예정입니다.',
  warning:
    '자성유체는 옷, 피부, 책상 등에 묻으면 제거가 어려울 수 있으므로 실험 시 반드시 보호 장비와 받침대를 사용하세요.',
}

export const KIT_ITEM_STAR_MAGNET: KitItemSection = {
  title: '2. 스타 자석 Star Magnet',
  body: '스타 자석은 자성유체가 자기장에 반응하는 모습을 입체적으로 관찰하기 위한 자석입니다. 자성유체 가까이에 스타 자석을 가져가면 자성유체가 특정 방향으로 끌려가거나 뾰족한 패턴을 형성하는 모습을 볼 수 있습니다.',
  bulletPoints: [
    '스타 자석',
    'Star Magnet',
    '자성유체와 함께 사용할 수 있는 실험용 자석',
    '자성유체의 움직임과 형태 변화를 관찰하는 데 사용',
  ],
  image: {
    id: 'IMAGE_PLACEHOLDER_STAR_MAGNET',
    description: '첫 번째 이미지 하단의 Star Magnet 병 또는 제품 사진을 넣는다.',
    src: '/images/ferrofluid-kit/star-magnet.png',
    aspectRatio: '4 / 5',
  },
  videos: [
    {
      id: 'YOUTUBE_PLACEHOLDER_STAR_MAGNET_1',
      description:
        'Star Magnet 관련 실험 영상. 자성유체가 스타 자석에 반응하는 모습을 보여주는 영상 썸네일.',
      urlConstant: YOUTUBE_STAR_MAGNET_1_URL,
    },
    {
      id: 'YOUTUBE_PLACEHOLDER_STAR_MAGNET_2',
      description:
        'Star Magnet 또는 자석 이동에 따른 자성유체 반응을 보여주는 두 번째 영상 썸네일.',
      urlConstant: YOUTUBE_STAR_MAGNET_2_URL,
    },
  ],
  extraNote: '자성유체와 자석의 거리에 따라 반응 속도와 형태가 달라질 수 있습니다.',
}

export const KIT_ITEM_PULLING_MAGNET: KitItemSection = {
  title: '3. 당기는 자석 Pulling Magnet',
  body: '당기는 자석은 자성유체가 자석 쪽으로 끌려오는 움직임을 관찰하기 위한 구성품입니다. 자석을 움직이는 방향에 따라 자성유체가 따라 움직이며, 자기장에 의해 액체가 제어되는 모습을 쉽게 확인할 수 있습니다.',
  bulletPoints: [
    '당기는 자석',
    'Pulling magnet',
    '자성유체를 끌어당기는 실험에 사용',
    '자성유체의 이동 방향과 반응을 관찰 가능',
  ],
  image: {
    id: 'IMAGE_PLACEHOLDER_PULLING_MAGNET',
    description: '두 번째 이미지 상단의 Pulling Magnet 병 제품 사진을 넣는다.',
    src: '/images/ferrofluid-kit/pulling-magnet.png',
    aspectRatio: '4 / 5',
  },
  experimentSteps: [
    {
      step: '01',
      description:
        '흰색 배경 또는 투명 용기에서 자성유체가 자석을 따라 움직이는 모습을 관찰합니다.',
    },
    {
      step: '02',
      description: '자석 위치를 천천히 이동시키며 자성유체의 반응 속도와 방향을 확인합니다.',
    },
  ],
  caution:
    '자석의 힘이 강할 수 있으므로 전자기기, 카드, 시계, 의료기기 등에 가까이 두지 마세요.',
}

export const KIT_ITEM_CATCHING_MAGNET: KitItemSection = {
  title: '4. 잡는 자석 Catching Magnet',
  body: '잡는 자석은 자성유체를 특정 위치에 모으거나 붙잡아두는 실험에 활용할 수 있습니다. 자성유체가 자석 주변에 모이는 모습을 통해 자기장의 세기와 방향을 시각적으로 확인할 수 있습니다.',
  bulletPoints: [
    '잡는 자석',
    'Catching magnet',
    '자성유체를 모으거나 특정 위치에 고정시키는 실험에 사용',
    '자석 위치에 따라 유체가 모이는 형태 변화 관찰 가능',
  ],
  image: {
    id: 'IMAGE_PLACEHOLDER_CATCHING_MAGNET',
    description: '두 번째 이미지 중간의 Catching Magnet 병 제품 사진을 넣는다.',
    src: '/images/ferrofluid-kit/catching-magnet.png',
    aspectRatio: '4 / 5',
  },
  experimentSteps: [
    {
      step: '01',
      description: '투명 용기 바깥에서 자석을 가까이 가져가 자성유체가 모이는 모습을 관찰합니다.',
    },
    {
      step: '02',
      description: '자석을 이동시키며 자성유체가 따라오는 경로와 형태 변화를 확인합니다.',
    },
  ],
  warning:
    '사용 후에는 자성유체가 용기 밖으로 새거나 묻지 않도록 정리하고, 자석은 서로 강하게 부딪히지 않도록 보관하세요.',
}

export const KIT_DEMO_VIDEOS = [
  {
    id: 'YOUTUBE_PLACEHOLDER_KIT_DEMO_1',
    description:
      '두 번째 이미지 중하단 왼쪽 YouTube 썸네일. 자성유체 키트 구성 또는 자석 반응 실험 영상으로 연결할 예정.',
    urlConstant: YOUTUBE_KIT_DEMO_1_URL,
  },
  {
    id: 'YOUTUBE_PLACEHOLDER_KIT_DEMO_2',
    description:
      '두 번째 이미지 중하단 오른쪽 YouTube 썸네일. 자성유체의 나노입자 또는 자기장 반응 설명 영상으로 연결할 예정.',
    urlConstant: YOUTUBE_KIT_DEMO_2_URL,
  },
  {
    id: 'YOUTUBE_PLACEHOLDER_KIT_DEMO_3',
    description:
      '두 번째 이미지 하단의 YouTube 썸네일. 자성유체 키트 사용법 또는 자성유체가 자석에 반응하는 실험 영상으로 연결할 예정.',
    urlConstant: YOUTUBE_KIT_DEMO_3_URL,
  },
] as const

export const KIT_VIDEO_TOPICS = [
  '500gauss~1000gauss 자석 실험 영상?',
  '나노입자 관련 영상?',
  '자성유체 키트 사용 영상',
  '자성유체가 자석에 반응하는 영상',
  '자성유체와 자석의 특성 설명 영상',
] as const

export const EXPERIMENT_USE_CARDS = [
  {
    title: '자기장 관찰 실험',
    description: '자석의 위치와 방향에 따라 자성유체가 어떻게 변하는지 관찰합니다.',
  },
  {
    title: '스파이크 패턴 실험',
    description:
      '강한 자기장 아래에서 자성유체 표면이 뾰족하게 솟아오르는 현상을 확인합니다.',
  },
  {
    title: '자석 이동 실험',
    description: '자석을 움직이며 자성유체가 따라 이동하는 모습을 관찰합니다.',
  },
  {
    title: '교육용 과학 수업',
    description:
      '초·중·고 과학 수업, 대학 기초 실험, 과학 동아리 활동에 활용할 수 있습니다.',
  },
  {
    title: '전시·체험 콘텐츠',
    description:
      '과학관, 전시회, 체험 부스에서 관람객이 쉽게 흥미를 느낄 수 있는 콘텐츠로 활용할 수 있습니다.',
  },
  {
    title: '영상 콘텐츠 제작',
    description:
      '자성유체의 독특한 움직임을 활용해 숏폼, 실험 영상, 교육 영상을 제작할 수 있습니다.',
  },
] as const

export const SAFETY_ITEMS = [
  '자성유체가 피부, 옷, 가구에 묻지 않도록 주의하세요.',
  '실험 시 받침대, 장갑, 보호 안경 등을 사용하는 것을 권장합니다.',
  '자석을 스마트폰, 신용카드, 시계, 의료기기 가까이에 두지 마세요.',
  '어린이가 사용할 경우 반드시 보호자의 지도 아래 사용하세요.',
  '사용 후 병뚜껑을 단단히 닫아 보관하세요.',
  '자석끼리 강하게 부딪히면 깨질 수 있으므로 주의하세요.',
  '먹거나 눈에 넣지 마세요.',
  '실험 후 주변을 깨끗하게 정리하세요.',
] as const

export const INQUIRY_ITEMS = [
  '사용 목적: 교육 / 전시 / 체험 / 연구 / 콘텐츠 제작',
  '필요한 수량',
  '사용 대상: 초등학생 / 중학생 / 고등학생 / 대학생 / 일반 관람객 / 연구자',
  '실험 공간: 교실 / 실험실 / 전시장 / 촬영 공간',
  '필요한 자석 종류',
  '영상 자료 또는 사용법 안내 필요 여부',
  '납품 일정',
] as const
