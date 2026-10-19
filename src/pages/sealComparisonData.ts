import type { Language } from '@/i18n'

/**
 * /seal-comparison — 자성유체 씰 vs 오일씰(립씰) vs 기계식 씰.
 *
 * 10/17 GEO 진단에서 "비교" 유형 질문 9개 중 마그론 인용 0건이었다. 그 자리를 특허·논문이
 * 쥐고 있어서, 사람과 AI가 같이 읽을 수 있는 비교표를 HTML 로 둔다.
 *
 * 원칙
 * - 자성유체 쪽 숫자는 이미 공개된 당사 실측·카탈로그 값만 쓴다(keyFigures.ts 와 같은 값).
 * - 다른 씰 방식은 수치 대신 구조적 특성으로만 적는다. 근거 없는 경쟁 수치는 넣지 않는다.
 * - 자성유체 씰이 맞지 않는 경우(액체 밀봉, 단일 단 고압)도 같이 적는다 — 한쪽 말만 하면 인용되지 않는다.
 */

type Localized = Record<Language, string>

export type ComparisonRow = {
  criterion: Localized
  ferrofluid: Localized
  lip: Localized
  mechanical: Localized
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: { ko: '밀봉 원리', en: 'How it seals', zh: '密封原理' },
    ferrofluid: {
      ko: '자석이 축 둘레 틈새에 자성유체 액체 링을 붙잡아 둠',
      en: 'Magnets hold a liquid ring of ferrofluid in the gap around the shaft',
      zh: '磁铁将磁流体液环固定在轴周围的间隙中',
    },
    lip: {
      ko: '고무 립이 스프링 힘으로 축 표면을 누름',
      en: 'A rubber lip is spring-loaded against the shaft surface',
      zh: '橡胶唇口在弹簧力作用下压紧轴表面',
    },
    mechanical: {
      ko: '회전면과 고정면 두 면이 맞닿아 미끄러짐, 윤활막으로 밀봉',
      en: 'A rotating face slides on a stationary face, sealed by a lubricant film',
      zh: '旋转端面与静止端面相互滑动，依靠润滑膜密封',
    },
  },
  {
    criterion: { ko: '축과의 고체 접촉', en: 'Solid contact with the shaft', zh: '与轴的固体接触' },
    ferrofluid: { ko: '없음', en: 'None', zh: '无' },
    lip: { ko: '있음', en: 'Yes', zh: '有' },
    mechanical: { ko: '있음(밀봉 면끼리)', en: 'Yes (between seal faces)', zh: '有（密封端面之间）' },
  },
  {
    criterion: { ko: '마모 파티클', en: 'Wear particles', zh: '磨损颗粒' },
    ferrofluid: { ko: '거의 없음', en: 'Almost none', zh: '几乎没有' },
    lip: { ko: '립 마모로 발생', en: 'Generated as the lip wears', zh: '唇口磨损时产生' },
    mechanical: { ko: '밀봉 면 마모로 발생', en: 'Generated as the faces wear', zh: '端面磨损时产生' },
  },
  {
    criterion: { ko: '진공 기밀', en: 'Vacuum tightness', zh: '真空密封性' },
    ferrofluid: {
      ko: '헬륨 누설율 10⁻¹² Pa·m³/s 미만, 도달 진공도 10⁻⁶ Pa (당사 피드스루)',
      en: 'Helium leak < 10⁻¹² Pa·m³/s, attainable vacuum 10⁻⁶ Pa (MAGRON feedthrough)',
      zh: '氦气泄漏率 < 10⁻¹² Pa·m³/s，可达真空度 10⁻⁶ Pa（本公司馈通）',
    },
    lip: {
      ko: '고진공용으로 설계되지 않음',
      en: 'Not designed for high vacuum',
      zh: '并非为高真空设计',
    },
    mechanical: {
      ko: '주로 액체용, 진공에는 별도 설계 필요',
      en: 'Mainly for liquids; vacuum needs a special design',
      zh: '主要用于液体，用于真空需专门设计',
    },
  },
  {
    criterion: { ko: '마찰 토크', en: 'Friction torque', zh: '摩擦扭矩' },
    ferrofluid: {
      ko: '낮음(유체의 점성 저항만)',
      en: 'Low (viscous drag of the fluid only)',
      zh: '低（仅有流体粘性阻力）',
    },
    lip: { ko: '중간, 마모·조임에 따라 변함', en: 'Moderate; varies with wear and preload', zh: '中等，随磨损与预紧变化' },
    mechanical: { ko: '중간~높음', en: 'Moderate to high', zh: '中至高' },
  },
  {
    criterion: { ko: '수명·정비', en: 'Life and maintenance', zh: '寿命与维护' },
    ferrofluid: {
      ko: '밀봉부에 마모 부품이 없어 수명이 김',
      en: 'Long — no wearing parts at the seal',
      zh: '密封部位无磨损件，寿命长',
    },
    lip: { ko: '립 주기 교체', en: 'Lip replaced periodically', zh: '唇口需定期更换' },
    mechanical: { ko: '밀봉 면 주기 교체', en: 'Faces replaced periodically', zh: '端面需定期更换' },
  },
  {
    criterion: { ko: '액체 밀봉', en: 'Sealing liquids', zh: '密封液体' },
    ferrofluid: {
      ko: '맞지 않음(씰 면이 액체에 잠기면 안 됨)',
      en: 'Not suitable (seal must not be immersed in liquid)',
      zh: '不适用（密封面不可浸没于液体）',
    },
    lip: { ko: '적합(오일·그리스)', en: 'Suitable (oil, grease)', zh: '适用（油、脂）' },
    mechanical: { ko: '적합(주 용도)', en: 'Suitable (main use)', zh: '适用（主要用途）' },
  },
  {
    criterion: { ko: '압력차', en: 'Pressure difference', zh: '压差' },
    ferrofluid: {
      ko: '여러 단을 겹쳐 나눠 받음, 단수로 내압이 정해짐',
      en: 'Shared across stacked stages; stage count sets the rating',
      zh: '由多级叠加分担，级数决定耐压',
    },
    lip: { ko: '낮음', en: 'Low', zh: '低' },
    mechanical: { ko: '높음', en: 'High', zh: '高' },
  },
  {
    criterion: { ko: '사용 온도', en: 'Operating temperature', zh: '使用温度' },
    ferrofluid: {
      ko: '0~150℃ (당사 피드스루), 유체 종류에 따라 다름',
      en: '0–150℃ (MAGRON feedthrough); depends on the fluid',
      zh: '0~150℃（本公司馈通），随流体种类而异',
    },
    lip: { ko: '고무 재질에 따라 다름', en: 'Depends on the elastomer', zh: '取决于橡胶材质' },
    mechanical: { ko: '면 재질·윤활에 따라 다름', en: 'Depends on face material and lubrication', zh: '取决于端面材质与润滑' },
  },
  {
    criterion: { ko: '대표 용도', en: 'Typical use', zh: '典型用途' },
    ferrofluid: {
      ko: '반도체·디스플레이 진공 장비, 증착·스퍼터링, 진공 이송 로봇',
      en: 'Semiconductor and display vacuum tools, deposition and sputtering, in-vacuum robots',
      zh: '半导体与显示真空设备、镀膜与溅射、真空传送机器人',
    },
    lip: { ko: '기어박스·모터의 오일 밀봉', en: 'Oil sealing on gearboxes and motors', zh: '齿轮箱与电机的油封' },
    mechanical: { ko: '펌프·교반기의 액체 밀봉', en: 'Liquid sealing on pumps and mixers', zh: '泵与搅拌器的液体密封' },
  },
]

