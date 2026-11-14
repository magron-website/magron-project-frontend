const piezoInk = {
  ko: {
    hero: {
      label: 'Products',
      title: 'PIEZO Ink',
      titleEn: 'Conductive & Piezo Ink',
      heading: '압전·전도성 잉크 (Conductive Piezo Ink)',
      lead: [
        'In-Mold Electronics, 웨어러블 센서, 인쇄 전자, 스마트 텍스타일 등 다양한 분야에 적용할 수 있습니다.',
        '압력에 반응해 전기 신호를 내는 압전(Piezoelectric) 잉크, 인쇄 회로를 만드는 전도성(Conductive) 잉크, 압력 변화를 저항 변화로 감지하는 압저항(Piezoresistive) 잉크, 자성 패턴과 자기 센서를 만드는 자성(Magnetic) 잉크까지 — 인쇄 공정 하나로 기능성 회로와 센서를 구현하는 잉크 라인업입니다.',
      ],
      heroAlt: 'Conductive & Piezo Ink 제품군',
    },
    catnavAria: '제품 카테고리',
    heroCards: [
      { title: 'In-Mold Electronics Ready', description: '열성형·사출성형 공정과 결합해 플라스틱 부품에 회로를 그대로 내장할 수 있습니다.' },
      { title: 'Pressure & Deformation Sensing', description: '압전·압저항 잉크로 압력, 충격, 변형을 전기 신호로 감지합니다.' },
      { title: 'Print-based Circuits', description: '스크린 프린팅만으로 소재 위에 전도성 회로와 센서를 직접 구현합니다.' },
      { title: 'Custom Formulation', description: '적용 분야와 요구 사양에 맞춰 배합과 물성을 조정할 수 있습니다.' },
    ],
    categories: {
      conductive: {
        titleKr: '전도성 잉크',
        intro: '스크린 프린팅으로 각종 소재 위에 전도성 회로를 직접 인쇄하는 실버·구리·카본 잉크입니다. 벤더블·인몰드용부터 투명·신축용까지 있습니다.',
      },
      piezo: {
        titleKr: '압전 · 압저항 잉크',
        intro: '압력·충격·변형을 전기 신호로 바꾸는 기능성 잉크입니다. 압전(Piezoelectric) 방식과 압저항(Piezoresistive) 방식으로 나뉘며, 인쇄만으로 센서를 만들 수 있습니다.',
      },
      magnetic: {
        titleKr: '자성 잉크',
        intro: '강자성·초상자성 입자를 분산한 잉크로, 인쇄만으로 자성 패턴과 자기 센서를 만들 수 있습니다.',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: '벤더블 전도성 실버 잉크',
        description: '스크린 프린팅용 실버 전도성 잉크로, 열성형 전후 성능이 일정해 In-Mold Electronics에 쓰입니다.',
      },
      copper: {
        titleKr: '인몰드용 전도성 구리 잉크',
        description: 'In-Mold Electronics에 쓸 수 있는 스크린 프린팅 구리 전도성 잉크입니다.',
      },
      'transparent-silver': {
        titleKr: '투명 전도성 실버 잉크',
        description: '박막 태양전지, 디스플레이, 센서 등 인쇄전자용 투명 전도성 실버 잉크로, 투과율 94% 이상의 투명 전극을 인쇄할 수 있습니다.',
      },
      'stretchable-silver': {
        titleKr: '스트레처블 전도성 실버 잉크',
        description: '신축성을 갖춘 스크린 프린팅 실버 페이스트로, 웨어러블 전자기기·센서·의료기기에 쓰입니다.',
      },
      'water-based-carbon': {
        titleKr: '스트레처블 수성 카본 전도성 잉크',
        description: '신축성을 갖춘 수성 카본 페이스트로, 웨어러블 전자기기·센서·의료기기에 쓰입니다. 물·아세톤으로 세척할 수 있습니다.',
      },
      carbon: {
        titleKr: '카본 전도성 잉크',
        description: '표면 처리된 PET·PI·PC·PVC 기재 위 회로 연결용 스크린 프린팅 카본 페이스트입니다. 유연하거나 고르지 않은 표면에서도 전도성과 접착력이 일정합니다.',
      },
      'carbon-in-mold': {
        titleKr: '인몰드용 카본 전도성 잉크',
        description: '벤더블 특성으로 In-Mold Electronics에도 쓸 수 있는 스크린 프린팅 카본 전도성 잉크입니다.',
      },
      piezoelectric: {
        titleKr: '압전 잉크',
        description: 'PVDF-TrFe 기반 압전 잉크로 압력·충격·가속도·변형을 감지합니다. 인쇄 후 어닐링과 폴링을 거쳐야 기능이 활성화됩니다. 친환경 용제를 쓴 GPEInk01NP®도 있습니다.',
      },
      'piezoresistive-general': {
        titleKr: '압저항 잉크 (힘·압력 감지)',
        description: '기계적 변형에 따라 전기저항이 크게 변해, 단단하거나 유연한 기재 위에 힘·응력 센서를 만들 수 있습니다. 여러 용제에 쉽게 녹고 별도 후처리가 필요 없습니다.',
      },
      'piezoresistive-hard': {
        titleKr: '열가소성 압저항 잉크 (하드)',
        description: '저온 경화형 열가소성 압저항 잉크로, 인쇄전자용 압력·힘 센서에 쓰입니다. MELINEX·PET·Mylar·폴리카보네이트·아크릴·PVC 등 플라스틱에 접착력이 뛰어납니다.',
      },
      'piezoresistive-textile': {
        titleKr: '섬유용 압저항 잉크',
        description: '섬유에 직접 인쇄하는 카본 기반 압저항 잉크로, 신축성과 부드러운 촉감을 갖춰 웨어러블 압력 센서에 적합합니다.',
      },
      ferromagnetic: {
        titleKr: '강자성 잉크',
        description: '자기 응답이 큰 스크린 프린팅 강자성 잉크로, 분산성과 등방성이 높고 유연합니다.',
      },
      'ferromagnetic-stretchable': {
        titleKr: '수성 스트레처블 자성 잉크',
        description: '자석 효과를 내는 수성 스크린 프린팅 자성 잉크로, 알맞은 기재 위에서 늘어나며 섬유에도 인쇄할 수 있습니다.',
      },
      superparamagnetic: {
        titleKr: '초상자성 잉크',
        description: '여러 용제에 쉽게 녹는 스크린 프린팅 초상자성 잉크입니다. 단단하거나 유연한 기재 위에 자기 센서를 저비용으로 만들 수 있습니다.',
      },
    },
    substratesLabel: 'Substrates',
    tdsButton: '상세표 보기 (PDF)',
    inMold: {
      title: 'In-Mold Electronics 적용',
      intro: '인쇄된 회로 그래픽과 기능성 잉크를 열성형 후 사출성형까지 그대로 유지할 수 있어, 플라스틱 부품 안에 센서·LED·커넥터·배선을 통째로 내장하는 In-Mold Electronics 공정에 활용됩니다.',
      steps: {
        print: '스크린 인쇄 (회로 그래픽 + 기능성 잉크)',
        thermoform: '열성형 (Thermoforming)',
        injection: '사출성형 (Injection Molding)',
      },
      advantages: {
        weight: { title: '경량화', description: '부피가 큰 PCB를 없애고 센서·LED·커넥터·회로를 플라스틱 부품에 통합해 70% 이상 경량화할 수 있습니다.' },
        design: { title: '디자인 자유도', description: '배선·커넥터를 위한 여유 공간이 필요 없고, 정전용량 스위치를 자유롭게 설계할 수 있으며 설계 변경도 빠르게 반영됩니다.' },
        cost: { title: '원가 절감', description: '조립 공정이 단순해지고 연결부가 하나로 줄어들며, 부품·원자재 수 감소로 약 30% 원가 절감이 가능합니다.' },
        reliability: { title: '신뢰성 향상', description: '제조 단계가 줄고 움직이는 부품이 없어 고장 요인이 적으며, 회로 전체가 캡슐화되어 추가적인 보호를 받습니다.' },
      },
    },
    cta: {
      title: 'Conductive Ink 또는 Piezo Ink가 필요하신가요?',
      desc: '적용 분야와 인쇄 방식, 요구 스펙을 알려주시면 적합한 잉크 구성을 안내해드립니다.',
    },
    inquiryItems: [
      '적용 분야 (센서 / 웨어러블 / 인쇄전자 / In-Mold Electronics 등)',
      '인쇄 방식 및 기재(substrate) 종류',
      '요구 스펙 (저항값, 신축성, 내열 조건 등)',
      '필요 수량 및 납기',
    ],
  },
  en: {
    hero: {
      label: 'Products',
      title: 'PIEZO Ink',
      titleEn: 'Conductive & Piezo Ink',
      heading: 'Conductive & Piezo Ink',
      lead: [
        'Applicable to In-Mold Electronics, wearable sensors, printed electronics, smart textiles, and more.',
        'Piezoelectric ink that turns pressure into an electrical signal, conductive ink that prints circuits, piezoresistive ink that senses pressure as a change in resistance, and magnetic ink for magnetic patterns and sensors — a single printing process builds functional circuits and sensors.',
      ],
      heroAlt: 'Conductive & Piezo Ink product family',
    },
    catnavAria: 'Product categories',
    heroCards: [
      { title: 'In-Mold Electronics Ready', description: 'Combines with thermoforming and injection molding to embed circuits directly into plastic parts.' },
      { title: 'Pressure & Deformation Sensing', description: 'Piezoelectric and piezoresistive inks sense pressure, impact, and deformation as electrical signals.' },
      { title: 'Print-based Circuits', description: 'Screen printing alone builds conductive circuits and sensors directly onto the substrate.' },
      { title: 'Custom Formulation', description: 'Formulation and properties can be tuned to the application and required specs.' },
    ],
    categories: {
      conductive: {
        titleKr: 'Conductive Ink',
        intro: 'Silver, copper, and carbon inks that print conductive circuits directly onto a wide range of substrates by screen printing — from bendable and in-mold grades to transparent and stretchable ones.',
      },
      piezo: {
        titleKr: 'Piezo Ink',
        intro: 'Functional inks that convert pressure, impact, and deformation into electrical signals — split into piezoelectric and piezoresistive types, both realized purely through printing.',
      },
      magnetic: {
        titleKr: 'Magnetic Ink',
        intro: 'Inks with dispersed ferromagnetic or superparamagnetic particles that print magnetic patterns and magnetic sensors.',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: 'Bendable Conductive Silver Ink',
        description: 'A screen-printing silver conductive ink that behaves consistently before and after thermoforming, used for In-Mold Electronics.',
      },
      copper: {
        titleKr: 'Conductive Copper Ink for In-Mold Electronics',
        description: 'A screen-printing copper conductive ink for In-Mold Electronics.',
      },
      'transparent-silver': {
        titleKr: 'Transparent Silver Conductive Ink',
        description: 'A transparent conductive silver ink for thin-film PV, displays, sensors, and general printed electronics, printing transparent electrodes with over 94% transparency.',
      },
      'stretchable-silver': {
        titleKr: 'Stretchable Silver Conductive Ink',
        description: 'A stretchable screen-printing silver paste for wearable electronics, sensors, and medical devices.',
      },
      'water-based-carbon': {
        titleKr: 'Stretchable Water-Based Carbon Conductive Ink',
        description: 'A stretchable water-based carbon paste for wearable electronics, sensors, and medical devices. Cleans up with water or acetone.',
      },
      carbon: {
        titleKr: 'Carbon Conductive Ink',
        description: 'A screen-printable carbon paste for circuit interconnection on treated PET, PI, PC, and PVC, with consistent conductivity and strong adhesion even on flexible or irregular surfaces.',
      },
      'carbon-in-mold': {
        titleKr: 'Conductive Carbon Ink for In-Mold Electronics',
        description: 'A screen-printing carbon conductive ink that can also be used for In-Mold Electronics thanks to its bendable properties.',
      },
      piezoelectric: {
        titleKr: 'Piezoelectric Ink',
        description: 'A PVDF-TrFe-based piezoelectric ink that detects pressure, impact, acceleration, and deformation. Requires annealing and poling after printing. A green-solvent version, GPEInk01NP®, is also available.',
      },
      'piezoresistive-general': {
        titleKr: 'Piezoresistive Ink — Force & Pressure Sensing',
        description: 'Its electrical resistance changes strongly under mechanical deformation, enabling force and stress sensors on rigid or flexible substrates. Easily solubilized in various solvents, with no post-treatment needed.',
      },
      'piezoresistive-hard': {
        titleKr: 'Piezoresistive Ink — Thermoplastic (Hard)',
        description: 'A low-temperature-curable thermoplastic piezoresistive ink for pressure and force sensors in printed electronics, with excellent adhesion to MELINEX, PET, Mylar, polycarbonate, acrylates, and PVC.',
      },
      'piezoresistive-textile': {
        titleKr: 'Piezoresistive Ink for Textiles',
        description: 'A carbon-based piezoresistive ink for direct printing onto textiles, with high elasticity and a soft, velvety touch — suited to wearable pressure sensors.',
      },
      ferromagnetic: {
        titleKr: 'Ferromagnetic Ink',
        description: 'A screen-printable ferromagnetic ink with a high magnetic response, high dispersion and isotropy, and great flexibility.',
      },
      'ferromagnetic-stretchable': {
        titleKr: 'Magnetic Ink — Water-based, Stretchable',
        description: 'A water-based screen-printing magnetic ink with a magnet effect. Stretchable on an appropriate substrate and printable on textiles.',
      },
      superparamagnetic: {
        titleKr: 'Superparamagnetic Ink',
        description: 'A screen-printable superparamagnetic ink, easily solubilized in various solvents — a low-cost way to build magnetic sensors on rigid or flexible substrates.',
      },
    },
    substratesLabel: 'Substrates',
    tdsButton: 'View datasheet (PDF)',
    inMold: {
      title: 'In-Mold Electronics',
      intro: 'Printed circuit graphics and functional inks survive thermoforming and injection molding intact, enabling In-Mold Electronics processes that embed sensors, LEDs, connectors, and wiring directly inside a plastic part.',
      steps: {
        print: 'Screen Printing (graphics + functional inks)',
        thermoform: 'Thermoforming',
        injection: 'Injection Molding',
      },
      advantages: {
        weight: { title: 'Light Weight', description: 'Eliminates bulky PCBs and integrates sensors, LEDs, connectors, and circuitry into the plastic part — over 70% weight reduction.' },
        design: { title: 'Design Optimization', description: 'No dead space needed for wiring or connectors, capacitive switches can be designed freely, and design changes are quick to implement.' },
        cost: { title: 'Cost Reduction', description: 'Simplifies assembly to a single connection point and cuts the number of components and raw materials — around 30% cost savings.' },
        reliability: { title: 'Higher Reliability', description: 'Fewer manufacturing steps and no moving parts to fail, with the whole circuit fully encapsulated for extra protection.' },
      },
    },
    cta: {
      title: 'Need Conductive Ink or Piezo Ink?',
      desc: 'Tell us your application, printing method, and required specs, and we will recommend a suitable ink configuration.',
    },
    inquiryItems: [
      'Application (sensor / wearable / printed electronics / In-Mold Electronics, etc.)',
      'Printing method and substrate type',
      'Required specs (resistance, stretchability, thermal conditions, etc.)',
      'Required quantity and delivery timing',
    ],
  },
  zh: {
    hero: {
      label: '产品',
      title: 'PIEZO Ink',
      titleEn: 'Conductive & Piezo Ink',
      heading: '压电·导电油墨 (Conductive Piezo Ink)',
      lead: [
        '可应用于 In-Mold Electronics、可穿戴传感器、印刷电子、智能纺织品等多种领域。',
        '从受压产生电信号的压电（Piezoelectric）油墨、可印刷电路的导电（Conductive）油墨、将压力变化转换为电阻变化的压阻（Piezoresistive）油墨，到可印制磁性图案与磁传感器的磁性（Magnetic）油墨——仅通过印刷工艺即可实现功能电路与传感器。',
      ],
      heroAlt: 'Conductive & Piezo Ink 产品系列',
    },
    catnavAria: '产品类别',
    heroCards: [
      { title: 'In-Mold Electronics Ready', description: '与热成型、注塑成型工艺结合，可将电路直接嵌入塑料部件。' },
      { title: 'Pressure & Deformation Sensing', description: '压电与压阻油墨可将压力、冲击、形变感应为电信号。' },
      { title: 'Print-based Circuits', description: '仅通过丝网印刷即可在基材上直接实现导电电路与传感器。' },
      { title: 'Custom Formulation', description: '可根据应用领域与要求规格调整配方与物性。' },
    ],
    categories: {
      conductive: {
        titleKr: '导电油墨',
        intro: '通过丝网印刷将导电电路直接印制在各种基材上的银、铜、碳系油墨，涵盖可弯曲、模内电子用及透明、可拉伸等类型。',
      },
      piezo: {
        titleKr: '压电·压阻油墨',
        intro: '将压力、冲击、形变转换为电信号的功能性油墨，分为压电与压阻两种类型，均可仅通过印刷工艺实现。',
      },
      magnetic: {
        titleKr: '磁性油墨',
        intro: '分散有铁磁性或超顺磁性颗粒的油墨，仅通过印刷即可制作磁性图案与磁传感器。',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: '可弯曲导电银油墨',
        description: '一种丝网印刷银导电油墨，热成型前后性能一致，用于 In-Mold Electronics。',
      },
      copper: {
        titleKr: '模内电子用导电铜油墨',
        description: '可用于 In-Mold Electronics 的丝网印刷铜导电油墨。',
      },
      'transparent-silver': {
        titleKr: '透明导电银油墨',
        description: '用于薄膜光伏、显示器、传感器等印刷电子的透明导电银油墨，可印刷透光率 94% 以上的透明电极。',
      },
      'stretchable-silver': {
        titleKr: '可拉伸导电银油墨',
        description: '具有拉伸性的丝网印刷银浆，用于可穿戴电子、传感器及医疗设备。',
      },
      'water-based-carbon': {
        titleKr: '可拉伸水性碳导电油墨',
        description: '具有拉伸性的水性碳浆，用于可穿戴电子、传感器及医疗设备。可用水或丙酮清洗。',
      },
      carbon: {
        titleKr: '碳导电油墨',
        description: '用于经表面处理的 PET、PI、PC、PVC 基材上电路连接的丝网印刷碳浆，即使在柔性或不规则表面上也能保持稳定的导电性与附着力。',
      },
      'carbon-in-mold': {
        titleKr: '模内电子用碳导电油墨',
        description: '凭借可弯曲特性也可用于 In-Mold Electronics 的丝网印刷碳导电油墨。',
      },
      piezoelectric: {
        titleKr: '压电油墨',
        description: '基于 PVDF-TrFe 的压电油墨，可检测压力、冲击、加速度与形变。印刷后需经退火与极化处理才能发挥功能。另有采用环保溶剂的 GPEInk01NP®。',
      },
      'piezoresistive-general': {
        titleKr: '压阻油墨（力·压力感应）',
        description: '电阻随机械形变大幅变化，可在刚性或柔性基材上制作力与应力传感器。易溶于多种溶剂，无需后处理。',
      },
      'piezoresistive-hard': {
        titleKr: '热塑性压阻油墨（硬质）',
        description: '可低温固化的热塑性压阻油墨，用于印刷电子中的压力与力传感器，对 MELINEX、PET、Mylar、聚碳酸酯、丙烯酸及 PVC 等塑料附着力优异。',
      },
      'piezoresistive-textile': {
        titleKr: '纺织品用压阻油墨',
        description: '可直接印刷于纺织品的碳基压阻油墨，具有高弹性与柔软触感，适用于可穿戴压力传感器。',
      },
      ferromagnetic: {
        titleKr: '铁磁性油墨',
        description: '磁响应高的丝网印刷铁磁性油墨，分散性与各向同性高，柔韧性好。',
      },
      'ferromagnetic-stretchable': {
        titleKr: '水性可拉伸磁性油墨',
        description: '具有磁铁效果的水性丝网印刷磁性油墨，在合适的基材上可拉伸，也可印刷于纺织品。',
      },
      superparamagnetic: {
        titleKr: '超顺磁性油墨',
        description: '易溶于多种溶剂的丝网印刷超顺磁性油墨，可在刚性或柔性基材上低成本制作磁传感器。',
      },
    },
    substratesLabel: 'Substrates',
    tdsButton: '查看规格表 (PDF)',
    inMold: {
      title: 'In-Mold Electronics 应用',
      intro: '印刷的电路图案与功能性油墨可在热成型及注塑成型后依然保持完整，可用于将传感器、LED、连接器与线路直接嵌入塑料部件的 In-Mold Electronics 工艺。',
      steps: {
        print: '丝网印刷（图案 + 功能性油墨）',
        thermoform: '热成型',
        injection: '注塑成型',
      },
      advantages: {
        weight: { title: '轻量化', description: '省去体积庞大的 PCB，将传感器、LED、连接器与电路集成于塑料部件中，可实现 70% 以上的减重。' },
        design: { title: '设计自由度', description: '无需为布线和连接器预留空间，可自由设计电容式开关，设计变更也能快速实现。' },
        cost: { title: '成本降低', description: '简化组装流程，连接点合一，减少零部件与原材料数量，可节省约 30% 成本。' },
        reliability: { title: '可靠性提升', description: '制造工序减少，无可动部件，故障因素更少，整个电路被完全封装，获得额外保护。' },
      },
    },
    cta: {
      title: '需要导电油墨或压电/压阻油墨吗？',
      desc: '请告知应用领域、印刷方式及要求规格，我们将为您推荐合适的油墨配置。',
    },
    inquiryItems: [
      '应用领域（传感器 / 可穿戴 / 印刷电子 / In-Mold Electronics 等）',
      '印刷方式及基材种类',
      '要求规格（电阻值、拉伸性、耐热条件等）',
      '所需数量及交货时间',
    ],
  },
}

export default piezoInk
