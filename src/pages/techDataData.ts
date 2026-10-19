import type { Language } from '@/i18n'

/**
 * /tech-data — 기술정보 PDF 안에 있던 시험값을 HTML 표로 옮긴 화면.
 *
 * 왜: AI 검색은 PDF 안의 표를 거의 읽지 않는다(열어도 표가 깨진다). 10/17 진단에서
 * 기술정보 화면이 "수치 3개"로 잡힌 것도 그래서다. 같은 숫자를 본문 표로 꺼낸다.
 *
 * 출처(모두 기술정보에 이미 공개된 PDF, 2026-10-19 추출):
 * - Product Brochure(2026-05-11): KOPTRI 시험성적서 No. 25-09458 증기압 4개 온도, 헬륨 누설
 * - MFF-M Overview / Active Gas TGA Data: KITECH TGA(10℃/min) 중량손실, 등온 시험, 사양
 * - Inert Gas TGA Data(Ref 240321-01): MFS·MFH TGA
 * - Vapor Pressure Note: 공정별 운전 진공도, Langmuir 식, ASTM E595 기준
 *
 * 규칙: 타사는 사이트 공개 방침대로 익명(일본 S사·일본 M사·영국 L사)으로 적고,
 * "타사=베이스오일 / 당사=완제품" 측정 조건 차이를 반드시 같이 적는다.
 * Active Gas TGA Data PDF 2쪽 사양표의 증기압 "<1.5E-11 Pa"는 같은 PDF 의 Torr 값·KOPTRI 성적서와
 * 맞지 않는 오기라 옮기지 않았다(성적서 값 1.51×10⁻¹⁰ Pa 사용).
 */

type Localized = Record<Language, string>
const L = (ko: string, en: string, zh: string): Localized => ({ ko, en, zh })

export type DataTable = {
  id: string
  title: Localized
  note?: Localized
  head: (string | Localized)[]
  rows: (string | Localized)[][]
}

const S_CO = L('일본 S사 F-310', 'S-company (Japan) F-310', '日本 S 公司 F-310')
const M_CO = L('일본 M사 MFF-03', 'M-company (Japan) MFF-03', '日本 M 公司 MFF-03')
const L_CO = L('영국 L사 F-9', 'L-company (UK) F-9', '英国 L 公司 F-9')
const FINISHED = L('완제품', 'Finished ferrofluid', '成品')
const BASE_OIL = L('베이스오일만', 'Base oil only', '仅基础油')
const NO_DATA = L('자료 없음', 'No data', '无数据')

