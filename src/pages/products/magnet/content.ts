/* ==========================================================================
   Permanent Magnet — 산업용 영구자석 소재 및 등급별 자기특성표
   Table images are the authoritative catalogue tables (magnet_1 ~ magnet_9);
   titles & descriptions are written alongside each table.
   ========================================================================== */

import heroMagnets from '@/assets/images/magnet/magnet_1.avif'
import tblSinteredNdFeB from '@/assets/images/magnet/magnet_2.avif'
import tblBondedCompression from '@/assets/images/magnet/magnet_3.avif'
import tblBondedInjection from '@/assets/images/magnet/magnet_4.avif'
import tblSmCo from '@/assets/images/magnet/magnet_5.avif'
import tblMagneticPowder from '@/assets/images/magnet/magnet_6.avif'
import tblCastAlNiCo from '@/assets/images/magnet/magnet_7.avif'
import tblSinteredAlNiCo from '@/assets/images/magnet/magnet_8.avif'
import tblFerrite from '@/assets/images/magnet/magnet_9.avif'

export { heroMagnets }

export type MagnetTable = {
  id: string
  title: string
  description: string
  image: string
  note?: string
}

export type MagnetFamily = {
  id: string
  name: string
  nameKr: string
  intro: string
  tables: MagnetTable[]
}

export const HERO_CARDS = [
  { title: 'NdFeB', description: '최고 수준의 자속밀도와 에너지적. 모터·센서·정밀기기용.' },
  { title: 'SmCo', description: '고온·내식 환경에서 안정적인 자기 특성 유지.' },
  { title: 'AlNiCo', description: '매우 낮은 온도계수와 높은 Curie 온도. 고온 계측용.' },
  { title: 'Ferrite', description: '경제적이고 내식성이 우수한 범용 영구자석.' },
] as const

/** 표에서 사용하는 자기 특성 용어 안내 */
export const PROPERTY_GLOSSARY = [
  { term: 'Br (Remanence)', desc: '잔류 자속밀도 — 자석이 유지하는 자속의 세기 (mT / kGs).' },
  { term: 'Hcb (Coercive Force)', desc: '보자력 — 자속밀도를 0으로 만드는 데 필요한 역자기장 (KA/m / kOe).' },
  { term: 'Hcj (Intrinsic Coercive Force)', desc: '고유 보자력 — 자화를 0으로 만드는 역자기장, 내열·감자 저항 지표.' },
  { term: '(BH)max (Max Energy Product)', desc: '최대 에너지적 — 자석이 낼 수 있는 에너지의 크기 (KJ/m³ / MGOe).' },
  { term: 'Tw / Tc', desc: 'Tw 최대 사용 온도, Tc 퀴리 온도(자성을 잃는 온도).' },
] as const

