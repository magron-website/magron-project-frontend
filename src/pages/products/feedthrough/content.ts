/* ==========================================================================
   Feedthrough product catalogue data
   - Product photos & technical drawings are cropped from the original catalogue
     and stored under ./crops (imported by Vite as URLs).
   - Spec tables are transcribed (OCR) from the same catalogue pages.
   ========================================================================== */

// --- image assets --------------------------------------------------------
import heroMontage from '@/assets/images/feedthrough/crops/hero-montage.png'
import miniStdPhoto from '@/assets/images/feedthrough/crops/miniature-standard-photo.png'
import miniStdDraw from '@/assets/images/feedthrough/crops/miniature-standard-drawing.png'
import miniThrPhoto from '@/assets/images/feedthrough/crops/miniature-threaded-photo.png'
import miniThrDraw from '@/assets/images/feedthrough/crops/miniature-threaded-drawing.png'
import thruAPhoto from '@/assets/images/feedthrough/crops/through-hole-a-photo.png'
import thruADraw from '@/assets/images/feedthrough/crops/through-hole-a-drawing.png'
import thruBPhoto from '@/assets/images/feedthrough/crops/through-hole-b-photo.png'
import thruBDraw from '@/assets/images/feedthrough/crops/through-hole-b-drawing.png'
import flangePhoto from '@/assets/images/feedthrough/crops/flange-mount-photo.png'
import flangeDraw from '@/assets/images/feedthrough/crops/flange-mount-drawing.png'
import heavyPhoto from '@/assets/images/feedthrough/crops/heavy-duty-photo.png'
import heavyDraw from '@/assets/images/feedthrough/crops/heavy-duty-drawing.png'
import hollowCartPhoto from '@/assets/images/feedthrough/crops/hollow-cartridge-photo.png'
import hollowCartDraw from '@/assets/images/feedthrough/crops/hollow-cartridge-drawing.png'
import hollowFlgPhoto from '@/assets/images/feedthrough/crops/hollow-flange-photo.png'
import hollowFlgDraw from '@/assets/images/feedthrough/crops/hollow-flange-drawing.png'
import hollowCanPhoto from '@/assets/images/feedthrough/crops/hollow-cantilever-photo.png'
import hollowCanDraw from '@/assets/images/feedthrough/crops/hollow-cantilever-drawing.png'
import twoCoaxPhoto from '@/assets/images/feedthrough/crops/two-coaxial-photo.png'
import twoCoaxDraw from '@/assets/images/feedthrough/crops/two-coaxial-drawing.png'
import threeAxisPhoto from '@/assets/images/feedthrough/crops/three-axis-photo.png'
import threeAxisDraw from '@/assets/images/feedthrough/crops/three-axis-drawing.png'
import uhvPhoto from '@/assets/images/feedthrough/crops/uhv-photo.png'
import uhvDraw from '@/assets/images/feedthrough/crops/uhv-drawing.png'
import threeCoaxPhoto from '@/assets/images/feedthrough/crops/three-coaxial-linear-photo.png'
import threeCoaxDraw from '@/assets/images/feedthrough/crops/three-coaxial-linear-drawing.png'
import purgePhoto from '@/assets/images/feedthrough/crops/purge-mode-photo.png'
import purgeDraw from '@/assets/images/feedthrough/crops/purge-mode-drawing.png'
import rotaryPhoto from '@/assets/images/feedthrough/crops/rotary-gas-union-photo.png'
import rotaryDraw from '@/assets/images/feedthrough/crops/rotary-gas-union-drawing.png'

export { heroMontage }

// --- types ---------------------------------------------------------------
/** A generic spec / dimension matrix.
 *  A row whose `cells` length is 1 while `columns` length > 1 is rendered as a
 *  single cell spanning every data column. */
export type SpecRow = { label: string; cells: string[] }
export type SpecTable = {
  caption: string
  head: string
  columns: string[]
  rows: SpecRow[]
}

export type Variant = {
  label?: string
  photo: string
  drawing?: string
  /** dimensional drawing table (mm) */
  dimensions?: SpecTable
  /** performance / model spec table */
  spec: SpecTable
  notes?: string[]
}

export type Product = {
  id: string
  title: string
  titleKr: string
  description: string
  tags?: string[]
  variants: Variant[]
}

export type Category = {
  id: string
  title: string
  titleKr: string
  intro: string
  products: Product[]
}

