const piezoInk = {
  ko: {
    hero: {
      label: 'Products',
      title: 'PIEZO Ink',
      titleEn: 'Conductive & Piezo Ink',
      lead: [
        '압력에 반응해 전기 신호를 발생시키는 압전(Piezoelectric) 잉크, 인쇄 회로를 구현하는 전도성(Conductive) 잉크, 압력 변화를 저항 변화로 감지하는 압저항(Piezoresistive) 잉크까지 — 인쇄 공정 하나로 기능성 회로와 센서를 구현하는 잉크 라인업입니다.',
        'In-Mold Electronics, 웨어러블 센서, 인쇄 전자, 스마트 텍스타일 등 다양한 분야에 적용할 수 있습니다.',
      ],
      heroAlt: 'Conductive & Piezo Ink 제품군',
    },
    catnavAria: '제품 카테고리',
    heroCards: [
      { title: 'Print-based Circuits', description: '스크린 프린팅만으로 소재 위에 전도성 회로와 센서를 직접 구현합니다.' },
      { title: 'Pressure & Deformation Sensing', description: '압전·압저항 잉크로 압력, 충격, 변형을 전기 신호로 감지합니다.' },
      { title: 'In-Mold Electronics Ready', description: '열성형·사출성형 공정과 결합해 플라스틱 부품에 회로를 그대로 내장할 수 있습니다.' },
      { title: 'Custom Formulation', description: '적용 분야와 요구 사양에 맞춰 배합과 물성을 조정할 수 있습니다.' },
    ],
    categories: {
      conductive: {
        titleKr: '전도성 잉크',
        intro: '스크린 프린팅 방식으로 각종 소재 위에 전도성 회로를 직접 인쇄하는 잉크 라인업입니다. 대부분 In-Mold Electronics(사출성형 전자소자) 공정에도 바로 적용할 수 있습니다.',
      },
      piezo: {
        titleKr: '압전 · 압저항 잉크',
        intro: '압력·충격·변형을 전기 신호로 변환하는 기능성 잉크입니다. 압전(Piezoelectric) 방식과 압저항(Piezoresistive) 방식으로 나뉘며, 인쇄 공정만으로 센서를 직접 구현할 수 있습니다.',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: '벤더블 전도성 실버 잉크',
        description: '스크린 프린팅용 실버 전도성 잉크로, 열성형(thermoforming) 전후 성능이 안정적으로 유지되어 In-Mold Electronics에 적합합니다. PVC, PET, TPU, 폴리카보네이트, 아크릴레이트, 폴리우레탄 등 다양한 소재에 인쇄할 수 있습니다.',
      },
      copper: {
        titleKr: '전도성 코퍼(구리) 잉크',
        description: '저온 경화가 가능한 스크린 프린팅 구리 전도성 잉크로, 벤더블 특성 덕분에 In-Mold Electronics에도 활용할 수 있습니다.',
      },
      'transparent-silver': {
        titleKr: '투명 전도성 실버 잉크',
        description: '박막 태양전지, 디스플레이, 센서 등 투명 전극이 필요한 인쇄전자 응용에 사용하는 수성 투명 전도성 실버 잉크입니다. 90% 이상의 투명도와 낮은 면저항을 동시에 확보했습니다.',
      },
      'stretchable-silver': {
        titleKr: '스트레처블 전도성 실버 잉크',
        description: '신축성을 갖춘 스크린 프린팅 실버 페이스트로, 웨어러블 전자기기·스마트 텍스타일·의료기기 등에 활용됩니다. 원단(fabric), TPU, PET, 폴리이미드, 엘라스토머, 유리 등 다양한 소재에 인쇄할 수 있습니다.',
      },
      'water-based-carbon': {
        titleKr: '수성 카본 전도성 잉크',
        description: '높은 신축성을 갖춘 수성 카본 페이스트로, 웨어러블 전자기기·센서·의료기기 등에 활용됩니다. 텍스타일, 엘라스토머, PET, 폴리이미드, 유리 등에 인쇄할 수 있습니다.',
      },
      piezoelectric: {
        titleKr: '압전 잉크',
        description: 'PVDF-TrFe 기반의 스크린 프린팅 압전 잉크로, 압력·충격·가속도·변형을 감지할 수 있습니다. 인쇄 후 어닐링과 폴링(poling) 공정을 거쳐야 압전 특성이 활성화됩니다. 친환경 용제를 사용한 그린 버전 GPEInk01NP®도 있습니다.',
      },
      'piezoresistive-general': {
        titleKr: '압저항 잉크 (일반형)',
        description: '다양한 용제에 쉽게 녹아 별도의 고가 후처리 공정 없이 압저항 특성을 낼 수 있는 카본 기반 잉크입니다.',
      },
      'piezoresistive-solvent-free': {
        titleKr: '무용제형 압저항 잉크',
        description: '무용제·저온 경화가 가능한 카본 기반 압저항 잉크로, 인쇄전자용 압력 센서에 활용됩니다.',
      },
      'piezoresistive-textile': {
        titleKr: '섬유용 압저항 잉크',
        description: '섬유 기재에 직접 인쇄할 수 있는 카본 기반 압저항 잉크로, 우수한 신축성과 부드러운 촉감을 갖춰 웨어러블 압력 센서에 적합합니다.',
      },
    },
    substratesLabel: 'Substrates',
    noDatasheet: '상세 스펙은 문의 시 안내해드립니다.',
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
      lead: [
        'From piezoelectric ink that generates an electrical signal under pressure, to conductive ink that prints circuits, to piezoresistive ink that senses pressure as a change in resistance — a single printing process builds functional circuits and sensors.',
        'Applicable to In-Mold Electronics, wearable sensors, printed electronics, smart textiles, and more.',
      ],
      heroAlt: 'Conductive & Piezo Ink product family',
    },
    catnavAria: 'Product categories',
    heroCards: [
      { title: 'Print-based Circuits', description: 'Screen printing alone builds conductive circuits and sensors directly onto the substrate.' },
      { title: 'Pressure & Deformation Sensing', description: 'Piezoelectric and piezoresistive inks sense pressure, impact, and deformation as electrical signals.' },
      { title: 'In-Mold Electronics Ready', description: 'Combines with thermoforming and injection molding to embed circuits directly into plastic parts.' },
      { title: 'Custom Formulation', description: 'Formulation and properties can be tuned to the application and required specs.' },
    ],
    categories: {
      conductive: {
        titleKr: 'Conductive Ink',
        intro: 'A lineup of inks that print conductive circuits directly onto a variety of substrates via screen printing. Most are ready for In-Mold Electronics processes.',
      },
      piezo: {
        titleKr: 'Piezo Ink',
        intro: 'Functional inks that convert pressure, impact, and deformation into electrical signals — split into piezoelectric and piezoresistive types, both realized purely through printing.',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: 'Bendable Conductive Silver Ink',
        description: 'A screen-printing silver conductive ink with consistent performance before and after thermoforming, well suited to In-Mold Electronics. Printable on PVC, PET, TPU, polycarbonate, acrylates, and polyurethane.',
      },
      copper: {
        titleKr: 'Conductive Copper Ink',
        description: 'A low-temperature-curing screen-printing copper conductive ink. Its bendable properties make it suitable for In-Mold Electronics as well.',
      },
      'transparent-silver': {
        titleKr: 'Transparent Silver Conductive Ink',
        description: 'A water-based transparent conductive silver ink for printed-electronics applications that need a transparent electrode — thin-film PV, displays, sensors. Combines over 90% transparency with low sheet resistance.',
      },
      'stretchable-silver': {
        titleKr: 'Stretchable Silver Conductive Ink',
        description: 'A stretchable screen-printing silver paste used in wearable electronics, smart textiles, and medical devices. Printable on fabric, TPU, PET, polyimide, elastomers, and glass.',
      },
      'water-based-carbon': {
        titleKr: 'Water-based Carbon Conductive Ink',
        description: 'A highly stretchable water-based carbon paste for wearable electronics, sensors, and medical devices. Printable on textiles, elastomers, PET, polyimide, and glass.',
      },
      piezoelectric: {
        titleKr: 'Piezoelectric Ink',
        description: 'A PVDF-TrFe-based screen-printing piezoelectric ink that senses pressure, impact, acceleration, and deformation. Requires annealing and poling after printing to activate its piezoelectric properties. A green-solvent version, GPEInk01NP®, is also available.',
      },
      'piezoresistive-general': {
        titleKr: 'Piezoresistive Ink — General',
        description: 'A carbon-based ink that dissolves easily in a range of solvents and exhibits piezoresistive behavior without any special, costly post-treatment.',
      },
      'piezoresistive-solvent-free': {
        titleKr: 'Solvent-free Piezoresistive Ink',
        description: 'A solvent-free, low-temperature-curing carbon-based piezoresistive ink used for pressure sensors in printed-electronics applications.',
      },
      'piezoresistive-textile': {
        titleKr: 'Piezoresistive Ink for Textiles',
        description: 'A carbon-based piezoresistive ink for direct printing onto textiles, with excellent elasticity and a soft, velvety touch — suited to wearable pressure sensors.',
      },
    },
    substratesLabel: 'Substrates',
    noDatasheet: 'Detailed specs available on request.',
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
      lead: [
        '从受压产生电信号的压电（Piezoelectric）油墨、可印刷电路的导电（Conductive）油墨，到将压力变化转换为电阻变化的压阻（Piezoresistive）油墨——仅通过印刷工艺即可实现功能电路与传感器。',
        '可应用于 In-Mold Electronics、可穿戴传感器、印刷电子、智能纺织品等多种领域。',
      ],
      heroAlt: 'Conductive & Piezo Ink 产品系列',
    },
    catnavAria: '产品类别',
    heroCards: [
      { title: 'Print-based Circuits', description: '仅通过丝网印刷即可在基材上直接实现导电电路与传感器。' },
      { title: 'Pressure & Deformation Sensing', description: '压电与压阻油墨可将压力、冲击、形变感应为电信号。' },
      { title: 'In-Mold Electronics Ready', description: '与热成型、注塑成型工艺结合，可将电路直接嵌入塑料部件。' },
      { title: 'Custom Formulation', description: '可根据应用领域与要求规格调整配方与物性。' },
    ],
    categories: {
      conductive: {
        titleKr: '导电油墨',
        intro: '通过丝网印刷将导电电路直接印制在各种基材上的油墨系列。大部分产品可直接应用于 In-Mold Electronics 工艺。',
      },
      piezo: {
        titleKr: '压电·压阻油墨',
        intro: '将压力、冲击、形变转换为电信号的功能性油墨，分为压电与压阻两种类型，均可仅通过印刷工艺实现。',
      },
    },
    products: {
      'bendable-silver': {
        titleKr: '可弯曲导电银浆',
        description: '一种丝网印刷银导电油墨，在热成型前后性能保持稳定，适用于 In-Mold Electronics。可印刷于 PVC、PET、TPU、聚碳酸酯、丙烯酸酯及聚氨酯等多种基材。',
      },
      copper: {
        titleKr: '导电铜油墨',
        description: '一种可低温固化的丝网印刷铜导电油墨，凭借可弯曲特性也可用于 In-Mold Electronics。',
      },
      'transparent-silver': {
        titleKr: '透明导电银油墨',
        description: '一种水性透明导电银油墨，适用于需要透明电极的印刷电子应用，如薄膜光伏、显示器、传感器等。透明度超过 90%，同时具备低方阻。',
      },
      'stretchable-silver': {
        titleKr: '可拉伸导电银油墨',
        description: '一种可拉伸的丝网印刷银浆，用于可穿戴电子、智能纺织品及医疗设备。可印刷于织物、TPU、PET、聚酰亚胺、弹性体及玻璃等材料。',
      },
      'water-based-carbon': {
        titleKr: '水性碳导电油墨',
        description: '一种高拉伸性的水性碳浆，用于可穿戴电子、传感器及医疗设备。可印刷于纺织品、弹性体、PET、聚酰亚胺及玻璃。',
      },
      piezoelectric: {
        titleKr: '压电油墨',
        description: '一种基于 PVDF-TrFe 的丝网印刷压电油墨，可感应压力、冲击、加速度与形变。印刷后需经退火与极化处理以激活压电特性。另提供采用环保溶剂的绿色版本 GPEInk01NP®。',
      },
      'piezoresistive-general': {
        titleKr: '压阻油墨（通用型）',
        description: '一种可轻松溶于多种溶剂的碳基油墨，无需特殊昂贵的后处理工艺即可呈现压阻特性。',
      },
      'piezoresistive-solvent-free': {
        titleKr: '无溶剂型压阻油墨',
        description: '一种无溶剂、可低温固化的碳基压阻油墨，用于印刷电子应用中的压力传感器。',
      },
      'piezoresistive-textile': {
        titleKr: '纺织品用压阻油墨',
        description: '一种可直接印刷于纺织品的碳基压阻油墨，具有优异的弹性与柔软触感，适用于可穿戴压力传感器。',
      },
    },
    substratesLabel: 'Substrates',
    noDatasheet: '详细规格可通过咨询获取。',
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
