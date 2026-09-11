import type { Language } from '@/i18n'

/**
 * 화면 맨 위에 보이는 "직답 블록"과 그 아래 FAQ.
 *
 * 왜 따로 두나: AI 검색(ChatGPT·Perplexity·구글 AI 모드·네이버 AI 브리핑)은
 * 페이지가 아니라 **문단 단위**로 꺼내 쓴다. 소개 문구가 길게 흐르면 꺼내 쓸
 * 덩어리가 없어서, 순위와 무관하게 인용에서 빠진다. 질문 한 줄 + 그 답 한 문단이
 * 붙어 있는 구조가 그대로 인용 후보가 된다.
 *
 * 왜 i18n 네임스페이스가 아니라 여기인가: 같은 문장을 화면(AnswerBlock)과
 * 구조화 데이터(FAQPage 스키마)가 **함께** 써야 한다. 둘이 어긋나면 검색엔진이
 * "화면에 없는 FAQ"로 보고 무시하므로, routeMeta.ts 와 같은 방식으로 한 곳에 둔다.
 *
 * 길이 기준: 답 한 개는 한국어 100~150자(영문 40~60단어) 안쪽. 이보다 길면
 * 통째로 인용되지 않고 잘린다.
 *
 * 새 화면을 추가할 때는 routeMeta.ts 의 ROUTE_META 와 같은 키(언어 접두어 없는
 * 경로)를 쓴다.
 */

type Localized = Record<Language, string>

export type QA = {
  question: Localized
  answer: Localized
}

export type PageAnswers = {
  /** 화면 상단에 보이는 질문형 소제목 + 직답 한 문단 */
  summary: QA
  /** 직답 아래에 펼쳐 두는 질문들. FAQPage 스키마로도 같이 나간다 */
  faqs: QA[]
}

