const messages = {
  ko: {
    // 챗봇 메시지는 마크다운으로 그린다(목록·굵게). 견적은 챗봇에 가격 자료가 없어
    // '담당자에게 답변 받기'(chatbot:contactButton)로 넘긴다 — 2026-10-10 B안 확정.
    chatWelcome:
      '안녕하세요! MAGRON 챗봇입니다. 이런 걸 물어보실 수 있어요.\n\n' +
      '- 자성유체(페로플루이드) 종류·사양·용도\n' +
      '- 간단한 견적·납기 문의\n' +
      '- 그 밖에 회사·제품에 대해 궁금한 점 무엇이든\n\n' +
      "정확한 견적이 필요하시면 아래 '**담당자에게 답변 받기**'를 눌러 주세요.",
    chatServerError: '서버 오류 ({{status}})',
    chatNoReply: '답변을 가져오지 못했습니다.',
    chatSendFailed: '메시지를 전송하지 못했습니다.',
    chatBotError: '죄송합니다. 답변을 가져오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    productNone: '등록된 제품 정보가 없습니다.',
    productLoadFailed: '제품 정보를 불러오지 못했습니다.',
    productNotFound: '제품을 찾을 수 없습니다.',
    heroNone: '등록된 캐러셀 슬라이드가 없습니다. Supabase RLS 정책을 확인해 주세요.',
    heroLoadFailed: '캐러셀을 불러오지 못했습니다.',
    ferroNone: '등록된 Ferrofluid 이미지가 없습니다.',
    ferroLoadFailed: 'Ferrofluid 이미지를 불러오지 못했습니다.',
    booksNone: '등록된 카탈로그가 없습니다.',
    booksLoadFailed: '카탈로그를 불러오지 못했습니다.',
    techNone: '등록된 기술자료가 없습니다.',
    techLoadFailed: '기술자료를 불러오지 못했습니다.',
  },
  en: {
    chatWelcome:
      'Hello! This is the MAGRON chatbot. You can ask me about:\n\n' +
      '- Ferrofluid types, specs and applications\n' +
      '- Quick quotes and lead times\n' +
      '- Anything else about our company or products\n\n' +
      "For an exact quote, click **'Get a reply from our team'** below.",
    chatServerError: 'Server error ({{status}})',
    chatNoReply: 'Could not get a reply.',
    chatSendFailed: 'Failed to send the message.',
    chatBotError:
      'Sorry, something went wrong while getting a reply. Please try again in a moment.',
    productNone: 'No product information is registered.',
    productLoadFailed: 'Failed to load product information.',
    productNotFound: 'Product not found.',
    heroNone: 'No carousel slides are registered. Please check the Supabase RLS policy.',
    heroLoadFailed: 'Failed to load the carousel.',
    ferroNone: 'No Ferrofluid images are registered.',
    ferroLoadFailed: 'Failed to load Ferrofluid images.',
    booksNone: 'No catalog is registered.',
    booksLoadFailed: 'Failed to load the catalog.',
    techNone: 'No technical documents are registered.',
    techLoadFailed: 'Failed to load the technical documents.',
  },
  zh: {
    chatWelcome:
      '您好！我是 MAGRON 聊天机器人。您可以咨询：\n\n' +
      '- 磁性流体的种类、规格与用途\n' +
      '- 简单报价与交期\n' +
      '- 关于公司和产品的其他任何问题\n\n' +
      '如需准确报价，请点击下方的“**请工作人员回复**”。',
    chatServerError: '服务器错误（{{status}}）',
    chatNoReply: '未能获取回复。',
    chatSendFailed: '消息发送失败。',
    chatBotError: '抱歉，获取回复时出现问题。请稍后重试。',
    productNone: '暂无已登记的产品信息。',
    productLoadFailed: '无法加载产品信息。',
    productNotFound: '未找到产品。',
    heroNone: '暂无已登记的轮播幻灯片。请检查 Supabase RLS 策略。',
    heroLoadFailed: '无法加载轮播。',
    ferroNone: '暂无已登记的 Ferrofluid 图片。',
    ferroLoadFailed: '无法加载 Ferrofluid 图片。',
    booksNone: '暂无已登记的产品目录。',
    booksLoadFailed: '无法加载产品目录。',
    techNone: '暂无已登记的技术资料。',
    techLoadFailed: '无法加载技术资料。',
  },
}

export default messages
