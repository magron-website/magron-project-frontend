/**
 * 문의·오시는 길 화면.
 * 주소·전화는 푸터(footer.ts)와 같은 값이어야 한다 — 바꿀 때는 두 곳을 같이 고친다.
 * 지도는 iframe 대신 지도 서비스 링크로 둔다(외부 쿠키·로딩 없이 바로 열림).
 */
const contact = {
  ko: {
    eyebrow: 'Contact',
    title: '문의·오시는 길',
    lead: '견적·기술 문의는 이메일 magron@magron.co.kr 또는 전화 031-500-4633(해외 +82-31-500-4632)으로 받습니다. 해외에서도 화상 회의를 요청하실 수 있습니다.',
    channelsTitle: '연락처',
    channels: [
      { label: '이메일', value: 'magron@magron.co.kr', href: 'mailto:magron@magron.co.kr' },
      { label: '전화 (국내)', value: '031-500-4633', href: 'tel:+82315004633' },
      { label: '전화 (해외)', value: '+82-31-500-4632', href: 'tel:+82315004632' },
      { label: '팩스', value: '031-500-4631' },
    ],
    chatbotNote:
      '사이트의 챗봇에서 "담당자에게 답변 받기"로 이메일을 남기셔도 담당자가 답변드립니다.',
    quoteTitle: '견적 문의 때 알려주시면 빠른 정보',
    quoteItems: [
      '제품 또는 모델명 (예: MFF-M 자성유체, 진공 피드스루)',
      '수량과 희망 납기',
      '사용 장비·공정 (반도체·디스플레이 진공 장비 등)',
      '필요 조건: 사용 온도, 진공도, 회전수, 축 지름 등',
      '도면이나 사진이 있으면 첨부',
    ],
    locationTitle: '오시는 길',
    company: '(주)마그론',
    address: '(15588) 경기도 안산시 상록구 해안로 705 경기테크노파크 3동 403호',
    mapQuery: '경기도 안산시 상록구 해안로 705 경기테크노파크',
    mapsLabel: '지도에서 보기',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Contact & Location',
    lead: 'For quotes and technical questions, email magron@magron.co.kr or call +82-31-500-4632. Video calls can be arranged from anywhere in the world.',
    channelsTitle: 'Contact details',
    channels: [
      { label: 'Email', value: 'magron@magron.co.kr', href: 'mailto:magron@magron.co.kr' },
      { label: 'Phone (international)', value: '+82-31-500-4632', href: 'tel:+82315004632' },
      { label: 'Phone (Korea)', value: '031-500-4633', href: 'tel:+82315004633' },
      { label: 'Fax', value: '+82-31-500-4631' },
    ],
    chatbotNote:
      'You can also leave your email through "Get a reply from our team" in the site chatbot, and our staff will reply.',
    quoteTitle: 'For a faster quote, please include',
    quoteItems: [
      'Product or model (e.g. MFF-M ferrofluid, vacuum feedthrough)',
      'Quantity and required delivery date',
      'Equipment or process (e.g. semiconductor or display vacuum tools)',
      'Operating conditions: temperature, vacuum level, rotation speed, shaft diameter',
      'Drawings or photos, if available',
    ],
    locationTitle: 'Location',
    company: 'MAGRON Co., Ltd.',
    address:
      '(15588) #403, Bldg 3, Gyeonggi Technopark, 705 Haean-ro, Sangnok-gu, Ansan-si, Gyeonggi-do, Korea',
    mapQuery: '705 Haean-ro, Sangnok-gu, Ansan-si, Gyeonggi-do, Korea',
    mapsLabel: 'Open in maps',
  },
  zh: {
    eyebrow: 'Contact',
    title: '联系我们·交通指南',
    lead: '报价及技术咨询请发送邮件至 magron@magron.co.kr，或致电 +82-31-500-4632。身在海外也可预约视频会议。',
    channelsTitle: '联系方式',
    channels: [
      { label: '邮箱', value: 'magron@magron.co.kr', href: 'mailto:magron@magron.co.kr' },
      { label: '电话（海外）', value: '+82-31-500-4632', href: 'tel:+82315004632' },
      { label: '电话（韩国国内）', value: '031-500-4633', href: 'tel:+82315004633' },
      { label: '传真', value: '+82-31-500-4631' },
    ],
    chatbotNote: '也可以在网站聊天机器人中通过“请工作人员回复”留下邮箱，我们的工作人员会回复您。',
    quoteTitle: '询价时请提供以下信息，以便更快报价',
    quoteItems: [
      '产品或型号（例：MFF-M 磁流体、真空馈通）',
      '数量及希望交期',
      '使用设备或工艺（半导体、显示器真空设备等）',
      '使用条件：温度、真空度、转速、轴径等',
      '如有图纸或照片请一并附上',
    ],
    locationTitle: '交通指南',
    company: 'MAGRON 有限公司',
    address: '(15588) 韩国京畿道安山市常绿区海岸路705 京畿科技园3栋403号',
    mapQuery: '705 Haean-ro, Sangnok-gu, Ansan-si, Gyeonggi-do, Korea',
    mapsLabel: '在地图中查看',
  },
}

export default contact
