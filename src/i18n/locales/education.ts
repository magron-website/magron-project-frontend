const education = {
  ko: {
    hero: {
      label: 'Products',
      title: '자성유체 키트',
      titleEn: 'Ferrofluid Kit',
      lead: [
        '자성유체의 독특한 움직임과 자기장 반응을 직접 관찰하고 다뤄볼 수 있는 실험용 키트입니다. 자성유체와 세척액·에칭제·코팅제로 구성되어 있어, 자성유체 실험과 표면 처리 과정을 함께 체험할 수 있습니다.',
        '과학 교육, 학교 실험, 전시 체험, 콘텐츠 제작, 연구용 데모에 활용할 수 있습니다.',
      ],
      heroAlt: '자성유체 키트',
    },
    heroCards: [
      { title: '자기장 반응 관찰', description: '자석에 반응하는 자성유체의 스파이크 형태를 직접 관찰합니다.' },
      { title: '직접 제작 체험', description: '구성품을 이용해 자성유체를 만들고 다루는 과정을 경험합니다.' },
      { title: '교육·전시 활용', description: '과학 교육, 전시 체험, 콘텐츠 제작, 연구 데모에 활용됩니다.' },
    ],
    compose: {
      title: '제품 구성',
      prose: '자성유체 키트는 자성유체와 세척액, 에칭제, 코팅제로 구성됩니다. 각 구성품은 자성유체 실험과 표면 처리 과정에서 각기 다른 역할을 합니다.',
    },
    detailTitle: '구성품별 상세',
    components: {
      ferrofluid: {
        nameKr: '자성유체',
        body: '자성을 띠는 나노 입자가 액체 안에 안정적으로 분산된 기능성 유체입니다. 자석을 가까이 가져가면 입자가 자기장 방향으로 정렬되어 뾰족한 스파이크 형태를 만듭니다.',
        bullets: [
          '자석 반응 시 나노 입자가 자기장 방향으로 정렬되어 스파이크 형태를 형성합니다.',
          '비휘발성 베이스 오일을 사용하여 장시간 형태와 성능이 유지됩니다.',
          '키트의 핵심 구성품으로, 실험과 관찰의 기준이 되는 유체입니다.',
        ],
        videoLabels: ['자성유체 비휘발성 실험 영상', '자성유체 내구성 비교 영상'],
      },
      'clear-liquid': {
        nameKr: '세척액(투명액)',
        body: '자성유체의 희석과 세척에 사용하는 투명 용액입니다. 실험 후 잔여 자성유체를 정리하거나 농도를 조절할 때 사용합니다.',
        bullets: [
          '자성유체 희석 및 세척 용도로 사용합니다.',
          '실험 후 도구와 용기 세척에 활용할 수 있습니다.',
          '투명한 상태로 자성유체의 움직임을 관찰하기 좋습니다.',
        ],
        videoLabels: ['자성유체 지속 실험 영상', '자성유체 유동성 확인 영상'],
      },
      'etching-agent': {
        nameKr: '에칭제',
        body: '표면 식각(에칭) 처리를 위한 용액입니다. 대상 표면을 부식·가공하여 자성유체가 안정적으로 반응할 수 있는 상태를 만듭니다.',
        bullets: [
          '표면 식각(에칭) 처리 용도로 사용합니다.',
          '처리 대상의 표면 상태에 따라 사용량과 시간이 달라집니다.',
        ],
        note: '※ 에칭 처리 후에는 반드시 세척과 후처리가 필요합니다. 취급 시 안전에 유의하세요.',
        videoLabels: [],
      },
      'coating-agent': {
        nameKr: '코팅제',
        body: '표면 코팅·보호 처리를 위한 용액입니다. 표면에 보호막을 형성하여 내구성과 안정성을 높이는 목적으로 사용합니다.',
        bullets: [
          '표면 코팅 및 보호 처리 용도로 사용합니다.',
          '코팅 후 자성유체의 반응 안정성을 높이는 데 도움을 줍니다.',
        ],
        note: '※ 정확한 사용 방법과 처리 순서는 문의 주시면 함께 안내해 드립니다.',
        videoLabels: [],
      },
    },
    packaging: {
      title: '제품 수량 및 패키징',
      prose: '자성유체는 100㎖ 단위로, 세척액·에칭제·코팅제는 1,000㎖ 단위로 제공됩니다. 사용 목적과 수량에 맞춰 구성을 조정할 수 있습니다.',
      videoLabels: ['Ferrofluid 실험 영상', '1,000㎖ 제품 실험 영상'],
    },
    principle: {
      title: '동작 원리',
      text: [
        '자성유체는 계면활성제로 코팅된 자성 나노 입자가 베이스 오일 안에 균일하게 분산되어 있는 유체입니다. 평소에는 일반 액체처럼 흐르지만, 외부 자기장이 가해지면 입자들이 자기력선 방향으로 정렬됩니다.',
        '이때 표면장력과 자기력이 균형을 이루면서 자성유체 특유의 뾰족한 스파이크 패턴이 나타납니다. 자석의 세기와 위치를 바꾸면 패턴의 모양과 움직임도 함께 변합니다.',
      ],
      highlight: '자성유체는 “자석에 반응하는 액체”로, 자기장에 따라 살아 움직이는 듯한 패턴을 만들어냅니다.',
    },
    making: {
      title: '제작 방법',
      prose: '키트 구성품을 이용해 표면 처리부터 자성유체 적용까지의 과정을 순서대로 진행할 수 있습니다. 자세한 과정은 아래 영상과 카탈로그를 통해 확인하실 수 있습니다.',
      steps: [
        '키트 구성품(자성유체·세척액·에칭제·코팅제)과 실험 도구를 준비합니다.',
        '실험 표면 또는 대상을 에칭제로 처리한 뒤 세척액으로 깨끗이 세척합니다.',
        '코팅제로 표면을 코팅하여 보호막을 형성합니다.',
        '자성유체를 원하는 위치에 적용하고 자석으로 반응을 확인합니다.',
        '실험이 끝나면 세척액으로 도구와 표면을 정리합니다.',
      ],
      videoLabel: '자성유체 키트 사용법 영상',
      imageAlt: '자성유체 키트 사용 예시',
    },
    cta: {
      title: '자성유체 키트가 필요하신가요?',
      desc: '교육용, 전시용, 체험용, 연구 데모용 등 사용 목적에 따라 필요한 구성과 수량이 달라질 수 있습니다. 사용 목적을 알려주시면 적합한 자성유체 키트 구성을 안내해드립니다.',
      items: [
        '사용 목적: 교육 / 전시 / 체험 / 연구 데모',
        '필요한 구성과 수량',
        '자성유체 용량 (100㎖ / 1,000㎖ 등)',
        '납품 시기 및 배송 지역',
      ],
    },
    videoBadge: '영상 준비중',
  },
  en: {
    hero: {
      label: 'Products',
      title: 'Ferrofluid Kit',
      titleEn: '',
      lead: [
        'An experiment kit that lets you directly observe and handle the unique motion and magnetic-field response of ferrofluid. It consists of ferrofluid plus cleaning, etching, and coating agents, so you can experience both ferrofluid experiments and surface treatment.',
        'It can be used for science education, school experiments, exhibition experiences, content creation, and research demos.',
      ],
      heroAlt: 'Ferrofluid kit',
    },
    heroCards: [
      { title: 'Observe magnetic response', description: 'Directly observe the spike shapes of ferrofluid reacting to a magnet.' },
      { title: 'Hands-on making', description: 'Experience making and handling ferrofluid using the components.' },
      { title: 'Education & exhibition', description: 'Used for science education, exhibitions, content creation, and research demos.' },
    ],
    compose: {
      title: 'Kit Contents',
      prose: 'The ferrofluid kit consists of ferrofluid, cleaning liquid, etching agent, and coating agent. Each component plays a different role in ferrofluid experiments and surface treatment.',
    },
    detailTitle: 'Component Details',
    components: {
      ferrofluid: {
        nameKr: 'Ferrofluid',
        body: 'A functional fluid in which magnetic nanoparticles are stably dispersed in a liquid. Bringing a magnet close aligns the particles along the field, forming pointed spike shapes.',
        bullets: [
          'When reacting to a magnet, nanoparticles align along the field to form spike shapes.',
          'A non-volatile base oil keeps its shape and performance for a long time.',
          'The core component of the kit — the reference fluid for experiments and observation.',
        ],
        videoLabels: ['Ferrofluid non-volatility test video', 'Ferrofluid durability comparison video'],
      },
      'clear-liquid': {
        nameKr: 'Clear liquid (cleaning solution)',
        body: 'A clear solution used to dilute and clean ferrofluid. Use it to clean up residual ferrofluid after experiments or to adjust concentration.',
        bullets: [
          'Used for diluting and cleaning ferrofluid.',
          'Can be used to clean tools and containers after experiments.',
          'Its transparency makes ferrofluid motion easy to observe.',
        ],
        videoLabels: ['Ferrofluid persistence test video', 'Ferrofluid fluidity check video'],
      },
      'etching-agent': {
        nameKr: 'Etching agent',
        body: 'A solution for surface etching. It corrodes and processes the target surface to create a state where ferrofluid can react stably.',
        bullets: [
          'Used for surface etching.',
          'The amount and time vary with the surface condition of the target.',
        ],
        note: '※ Cleaning and post-treatment are required after etching. Handle with care for safety.',
        videoLabels: [],
      },
      'coating-agent': {
        nameKr: 'Coating agent',
        body: 'A solution for surface coating and protection. It forms a protective film on the surface to enhance durability and stability.',
        bullets: [
          'Used for surface coating and protection.',
          'Helps improve the reaction stability of ferrofluid after coating.',
        ],
        note: '※ For the exact usage and processing order, please contact us and we will guide you.',
        videoLabels: [],
      },
    },
    packaging: {
      title: 'Quantity & Packaging',
      prose: 'Ferrofluid is supplied in 100 ml units, and the cleaning, etching, and coating agents in 1,000 ml units. The configuration can be adjusted to your purpose and quantity.',
      videoLabels: ['Ferrofluid experiment video', '1,000 ml product experiment video'],
    },
    principle: {
      title: 'Operating Principle',
      text: [
        'Ferrofluid is a fluid in which magnetic nanoparticles coated with a surfactant are uniformly dispersed in a base oil. Normally it flows like an ordinary liquid, but when an external magnetic field is applied, the particles align along the magnetic field lines.',
        "Surface tension and magnetic force then balance, producing the characteristic pointed spike pattern of ferrofluid. Changing the magnet's strength and position also changes the shape and motion of the pattern.",
      ],
      highlight: 'Ferrofluid is a "liquid that responds to magnets," creating patterns that seem alive as the magnetic field changes.',
    },
    making: {
      title: 'How to Use',
      prose: 'Using the kit components, you can proceed step by step from surface treatment to ferrofluid application. See the video and catalog below for the detailed process.',
      steps: [
        'Prepare the kit components (ferrofluid, cleaning liquid, etching agent, coating agent) and experiment tools.',
        'Treat the experiment surface or target with the etching agent, then clean it thoroughly with the cleaning liquid.',
        'Coat the surface with the coating agent to form a protective film.',
        'Apply ferrofluid to the desired spot and check its reaction with a magnet.',
        'When finished, clean the tools and surface with the cleaning liquid.',
      ],
      videoLabel: 'Ferrofluid kit usage video',
      imageAlt: 'Example of using the ferrofluid kit',
    },
    cta: {
      title: 'Do you need a ferrofluid kit?',
      desc: 'The required configuration and quantity can differ by purpose — education, exhibition, hands-on experience, research demos, etc. Tell us your purpose and we will recommend a suitable ferrofluid kit configuration.',
      items: [
        'Purpose: education / exhibition / hands-on / research demo',
        'Required configuration and quantity',
        'Ferrofluid volume (100 ml / 1,000 ml, etc.)',
        'Delivery timing and shipping region',
      ],
    },
    videoBadge: 'Video coming soon',
  },
  zh: {
    hero: {
      label: '产品',
      title: '磁流体套件',
      titleEn: 'Ferrofluid Kit',
      lead: [
        '可亲自观察并操作磁流体独特运动与磁场反应的实验套件。由磁流体与清洗液·蚀刻剂·涂层剂组成，可同时体验磁流体实验与表面处理过程。',
        '可用于科学教育、学校实验、展览体验、内容制作及研究演示。',
      ],
      heroAlt: '磁流体套件',
    },
    heroCards: [
      { title: '观察磁场反应', description: '亲自观察磁流体对磁铁反应形成的尖峰形态。' },
      { title: '亲手制作体验', description: '利用组件体验制作与操作磁流体的过程。' },
      { title: '教育·展览应用', description: '用于科学教育、展览体验、内容制作及研究演示。' },
    ],
    compose: {
      title: '产品构成',
      prose: '磁流体套件由磁流体、清洗液、蚀刻剂与涂层剂组成。各组件在磁流体实验与表面处理过程中分别发挥不同作用。',
    },
    detailTitle: '各组件详情',
    components: {
      ferrofluid: {
        nameKr: '磁流体',
        body: '磁性纳米颗粒稳定分散于液体中的功能性流体。将磁铁靠近时，颗粒沿磁场方向排列，形成尖锐的尖峰形态。',
        bullets: [
          '对磁铁反应时，纳米颗粒沿磁场方向排列形成尖峰形态。',
          '采用非挥发性基础油，可长时间保持形态与性能。',
          '套件的核心组件，是实验与观察的基准流体。',
        ],
        videoLabels: ['磁流体非挥发性实验视频', '磁流体耐久性对比视频'],
      },
      'clear-liquid': {
        nameKr: '清洗液（透明液）',
        body: '用于稀释与清洗磁流体的透明溶液。实验后可用于清理残余磁流体或调节浓度。',
        bullets: [
          '用于稀释及清洗磁流体。',
          '可用于实验后清洗工具与容器。',
          '透明状态便于观察磁流体的运动。',
        ],
        videoLabels: ['磁流体持续性实验视频', '磁流体流动性确认视频'],
      },
      'etching-agent': {
        nameKr: '蚀刻剂',
        body: '用于表面蚀刻处理的溶液。通过腐蚀·加工目标表面，营造磁流体可稳定反应的状态。',
        bullets: [
          '用于表面蚀刻处理。',
          '用量与时间因处理对象的表面状态而异。',
        ],
        note: '※ 蚀刻处理后务必进行清洗与后处理。操作时请注意安全。',
        videoLabels: [],
      },
      'coating-agent': {
        nameKr: '涂层剂',
        body: '用于表面涂层·保护处理的溶液。在表面形成保护膜，以提高耐久性与稳定性。',
        bullets: [
          '用于表面涂层及保护处理。',
          '涂层后有助于提高磁流体的反应稳定性。',
        ],
        note: '※ 具体使用方法与处理顺序，如有咨询我们将一并说明。',
        videoLabels: [],
      },
    },
    packaging: {
      title: '产品数量及包装',
      prose: '磁流体以 100㎖ 为单位，清洗液·蚀刻剂·涂层剂以 1,000㎖ 为单位提供。可根据使用目的与数量调整配置。',
      videoLabels: ['Ferrofluid 实验视频', '1,000㎖ 产品实验视频'],
    },
    principle: {
      title: '工作原理',
      text: [
        '磁流体是由表面活性剂包覆的磁性纳米颗粒均匀分散于基础油中的流体。平时像普通液体一样流动，但施加外部磁场时，颗粒会沿磁力线方向排列。',
        '此时表面张力与磁力达到平衡，呈现磁流体特有的尖峰图案。改变磁铁的强度与位置，图案的形状与运动也随之变化。',
      ],
      highlight: '磁流体是"对磁铁作出反应的液体"，会随磁场产生仿佛活着般运动的图案。',
    },
    making: {
      title: '制作方法',
      prose: '利用套件组件，可按顺序完成从表面处理到磁流体应用的过程。详细过程可通过下方视频与目录查看。',
      steps: [
        '准备套件组件（磁流体·清洗液·蚀刻剂·涂层剂）与实验工具。',
        '用蚀刻剂处理实验表面或对象，然后用清洗液彻底清洗。',
        '用涂层剂涂覆表面，形成保护膜。',
        '将磁流体应用于所需位置，用磁铁确认反应。',
        '实验结束后，用清洗液清理工具与表面。',
      ],
      videoLabel: '磁流体套件使用方法视频',
      imageAlt: '磁流体套件使用示例',
    },
    cta: {
      title: '您需要磁流体套件吗？',
      desc: '教育、展览、体验、研究演示等不同使用目的，所需配置与数量可能不同。请告知使用目的，我们将为您推荐合适的磁流体套件配置。',
      items: [
        '使用目的：教育 / 展览 / 体验 / 研究演示',
        '所需配置与数量',
        '磁流体容量（100㎖ / 1,000㎖ 等）',
        '交货时间及配送地区',
      ],
    },
    videoBadge: '视频准备中',
  },
}

export default education
