/**
 * `tiles` holds the home product-section copy, keyed by the Supabase
 * `product_explanations.sort_order`. Supabase supplies only the tile image;
 * the label reads `category | title` and the headline uses `subtitle`.
 */
const product = {
  ko: {
    tiles: {
      1: {
        category: '제품',
        title: 'Ferrofluid',
        subtitle: 'For semiconductor equipment\nVacuum Feedthrough용 자성유체',
      },
      2: { category: '제품', title: 'Feedthrough', subtitle: '진공 회전 피드스루' },
      3: {
        category: '제품',
        title: 'Daiwa Reel Mag-Oil',
        subtitle: 'Daiwa 낚시 릴\n방수용 자성유체 오일',
      },
      4: { category: '제품', title: 'Magnet', subtitle: '자석 & Assembly' },
      5: {
        category: '제품',
        title: 'Conductive & PIEZO Ink',
        subtitle: 'In mold Conductive ink\nPiezo ink',
      },
      6: { category: '제품', title: 'Display', subtitle: '전시용 대형 자성유체 디스플레이' },
    },
    sectionAria: '제품 소개',
    heading: '제품 정보',
    loadError: '제품 정보를 불러올 수 없습니다.',
    tileDetailAria: '{{title}} 상세 보기',
    statusNotFound: '제품을 찾을 수 없습니다.',
    statusBack: '홈으로 돌아가기',
    catalogDownload: '카탈로그 다운로드',
    productInquiry: '제품문의',
    inquiryNote: '문의 시 전달하면 좋은 정보',
    contactNote: '문의사항은 magron@magron.co.kr 로 해주시기 바랍니다.',
  },
  en: {
    tiles: {
      1: {
        category: 'Product',
        title: 'Ferrofluid',
        subtitle: 'For semiconductor equipment\nGas & Dust Sealing Ferrofluid',
      },
      2: { category: 'Product', title: 'Feedthrough', subtitle: 'Vacuum Rotary Feedthrough' },
      3: {
        category: 'Product',
        title: 'Daiwa Reel Mag-Oil',
        subtitle: 'Daiwa Fishing Reel\nWater-Proof Ferrofluid Oil',
      },
      4: { category: 'Product', title: 'Magnet', subtitle: 'Magnet & Assembly' },
      5: {
        category: 'Product',
        title: 'Conductive & PIEZO Ink',
        subtitle: 'In mold Conductive ink\nPiezo ink',
      },
      6: { category: 'Product', title: 'Display', subtitle: 'Large-Scale Ferrofluid Display' },
    },
    sectionAria: 'Product introduction',
    heading: 'Products',
    loadError: 'Unable to load product information.',
    tileDetailAria: 'View {{title}} details',
    statusNotFound: 'Product not found.',
    statusBack: 'Back to home',
    catalogDownload: 'Download Catalog',
    productInquiry: 'Product Inquiry',
    inquiryNote: 'Helpful information to include in your inquiry',
    contactNote: 'For inquiries, please contact magron@magron.co.kr.',
  },
  zh: {
    tiles: {
      1: {
        category: '产品',
        title: '磁性流体',
        subtitle: 'For semiconductor equipment\n用于真空旋转导入装置的磁性流体',
      },
      2: { category: '产品', title: '真空旋转导入装置', subtitle: '真空旋转导入装置' },
      3: {
        category: '产品',
        title: 'Daiwa Reel Mag-Oil',
        subtitle: 'Daiwa 钓鱼线轮\n防水磁性流体油',
      },
      4: { category: '产品', title: '磁铁', subtitle: '磁铁 & 组件' },
      5: {
        category: '产品',
        title: 'Conductive & PIEZO Ink',
        subtitle: 'In mold Conductive ink\nPiezo ink',
      },
      6: { category: '产品', title: '显示器', subtitle: '大型磁性流体显示装置' },
    },
    sectionAria: '产品介绍',
    heading: '产品信息',
    loadError: '无法加载产品信息。',
    tileDetailAria: '查看 {{title}} 详情',
    statusNotFound: '未找到产品。',
    statusBack: '返回首页',
    catalogDownload: '下载产品目录',
    productInquiry: '产品咨询',
    inquiryNote: '咨询时建议提供的信息',
    contactNote: '如有咨询，请联系 magron@magron.co.kr。',
  },
}

export default product