export const TECH_DATA_TABLES: DataTable[] = [
  {
    id: 'vapor-pressure',
    title: L(
      'MFF-M4251 온도별 증기압 (KOPTRI 시험성적서 No. 25-09458, OECD TG 104 유출법)',
      'MFF-M4251 vapor pressure by temperature (KOPTRI Test Report No. 25-09458, OECD TG 104 effusion method)',
      'MFF-M4251 各温度蒸气压（KOPTRI 试验报告 No. 25-09458，OECD TG 104 逸出法）',
    ),
    note: L('측정 대상: 완제품 자성유체', 'Measured on the finished ferrofluid', '测定对象：磁流体成品'),
    head: [L('온도', 'Temperature', '温度'), L('증기압 (Pa)', 'Vapor pressure (Pa)', '蒸气压（Pa）'), L('증기압 (Torr)', 'Vapor pressure (Torr)', '蒸气压（Torr）')],
    rows: [
      ['20℃', '1.51 × 10⁻¹⁰ Pa', '1.13 × 10⁻¹² Torr'],
      ['25℃', '4.20 × 10⁻¹⁰ Pa', '—'],
      ['100℃', '7.57 × 10⁻⁵ Pa', '5.68 × 10⁻⁷ Torr'],
      ['200℃', '1.97 Pa', '1.48 × 10⁻² Torr'],
    ],
  },
  {
    id: 'vapor-pressure-compare',
    title: L('PFPE 자성유체 증기압 비교', 'PFPE ferrofluid vapor pressure comparison', 'PFPE 磁流体蒸气压比较'),
    note: L(
      '타사 수치는 각 사 공개 자료 기준이며, 일본 M사·영국 L사는 베이스오일만 측정한 값입니다. 당사는 완제품 측정값이라 측정 조건이 같지 않습니다.',
      'Competitor figures come from each company’s published data; M-company and L-company measured base oil only, while MAGRON measured the finished ferrofluid, so the conditions are not identical.',
      '他社数值来自各公司公开资料，日本 M 公司与英国 L 公司仅测定基础油；本公司为成品测定值，测定条件并不一致。',
    ),
    head: [L('제품', 'Product', '产品'), L('측정 대상', 'Measured on', '测定对象'), '20℃', '100℃'],
    rows: [
      [L('MAGRON MFF-M4251', 'MAGRON MFF-M4251', 'MAGRON MFF-M4251'), FINISHED, '1.51 × 10⁻¹⁰ Pa', '7.57 × 10⁻⁵ Pa'],
      [S_CO, '—', '7 × 10⁻⁸ Pa', NO_DATA],
      [M_CO, BASE_OIL, '2 × 10⁻⁹ Pa', '5 × 10⁻³ Pa'],
      [L_CO, BASE_OIL, '7 × 10⁻⁸ Torr', '1 × 10⁻³ Torr'],
    ],
  },
  {
    id: 'tga-active',
    title: L(
      '활성 가스용 PFPE 자성유체 중량손실 온도 (KITECH TGA, 10℃/min 승온)',
      'Active-gas PFPE ferrofluid weight-loss temperatures (KITECH TGA, 10℃/min ramp)',
      '活性气体用 PFPE 磁流体失重温度（KITECH TGA，每分钟升温 10℃）',
    ),
    note: L(
      '같은 TGA 조건에서 측정했으며, 타사 수치는 베이스오일 기준입니다.',
      'Measured under the same TGA conditions; competitor figures are on base oil.',
      '在相同 TGA 条件下测定，他社数值为基础油。',
    ),
    head: [L('제품', 'Product', '产品'), L('자화 / 점도 (27℃)', 'Magnetization / viscosity (27℃)', '磁化强度 / 粘度（27℃）'), L('1% 손실', '1% loss', '1% 失重'), L('2% 손실', '2% loss', '2% 失重'), L('5% 손실', '5% loss', '5% 失重'), L('300℃ 중량손실', 'Weight loss at 300℃', '300℃ 失重')],
    rows: [
      ['MAGRON MFF-M4251', '420 G / 5,100 cP', '282℃', '310℃', '324℃', '−1.450 %'],
      ['MAGRON MFF-M5070', '500 G / 7,000 cP', '280℃', '305℃', '323℃', '−1.560 %'],
      [L_CO, '450 G / 5,000 cP', '176℃', '201℃', '233℃', '−21.856 %'],
      [M_CO, '550 G / 6,200 cP', '185℃', '210℃', '237℃', '−34.648 %'],
      [S_CO, '400 G / 3,500 cP', '158℃', '194℃', '241℃', '−21.148 %'],
    ],
  },
  {
    id: 'tga-curve',
    title: L(
      '온도별 중량손실 (KITECH TGA, 10℃/min)',
      'Weight loss by temperature (KITECH TGA, 10℃/min)',
      '各温度失重（KITECH TGA，每分钟升温 10℃）',
    ),
    head: [L('제품', 'Product', '产品'), '50℃', '100℃', '150℃', '200℃', '250℃', '300℃'],
    rows: [
      ['MFF-M4251', '−0.010 %', '−0.090 %', '−0.240 %', '−0.400 %', '−0.660 %', '−1.450 %'],
      ['MFF-M5070', '−0.020 %', '−0.400 %', '−0.360 %', '−0.650 %', '−0.880 %', '−1.560 %'],
    ],
  },
  {
    id: 'isothermal',
    title: L(
      '등온 시험 잔존 중량 (KITECH TGA, 100℃ 1시간 → 150℃ 1시간)',
      'Isothermal test, remaining weight (KITECH TGA, 100℃ for 1 h → 150℃ for 1 h)',
      '等温试验剩余重量（KITECH TGA，100℃ 1 小时 → 150℃ 1 小时）',
    ),
    head: [L('제품', 'Product', '产品'), L('100℃ × 1시간 후', 'After 100℃ × 1 h', '100℃ × 1 小时后'), L('150℃ × 1시간 후', 'After 150℃ × 1 h', '150℃ × 1 小时后')],
    rows: [
      ['MAGRON MFF-M4251', '99.84 %', '99.74 %'],
      [L_CO, '—', '96.53 %'],
    ],
  },
  {
    id: 'tga-inert',
    title: L(
      '비활성 가스용 자성유체 중량손실 온도 (KITECH TGA, 10℃/min, Ref. 240321-01)',
      'Inert-gas ferrofluid weight-loss temperatures (KITECH TGA, 10℃/min, Ref. 240321-01)',
      '惰性气体用磁流体失重温度（KITECH TGA，每分钟升温 10℃，Ref. 240321-01）',
    ),
    head: [L('제품', 'Product', '产品'), L('베이스 오일', 'Carrier fluid', '载液'), L('자화 / 점도 (27℃)', 'Magnetization / viscosity (27℃)', '磁化强度 / 粘度（27℃）'), L('1% 손실', '1% loss', '1% 失重'), L('2% 손실', '2% loss', '2% 失重'), L('5% 손실', '5% loss', '5% 失重')],
    rows: [
      ['MAGRON MFS-4005', L('실리콘', 'Silicone', '硅系'), '400 G / 500 cP', '196℃', '220℃', '251℃'],
      ['MAGRON MFS-6022', L('실리콘', 'Silicone', '硅系'), '600 G / 2,200 cP', '199℃', '214℃', '236℃'],
      ['MAGRON MFH-5002', L('하이드로카본', 'Hydrocarbon', '碳氢'), '500 G / 210 cP', '168℃', '192℃', '222℃'],
      [L('일본 M사 MFA-06', 'M-company (Japan) MFA-06', '日本 M 公司 MFA-06'), L('알킬나프탈렌', 'Alkyl naphthalene', '烷基萘'), '580 G / 300 cP', '148℃', '192℃', '232℃'],
      [L('영국 L사 H9LT', 'L-company (UK) H9LT', '英国 L 公司 H9LT'), L('하이드로카본', 'Hydrocarbon', '碳氢'), '400 G / 300 cP', '184℃', '216℃', '248℃'],
    ],
  },
  {
    id: 'spec',
    title: L('MFF-M 시리즈 사양', 'MFF-M series specification', 'MFF-M 系列规格'),
    head: [L('항목', 'Item', '项目'), 'MFF-M4251', 'MFF-M5070'],
    rows: [
      [L('베이스 오일', 'Carrier fluid', '载液'), 'PFPE', 'PFPE'],
      [L('포화 자화', 'Saturation magnetization', '饱和磁化强度'), '420 G', '500 G'],
      [L('점도 (27℃)', 'Viscosity (27℃)', '粘度（27℃）'), '5,100 cP', '7,000 cP'],
      [L('밀도', 'Density', '密度'), '2.198 g/cm³', '2.240 g/cm³'],
      [L('유동점', 'Pour point', '倾点'), '< −40℃', '< −40℃'],
      [L('1wt% 중량손실 온도', '1 wt% weight-loss temperature', '1wt% 失重温度'), '> 280℃', '> 280℃'],
      [L('헬륨 누설율 (KITECH)', 'Helium leak rate (KITECH)', '氦气泄漏率（KITECH）'), '< 1 × 10⁻¹¹ Torr·ℓ/s', '< 1 × 10⁻¹¹ Torr·ℓ/s'],
      [L('가스·분진 밀봉 시험', 'Gas and dust sealing test', '气体·粉尘密封试验'), L('통과', 'Pass', '通过'), L('통과', 'Pass', '通过')],
    ],
  },
  {
    id: 'process-vacuum',
    title: L('공정별 운전 진공도와 증기압 관리 중요도', 'Typical operating vacuum by process', '各工艺典型运行真空度'),
    note: L('일반적인 공정 범위이며 장비·레시피에 따라 달라집니다.', 'Typical ranges; they vary with equipment and recipe.', '为一般工艺范围，随设备与工艺配方而异。'),
    head: [L('공정', 'Process', '工艺'), L('운전 진공도', 'Operating vacuum', '运行真空度'), L('증기압 관리 중요도', 'Importance of vapor-pressure control', '蒸气压控制重要性')],
    rows: [
      [L('스퍼터링', 'Sputtering', '溅射'), '10⁻⁴ – 10⁻⁶ Pa', L('높음', 'High', '高')],
      ['CVD', '10⁻³ – 10⁻⁶ Pa', L('높음', 'High', '高')],
      [L('식각', 'Etching', '刻蚀'), '10⁻³ – 10⁻⁵ Pa', L('중간', 'Medium', '中')],
      [L('이온 주입', 'Ion implantation', '离子注入'), '≤ 10⁻⁶ Pa', L('매우 높음', 'Very high', '非常高')],
      [L('OLED 증착', 'OLED deposition', 'OLED 蒸镀'), '10⁻⁵ – 10⁻⁷ Pa', L('매우 높음', 'Very high', '非常高')],
    ],
  },
]