export const PAGE_ANSWERS: Record<string, PageAnswers> = {
  '/ferrofluid': {
    summary: {
      question: {
        ko: '자성유체 씰은 어떤 문제를 해결하나요?',
        en: 'What problem does a ferrofluid seal solve?',
        zh: '磁流体密封解决什么问题？',
      },
      answer: {
        ko: '자성유체 씰은 회전축 둘레에 자기장으로 붙잡힌 액체 O-ring을 만들어, 축이 도는 동안에도 유해가스 누출과 분진 유입, 진공도 저하를 막습니다. (주)마그론은 부식성 가스용 MFF·MFF-M(PFPE 계열)과 비부식성 가스용 MFS(실리콘)·MFH(하이드로카본) 시리즈를 공급합니다.',
        en: 'A ferrofluid seal forms a liquid O-ring held in place by a magnetic field around a rotating shaft, blocking corrosive-gas leakage, dust ingress, and vacuum loss while the shaft keeps turning. MAGRON supplies the MFF/MFF-M series (PFPE) for corrosive gases and the MFS (silicone) and MFH (hydrocarbon) series for non-corrosive gases.',
        zh: '磁流体密封在旋转轴周围形成由磁场固定的液态 O 型圈，即使轴持续旋转也能阻隔有害气体泄漏、粉尘侵入与真空度下降。MAGRON 提供腐蚀性气体用 MFF·MFF-M（PFPE 系列）与非腐蚀性气体用 MFS（硅系）·MFH（碳氢系）系列。',
      },
    },
    faqs: [
      {
        question: {
          ko: '부식성 가스 환경에는 어떤 제품을 쓰나요?',
          en: 'Which product is used in corrosive-gas environments?',
          zh: '腐蚀性气体环境应选用哪种产品？',
        },
        answer: {
          ko: 'MFF·MFF-M 시리즈입니다. Carrier Fluid로 Perfluoro-Polyether(PFPE)를 사용해 화학적 안정성과 낮은 증기압을 확보하며, 반도체·디스플레이 공정의 활성 가스 라인에서 회전축 누설과 부식을 억제합니다.',
          en: 'The MFF/MFF-M series. A Perfluoro-Polyether (PFPE) carrier fluid gives it chemical stability and low vapor pressure, suppressing rotary-shaft leakage and corrosion on the active-gas lines of semiconductor and display processes.',
          zh: '为 MFF·MFF-M 系列。采用全氟聚醚（PFPE）作为载液，具备化学稳定性与低蒸气压，可抑制半导体·显示工艺活性气体管线上的旋转轴泄漏与腐蚀。',
        },
      },
      {
        question: {
          ko: '기계식 씰과 비교하면 무엇이 다른가요?',
          en: 'How does it differ from a mechanical seal?',
          zh: '与机械密封相比有何不同？',
        },
        answer: {
          ko: '자성유체 씰은 접촉 마찰이 없어 마모와 파티클 발생이 적고 수명이 깁니다. 진공 배기 시간이 짧고 진공도가 일정하게 유지되는 점도 리크 테스트 데이터로 확인할 수 있습니다.',
          en: 'A ferrofluid seal has no contact friction, so it generates fewer particles, wears less, and lasts longer. Leak test data also shows a short pump-down time and a consistently maintained vacuum level.',
          zh: '磁流体密封无接触摩擦，因此磨损与颗粒产生少、使用寿命长。泄漏测试数据亦显示抽真空时间短且真空度保持稳定。',
        },
      },
      {
        question: {
          ko: '내열성과 증기압은 어떻게 검증했나요?',
          en: 'How were heat resistance and vapor pressure verified?',
          zh: '耐热性与蒸气压是如何验证的？',
        },
        answer: {
          ko: 'TGA(열중량분석)와 DTA로 온도에 따른 중량 손실과 열적 거동을 측정했고, 증기압은 KOPTRI(한국고분자시험연구소)에서 OECD TG 104 방법으로 공인시험을 받았습니다. 성적서와 원자료는 기술정보 페이지에서 PDF로 열람할 수 있습니다.',
          en: 'Weight loss and thermal behavior across temperature were measured by TGA and DTA, and vapor pressure was certified by KOPTRI (Korea Polymer Testing & Research Institute) under OECD TG 104. The reports and raw data are available as PDFs on the Technical Information page.',
          zh: '通过 TGA（热重分析）与 DTA 测定随温度变化的重量损失与热行为，蒸气压则由 KOPTRI（韩国高分子试验研究所）依据 OECD TG 104 方法完成权威检测。报告与原始数据可在技术信息页面以 PDF 阅览。',
        },
      },
    ],
  },

  '/feedthrough': {
    summary: {
      question: {
        ko: '진공 피드스루는 어떤 부품인가요?',
        en: 'What is a vacuum feedthrough?',
        zh: '真空馈通是什么部件？',
      },
      answer: {
        ko: '진공 챔버 바깥의 회전·직선 운동이나 가스·전기 신호를 챔버 안으로 전달하면서 내부의 진공도와 청정도를 유지하는 부품입니다. (주)마그론의 피드스루는 자성유체 씰로 회전축을 비접촉 밀봉해 누설과 파티클 발생을 함께 줄입니다.',
        en: 'A feedthrough transmits rotary or linear motion, gas, or electrical signals from outside a vacuum chamber to the inside while preserving the chamber’s vacuum level and cleanliness. MAGRON feedthroughs seal the rotating shaft without contact using ferrofluid, reducing both leakage and particle generation.',
        zh: '馈通是在将旋转/直线运动、气体或电信号从真空腔体外传递至腔体内的同时，保持内部真空度与洁净度的核心部件。MAGRON 馈通以磁流体对旋转轴进行非接触密封，同时降低泄漏与颗粒产生。',
      },
    },
    faqs: [
      {
        question: {
          ko: '어떤 형식이 있나요?',
          en: 'What types are available?',
          zh: '有哪些结构型式？',
        },
        answer: {
          ko: '소형 회전 도입기, 관통형 장착, 플랜지 장착, 헤비듀티, 중공축 카트리지·플랜지·캔틸레버 타입을 제공합니다. 3축 동축 스핀들에 50mm 선형 스트로크를 결합한 복합 구동형은 Cluster Tool과 300mm 웨이퍼, LCD 대형 기판 처리, 진공 이송 로봇에 적용됩니다.',
          en: 'Miniature rotary, through-hole mount, flange mount, heavy-duty, and hollow-shaft cartridge, flange, and cantilever types. A combined-drive version pairing a three-axis coaxial spindle with a 50 mm linear stroke is applied to Cluster Tools, 300 mm wafers, LCD large-substrate processing, and in-vacuum transfer robots.',
          zh: '提供小型旋转导入器、贯通式安装、法兰安装、重载型，以及中空轴卡匣式·法兰式·悬臂式。将三轴同轴主轴与 50mm 直线行程结合的复合驱动型，适用于 Cluster Tool、300mm 晶圆、LCD 大型基板处理及真空传送机器人。',
        },
      },
      {
        question: {
          ko: '주문 제작이 가능한가요?',
          en: 'Can it be made to order?',
          zh: '是否可以定制？',
        },
        answer: {
          ko: '가능합니다. 축 직경, 회전 속도, 요구 진공도, 플랜지 규격, 사용 가스 종류를 알려주시면 해당 조건에 맞는 사양을 검토해 드립니다.',
          en: 'Yes. Share the shaft diameter, rotational speed, required vacuum level, flange specification, and gas type, and we will review a specification that matches those conditions.',
          zh: '可以。请告知轴径、转速、所需真空度、法兰规格及使用气体种类，我们将据此评估合适的规格方案。',
        },
      },
      {
        question: {
          ko: '누설 성능 데이터가 있나요?',
          en: 'Is leak performance data available?',
          zh: '是否提供泄漏性能数据？',
        },
        answer: {
          ko: 'MFF-M4251과 MFF-M5070에 대한 헬륨 리크 테스트 데이터를 공개하고 있으며, 진공 배기 시간과 유지되는 진공도를 함께 확인할 수 있습니다.',
          en: 'Helium leak test data for MFF-M4251 and MFF-M5070 is published, showing both the pump-down time and the vacuum level that is maintained.',
          zh: '公开 MFF-M4251 与 MFF-M5070 的氦气检漏数据，可同时确认抽真空时间与所维持的真空度。',
        },
      },
    ],
  },

  '/magoil': {
    summary: {
      question: {
        ko: '맥오일은 어떤 릴에 사용하나요?',
        en: 'Which reels is Mag-oil used on?',
        zh: 'Mag-oil 适用于哪些渔轮？',
      },
      answer: {
        ko: 'MAGSEALED 구조가 적용된 낚시 릴의 수리·보충용 자성유체입니다. 릴 내부 마그넷 주변에 자기력으로 머무르면서 물·염분·먼지·이물질의 유입을 줄여, 방수·방진 성능과 부드러운 회전감을 유지하는 데 도움을 줍니다.',
        en: 'Mag-oil is a repair and refill ferrofluid for fishing reels built with a MAGSEALED structure. Held magnetically around the magnet inside the reel, it reduces the ingress of water, salt, dust, and debris, helping maintain waterproof and dustproof performance and a smooth rotational feel.',
        zh: 'Mag-oil 是用于采用 MAGSEALED 结构渔轮的维修·补充用磁流体。它依靠磁力停留在渔轮内部磁铁周围，减少水、盐分、灰尘与异物侵入，有助于维持防水防尘性能与顺滑的旋转手感。',
      },
    },
    faqs: [
      {
        question: {
          ko: '일반 오일이나 그리스와 무엇이 다른가요?',
          en: 'How is it different from ordinary oil or grease?',
          zh: '与普通润滑油或润滑脂有何不同？',
        },
        answer: {
          ko: '맥오일은 자성 입자가 분산된 자성유체라 자석 주변에 자기력으로 붙잡혀 있습니다. 일반 오일처럼 흘러내리지 않고 그 자리에 남아 밀봉막 역할을 하는 점이 다릅니다.',
          en: 'Mag-oil is a ferrofluid with magnetic particles dispersed in it, so it is held in place magnetically around the magnet. Unlike ordinary oil it does not run off — it stays put and acts as a sealing film.',
          zh: 'Mag-oil 是分散有磁性粒子的磁流体，因此会被磁力固定在磁铁周围。与普通润滑油不同，它不会流失，而是停留在原位起到密封膜的作用。',
        },
      },
      {
        question: {
          ko: '왜 시간이 지나면 보충이 필요한가요?',
          en: 'Why does it need topping up over time?',
          zh: '为什么使用一段时间后需要补充？',
        },
        answer: {
          ko: '사용 중에 물과 이물질이 반복해서 닿고 온도가 오르내리면 자성유체가 줄어들거나 성능이 떨어질 수 있습니다. 이때 보충하면 밀봉 구조를 다시 채울 수 있습니다.',
          en: 'Repeated contact with water and debris, along with temperature cycling during use, can gradually reduce the ferrofluid or degrade its performance. Topping it up restores the sealing structure.',
          zh: '使用过程中反复接触水与异物，加之温度反复变化，磁流体可能减少或性能下降。此时进行补充即可重新填充密封结构。',
        },
      },
      {
        question: {
          ko: '어떤 릴에 적용되나요?',
          en: 'Which reels does it apply to?',
          zh: '适用于哪种渔轮？',
        },
        answer: {
          ko: 'MAGSEALED(마그실드) 구조를 채택한 릴을 기준으로 안내하고 있습니다. 밀봉 방식이 다른 구조의 릴은 적용 여부를 먼저 확인해 주시기 바랍니다.',
          en: 'Guidance is based on reels that use the MAGSEALED structure. For reels with a different sealing design, please check applicability first.',
          zh: '以采用 MAGSEALED（磁密封）结构的渔轮为准进行说明。密封方式不同的渔轮，请先确认是否适用。',
        },
      },
    ],
  },

  '/magnet': {
    summary: {
      question: {
        ko: '어떤 종류의 영구자석을 공급하나요?',
        en: 'Which permanent magnets do you supply?',
        zh: '供应哪些种类的永磁体？',
      },
      answer: {
        ko: 'NdFeB(네오디뮴), SmCo, AlNiCo, Ferrite 네 가지 계열을 공급합니다. 소결 NdFeB는 N33~N52의 고자속 등급부터 최대 사용온도 200℃의 EH 등급까지, 본디드 NdFeB는 압축 성형(BNP)과 사출 성형(BNI) 시리즈를 제공합니다.',
        en: 'Four families: NdFeB (neodymium), SmCo, AlNiCo, and ferrite. Sintered NdFeB spans high-flux N33–N52 grades through EH grades rated to 200 °C, while bonded NdFeB is offered in compression-molded (BNP) and injection-molded (BNI) series.',
        zh: '供应 NdFeB（钕铁硼）、SmCo、AlNiCo、铁氧体四大系列。烧结 NdFeB 涵盖 N33~N52 高磁通等级至最高使用温度 200℃ 的 EH 等级；粘结 NdFeB 提供压缩成型（BNP）与注射成型（BNI）系列。',
      },
    },
    faqs: [
      {
        question: {
          ko: '고온 환경에는 어떤 자석이 맞나요?',
          en: 'Which magnet suits high-temperature environments?',
          zh: '高温环境应选择哪种磁体？',
        },
        answer: {
          ko: 'SmCo는 250~350℃의 높은 사용 온도와 우수한 내식성·온도 안정성을 갖습니다. AlNiCo는 퀴리 온도가 약 810~860℃로 매우 낮은 온도계수를 가져, 온도 안정성이 중요한 계측기와 센서에 적합합니다.',
          en: 'SmCo offers operating temperatures of 250–350 °C with excellent corrosion resistance and temperature stability. AlNiCo has a Curie temperature of roughly 810–860 °C and a very low temperature coefficient, suiting instruments and sensors where thermal stability matters.',
          zh: 'SmCo 使用温度达 250~350℃，耐腐蚀性与温度稳定性优异。AlNiCo 居里温度约 810~860℃，温度系数极低，适用于重视温度稳定性的仪表与传感器。',
        },
      },
      {
        question: {
          ko: '복잡한 형상도 만들 수 있나요?',
          en: 'Can complex shapes be produced?',
          zh: '能否制作复杂形状？',
        },
        answer: {
          ko: '사출 성형 본디드 네오디뮴(BNI 시리즈)은 복잡한 3차원 형상, 인서트 일체 성형, 다극 착자가 가능합니다. 압축 성형(BNP 시리즈)은 얇은 링이나 박형 형상을 정밀한 치수로 저비용 양산할 수 있습니다.',
          en: 'Injection-molded bonded neodymium (BNI series) allows complex 3D geometry, insert-integrated molding, and multipole magnetization. Compression-molded BNP series produces thin rings and slim shapes at precise dimensions and low cost in volume.',
          zh: '注射成型粘结钕铁硼（BNI 系列）可实现复杂三维形状、嵌件一体成型与多极充磁。压缩成型（BNP 系列）可低成本量产尺寸精密的薄壁环形与薄型形状。',
        },
      },
      {
        question: {
          ko: '어떤 용도에 쓰이나요?',
          en: 'What are they used for?',
          zh: '主要用于哪些用途？',
        },
        answer: {
          ko: '모터, 발전기, 센서, 스피커, 자기 커플링, 자성유체 씰, 의료기기, 전장부품, 자동화 장비 등에 사용됩니다. 등급별 자기특성표와 물리특성표를 제품 페이지에서 확인할 수 있습니다.',
          en: 'Motors, generators, sensors, speakers, magnetic couplings, ferrofluid seals, medical devices, automotive electronics, and automation equipment. Magnetic and physical property tables by grade are available on the product page.',
          zh: '用于电机、发电机、传感器、扬声器、磁耦合、磁流体密封、医疗器械、汽车电子部件及自动化设备等。各等级的磁性能表与物理性能表可在产品页面查阅。',
        },
      },
    ],
  },

  '/education': {
    summary: {
      question: {
        ko: '자성유체 키트로 무엇을 할 수 있나요?',
        en: 'What can you do with the ferrofluid kit?',
        zh: '磁流体套件可以做什么？',
      },
      answer: {
        ko: '자석에 반응해 뿔 모양으로 솟아오르는 자성유체의 움직임을 직접 관찰하고, 구성품으로 자성유체를 만들어 다루는 과정까지 체험할 수 있는 교육용 키트입니다. 과학 교육, 전시 체험, 콘텐츠 제작, 연구 데모에 활용됩니다.',
        en: 'An education kit for observing first-hand how ferrofluid spikes in response to a magnet, and for experiencing the process of making and handling ferrofluid with the supplied components. It is used in science teaching, exhibition activities, content production, and research demonstrations.',
        zh: '可亲眼观察磁流体在磁铁作用下形成尖峰的动态，并通过配件亲手制作与操作磁流体的教育套件。适用于科学教学、展览体验、内容制作与科研演示。',
      },
    },
    faqs: [
      {
        question: {
          ko: '주로 누가 사용하나요?',
          en: 'Who typically uses it?',
          zh: '主要由谁使用？',
        },
        answer: {
          ko: '학교와 과학관의 수업·체험 프로그램, 기업 전시 부스, 영상 콘텐츠 제작 현장, 연구실 데모 등에서 사용합니다.',
          en: 'Classes and hands-on programs at schools and science museums, corporate exhibition booths, video content production, and laboratory demonstrations.',
          zh: '用于学校与科学馆的课程·体验项目、企业展位、影像内容制作现场以及实验室演示等场景。',
        },
      },
      {
        question: {
          ko: '자성유체는 왜 뿔 모양이 되나요?',
          en: 'Why does ferrofluid form spikes?',
          zh: '磁流体为什么会形成尖峰？',
        },
        answer: {
          ko: '자기장 안에서 자성유체는 자기력선을 따라 솟아오르려 하고, 표면장력과 중력은 이를 눌러 평평하게 만들려 합니다. 두 힘이 균형을 이루는 지점에서 규칙적인 뿔 모양 패턴이 만들어집니다.',
          en: 'In a magnetic field the fluid tries to rise along the field lines, while surface tension and gravity push it back flat. The regular spike pattern appears where those forces balance.',
          zh: '在磁场中，磁流体趋向沿磁力线隆起，而表面张力与重力则将其压平。两种作用力达到平衡之处，便形成规则的尖峰图案。',
        },
      },
      {
        question: {
          ko: '구성품은 어떻게 되나요?',
          en: 'What is included?',
          zh: '包含哪些配件？',
        },
        answer: {
          ko: '구성품과 수량은 제품 페이지의 제품 구성 항목에서 확인할 수 있습니다. 단체 수업용 수량이 필요하시면 별도로 문의해 주세요.',
          en: 'The component list and quantities are shown in the product composition section of this page. For classroom-scale quantities, please contact us separately.',
          zh: '配件清单与数量请参见本页的产品构成部分。如需团体教学用数量，请另行咨询。',
        },
      },
    ],
  },

  '/piezo-ink': {
    summary: {
      question: {
        ko: 'PIEZO Ink는 어떤 잉크인가요?',
        en: 'What kind of ink is PIEZO Ink?',
        zh: 'PIEZO Ink 是什么油墨？',
      },
      answer: {
        ko: '압력·충격·변형을 전기 신호로 감지하는 압전/압저항 잉크와, 스크린 프린팅으로 회로를 구현하는 전도성 잉크입니다. 열성형·사출성형 공정과 결합해 플라스틱 부품에 회로를 그대로 내장하는 In-Mold Electronics에 적용할 수 있습니다.',
        en: 'A piezoelectric and piezoresistive ink that senses pressure, impact, and deformation as an electrical signal, together with a conductive ink that forms circuits by screen printing. Combined with thermoforming and injection molding, it enables In-Mold Electronics that embed circuitry directly into plastic parts.',
        zh: '包含将压力、冲击与形变转换为电信号的压电/压阻油墨，以及通过丝网印刷实现电路的导电油墨。可与热成型、注塑工艺结合，实现将电路直接内嵌于塑料部件的 In-Mold Electronics。',
      },
    },
    faqs: [
      {
        question: {
          ko: '어떤 소재 위에 인쇄할 수 있나요?',
          en: 'Which substrates can it print on?',
          zh: '可以印刷在哪些基材上？',
        },
        answer: {
          ko: '실버 전도성 잉크는 PVC, PET, TPU, 폴리카보네이트, 아크릴레이트, 폴리우레탄 등에 인쇄할 수 있고, 열성형 전후로 성능이 안정적으로 유지됩니다.',
          en: 'The silver conductive ink prints on PVC, PET, TPU, polycarbonate, acrylate, and polyurethane, and holds its performance stably before and after thermoforming.',
          zh: '银系导电油墨可印刷于 PVC、PET、TPU、聚碳酸酯、丙烯酸酯、聚氨酯等基材，且在热成型前后性能保持稳定。',
        },
      },
      {
        question: {
          ko: '저온 경화가 가능한 제품도 있나요?',
          en: 'Is a low-temperature curing option available?',
          zh: '是否有可低温固化的产品？',
        },
        answer: {
          ko: '구리 전도성 잉크는 저온 경화가 가능하고 벤더블 특성을 가져, In-Mold Electronics 공정에도 활용할 수 있습니다.',
          en: 'The copper conductive ink cures at low temperature and is bendable, so it can also be used in In-Mold Electronics processes.',
          zh: '铜系导电油墨可低温固化并具备可弯曲特性，同样适用于 In-Mold Electronics 工艺。',
        },
      },
      {
        question: {
          ko: '배합을 바꿀 수 있나요?',
          en: 'Can the formulation be adjusted?',
          zh: '配方可以调整吗？',
        },
        answer: {
          ko: '적용 분야와 요구 사양에 맞춰 배합과 물성을 조정할 수 있습니다. 사용 소재, 인쇄 방식, 경화 조건, 요구 저항값을 알려주시면 검토해 드립니다.',
          en: 'Formulation and material properties can be tuned to the application and required specification. Share the substrate, printing method, curing conditions, and target resistance and we will review it.',
          zh: '可根据应用领域与规格要求调整配方与物性。请告知使用基材、印刷方式、固化条件与目标电阻值，我们将进行评估。',
        },
      },
    ],
  },

  '/display': {
    summary: {
      question: {
        ko: '대형 자성유체 디스플레이는 무엇인가요?',
        en: 'What is a large ferrofluid display?',
        zh: '大型磁流体展示装置是什么？',
      },
      answer: {
        ko: '자기장에 반응하는 자성유체의 움직임을 대형 화면 형태로 구현한 전시·홍보용 콘텐츠입니다. 관람객의 시선을 끄는 시각 효과가 강해 과학관과 전시관, 기업 홍보관, 미디어아트, 교육·체험 부스에 활용됩니다.',
        en: 'Exhibition and promotional content that renders the motion of magnetically responsive ferrofluid at large-display scale. Its strong visual pull suits science museums, corporate showrooms, media-art installations, and education or hands-on booths.',
        zh: '将磁流体在磁场中的动态以大型显示形式呈现的展览·宣传内容。视觉吸引力强，适用于科学馆与展览馆、企业宣传馆、媒体艺术及教育体验展位。',
      },
    },
    faqs: [
      {
        question: {
          ko: '어디에 설치하나요?',
          en: 'Where is it installed?',
          zh: '通常安装在哪里？',
        },
        answer: {
          ko: '과학관·전시관, 기업 홍보관, 미디어아트 전시, 교육·체험 부스 등에 설치합니다. 실제 작동 모습과 적용 사례는 이 페이지의 포트폴리오 영상에서 확인할 수 있습니다.',
          en: 'Science museums and exhibition halls, corporate showrooms, media-art exhibitions, and education or hands-on booths. Portfolio videos on this page show it running in real installations.',
          zh: '可安装于科学馆·展览馆、企业宣传馆、媒体艺术展览及教育体验展位等。实际运行状态与应用案例可在本页的作品集视频中查看。',
        },
      },
      {
        question: {
          ko: '원하는 크기로 제작할 수 있나요?',
          en: 'Can it be built to a requested size?',
          zh: '可以按需求尺寸定制吗？',
        },
        answer: {
          ko: '가능합니다. 설치 공간, 희망 크기, 전시 기간, 운영 환경을 알려주시면 규격을 검토해 드립니다.',
          en: 'Yes. Share the installation space, desired size, exhibition period, and operating environment, and we will review the specification.',
          zh: '可以。请告知安装空间、期望尺寸、展出周期与运行环境，我们将据此评估规格。',
        },
      },
      {
        question: {
          ko: '자성유체는 어떻게 움직이나요?',
          en: 'How does the ferrofluid move?',
          zh: '磁流体是如何运动的？',
        },
        answer: {
          ko: '자성유체는 자기장에 반응해 자기력선을 따라 모이고 흩어집니다. 자기장의 세기와 순서를 제어해 유체의 움직임을 연출합니다.',
          en: 'Ferrofluid responds to a magnetic field by gathering and dispersing along the field lines. Controlling the strength and sequence of the field choreographs the motion.',
          zh: '磁流体响应磁场，沿磁力线聚集与扩散。通过控制磁场强度与变化顺序，即可编排流体的运动。',
        },
      },
    ],
  },
}

/** 언어 접두어를 뗀 경로(`/ferrofluid`)로 그 화면의 직답·FAQ를 꺼낸다. */
export function getPageAnswers(routePath: string): PageAnswers | undefined {
  return PAGE_ANSWERS[routePath]
}