export const FAMILIES: MagnetFamily[] = [
  {
    id: 'ndfeb',
    name: 'NdFeB',
    nameKr: '네오디뮴 자석',
    intro:
      '현존하는 영구자석 중 가장 높은 자속밀도와 에너지적을 갖는 소재입니다. 소결(Sintered) 타입은 최고 성능을, 본디드(Bonded) 타입은 복잡한 형상과 정밀 치수를 구현합니다. 등급 접미사 M·H·SH·UH·EH는 내열 등급을 의미합니다.',
    tables: [
      {
        id: 'sintered-ndfeb',
        title: 'Sintered NdFeB 자석 자기특성표 및 물리특성표',
        description:
          '소결 네오디뮴 자석. N33~N52의 고자속 등급부터 최대 사용온도 200℃의 EH 등급까지 폭넓은 라인업을 제공합니다. 모터, 발전기, 센서, 자기 커플링, 자성유체 Seal 등에 사용됩니다.',
        image: tblSinteredNdFeB,
      },
      {
        id: 'bonded-compression-ndfeb',
        title: 'Bonded Compression NdFeB 자석 자기특성',
        description:
          '압축 성형 본디드 네오디뮴 자석(BNP 시리즈). 정밀한 치수와 얇은 링·박형 형상을 저비용으로 양산할 수 있어 소형 모터와 센서에 적합합니다.',
        image: tblBondedCompression,
      },
      {
        id: 'bonded-injection-ndfeb',
        title: 'Bonded Injection NdFeB 자석 자기특성',
        description:
          '사출 성형 본디드 네오디뮴 자석(BNI 시리즈). 복잡한 3차원 형상, 인서트 일체 성형, 다극 착자가 가능하여 소형 정밀 부품에 활용됩니다.',
        image: tblBondedInjection,
      },
      {
        id: 'magnetic-powder',
        title: 'Magnetic powder 특성표',
        description:
          '본디드 자석 제조에 사용되는 자성 분말(NM 시리즈)의 특성표입니다. 등급별 에너지적, 잔류 자속밀도, 퀴리 온도를 확인할 수 있습니다.',
        image: tblMagneticPowder,
      },
    ],
  },
  {
    id: 'smco',
    name: 'SmCo',
    nameKr: '사마륨코발트 자석',
    intro:
      '높은 사용 온도(250~350℃)와 우수한 내식성·온도 안정성을 갖는 소재입니다. NdFeB보다 감자에 강하고 온도계수가 낮아, 고온·정밀 자기 특성이 요구되는 환경에 적합합니다.',
    tables: [
      {
        id: 'smco',
        title: 'SmCo 자석 자기특성 및 물리특성표',
        description:
          'Sm1Co5 및 Sm2Co17 계열과 저온계수(Low Temp Coeff) 등급을 포함합니다. 항공우주, 고온 모터, 센서, 자기 커플링 등 안정적인 자기 특성이 필요한 분야에 사용됩니다.',
        image: tblSmCo,
      },
    ],
  },
  {
    id: 'alnico',
    name: 'AlNiCo',
    nameKr: '알니코 자석',
    intro:
      '매우 낮은 온도계수와 높은 퀴리 온도(약 810~860℃)를 갖는 소재로, 고온에서도 자속이 안정적입니다. 보자력은 낮지만 온도 안정성이 중요한 계측기·센서에 적합합니다.',
    tables: [
      {
        id: 'cast-alnico',
        title: 'Cast AlNiCo 자석 대표 자기특성',
        description:
          '주조(Cast) 방식 알니코 자석(LN·LNG·LNGT 시리즈). Isotropic/Anisotropic 등급과 MMPA 표준 대응 등급을 제공하며, 계측기·센서·발전기 등에 사용됩니다.',
        image: tblCastAlNiCo,
      },
      {
        id: 'sintered-alnico',
        title: 'Sintered AlNiCo 자석 대표 자기특성',
        description:
          '소결(Sintered) 방식 알니코 자석(SAlNiCo 시리즈). 주조 대비 소형·정밀 형상과 균일한 특성 구현에 유리하며, 소형 센서와 계측 부품에 적합합니다.',
        image: tblSinteredAlNiCo,
      },
    ],
  },
  {
    id: 'ferrite',
    name: 'Ferrite',
    nameKr: '페라이트 자석',
    intro:
      '경제적이면서 내식성이 우수한 범용 영구자석입니다. 자기력은 상대적으로 낮지만 가격 경쟁력과 안정성이 높아 스피커, 모터, 각종 산업용 부품에 폭넓게 사용됩니다.',
    tables: [
      {
        id: 'ferrite',
        title: 'Ferrite 자석 대표 자기특성',
        description:
          '하드 페라이트 자석(Y 시리즈)의 등급별 자기특성표입니다. 등급별 Br, Hc, BHc, J(BH)max 값을 SI 단위와 CGS 단위로 함께 제공합니다.',
        image: tblFerrite,
      },
    ],
  },
]

export const INQUIRY_ITEMS = [
  '적용 제품 / 장비 종류',
  '요구 자기 특성 (자속밀도 · 보자력 · 에너지적)',
  '사용 온도 및 부식 환경',
  '형상 · 치수 · 착자 방향',
  '필요 수량 및 납기',
] as const
