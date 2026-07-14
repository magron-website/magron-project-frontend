const magnet = {
  ko: {
    hero: {
      label: 'Products',
      title: '자석 Permanent MAGNET',
      titleEn: '산업용 영구자석 소재 및 등급별 Magnetic Properties',
      lead: 'Permanent Magnet은 모터, 센서, 발전기, 스피커, 자기 커플링, 자성유체 Seal, 의료기기, 전장부품, 자동화 장비 등 다양한 산업 분야에서 핵심 기능 부품으로 사용됩니다.',
      body: '사용 환경에 따라 요구되는 자속밀도, 보자력, 최대 에너지적, 내열성, 내식성, 가공성, 비용 조건이 다르기 때문에 적절한 자석 소재와 등급을 선택하는 것이 중요합니다.',
      heroAlt: '다양한 영구자석 제품군',
    },
    heroCards: [
      { title: 'NdFeB', description: '최고 수준의 자속밀도와 에너지적. 모터·센서·정밀기기용.' },
      { title: 'SmCo', description: '고온·내식 환경에서 안정적인 자기 특성 유지.' },
      { title: 'AlNiCo', description: '매우 낮은 온도계수와 높은 Curie 온도. 고온 계측용.' },
      { title: 'Ferrite', description: '경제적이고 내식성이 우수한 범용 영구자석.' },
    ],
    matnavAria: '자석 소재',
    glossaryTitle: '자기특성 용어 안내',
    glossaryIntro:
      '아래 특성표에서 공통으로 사용하는 자기 특성 용어입니다. 제품 선정 시 사용 온도와 요구 자기장 조건을 함께 검토하세요.',
    glossary: [
      { term: 'Br (Remanence)', desc: '잔류 자속밀도 — 자석이 유지하는 자속의 세기 (mT / kGs).' },
      { term: 'Hcb (Coercive Force)', desc: '보자력 — 자속밀도를 0으로 만드는 데 필요한 역자기장 (KA/m / kOe).' },
      { term: 'Hcj (Intrinsic Coercive Force)', desc: '고유 보자력 — 자화를 0으로 만드는 역자기장, 내열·감자 저항 지표.' },
      { term: '(BH)max (Max Energy Product)', desc: '최대 에너지적 — 자석이 낼 수 있는 에너지의 크기 (KJ/m³ / MGOe).' },
      { term: 'Tw / Tc', desc: 'Tw 최대 사용 온도, Tc 퀴리 온도(자성을 잃는 온도).' },
    ],
    families: [
      {
        id: 'ndfeb',
        name: 'NdFeB',
        nameKr: '네오디뮴 자석',
        intro:
          '현존하는 영구자석 중 가장 높은 자속밀도와 에너지적을 갖는 소재입니다. 소결(Sintered) 타입은 최고 성능을, 본디드(Bonded) 타입은 복잡한 형상과 정밀 치수를 구현합니다. 등급 접미사 M·H·SH·UH·EH는 내열 등급을 의미합니다.',
        tables: [
          { id: 'sintered-ndfeb', title: 'Sintered NdFeB 자석 자기특성표 및 물리특성표', description: '소결 네오디뮴 자석. N33~N52의 고자속 등급부터 최대 사용온도 200℃의 EH 등급까지 폭넓은 라인업을 제공합니다. 모터, 발전기, 센서, 자기 커플링, 자성유체 Seal 등에 사용됩니다.' },
          { id: 'bonded-compression-ndfeb', title: 'Bonded Compression NdFeB 자석 자기특성', description: '압축 성형 본디드 네오디뮴 자석(BNP 시리즈). 정밀한 치수와 얇은 링·박형 형상을 저비용으로 양산할 수 있어 소형 모터와 센서에 적합합니다.' },
          { id: 'bonded-injection-ndfeb', title: 'Bonded Injection NdFeB 자석 자기특성', description: '사출 성형 본디드 네오디뮴 자석(BNI 시리즈). 복잡한 3차원 형상, 인서트 일체 성형, 다극 착자가 가능하여 소형 정밀 부품에 활용됩니다.' },
          { id: 'magnetic-powder', title: 'Magnetic powder 특성표', description: '본디드 자석 제조에 사용되는 자성 분말(NM 시리즈)의 특성표입니다. 등급별 에너지적, 잔류 자속밀도, 퀴리 온도를 확인할 수 있습니다.' },
        ],
      },
      {
        id: 'smco',
        name: 'SmCo',
        nameKr: '사마륨코발트 자석',
        intro:
          '높은 사용 온도(250~350℃)와 우수한 내식성·온도 안정성을 갖는 소재입니다. NdFeB보다 감자에 강하고 온도계수가 낮아, 고온·정밀 자기 특성이 요구되는 환경에 적합합니다.',
        tables: [
          { id: 'smco', title: 'SmCo 자석 자기특성 및 물리특성표', description: 'Sm1Co5 및 Sm2Co17 계열과 저온계수(Low Temp Coeff) 등급을 포함합니다. 항공우주, 고온 모터, 센서, 자기 커플링 등 안정적인 자기 특성이 필요한 분야에 사용됩니다.' },
        ],
      },
      {
        id: 'alnico',
        name: 'AlNiCo',
        nameKr: '알니코 자석',
        intro:
          '매우 낮은 온도계수와 높은 퀴리 온도(약 810~860℃)를 갖는 소재로, 고온에서도 자속이 안정적입니다. 보자력은 낮지만 온도 안정성이 중요한 계측기·센서에 적합합니다.',
        tables: [
          { id: 'cast-alnico', title: 'Cast AlNiCo 자석 대표 자기특성', description: '주조(Cast) 방식 알니코 자석(LN·LNG·LNGT 시리즈). Isotropic/Anisotropic 등급과 MMPA 표준 대응 등급을 제공하며, 계측기·센서·발전기 등에 사용됩니다.' },
          { id: 'sintered-alnico', title: 'Sintered AlNiCo 자석 대표 자기특성', description: '소결(Sintered) 방식 알니코 자석(SAlNiCo 시리즈). 주조 대비 소형·정밀 형상과 균일한 특성 구현에 유리하며, 소형 센서와 계측 부품에 적합합니다.' },
        ],
      },
      {
        id: 'ferrite',
        name: 'Ferrite',
        nameKr: '페라이트 자석',
        intro:
          '경제적이면서 내식성이 우수한 범용 영구자석입니다. 자기력은 상대적으로 낮지만 가격 경쟁력과 안정성이 높아 스피커, 모터, 각종 산업용 부품에 폭넓게 사용됩니다.',
        tables: [
          { id: 'ferrite', title: 'Ferrite 자석 대표 자기특성', description: '하드 페라이트 자석(Y 시리즈)의 등급별 자기특성표입니다. 등급별 Br, Hc, BHc, J(BH)max 값을 SI 단위와 CGS 단위로 함께 제공합니다.' },
        ],
      },
    ],
    cta: {
      title: '자석 소재 선정이 필요하신가요?',
      desc: '적용 제품과 사용 환경, 요구 자기 특성을 알려주시면 적합한 자석 소재와 등급을 검토해드립니다. 형상·치수·착자 방향에 맞춘 맞춤 제작도 가능합니다.',
      items: [
        '적용 제품 / 장비 종류',
        '요구 자기 특성 (자속밀도 · 보자력 · 에너지적)',
        '사용 온도 및 부식 환경',
        '형상 · 치수 · 착자 방향',
        '필요 수량 및 납기',
      ],
    },
  },
  en: {
    hero: {
      label: 'Products',
      title: 'Permanent Magnet',
      titleEn: 'Industrial permanent-magnet materials and magnetic properties by grade',
      lead: 'Permanent magnets are used as key functional components across many industries — motors, sensors, generators, speakers, magnetic couplings, ferrofluid seals, medical devices, automotive electronics, and automation equipment.',
      body: 'Because the required magnetic flux density, coercivity, maximum energy product, heat resistance, corrosion resistance, machinability, and cost differ by operating environment, selecting the right magnet material and grade is essential.',
      heroAlt: 'A range of permanent-magnet products',
    },
    heroCards: [
      { title: 'NdFeB', description: 'Top-class flux density and energy product. For motors, sensors, and precision devices.' },
      { title: 'SmCo', description: 'Stable magnetic properties in high-temperature, corrosion-prone environments.' },
      { title: 'AlNiCo', description: 'Very low temperature coefficient and high Curie temperature. For high-temperature measurement.' },
      { title: 'Ferrite', description: 'An economical, corrosion-resistant general-purpose permanent magnet.' },
    ],
    matnavAria: 'Magnet materials',
    glossaryTitle: 'Magnetic Property Terms',
    glossaryIntro:
      'These are the magnetic-property terms used throughout the tables below. When selecting a product, also review the operating temperature and required magnetic-field conditions.',
    glossary: [
      { term: 'Br (Remanence)', desc: 'Residual flux density — the strength of flux the magnet retains (mT / kGs).' },
      { term: 'Hcb (Coercive Force)', desc: 'Coercive force — the reverse field needed to bring flux density to zero (KA/m / kOe).' },
      { term: 'Hcj (Intrinsic Coercive Force)', desc: 'Intrinsic coercive force — the reverse field that brings magnetization to zero; an index of heat and demagnetization resistance.' },
      { term: '(BH)max (Max Energy Product)', desc: 'Maximum energy product — the magnitude of energy the magnet can deliver (KJ/m³ / MGOe).' },
      { term: 'Tw / Tc', desc: 'Tw: maximum operating temperature; Tc: Curie temperature (at which magnetism is lost).' },
    ],
    families: [
      {
        id: 'ndfeb',
        name: 'NdFeB',
        nameKr: 'Neodymium Magnet',
        intro:
          "The material with the highest flux density and energy product among today's permanent magnets. The sintered type delivers top performance, while the bonded type realizes complex shapes and precise dimensions. Grade suffixes M·H·SH·UH·EH indicate heat-resistance classes.",
        tables: [
          { id: 'sintered-ndfeb', title: 'Sintered NdFeB — magnetic & physical properties', description: 'Sintered neodymium magnets. A broad lineup from high-flux N33–N52 grades to EH grades rated up to 200°C. Used in motors, generators, sensors, magnetic couplings, ferrofluid seals, and more.' },
          { id: 'bonded-compression-ndfeb', title: 'Bonded Compression NdFeB — magnetic properties', description: 'Compression-molded bonded neodymium magnets (BNP series). Precise dimensions and thin ring/slim shapes can be mass-produced at low cost, suiting small motors and sensors.' },
          { id: 'bonded-injection-ndfeb', title: 'Bonded Injection NdFeB — magnetic properties', description: 'Injection-molded bonded neodymium magnets (BNI series). Complex 3D shapes, insert-integrated molding, and multi-pole magnetization enable use in small precision components.' },
          { id: 'magnetic-powder', title: 'Magnetic powder — properties', description: 'Properties of the magnetic powder (NM series) used to manufacture bonded magnets. Energy product, residual flux density, and Curie temperature are listed by grade.' },
        ],
      },
      {
        id: 'smco',
        name: 'SmCo',
        nameKr: 'Samarium-Cobalt Magnet',
        intro:
          'A material with high operating temperatures (250–350°C) and excellent corrosion resistance and temperature stability. More resistant to demagnetization than NdFeB and with a lower temperature coefficient, it suits environments requiring high-temperature, precise magnetic properties.',
        tables: [
          { id: 'smco', title: 'SmCo — magnetic & physical properties', description: 'Includes the Sm1Co5 and Sm2Co17 families and low-temperature-coefficient grades. Used where stable magnetic properties are required — aerospace, high-temperature motors, sensors, magnetic couplings, etc.' },
        ],
      },
      {
        id: 'alnico',
        name: 'AlNiCo',
        nameKr: 'AlNiCo Magnet',
        intro:
          'A material with a very low temperature coefficient and high Curie temperature (approx. 810–860°C), keeping flux stable even at high temperatures. Coercivity is low, but it suits instruments and sensors where temperature stability matters.',
        tables: [
          { id: 'cast-alnico', title: 'Cast AlNiCo — representative magnetic properties', description: 'Cast AlNiCo magnets (LN·LNG·LNGT series). Isotropic/anisotropic grades and MMPA-standard grades are offered, used in instruments, sensors, generators, and more.' },
          { id: 'sintered-alnico', title: 'Sintered AlNiCo — representative magnetic properties', description: 'Sintered AlNiCo magnets (SAlNiCo series). Compared with casting, better for small, precise shapes and uniform properties — suited to small sensors and measurement components.' },
        ],
      },
      {
        id: 'ferrite',
        name: 'Ferrite',
        nameKr: 'Ferrite Magnet',
        intro:
          'An economical, corrosion-resistant general-purpose permanent magnet. Its magnetic force is relatively low, but strong price competitiveness and stability make it widely used in speakers, motors, and various industrial parts.',
        tables: [
          { id: 'ferrite', title: 'Ferrite — representative magnetic properties', description: 'Grade-by-grade magnetic-property table for hard ferrite magnets (Y series). Br, Hc, BHc, and J(BH)max values are provided in both SI and CGS units.' },
        ],
      },
    ],
    cta: {
      title: 'Do you need help selecting a magnet material?',
      desc: 'Tell us your application, operating environment, and required magnetic properties, and we will review a suitable magnet material and grade. Custom manufacturing to your shape, dimensions, and magnetization direction is also available.',
      items: [
        'Application product / equipment type',
        'Required magnetic properties (flux density · coercivity · energy product)',
        'Operating temperature and corrosion environment',
        'Shape · dimensions · magnetization direction',
        'Required quantity and delivery date',
      ],
    },
  },
  zh: {
    hero: {
      label: '产品',
      title: '永久磁铁 Permanent Magnet',
      titleEn: '工业用永久磁铁材料及各等级磁性特性',
      lead: '永久磁铁作为核心功能部件，广泛用于电机、传感器、发电机、扬声器、磁耦合、磁流体密封（Seal）、医疗器械、汽车电子部件、自动化设备等众多工业领域。',
      body: '由于不同使用环境所需的磁通密度、矫顽力、最大磁能积、耐热性、耐腐蚀性、加工性及成本条件各不相同，因此选择合适的磁铁材料与等级至关重要。',
      heroAlt: '多种永久磁铁产品系列',
    },
    heroCards: [
      { title: 'NdFeB', description: '顶级磁通密度与磁能积。适用于电机·传感器·精密仪器。' },
      { title: 'SmCo', description: '在高温·腐蚀环境中保持稳定的磁性能。' },
      { title: 'AlNiCo', description: '极低的温度系数与高居里温度。适用于高温计测。' },
      { title: 'Ferrite', description: '经济实惠且耐腐蚀的通用型永久磁铁。' },
    ],
    matnavAria: '磁铁材料',
    glossaryTitle: '磁性特性术语说明',
    glossaryIntro:
      '以下是下方特性表中通用的磁性特性术语。选型时请同时考虑使用温度与所需磁场条件。',
    glossary: [
      { term: 'Br (Remanence)', desc: '剩余磁通密度 — 磁铁保持的磁通强度 (mT / kGs)。' },
      { term: 'Hcb (Coercive Force)', desc: '矫顽力 — 使磁通密度归零所需的反向磁场 (KA/m / kOe)。' },
      { term: 'Hcj (Intrinsic Coercive Force)', desc: '内禀矫顽力 — 使磁化归零的反向磁场，是耐热·抗退磁能力的指标。' },
      { term: '(BH)max (Max Energy Product)', desc: '最大磁能积 — 磁铁可输出能量的大小 (KJ/m³ / MGOe)。' },
      { term: 'Tw / Tc', desc: 'Tw 最高使用温度，Tc 居里温度（失去磁性的温度）。' },
    ],
    families: [
      {
        id: 'ndfeb',
        name: 'NdFeB',
        nameKr: '钕磁铁',
        intro:
          '现存永久磁铁中拥有最高磁通密度与磁能积的材料。烧结（Sintered）型提供最高性能，粘结（Bonded）型可实现复杂形状与精密尺寸。等级后缀 M·H·SH·UH·EH 表示耐热等级。',
        tables: [
          { id: 'sintered-ndfeb', title: 'Sintered NdFeB 磁铁磁性及物理特性表', description: '烧结钕磁铁。提供从 N33~N52 高磁通等级到最高使用温度 200℃ 的 EH 等级的丰富系列。用于电机、发电机、传感器、磁耦合、磁流体密封（Seal）等。' },
          { id: 'bonded-compression-ndfeb', title: 'Bonded Compression NdFeB 磁铁磁性特性', description: '压缩成型粘结钕磁铁（BNP 系列）。可低成本量产精密尺寸及薄环·薄型形状，适用于小型电机与传感器。' },
          { id: 'bonded-injection-ndfeb', title: 'Bonded Injection NdFeB 磁铁磁性特性', description: '注塑成型粘结钕磁铁（BNI 系列）。可实现复杂三维形状、嵌件一体成型及多极充磁，用于小型精密部件。' },
          { id: 'magnetic-powder', title: 'Magnetic powder 特性表', description: '用于制造粘结磁铁的磁性粉末（NM 系列）特性表。可查看各等级的磁能积、剩余磁通密度及居里温度。' },
        ],
      },
      {
        id: 'smco',
        name: 'SmCo',
        nameKr: '钐钴磁铁',
        intro:
          '具有高使用温度（250~350℃）及优异耐腐蚀性·温度稳定性的材料。较 NdFeB 更抗退磁且温度系数更低，适用于要求高温·精密磁性能的环境。',
        tables: [
          { id: 'smco', title: 'SmCo 磁铁磁性及物理特性表', description: '包含 Sm1Co5 及 Sm2Co17 系列与低温度系数（Low Temp Coeff）等级。用于航空航天、高温电机、传感器、磁耦合等需要稳定磁性能的领域。' },
        ],
      },
      {
        id: 'alnico',
        name: 'AlNiCo',
        nameKr: '铝镍钴磁铁',
        intro:
          '具有极低温度系数与高居里温度（约 810~860℃）的材料，即使在高温下磁通也保持稳定。矫顽力较低，但适用于重视温度稳定性的仪表·传感器。',
        tables: [
          { id: 'cast-alnico', title: 'Cast AlNiCo 磁铁代表性磁性特性', description: '铸造（Cast）铝镍钴磁铁（LN·LNG·LNGT 系列）。提供 Isotropic/Anisotropic 等级及符合 MMPA 标准的等级，用于仪表·传感器·发电机等。' },
          { id: 'sintered-alnico', title: 'Sintered AlNiCo 磁铁代表性磁性特性', description: '烧结（Sintered）铝镍钴磁铁（SAlNiCo 系列）。相比铸造，更利于实现小型·精密形状与均匀特性，适用于小型传感器与计测部件。' },
        ],
      },
      {
        id: 'ferrite',
        name: 'Ferrite',
        nameKr: '铁氧体磁铁',
        intro:
          '经济实惠且耐腐蚀的通用型永久磁铁。磁力相对较低，但价格竞争力与稳定性高，广泛用于扬声器、电机及各类工业部件。',
        tables: [
          { id: 'ferrite', title: 'Ferrite 磁铁代表性磁性特性', description: '硬铁氧体磁铁（Y 系列）各等级磁性特性表。提供各等级的 Br、Hc、BHc、J(BH)max 值（SI 单位与 CGS 单位）。' },
        ],
      },
    ],
    cta: {
      title: '您需要磁铁材料选型吗？',
      desc: '请告知应用产品、使用环境及所需磁性能，我们将为您评估合适的磁铁材料与等级。也可按形状·尺寸·充磁方向进行定制生产。',
      items: [
        '应用产品 / 设备种类',
        '所需磁性能（磁通密度·矫顽力·磁能积）',
        '使用温度及腐蚀环境',
        '形状·尺寸·充磁方向',
        '所需数量及交货期',
      ],
    },
  },
}

export default magnet