export { SOURCE_LINKS } from '@/seo/sources'

export const COMPARISON_TEXT: Record<
  Language,
  {
    eyebrow: string
    title: string
    lead: string
    tableHeading: string
    criterion: string
    ferrofluid: string
    lip: string
    mechanical: string
    note: string
    sourcesHeading: string
    related: string
    relatedFerrofluid: string
    relatedFeedthrough: string
  }
> = {
  ko: {
    eyebrow: 'Seal comparison',
    title: '자성유체 씰 vs 오일씰 vs 기계식 씰',
    lead: '진공·청정 장비의 회전축에 어떤 씰이 맞는지, 밀봉 원리부터 진공 기밀·마찰·수명·한계까지 한 표로 비교했습니다.',
    tableHeading: '회전축 씰 방식 비교',
    criterion: '항목',
    ferrofluid: '자성유체 씰',
    lip: '오일씰(립씰)',
    mechanical: '기계식 씰',
    note: '자성유체 씰의 수치는 (주)마그론 자성유체 진공 피드스루의 카탈로그 사양입니다. 다른 방식은 제품마다 사양이 달라 일반적인 구조 특성만 적었습니다.',
    sourcesHeading: '시험법·시험기관',
    related: '관련 제품',
    relatedFerrofluid: '자성유체 (MFF·MFF-M·MFS·MFH)',
    relatedFeedthrough: '자성유체 진공 피드스루',
  },
  en: {
    eyebrow: 'Seal comparison',
    title: 'Ferrofluid Seal vs Lip Seal vs Mechanical Seal',
    lead: 'Which seal suits a rotating shaft in vacuum and clean equipment — compared in one table, from sealing principle to vacuum tightness, friction, life and limits.',
    tableHeading: 'Rotary shaft seal comparison',
    criterion: 'Criterion',
    ferrofluid: 'Ferrofluid seal',
    lip: 'Lip (oil) seal',
    mechanical: 'Mechanical seal',
    note: 'Ferrofluid-seal figures are catalogue specifications of MAGRON ferrofluid vacuum feedthroughs. Other seal types vary by product, so only their general structural characteristics are listed.',
    sourcesHeading: 'Test methods and laboratories',
    related: 'Related products',
    relatedFerrofluid: 'Ferrofluid (MFF, MFF-M, MFS, MFH)',
    relatedFeedthrough: 'Ferrofluid vacuum feedthrough',
  },
  zh: {
    eyebrow: 'Seal comparison',
    title: '磁流体密封 vs 油封 vs 机械密封',
    lead: '真空与洁净设备的旋转轴适合哪种密封？从密封原理到真空密封性、摩擦、寿命与局限，一张表格对比。',
    tableHeading: '旋转轴密封方式比较',
    criterion: '项目',
    ferrofluid: '磁流体密封',
    lip: '油封（唇形密封）',
    mechanical: '机械密封',
    note: '磁流体密封的数值为 MAGRON 磁流体真空馈通的产品目录规格。其他方式因产品而异，仅列出一般结构特性。',
    sourcesHeading: '测试方法与检测机构',
    related: '相关产品',
    relatedFerrofluid: '磁流体（MFF·MFF-M·MFS·MFH）',
    relatedFeedthrough: '磁流体真空馈通',
  },
}