export const TECH_DATA_TEXT: Record<
  Language,
  { eyebrow: string; title: string; lead: string; methodTitle: string; method: string[]; pdfTitle: string; pdfNote: string; back: string }
> = {
  ko: {
    eyebrow: 'Technical data',
    title: '자성유체 기술 데이터: 증기압·TGA·누설 시험값',
    lead: '기술정보 PDF에 흩어져 있던 시험값을 한 화면에 표로 정리했습니다. 시험기관, 시험법, 측정 대상을 값마다 함께 적었습니다.',
    methodTitle: '측정·환산 방법',
    method: [
      '증기압: 진공 TGA로 등온 조건의 증발 속도를 구한 뒤 Langmuir(Hertz–Knudsen) 식 P = (dm/dt)·(1/α)·(2πRT/M)^½ 로 환산하고, ln P = A − B/T(Arrhenius) 직선화로 사용 온도의 값을 외삽합니다.',
      '내열성: TGA로 분당 10℃씩 승온하며 무게가 1%·2%·5% 줄어드는 온도를 측정합니다. 실제 사용 온도는 회전 속도, 축 지름, 운전 시간에 따라 달라집니다.',
      '참고 기준: 미국 우주·반도체 분야의 아웃가싱 기준 ASTM E595는 125℃·24시간에서 TML 1.0% 이하, CVCM 0.10% 이하를 요구합니다.',
    ],
    pdfTitle: '원본 자료 (PDF)',
    pdfNote: '시험성적서와 TGA 원자료 그래프는 기술정보 화면에서 PDF로 열람·다운로드할 수 있습니다.',
    back: '기술정보로 돌아가기',
  },
  en: {
    eyebrow: 'Technical data',
    title: 'Ferrofluid Technical Data: Vapor Pressure, TGA and Leak Test Results',
    lead: 'Test results previously spread across the PDFs on the Technical Information page, gathered into tables on one page — each with its laboratory, method and what was measured.',
    methodTitle: 'Measurement and conversion method',
    method: [
      'Vapor pressure: the isothermal evaporation rate is measured by vacuum TGA and converted with the Langmuir (Hertz–Knudsen) equation P = (dm/dt)·(1/α)·(2πRT/M)^½; values at the use temperature are extrapolated by linearising ln P = A − B/T (Arrhenius).',
      'Heat resistance: TGA at a 10℃/min ramp records the temperatures at which 1%, 2% and 5% of the weight is lost. Actual operating temperature depends on rotational speed, shaft diameter and running time.',
      'Reference benchmark: ASTM E595, the outgassing standard used in aerospace and semiconductors, requires TML ≤ 1.0% and CVCM ≤ 0.10% at 125℃ for 24 h.',
    ],
    pdfTitle: 'Source documents (PDF)',
    pdfNote: 'Test reports and raw TGA charts can be viewed and downloaded as PDFs on the Technical Information page.',
    back: 'Back to Technical Information',
  },
  zh: {
    eyebrow: 'Technical data',
    title: '磁流体技术数据：蒸气压·TGA·泄漏试验值',
    lead: '将原本分散在技术信息 PDF 中的试验值整理成表格集中呈现，并逐项注明检测机构、试验方法与测定对象。',
    methodTitle: '测定与换算方法',
    method: [
      '蒸气压：以真空 TGA 测得等温条件下的蒸发速率，按 Langmuir（Hertz–Knudsen）方程 P = (dm/dt)·(1/α)·(2πRT/M)^½ 换算，并通过 ln P = A − B/T（Arrhenius）线性化外推使用温度下的数值。',
      '耐热性：以 TGA 每分钟升温 10℃，测定重量减少 1%、2%、5% 时的温度。实际使用温度随转速、轴径与运行时间而变化。',
      '参考标准：航天与半导体领域的放气标准 ASTM E595 要求在 125℃、24 小时条件下 TML ≤ 1.0%、CVCM ≤ 0.10%。',
    ],
    pdfTitle: '原始资料（PDF）',
    pdfNote: '试验报告与 TGA 原始曲线可在技术信息页面以 PDF 阅览与下载。',
    back: '返回技术信息',
  },
}