// --- shared spec-row helpers --------------------------------------------
const LEAK = { label: 'Leakage rate [He] (Pa·m³/sec)', cells: ['<10⁻¹²'] }
const LEAK_T = { label: '(Torr·ℓ/sec)', cells: ['<10⁻¹¹'] }
const TEMP = { label: 'Temperature range (°C)', cells: ['0 – 80'] }

// ==========================================================================
// 1. STANDARD ROTARY
// ==========================================================================

const miniature: Product = {
  id: 'miniature',
  title: 'Miniature Feedthrough',
  titleKr: '소형 회전 도입기',
  description:
    '제한된 공간에서 회전 운동을 전달하면서 진공 씰링 성능을 유지해야 하는 소형 장비용입니다. 연구용 장비, 소형 진공 챔버, 정밀 구동 모듈 등에 적용합니다.',
  tags: ['Ø4 – Ø6', 'Standard / Threaded'],
  variants: [
    {
      label: 'Standard Type (MML)',
      photo: miniStdPhoto,
      drawing: miniStdDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['004', '005', '006'],
        rows: [
          { label: 'A', cells: ['Ø4', 'Ø5', 'Ø6'] },
          { label: 'E', cells: ['0.5Dp. / 10Lg.', '0.5Dp. / 10Lg.', '0.5Dp. / 10Lg.'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MML004NN', 'MML005NN', 'MML006NN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['5.8', '6.4', '6.4'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['686', '686', '686'] },
          { label: 'Bearing material', cells: ['SUS440C'] },
          { label: 'Housing material', cells: ['SUS303'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
    },
    {
      label: 'Threaded Type (MSL)',
      photo: miniThrPhoto,
      drawing: miniThrDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['004', '005', '006'],
        rows: [
          { label: 'A', cells: ['Ø4', 'Ø5', 'Ø6'] },
          { label: 'B', cells: ['76.5', '76.5', '76.5'] },
          { label: 'E', cells: ['0.5Dp. / 10Lg.', '0.5Dp. / 10Lg.', '0.5Dp. / 10Lg.'] },
          { label: 'F', cells: ['15', '15', '15'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MSL004NN', 'MSL005NN', 'MSL006NN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['5.8', '6.4', '6.4'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['686', '686', '686'] },
          { label: 'Bearing material', cells: ['SUS440C'] },
          { label: 'Housing material', cells: ['SUS303'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Reactive-gas compatible feedthroughs are also available. (Specify application when requesting a quotation or placing an order.)',
      ],
    },
  ],
}

const throughHole: Product = {
  id: 'through-hole-mount',
  title: 'Through Hole Mount Feedthroughs',
  titleKr: '관통형 장착 도입기',
  description:
    '장비 벽면 또는 플레이트를 관통하여 설치하는 구조입니다. 진공 챔버와 외부 구동부를 연결하면서 회전축 주변의 진공 누설을 차단합니다.',
  tags: ['Ø6 – Ø20', 'Nut mount'],
  variants: [
    {
      label: 'Ø6 – Ø10',
      photo: thruAPhoto,
      drawing: thruADraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['006', '010'],
        rows: [
          { label: 'A', cells: ['Ø6', 'Ø10'] },
          { label: 'B', cells: ['97.5', '97.5'] },
          { label: 'C', cells: ['57.5', '57.5'] },
          { label: 'D', cells: ['M32 × 1.5', 'M38 × 1.5'] },
          { label: 'E', cells: ['0.5Dp. × 12Lg. (flat)', '3W × 1.8Dp. × 14Lg. (keyway)'] },
          { label: 'F', cells: ['20', '25'] },
          { label: 'J', cells: ['55', '60'] },
          { label: 'K', cells: ['10', '10'] },
          { label: 'P', cells: ['49', '55'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MML006NN', 'MNF006NN', 'MML010NN', 'MNF010NN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['9.7', '9.7', '62', '62'] },
          {
            label: 'Vacuum pressure Pa,(Torr)',
            cells: ['10⁻⁶, (10⁻⁸)', '10⁻⁵, (10⁻⁷)', '10⁻⁶, (10⁻⁸)', '10⁻⁵, (10⁻⁷)'],
          },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2.5', '2', '2.5', '2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert', 'Active', 'Inert', 'Active'] },
          { label: 'Bearing type', cells: ['627', '627', '6001', '6001'] },
          { label: 'Bearing material', cells: ['SUS440C'] },
          { label: 'Housing material', cells: ['SUS303', 'SUS304', 'SUS303', 'SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
    },
    {
      label: 'Ø12 – Ø20 (water cooling)',
      photo: thruBPhoto,
      drawing: thruBDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['012', '020'],
        rows: [
          { label: 'A', cells: ['Ø12', 'Ø20'] },
          { label: 'B', cells: ['179', '211'] },
          { label: 'C', cells: ['109', '121'] },
          { label: 'D', cells: ['M25 × 1.5', 'M30 × 1.5'] },
          { label: 'E (keyway)', cells: ['4W × 2.5Dp. × 20Lg.', '6W × 3.5Dp. × 25Lg.'] },
          { label: 'F', cells: ['40', '55'] },
          { label: 'J', cells: ['48', '63'] },
          { label: 'K', cells: ['74', '82'] },
          { label: 'L', cells: ['36.5', '40.5'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MTL012NN', 'MTF012NN', 'MTL020NN', 'MTF020NN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['124', '124', '615', '615'] },
          {
            label: 'Vacuum pressure Pa,(Torr)',
            cells: ['10⁻⁶, (10⁻⁸)', '10⁻⁵, (10⁻⁷)', '10⁻⁶, (10⁻⁸)', '10⁻⁵, (10⁻⁷)'],
          },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2.5', '2', '2.5', '2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert', 'Active', 'Inert', 'Active'] },
          { label: 'Bearing type', cells: ['6002', '6002', '6005', '6005'] },
          { label: 'Bearing material', cells: ['SUS440C'] },
          { label: 'Housing material', cells: ['SUS303', 'SUS304', 'SUS303', 'SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: ['Tapped bore type model number should change to MF0-000-WN.'],
    },
  ],
}

const flangeMount: Product = {
  id: 'flange-mount',
  title: 'Flange Mount Feedthroughs',
  titleKr: '플랜지 장착 도입기',
  description:
    '플랜지 체결 방식으로 장비에 고정하는 타입입니다. 설치 안정성이 높고 유지보수가 용이하여 산업용 진공 장비와 공정 장비에 폭넓게 적용됩니다.',
  tags: ['Ø6 – Ø20', 'Flange mount'],
  variants: [
    {
      photo: flangePhoto,
      drawing: flangeDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['006', '010', '012', '020'],
        rows: [
          { label: 'A', cells: ['Ø6', 'Ø10', 'Ø12', 'Ø20'] },
          { label: 'B', cells: ['97.5', '119.5', '133.5', '151.5'] },
          { label: 'C', cells: ['57.5', '69.5', '73.5', '81.5'] },
          { label: 'D', cells: ['38', '44', '48', '63'] },
          {
            label: 'E',
            cells: ['0.5Dp. × 12Lg.', '3W × 1.8Dp. × 14Lg.', '4W × 2.5Dp. × 20Lg.', '6W × 3.5Dp. × 25Lg.'],
          },
          { label: 'F', cells: ['20', '25', '30', '35'] },
          { label: 'J', cells: ['80', '80', '90', '105'] },
          { label: 'K', cells: ['10', '10', '10', '10'] },
          { label: 'L', cells: ['18', '24', '27', '31'] },
          { label: 'N', cells: ['PD60/4-□10', 'PD60/4-□10', 'PD70/4-□10', 'PD85/4-□10'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: [
          'MFL006NN',
          'MFL010NN',
          'MFL012NN',
          'MFL020NN',
          'MFF006NN',
          'MFF010NN',
          'MFF012NN',
          'MFF020NN',
        ],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['9.7', '62', '124', '615', '9.7', '62', '124', '615'] },
          {
            label: 'Vacuum pressure Pa,(Torr)',
            cells: [
              '10⁻⁶, (10⁻⁸)',
              '10⁻⁶, (10⁻⁸)',
              '10⁻⁶, (10⁻⁸)',
              '10⁻⁶, (10⁻⁸)',
              '10⁻⁵, (10⁻⁷)',
              '10⁻⁵, (10⁻⁷)',
              '10⁻⁵, (10⁻⁷)',
              '10⁻⁵, (10⁻⁷)',
            ],
          },
          LEAK,
          LEAK_T,
          {
            label: 'Pressure capacity [Static] (kg/cm²)',
            cells: ['2', '2', '2', '2', '2.5', '2.5', '2.5', '2.5'],
          },
          TEMP,
          {
            label: 'Gas compatibility',
            cells: ['Inert', 'Inert', 'Inert', 'Inert', 'Active', 'Active', 'Active', 'Active'],
          },
          {
            label: 'Bearing type',
            cells: ['627', '6001', '6002', '6005', '627', '6001', '6002', '6005'],
          },
          { label: 'Bearing material', cells: ['SUS440C'] },
          {
            label: 'Housing material',
            cells: ['SUS303', 'SUS303', 'SUS303', 'SUS303', 'SUS304', 'SUS304', 'SUS304', 'SUS304'],
          },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Conflat flange or any other defined configuration may be specified and is available as an option.',
        'Tapped bore for tube fitting is available for high-temperature or high-rotation-speed applications (model number changes to MF0-000-WN).',
        'Shaft length and terminations may be specified by the user.',
      ],
    },
  ],
}

const heavyDuty: Product = {
  id: 'heavy-duty',
  title: 'Heavy Duty Feedthroughs',
  titleKr: '헤비듀티 도입기',
  description:
    '대형 축경과 높은 토크가 요구되는 중공정 장비용입니다. VAC/ATM 각각 전용 베어링을 적용하여 고하중·고속 회전에서도 안정적인 씰링을 유지합니다.',
  tags: ['Ø20 – Ø50', 'High torque'],
  variants: [
    {
      photo: heavyPhoto,
      drawing: heavyDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['020', '025', '030', '040', '050'],
        rows: [
          { label: 'A', cells: ['Ø20', 'Ø25', 'Ø30', 'Ø40', 'Ø50'] },
          { label: 'B', cells: ['255', '288', '321', '357', '406'] },
          { label: 'C', cells: ['135', '138', '141', '157', '166'] },
          { label: 'D', cells: ['85', '95', '105', '125', '140'] },
          {
            label: 'E (keyway)',
            cells: [
              '6W × 3.5Dp. × 50Lg.',
              '7W × 4Dp. × 63Lg.',
              '10W × 5Dp. × 80Lg.',
              '12W × 5Dp. × 90Lg.',
              '14W × 5.5Dp. × 110Lg.',
            ],
          },
          { label: 'F', cells: ['60', '75', '90', '100', '120'] },
          { label: 'J', cells: ['145', '160', '160', '185', '210'] },
          { label: 'K', cells: ['18', '18', '20', '22', '24'] },
          { label: 'L', cells: ['48', '50', '50', '55.5', '59.5'] },
          { label: 'M', cells: ['29', '29', '29', '33', '33'] },
          {
            label: 'N',
            cells: ['PD120/6-□12', 'PD135/6-□12', 'PD135/6-□12', 'PD160/8-□12', 'PD185/8-□12'],
          },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MFL020WH', 'MFL025WH', 'MFL030WH', 'MFL040WH', 'MFL050WH'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['616', '1066', '1706', '3413', '6106'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁵, (10⁻⁷)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['3'] },
          TEMP,
          { label: 'Bearing type (VAC)', cells: ['7206CDF', '7207CDF', '7208CDF', '7210CDF', '7212CDF'] },
          { label: 'Bearing type (ATM)', cells: ['6205', '6206', '6207', '6009', '6211'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS303'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'A coaxial shaft cooling system is available for high-temperature or high-rotational-speed applications.',
      ],
    },
  ],
}

// ==========================================================================
// 2. HOLLOW SHAFT
// ==========================================================================

const hollowCartridge: Product = {
  id: 'hollow-cartridge',
  title: 'Hollow Shaft — Cartridge Type',
  titleKr: '중공축 · 카트리지 타입',
  description:
    '중앙 관통 구조를 통해 배선, 샤프트, 가스 라인을 함께 통과시킬 수 있는 중공축 도입기입니다. 카트리지 형태로 장비 하우징에 삽입 장착합니다.',
  tags: ['Ø10 – Ø75', 'Cartridge'],
  variants: [
    {
      photo: hollowCartPhoto,
      drawing: hollowCartDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['010', '020', '025', '030', '040', '050', '075'],
        rows: [
          { label: 'A', cells: ['Ø10', 'Ø20', 'Ø25', 'Ø30', 'Ø40', 'Ø50', 'Ø75'] },
          { label: 'B', cells: ['78', '82.5', '88', '93', '96', '98', '115'] },
          { label: 'C', cells: ['64', '68.5', '74', '79', '80', '82', '96'] },
          { label: 'D', cells: ['48', '58', '63', '73', '88', '98', '137'] },
          { label: 'E', cells: ['34', '44', '49', '54', '69', '79', '109'] },
          { label: 'F', cells: ['10', '10', '10', '10', '12', '12', '15'] },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MTL010CN', 'MTL020CN', 'MTL025CN', 'MTL030CN', 'MTL040CN', 'MTL050CN', 'MTL075CN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['—'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁵, (10⁻⁷)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['3'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['16003', '6906', '6907', '6908', '6910', '6912', '6918'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS303'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: ['G · recommended shaft diameter, H · recommended housing diameter (fine tolerances per drawing).'],
    },
  ],
}

const hollowFlange: Product = {
  id: 'hollow-flange',
  title: 'Hollow Shaft — Flange Mount Type',
  titleKr: '중공축 · 플랜지 장착 타입',
  description:
    '중공축 구조에 플랜지 장착을 결합한 타입입니다. 플랜지로 장비에 안정적으로 고정하면서 중앙 관통 구조를 활용할 수 있습니다.',
  tags: ['Ø10 – Ø75', 'Hollow · Flange'],
  variants: [
    {
      photo: hollowFlgPhoto,
      drawing: hollowFlgDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['010', '020', '025', '030', '040', '050', '075'],
        rows: [
          { label: 'A', cells: ['Ø10', 'Ø20', 'Ø25', 'Ø30', 'Ø40', 'Ø50', 'Ø75'] },
          { label: 'B', cells: ['78', '82.5', '88', '93', '96', '98', '115'] },
          { label: 'C', cells: ['64', '68.5', '74', '79', '80', '82', '96'] },
          { label: 'D', cells: ['51', '63', '71', '78', '90', '103', '143'] },
          { label: 'E', cells: ['34', '44', '49', '54', '69', '79', '109'] },
          { label: 'F', cells: ['10', '10', '10', '10', '12', '12', '15'] },
          { label: 'J', cells: ['90', '105', '120', '120', '145', '160', '210'] },
          { label: 'K', cells: ['10', '10', '10', '10', '10', '12', '12'] },
          { label: 'L', cells: ['20', '22.5', '26', '27', '27', '26.5', '33'] },
          {
            label: 'M',
            cells: ['PD70/4-□10', 'PD85/4-□10', 'PD100/4-□10', 'PD100/4-□10', 'PD120/4-□10', 'PD135/4-□10', 'PD185/4-□10'],
          },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MFL010CN', 'MFL020CN', 'MFL025CN', 'MFL030CN', 'MFL040CN', 'MFL050CN', 'MFL075CN'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['—'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['3'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['16003', '6906', '6907', '6908', '6910', '6912', '6918'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS303'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Conflat flange is available as an option.',
        'Tapped bore type model number should change to MFL-000-WN.',
      ],
    },
  ],
}

const hollowCantilever: Product = {
  id: 'hollow-cantilever',
  title: 'Hollow Shaft — Cantilevered Seal Type',
  titleKr: '중공축 · 캔틸레버 씰 타입',
  description:
    '한쪽 지지 구조 또는 특수 장착 조건에서 사용하는 중공축 도입기입니다. 반응성 가스 대응 씰 구조로 일반 플랜지형 적용이 어려운 장비에 선택합니다.',
  tags: ['Ø20 – Ø50', 'Reactive gas'],
  variants: [
    {
      photo: hollowCanPhoto,
      drawing: hollowCanDraw,
      dimensions: {
        caption: 'Dimensions (mm)',
        head: 'Shaft Diameter',
        columns: ['020', '025', '030', '040', '050'],
        rows: [
          { label: 'A', cells: ['Ø20', 'Ø25', 'Ø30', 'Ø40', 'Ø50'] },
          { label: 'B', cells: ['123.5', '126', '130.5', '141', '147.5'] },
          { label: 'C', cells: ['109.5', '112', '116.5', '125', '131.5'] },
          { label: 'D', cells: ['78', '90', '96', '106', '132'] },
          { label: 'E', cells: ['44', '49', '54', '67', '79'] },
          { label: 'F', cells: ['10', '10', '10', '12', '12'] },
          { label: 'J', cells: ['120', '145', '145', '160', '185'] },
          { label: 'K', cells: ['10', '10', '10', '12', '12'] },
          { label: 'L', cells: ['14.5', '13', '14', '12', '12.5'] },
          {
            label: 'N',
            cells: ['PD100/4-□10', 'PD120/4-□12', 'PD120/4-□12', 'PD135/4-□12', 'PD160/8-□12'],
          },
        ],
      },
      spec: {
        caption: 'Specifications',
        head: 'Model Number',
        columns: ['MFF020CC', 'MFF025CC', 'MFF030CC', 'MFC040CC', 'MFF050CC'],
        rows: [
          { label: 'Torque capacity (kg·cm)', cells: ['—'] },
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁵, (10⁻⁷)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2.5'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Reactive Gas'] },
          { label: 'Bearing type', cells: ['7206CDB', '7207CDB', '7208CDB', '7210CDB', '7212CDB'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304 (SUS316 : Option)'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Conflat flange is available as an option.',
        'Tapped bore type model number should change to MFL-000-MC.',
      ],
    },
  ],
}

// ==========================================================================
// 3. MULTI-AXIS & COAXIAL
// ==========================================================================

const twoCoaxial: Product = {
  id: 'two-coaxial',
  title: 'Two Coaxial Type',
  titleKr: '2축 동축 타입',
  description:
    '소형·경량이면서 높은 회전 정밀도와 작은 런아웃을 갖는 이중 동축 구조입니다. 대표 적용 분야는 진공 내 웨이퍼 이송 로봇(SCARA 타입)입니다.',
  tags: ['MFF012NN', 'SCARA robot'],
  variants: [
    {
      photo: twoCoaxPhoto,
      drawing: twoCoaxDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MFF012NN'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Reactive Gas'] },
          { label: 'Bearing type', cells: ['(out) ATM6007, VAC6908 / (in) 6901'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
    },
  ],
}

const threeAxis: Product = {
  id: 'three-axis',
  title: 'Three Axis Type',
  titleKr: '3축 타입',
  description:
    '높은 강성으로 회전 정밀도와 작은 런아웃을 제공하는 3축 구조입니다. 선택형 알루미늄 하우징으로 조립체 경량화가 가능하며, LCD 대형 유리기판 이송 로봇(Frog arm 타입)에 적용됩니다.',
  tags: ['MFL200NN', 'Frog-arm robot'],
  variants: [
    {
      photo: threeAxisPhoto,
      drawing: threeAxisDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MFL200NN'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['(out) 6840 / (in) 6906'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['A2024'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
    },
  ],
}

const threeCoaxialLinear: Product = {
  id: 'three-coaxial-linear',
  title: 'Three Coaxial and Linear Feedthroughs',
  titleKr: '3축 동축 + 선형 도입기',
  description:
    '높은 강성의 3축 동축 스핀들에 50mm 선형 스트로크를 결합한 복합 구동 도입기입니다. Cluster Tool용으로 300mm 웨이퍼, LCD 대형 기판 처리 및 진공 이송 로봇에 적용됩니다.',
  tags: ['MFF022NN', 'Cluster Tool'],
  variants: [
    {
      photo: threeCoaxPhoto,
      drawing: threeCoaxDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MFF022NN'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁸, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Reactive Gas'] },
          {
            label: 'Bearing type',
            cells: ['(L) VAC6814, ATM6816 / (M) VAC6808, ATM6909 / (S) 6804'],
          },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
          { label: 'Bellows stroke', cells: ['50 mm'] },
          { label: 'Bellows life', cells: ['OVER 10⁶'] },
        ],
      },
    },
  ],
}

// ==========================================================================
// 4. SPECIAL PURPOSE
// ==========================================================================

const uhv: Product = {
  id: 'uhv',
  title: 'Ultra High Vacuum Feedthroughs',
  titleKr: '초고진공(UHV) 도입기',
  description:
    '고진공·초고진공 환경에서 회전 운동을 전달하기 위한 제품입니다. 저증기압 UHV용 자성유체와 차동 배기 구조로 10⁻⁷ Pa(10⁻⁹ Torr)급 진공을 지원합니다.',
  tags: ['MSCV-012WC', '10⁻⁷ Pa'],
  variants: [
    {
      photo: uhvPhoto,
      drawing: uhvDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MSCV-012WC'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁷, (10⁻⁹)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2.5'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['7303CDB'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Ferrofluid for UHV operation, which has low vapor pressure at high temperature, is used.',
        'The main chamber is protected from bake-out gas by differential pumping.',
        'Baking condition is the same as for a TMP.',
        'The differential pumping line and main pumping line can be unified up to a 10⁻⁹ Torr vacuum level.',
        'The compact equipment can be provided with a simplified seal construction for UHV processing.',
      ],
    },
  ],
}

const purgeMode: Product = {
  id: 'purge-mode',
  title: 'Purge Mode Type',
  titleKr: '퍼지 모드 타입',
  description:
    '씰 유닛에 퍼지 가스 구조를 적용하여 공정가스·오염물의 씰 영역 유입과 증착 축적을 억제합니다. 반응성 가스, CVD, 퍼니스 등 증착이 발생하는 공정에 적합합니다.',
  tags: ['MSFV-020WC', 'CVD / Furnace'],
  variants: [
    {
      photo: purgePhoto,
      drawing: purgeDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MSFV-020WC'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['2.5'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Reactive Gas'] },
          { label: 'Bearing type', cells: ['7006CDB'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Longer life is realized by installing a purge-gas structure in the seal unit.',
        'This prevents process gas from flowing into the seal area and eliminates deposition near the seal.',
        'Intended for reactive-gas, CVD and furnace applications that generate depositing material.',
      ],
    },
  ],
}

const rotaryGasUnion: Product = {
  id: 'rotary-gas-union',
  title: 'Rotary Gas Union',
  titleKr: '로터리 가스 유니온',
  description:
    '회전축을 통해 고순도 가스를 공급하거나 배출하는 도입기입니다. 회전 운동을 유지하면서 가스 라인을 연결해야 하는 공정 장비에 적용합니다.',
  tags: ['MSFH-100NH', 'Gas supply'],
  variants: [
    {
      photo: rotaryPhoto,
      drawing: rotaryDraw,
      spec: {
        caption: 'Specifications',
        head: 'Model',
        columns: ['MSFH-100NH'],
        rows: [
          { label: 'Vacuum pressure Pa,(Torr)', cells: ['10⁻⁶, (10⁻⁸)'] },
          LEAK,
          LEAK_T,
          { label: 'Pressure capacity [Static] (kg/cm²)', cells: ['3.5'] },
          TEMP,
          { label: 'Gas compatibility', cells: ['Inert Gas'] },
          { label: 'Bearing type', cells: ['(left) 7015CDB / (right) 6211'] },
          { label: 'Bearing material', cells: ['SUJ2'] },
          { label: 'Housing material', cells: ['SUS304'] },
          { label: 'Shaft material', cells: ['SUS630'] },
        ],
      },
      notes: [
        'Highly purified gas can be supplied into a chamber through this feedthrough.',
        'A typical application is a rotary gas union for light-bulb manufacturing equipment.',
      ],
    },
  ],
}

// ==========================================================================
// Catalogue
// ==========================================================================

export const CATEGORIES: Category[] = [
  {
    id: 'standard-rotary',
    title: 'Standard Rotary Feedthroughs',
    titleKr: '표준 회전 도입기',
    intro:
      '축 직경과 장착 방식에 따라 선택하는 표준 회전 도입기입니다. 소형부터 헤비듀티까지 폭넓은 축경 범위를 지원합니다.',
    products: [miniature, throughHole, flangeMount, heavyDuty],
  },
  {
    id: 'hollow-shaft',
    title: 'Hollow Shaft Feedthroughs',
    titleKr: '중공축 도입기',
    intro:
      '중앙 관통 구조로 배선·가스 라인·샤프트를 함께 통과시킬 수 있는 중공축 도입기입니다. 장착 방식에 따라 세 가지 타입을 제공합니다.',
    products: [hollowCartridge, hollowFlange, hollowCantilever],
  },
  {
    id: 'multi-axis',
    title: 'Multi-Axis & Coaxial',
    titleKr: '다축 · 동축 도입기',
    intro:
      '하나의 도입기에서 여러 축의 회전 또는 회전+선형 운동을 전달하는 복합 구동 제품군입니다. 반도체·디스플레이 이송 로봇에 적용됩니다.',
    products: [twoCoaxial, threeAxis, threeCoaxialLinear],
  },
  {
    id: 'special-purpose',
    title: 'Special Purpose',
    titleKr: '특수 목적 도입기',
    intro:
      '초고진공, 반응성 가스, 가스 공급 등 특수 공정 조건에 대응하도록 설계된 도입기입니다.',
    products: [uhv, purgeMode, rotaryGasUnion],
  },
]
