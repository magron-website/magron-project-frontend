/**
 * Hero copy lives here, keyed by the Supabase `hero_slides.sort_order`.
 * Supabase supplies only the slide image — the wording below is what renders.
 */
const hero = {
  ko: {
    carouselError: '캐러셀을 불러올 수 없습니다.',
    pause: '슬라이드 일시정지',
    play: '슬라이드 재생',
    prevSlide: '이전 슬라이드',
    nextSlide: '다음 슬라이드',
    slides: {
      1: {
        title: 'MAGRON',
        subtitle: '자성유체와 관련 부품 등을 전문적으로 제작·공급하는 회사',
        description: '당사의 제품은 반도체, 태양전지, 디스플레이 장비, 전자제품, 자동차 등에 사용됩니다.',
        buttonText: '회사소개',
      },
      2: {
        title: 'Ferrofluid Technology',
        subtitle: '반도체 공정에 사용되는 유해가스 및 분진차단용 자성유체',
        description: '자성유체 기반 기술을 통해 정밀 산업용 응용 솔루션을 제공합니다.',
        buttonText: '제품정보',
      },
      3: {
        title: 'Vacuum Feedthrough',
        subtitle: '진공 환경을 위한 안정적인 회전 전달 기술',
        description: '진공 장비와 정밀 설비에 필요한 Feedthrough 제품과 관련 부품을 제공합니다.',
        buttonText: '제품정보',
      },
      4: {
        title: 'About MAGRON',
        subtitle: '신속한 업무 처리, 높은 품질, 경쟁력 있는 가격',
        description: '언제든지 문의해 주세요. 항상 준비되어 있습니다.',
        buttonText: '문의하기',
      },
    },
  },
  en: {
    carouselError: 'Unable to load the carousel.',
    pause: 'Pause slide',
    play: 'Play slide',
    prevSlide: 'Previous slide',
    nextSlide: 'Next slide',
    slides: {
      1: {
        title: 'MAGRON',
        subtitle:
          'A company specializing in the manufacture and supply of ferrofluids and related components',
        description:
          'Our products are used in semiconductors, solar cells, display equipment, electronics, automobiles, and other industries.',
        buttonText: 'About Us',
      },
      2: {
        title: 'Ferrofluid Technology',
        subtitle: 'Ferrofluid for blocking hazardous gases and dust',
        description:
          'We provide precision industrial application solutions based on ferrofluid technology.',
        buttonText: 'Products',
      },
      3: {
        title: 'Vacuum Feedthrough',
        subtitle: 'Reliable rotary transmission technology for vacuum environments',
        description:
          'We provide feedthrough products and related components for vacuum equipment and precision systems.',
        buttonText: 'Products',
      },
      4: {
        title: 'About MAGRON',
        subtitle: 'Fast service, high quality, and competitive pricing',
        description: 'Please contact us at any time. We are always ready to assist you.',
        buttonText: 'Contact Us',
      },
    },
  },
  zh: {
    carouselError: '无法加载轮播。',
    pause: '暂停幻灯片',
    play: '播放幻灯片',
    prevSlide: '上一张',
    nextSlide: '下一张',
    slides: {
      1: {
        title: 'MAGRON',
        subtitle: '专业制造和供应磁性流体及相关零部件的公司',
        description: '我们的产品广泛应用于半导体、太阳能电池、显示设备、电子产品和汽车等领域。',
        buttonText: '公司介绍',
      },
      2: {
        title: '磁性流体技术',
        subtitle: '用于阻隔有害气体和粉尘的磁性流体',
        description: '我们通过磁性流体技术提供精密工业应用解决方案。',
        buttonText: '产品信息',
      },
      3: {
        title: '真空旋转导入装置',
        subtitle: '适用于真空环境的稳定旋转传动技术',
        description: '我们提供用于真空设备和精密系统的旋转导入装置及相关零部件。',
        buttonText: '产品信息',
      },
      4: {
        title: '关于 MAGRON',
        subtitle: '快速响应、高品质和具有竞争力的价格',
        description: '欢迎随时联系我们。我们始终准备为您提供帮助。',
        buttonText: '联系我们',
      },
    },
  },
}

export default hero
