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
  '/tech': {
    summary: {
      question: {
        ko: '어떤 기술자료를 제공하나요?',
        en: 'What technical documents are available?',
        zh: '提供哪些技术资料？',
      },
      answer: {
        ko: 'MFF-M PFPE 자성유체의 내열성·증기압·진공 안정성을 뒷받침하는 자료를 PDF로 공개합니다. 증기압은 한국고분자시험연구원(KOPTRI)에서 OECD TG 104 유출법으로, 내열성은 한국생산기술연구원(KITECH)에서 TGA로 측정했습니다. 종합자료·기술 브로슈어·증기압 기술노트·시험 결과·활성 및 불활성 가스 TGA 원자료를 열람하고 내려받을 수 있습니다.',
        en: 'Documents backing the heat resistance, vapor pressure, and vacuum stability of MFF-M PFPE ferrofluid are published as PDFs. Vapor pressure was measured at KOPTRI (Korea Polymer Testing & Research Institute) by the OECD TG 104 effusion method, and heat resistance at KITECH (Korea Institute of Industrial Technology) by TGA. Overview decks, brochures, vapor-pressure notes, test results, and raw TGA data for active and inert gases are all available.',
        zh: '以 PDF 形式公开支持 MFF-M PFPE 磁流体耐热性、蒸气压与真空稳定性的资料。蒸气压由韩国高分子试验研究院（KOPTRI）依据 OECD TG 104 逸出法测定，耐热性由韩国生产技术研究院（KITECH）以 TGA 测定。可阅览并下载综合资料、技术手册、蒸气压技术说明、试验结果以及活性与惰性气体的 TGA 原始数据。',
      },
    },
    faqs: [
      {
        question: {
          ko: '증기압은 어떤 방법으로 측정하나요?',
          en: 'How is vapor pressure measured?',
          zh: '蒸气压采用什么方法测定？',
        },
        answer: {
          ko: '증기압이 매우 낮은 소재는 일반 압력계로 직접 잴 수 없습니다. 진공 TGA로 등온 조건에서 무게 손실을 관찰해 증발 속도를 구한 뒤, 회귀분석으로 상온 증기압을 산출합니다. OECD TG 104 유출법이 이 절차를 규정한 시험법입니다.',
          en: 'Materials with very low vapor pressure cannot be measured directly with a pressure gauge. Weight loss is observed under isothermal conditions in a vacuum TGA to obtain an evaporation rate, which is then regressed to give the vapor pressure at room temperature. The OECD TG 104 effusion method defines this procedure.',
          zh: '蒸气压极低的材料无法用普通压力计直接测量。需在真空 TGA 中于等温条件下观察失重以求得蒸发速率，再通过回归分析推算常温蒸气压。OECD TG 104 逸出法即规定了该流程。',
        },
      },
      {
        question: {
          ko: '내열성은 어떻게 확인하나요?',
          en: 'How is heat resistance verified?',
          zh: '耐热性如何确认？',
        },
        answer: {
          ko: 'TGA(열중량분석)로 분당 10℃씩 승온하며 온도별 무게 손실을 측정하고, DTA로 흡열·발열 반응을 함께 봅니다. 무게가 1wt% 줄어드는 온도를 사용 가능 온도의 기준으로 삼습니다. 실제 사용 온도는 회전 속도, 축 지름, 운전 시간에 따라 달라집니다.',
          en: 'TGA measures weight loss against temperature at a 10℃/min ramp, and DTA shows endothermic and exothermic behaviour alongside it. The temperature at which 1 wt% is lost is used as the reference for the usable range. The actual operating temperature depends on rotational speed, shaft diameter, and running time.',
          zh: '以 TGA（热重分析）按每分钟 10℃ 升温测定各温度下的失重，并以 DTA 同步观察吸热与放热行为。以失重 1wt% 的温度作为可用温度的基准。实际使用温度会随转速、轴径与运行时间而变化。',
        },
      },
      {
        question: {
          ko: '왜 증기압 데이터가 중요한가요?',
          en: 'Why does vapor pressure data matter?',
          zh: '为什么蒸气压数据很重要？',
        },
        answer: {
          ko: '반도체 공정은 통상 10⁻⁶ Pa 이하 초고진공에서 진행됩니다. 챔버 안의 소재가 스스로 기화하면 달성 가능한 진공도가 제한되고, 파티클 성장·패턴 오염·박막 불균일로 이어져 수율에 직접 영향을 줍니다. 그래서 정성적인 "저증기압"이 아니라 정량적인 합격 기준이 필요합니다.',
          en: 'Semiconductor processes typically run below 10⁻⁶ Pa. If a material inside the chamber outgasses, it caps the attainable vacuum and leads to particle growth, pattern contamination, and film non-uniformity — all of which hit yield directly. That is why a quantitative acceptance figure is needed, not a qualitative claim of "low vapor pressure".',
          zh: '半导体工艺通常在 10⁻⁶ Pa 以下进行。若腔体内材料自身气化，将限制可达真空度，并导致颗粒生长、图形污染与薄膜不均，直接影响良率。因此需要的是定量的合格判据，而非笼统的"低蒸气压"说法。',
        },
      },
      {
        question: {
          ko: '자료를 바로 받을 수 있나요?',
          en: 'Can the documents be downloaded directly?',
          zh: '资料可以直接下载吗？',
        },
        answer: {
          ko: '이 페이지의 자료는 회원가입 없이 바로 열람하고 내려받을 수 있습니다. 특정 공정 조건에 대한 검토나 추가 데이터가 필요하시면 문의해 주시기 바랍니다.',
          en: 'Everything on this page can be viewed and downloaded without registration. For a review against specific process conditions, or for additional data, please contact us.',
          zh: '本页资料无需注册即可直接阅览与下载。如需针对特定工艺条件的评估或补充数据，请与我们联系。',
        },
      },
    ],
  },

  '/company': {
    summary: {
      question: {
        ko: '(주)마그론은 어떤 회사인가요?',
        en: 'What kind of company is MAGRON?',
        zh: 'MAGRON 是一家什么样的公司？',
      },
      answer: {
        ko: '2004년에 설립된 자성유체(Ferrofluid) 전문 제조기업입니다. 활성·비활성 가스와 분진을 차폐하는 씰링 부품과 센서용 자성유체를 만들어 반도체·태양전지·디스플레이 장비·전자제품·자동차 산업에 공급합니다. 경기도 안산 경기테크노파크에 있습니다.',
        en: 'MAGRON is a ferrofluid manufacturer founded in 2004. It makes sealing components that shield active and inactive gases and dust, along with ferrofluid for sensors, supplying the semiconductor, solar cell, display equipment, electronics, and automotive industries. The company is based at Gyeonggi Technopark in Ansan, Korea.',
        zh: 'MAGRON 成立于 2004 年，是一家磁流体专业制造企业。生产用于屏蔽活性与非活性气体及粉尘的密封部件以及传感器用磁流体，供应半导体、太阳能电池、显示设备、电子产品与汽车行业。公司位于韩国安山京畿科技园。',
      },
    },
    faqs: [
      {
        question: {
          ko: '주력 제품은 무엇인가요?',
          en: 'What are the main products?',
          zh: '主要产品是什么？',
        },
        answer: {
          ko: '자성유체(Ferrofluid), 자성유체 씰이 적용된 진공 피드스루, 자성유체 씰이 적용된 진공 OLED 증착 로봇입니다. 이 밖에도 용도와 규격에 맞춘 주문 제작이 가능합니다.',
          en: 'Ferrofluid, ferrofluid-sealed vacuum feedthroughs, and ferrofluid-sealed vacuum OLED deposition robots. Beyond these, made-to-order products to your application and specification are available.',
          zh: '磁流体、采用磁流体密封的真空馈通，以及采用磁流体密封的真空 OLED 蒸镀机器人。此外亦可按用途与规格进行定制生产。',
        },
      },
      {
        question: {
          ko: '어떤 장비와 공정에 쓰이나요?',
          en: 'Which equipment and processes use them?',
          zh: '应用于哪些设备与工艺？',
        },
        answer: {
          ko: 'CVD, PVD, 스퍼터링, 이온 주입기, 박막 공정, 진공 이송 로봇, 단결정 성장 장비 등에 적용됩니다. 항공우주, 원자력, 핵융합 분야에서도 사용됩니다.',
          en: 'CVD, PVD, sputtering, ion implanters, thin-film processes, in-vacuum transfer robots, and single-crystal growth equipment. They are also used in aerospace, nuclear power, and nuclear fusion.',
          zh: '应用于 CVD、PVD、溅射、离子注入机、薄膜工艺、真空传送机器人及单晶生长设备等，亦用于航空航天、核能与核聚变领域。',
        },
      },
      {
        question: {
          ko: '해외에서도 문의할 수 있나요?',
          en: 'Can overseas customers get in touch?',
          zh: '海外客户可以咨询吗？',
        },
        answer: {
          ko: '가능합니다. 영어와 중국어로 응대하며, 전 세계 어디서든 화상 회의를 요청하실 수 있습니다. 수출 문의는 +82-31-500-4632, 이메일은 magron@magron.co.kr 입니다.',
          en: 'Yes. We respond in English and Chinese, and you can request a video conference from anywhere in the world. For export enquiries call +82-31-500-4632 or email magron@magron.co.kr.',
          zh: '可以。我们提供英语与中文服务，您可在全球任何地点申请视频会议。出口咨询电话 +82-31-500-4632，邮箱 magron@magron.co.kr。',
        },
      },
    ],
  },

  '/ferrofluid': {
    summary: {
      question: {
        ko: '자성유체 씰은 어떤 문제를 해결하나요?',
        en: 'What problem does a ferrofluid seal solve?',
        zh: '磁流体密封解决什么问题？',
      },
      answer: {
        ko: '자성유체 씰은 회전축 둘레에 자기장으로 붙잡힌 액체 O-ring을 만들어, 축이 도는 동안에도 유해가스 누출과 분진 유입, 진공도 저하를 막습니다. 부식성 가스용 MFF·MFF-M(PFPE 계열)은 20℃ 증기압 1.5×10⁻¹⁰ Pa 이하, 1wt% 중량손실 온도 280℃ 이상이며, 비부식성 가스용으로는 MFS(실리콘)·MFH(하이드로카본) 시리즈를 공급합니다.',
        en: 'A ferrofluid seal forms a liquid O-ring held in place by a magnetic field around a rotating shaft, blocking corrosive-gas leakage, dust ingress, and vacuum loss while the shaft keeps turning. The MFF/MFF-M series (PFPE) for corrosive gases holds a vapor pressure of 1.5×10⁻¹⁰ Pa or lower at 20℃ and a 1 wt% weight-loss temperature above 280℃; the MFS (silicone) and MFH (hydrocarbon) series cover non-corrosive gases.',
        zh: '磁流体密封在旋转轴周围形成由磁场固定的液态 O 型圈，即使轴持续旋转也能阻隔有害气体泄漏、粉尘侵入与真空度下降。腐蚀性气体用 MFF·MFF-M（PFPE 系列）在 20℃ 下蒸气压低于 1.5×10⁻¹⁰ Pa、1wt% 失重温度高于 280℃；非腐蚀性气体则提供 MFS（硅系）·MFH（碳氢系）系列。',
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
          ko: '내열성은 한국생산기술연구원(KITECH)에서 TGA·DTA로 분당 10℃ 승온 조건으로 측정했고, 증기압은 한국고분자시험연구원(KOPTRI)에서 OECD TG 104 유출법으로 측정했습니다. 측정 자료와 시험 결과는 기술정보 페이지에서 PDF로 열람할 수 있습니다.',
          en: 'Heat resistance was measured at KITECH (Korea Institute of Industrial Technology) by TGA and DTA at a 10℃/min ramp, and vapor pressure was measured at KOPTRI (Korea Polymer Testing & Research Institute) using the OECD TG 104 effusion method. The measurement data and test results are available as PDFs on the Technical Information page.',
          zh: '耐热性由韩国生产技术研究院（KITECH）以 TGA·DTA 在每分钟升温 10℃ 的条件下测定，蒸气压由韩国高分子试验研究院（KOPTRI）依据 OECD TG 104 逸出法测定。测定资料与试验结果可在技术信息页面以 PDF 阅览。',
        },
      },
      {
        question: {
          ko: '경쟁 제품과 비교하면 어떤가요?',
          en: 'How does it compare with competing products?',
          zh: '与竞争产品相比如何？',
        },
        answer: {
          ko: '활성 가스용 PFPE 기준으로 당사 MFF-M 시리즈는 1wt% 중량손실 도달 온도가 280℃ 이상입니다. 같은 TGA 조건에서 일본 S사(F-310)·일본 M사(MFF-03)·영국 L사(F-9)는 158~185℃로 약 100℃ 차이가 납니다. 다만 타사 수치는 베이스오일 기준, 당사는 완제품 기준 측정값이라 측정 조건이 동일하지는 않습니다.',
          en: 'For active-gas PFPE, our MFF-M series reaches 1 wt% weight loss above 280℃. Under the same TGA conditions, S-company (Japan, F-310), M-company (Japan, MFF-03) and L-company (UK, F-9) fall between 158℃ and 185℃ — a gap of roughly 100℃. Note that the competing figures are measured on base oil while ours are measured on the finished ferrofluid, so the conditions are not identical.',
          zh: '以活性气体用 PFPE 为准，本公司 MFF-M 系列的 1wt% 失重温度在 280℃ 以上。在相同 TGA 条件下，日本 S 公司（F-310）、日本 M 公司（MFF-03）、英国 L 公司（F-9）为 158~185℃，相差约 100℃。需说明的是，他社数值为基础油测定值，本公司为成品测定值，测定条件并不完全一致。',
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
          ko: '헬륨 누설율은 10⁻¹² Pa·m³/s(10⁻¹¹ Torr·ℓ/s) 미만이고 도달 진공도는 10⁻⁶ Pa(10⁻⁸ Torr) 수준이며, 사용 온도 범위는 0~150℃입니다. 모델별 토크 용량과 베어링·하우징·샤프트 재질은 제품 페이지 사양표에서 확인할 수 있습니다.',
          en: 'Helium leakage is below 10⁻¹² Pa·m³/s (10⁻¹¹ Torr·ℓ/s), the attainable vacuum is on the order of 10⁻⁶ Pa (10⁻⁸ Torr), and the operating temperature range is 0–150℃. Torque capacity and bearing, housing and shaft materials are listed per model in the specification tables on this page.',
          zh: '氦气泄漏率低于 10⁻¹² Pa·m³/s（10⁻¹¹ Torr·ℓ/s），可达真空度约为 10⁻⁶ Pa（10⁻⁸ Torr），使用温度范围为 0~150℃。各型号的扭矩容量与轴承·壳体·轴材质可在本页规格表中查看。',
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
        ko: 'MAGSEALED 구조가 적용된 낚시 릴의 방수막을 보충하는 실리콘 자성유체입니다. 약 10나노미터 자성 입자가 릴 내부 자석 주위에 오일 링을 만들어, 회전 중에도 해수·염분·먼지의 침투를 막습니다. 실리콘 베이스 자성유체를 양산하는 곳은 당사가 유일하며 1ml(1.2g) 점적 보틀로 공급합니다.',
        en: 'Mag-oil is a silicone ferrofluid that replenishes the waterproof film in fishing reels built with a MAGSEALED structure. Magnetic particles about 10 nanometres across form an oil ring around the magnet inside the reel, blocking seawater, salt and dust even while it spins. MAGRON is the only manufacturer producing silicone-based ferrofluid, supplied in a 1 ml (1.2 g) dropper bottle.',
        zh: 'Mag-oil 是为采用 MAGSEALED 结构的渔轮补充防水膜的硅系磁流体。约 10 纳米的磁性粒子在渔轮内部磁铁周围形成油环，即使旋转中也能阻隔海水、盐分与灰尘。量产硅基磁流体的厂商目前仅有 MAGRON，以 1ml（1.2g）点滴瓶供应。',
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
          ko: '맥오일은 자성 입자가 분산된 자성유체라 자석 주변에 자기력으로 붙잡혀 있습니다. 일반 오일처럼 흘러내리지 않고 그 자리에 남아 밀봉막 역할을 합니다. 또 일반 자성유체가 광유 계열을 쓰는 것과 달리 실리콘 베이스라 발수성이 높고 열·산화·세척에 강합니다.',
          en: 'Mag-oil is a ferrofluid with magnetic particles dispersed in it, so it is held in place magnetically around the magnet — it does not run off like ordinary oil but stays put and acts as a sealing film. It is also silicone-based rather than the mineral oil used in typical ferrofluids, giving it higher water repellency and better resistance to heat, oxidation and washing.',
          zh: 'Mag-oil 是分散有磁性粒子的磁流体，会被磁力固定在磁铁周围，不像普通润滑油那样流失，而是停留在原位起到密封膜的作用。此外，一般磁流体多采用矿物油，而本产品以硅为基底，具有更高的拒水性，并更耐热、耐氧化与耐清洗。',
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
      {
        question: {
          ko: '어떻게 도포하나요?',
          en: 'How is it applied?',
          zh: '如何涂布？',
        },
        answer: {
          ko: '릴을 분해해 마그실드 부위를 연 뒤, 기존 자성유체와 이물질을 깨끗이 닦아내고, 자석 부위에 한 방울씩 소량 정밀 도포한 다음 재조립합니다. 자성유체가 오일 링을 형성하면 완료이며, 사용법 영상도 함께 제공합니다.',
          en: 'Disassemble the reel to reach the MAGSEALED section, wipe away the old ferrofluid and any debris, apply Mag-oil one drop at a time onto the magnet area, then reassemble. It is done once the ferrofluid forms an oil ring; a how-to video is also provided.',
          zh: '拆解渔轮并打开磁密封部位，擦净原有磁流体与异物，在磁铁部位逐滴精准涂布，然后重新组装。磁流体形成油环即完成，同时提供使用方法视频。',
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
        ko: '자성유체·베이스액·코팅제·에칭제 4종으로 구성된 키트로, 유리 용기에 직접 자성유체 디스플레이를 만들고 자석에 반응해 뿔 모양으로 솟아오르는 움직임을 관찰할 수 있습니다. 학교와 과학관 수업, 전시 체험, 콘텐츠 제작, 연구 데모에 활용됩니다.',
        en: 'The kit contains four liquids — ferrofluid, clear base liquid, coating agent and etching agent — so you can build a ferrofluid display in a glass vessel yourself and watch the fluid spike in response to a magnet. It is used in school and science-museum classes, exhibition activities, content production and research demonstrations.',
        zh: '套件由磁流体、基础液、涂层剂、蚀刻剂四种液体组成，可在玻璃容器中亲手制作磁流体展示装置，观察磁流体在磁铁作用下形成尖峰的动态。适用于学校与科学馆课程、展览体验、内容制作与科研演示。',
      },
    },
    faqs: [
      {
        question: {
          ko: '구성품 4종은 각각 어떤 역할인가요?',
          en: 'What does each of the four components do?',
          zh: '四种配件各有什么作用？',
        },
        answer: {
          ko: '자성유체는 자석에 반응하는 검은색 유체이고, 베이스액은 그 자성유체를 담는 투명 액체입니다. 코팅제는 유리 벽면에 자성유체가 묻는 얼룩(stain)을 막고, 에칭제는 유리 내부 표면의 거칠기를 줄여 얼룩이 생길 확률을 낮춥니다.',
          en: 'The ferrofluid is the black fluid that responds to a magnet, and the clear base liquid is what holds it. The coating agent prevents the ferrofluid from staining the glass wall, and the etching agent smooths the inner glass surface so staining is less likely.',
          zh: '磁流体是响应磁铁的黑色流体，基础液则是盛装磁流体的透明液体。涂层剂可防止磁流体在玻璃壁面留下污渍（stain），蚀刻剂通过降低玻璃内表面粗糙度来减少污渍产生的概率。',
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
          ko: '만들어 두면 오래 가나요?',
          en: 'Does the finished display last?',
          zh: '制作完成后能保持多久？',
        },
        answer: {
          ko: '자성유체와 베이스액 모두 휘발성 용제를 쓰지 않아 상온(25℃ 이내)에서는 증발이 거의 없습니다. 자성유체는 RoHS 인증을 받았으며, 500rpm으로 1,000시간 구동한 내구성 시험에서도 형상 변화와 화학 반응이 거의 없었습니다.',
          en: 'Neither the ferrofluid nor the base liquid contains volatile solvents, so there is virtually no evaporation at room temperature (up to 25℃). The ferrofluid holds RoHS certification, and a durability test running 1,000 hours at 500 rpm showed almost no change in shape or chemical reaction.',
          zh: '磁流体与基础液均不含挥发性溶剂，在常温（25℃ 以内）下几乎不会蒸发。磁流体已取得 RoHS 认证，在 500rpm 运行 1,000 小时的耐久试验中，形状变化与化学反应也极小。',
        },
      },
      {
        question: {
          ko: '어떤 용기를 써야 하나요?',
          en: 'What kind of vessel should be used?',
          zh: '应使用什么样的容器？',
        },
        answer: {
          ko: '유리 용기만 사용할 수 있습니다. 다른 재질은 시험 결과 모두 얼룩이 생겼습니다. 유리 표면의 거칠기가 낮을수록 얼룩 확률이 낮아집니다. 용기는 별도로 준비하셔야 하며 당사는 공급하지 않습니다.',
          en: 'Glass only. Every other material tested produced staining. The smoother the inner glass surface, the lower the chance of staining. The vessel must be sourced separately — MAGRON does not supply it.',
          zh: '仅可使用玻璃容器。试验表明其他材质均会产生污渍。玻璃表面越光滑，产生污渍的概率越低。容器需另行准备，本公司不提供。',
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
