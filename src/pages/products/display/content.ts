export const YOUTUBE_URL_PLACEHOLDER = 'YOUTUBE_URL_PLACEHOLDER'

export const YOUTUBE_MAIN_INTRO_URL = YOUTUBE_URL_PLACEHOLDER
export const YOUTUBE_PORTFOLIO_01_URL = YOUTUBE_URL_PLACEHOLDER
export const YOUTUBE_PORTFOLIO_02_URL = YOUTUBE_URL_PLACEHOLDER
export const YOUTUBE_PORTFOLIO_03_URL = YOUTUBE_URL_PLACEHOLDER
export const YOUTUBE_PORTFOLIO_04_URL = YOUTUBE_URL_PLACEHOLDER

export const MAIN_VIDEO = {
  placeholderId: 'VIDEO_PLACEHOLDER_MAIN_INTRO',
  description:
    '상단의 “MAGRON Grand Ferrofluid Display Introduction” 유튜브 영상을 넣을 영역이다. 원본 이미지 상단에 있는 큰 YouTube 영상 영역을 Hero 아래에 크게 배치한다.',
  youtubeUrl: YOUTUBE_MAIN_INTRO_URL,
  thumbnailSrc: '/images/large-ferrofluid-display/main-intro-thumbnail.png',
} as const

export const PORTFOLIO_VIDEOS = [
  {
    title: 'Ferrofluid Display Motion 01',
    description: '대형 디스플레이 안에서 자성유체가 자기장에 반응하며 움직이는 영상입니다.',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_01',
    youtubeUrl: YOUTUBE_PORTFOLIO_01_URL,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-01.png',
  },
  {
    title: 'Interactive Ferrofluid Demo',
    description: '사용자 조작 또는 외부 자극에 따라 자성유체가 반응하는 전시형 데모 영상입니다.',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_02',
    youtubeUrl: YOUTUBE_PORTFOLIO_02_URL,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-02.png',
  },
  {
    title: 'Vertical Ferrofluid Display',
    description: '수직형 투명 디스플레이 구조에서 자성유체가 움직이는 모습을 보여주는 영상입니다.',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_03',
    youtubeUrl: YOUTUBE_PORTFOLIO_03_URL,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-03.png',
  },
  {
    title: 'Ferrofluid Spike Motion',
    description: '자성유체가 자기장에 의해 뾰족한 스파이크 형태를 만들며 움직이는 영상입니다.',
    placeholderId: 'VIDEO_PLACEHOLDER_PORTFOLIO_04',
    youtubeUrl: YOUTUBE_PORTFOLIO_04_URL,
    thumbnailSrc: '/images/large-ferrofluid-display/portfolio-04.png',
  },
] as const

export const APPLICATION_CARDS = [
  {
    title: '과학관 및 전시관',
    description: '자성유체와 자기장 원리를 시각적으로 보여주는 체험형 전시 콘텐츠',
  },
  {
    title: '기업 홍보관',
    description: '기술력과 브랜드 이미지를 강조할 수 있는 움직이는 디스플레이',
  },
  {
    title: '미디어아트 콘텐츠',
    description: '유체의 움직임과 자기장 반응을 활용한 시각 예술 콘텐츠',
  },
  {
    title: '교육·체험 부스',
    description: '관람객이 자성유체의 움직임을 직관적으로 이해할 수 있는 실험형 콘텐츠',
  },
] as const

export const INQUIRY_ITEMS = [
  '설치 장소',
  '원하는 디스플레이 크기',
  '실내용 / 전시용 / 홍보관용 여부',
  '고정형 또는 인터랙티브형 여부',
  '설치 기간',
  '필요한 영상 또는 제어 방식',
  '주문 제작 여부',
] as const
