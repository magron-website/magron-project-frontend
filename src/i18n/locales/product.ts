/**
 * `tiles` holds the home product-section copy, keyed by the Supabase
 * `product_explanations.sort_order`. Supabase supplies only the tile image;
 * the label reads `category | title` and the headline uses `subtitle`.
 */
const product = {
  ko: {
    tiles: {
      1: { category: '제품', title: 'Ferrofluid', subtitle: 'Vacuum Feedthrough용 자성유체' },
      2: { category: '제품', title: 'Feedthrough', subtitle: '진공 회전 피드스루' },
      3: { category: '제품', title: 'Reel Mag-Oil', subtitle: '낚시 릴 방수용 자성유체 오일' },
      4: { category: '제품', title: 'Magnet', subtitle: '자석 Assembly' },
      5: { category: '제품', title: 'PIEZO Ink', subtitle: 'Conductive Ink & PIEZO Ink' },
      6: { category: '응용 분야', title: 'Display', subtitle: '전시용 대형 자성유체 디스플레이' },
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
        subtitle: 'Gas & Dust Sealing Ferrofluid for Feedthroughs',
      },
      2: { category: 'Product', title: 'Feedthrough', subtitle: 'Vacuum Rotary Feedthrough' },
      3: {
        category: 'Product',
        title: 'Reel Mag-Oil',
        subtitle: 'Water-Proof Ferrofluid Oil for Fishing Reels',
      },
      4: { category: 'Product', title: 'Magnet', subtitle: 'Magnet and Magnetic Components' },
      5: { category: 'Product', title: 'PIEZO Ink', subtitle: 'Conductive & Piezo Ink' },
      6: { category: 'Application', title: 'Display', subtitle: 'Large-Scale Ferrofluid Display' },
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
      1: { category: '产品', title: '磁性流体', subtitle: '用于真空旋转导入装置的磁性流体' },
      2: { category: '产品', title: '真空旋转导入装置', subtitle: '真空旋转导入装置' },
      3: { category: '产品', title: 'Reel Mag-Oil', subtitle: '用于钓鱼线轮防水的磁性流体油' },
      4: { category: '产品', title: '磁铁', subtitle: '磁铁及磁性部件' },
      5: { category: '产品', title: 'PIEZO Ink', subtitle: '导电油墨与压电油墨' },
      6: { category: '应用领域', title: '显示器', subtitle: '大型磁性流体显示装置' },
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
