/**
 * 개인정보처리방침 (개인정보 보호법 제30조).
 *
 * 홈페이지가 실제로 받는 정보만 적는다 — 챗봇(질문·"담당자에게 답변 받기"),
 * 이메일 문의, GA4 방문 통계, 챗봇 요청 제한용 IP. 회원가입·결제는 홈페이지에
 * 없고 쇼핑몰(ferrofluidshop.com)이 따로 방침을 둔다.
 * 챗봇 동의 문구(chatbot.ts contactConsentDetail)의 보유 기간(1년)과 맞춰야 한다.
 * 영어·중국어판은 편의용이며 한국어판이 우선한다.
 */

type Table = { head: string[]; rows: string[][] }
type Section = { title: string; paragraphs?: string[]; items?: string[]; table?: Table; after?: string[] }

const ko: { eyebrow: string; title: string; effective: string; intro: string; sections: Section[] } = {
  eyebrow: 'Privacy',
  title: '개인정보처리방침',
  effective: '시행일: 2026년 10월 16일',
  intro:
    '(주)마그론(이하 "회사")은 「개인정보 보호법」에 따라 홈페이지(magron.kr) 이용자의 개인정보를 보호하고 관련 고충을 빠르게 처리하기 위해 이 방침을 둡니다. 온라인 쇼핑몰(ferrofluidshop.com)은 쇼핑몰의 개인정보처리방침을 따릅니다.',
  sections: [
    {
      title: '1. 처리하는 개인정보 항목, 목적, 보유 기간',
      paragraphs: ['홈페이지에는 회원가입과 결제 기능이 없습니다. 회사는 아래 정보만 처리합니다.'],
      table: {
        head: ['구분', '항목', '목적', '보유 기간'],
        rows: [
          ['챗봇 "담당자에게 답변 받기"', '이메일(필수), 이름·회사명(선택), 대화 내용', '문의 답변, 견적 상담', '접수일로부터 1년'],
          ['챗봇 질문', '질문·답변 내용, 질문한 페이지, 화면 언어 (이름·연락처는 받지 않음)', '답변 제공, 문의 내용 확인', '1년'],
          ['이메일·전화 문의', '이메일 주소, 이름, 회사명, 전화번호 등 문의하며 보내주신 정보', '문의 답변, 견적·거래 상담', '문의 처리 후 1년 (거래가 이뤄지면 관계 법령에 따른 기간)'],
          ['자동 수집', '쿠키, 방문 기록(본 페이지, 유입 경로, 기기·브라우저 정보)', '방문 통계, 홈페이지 개선', '14개월'],
          ['자동 수집', 'IP 주소 (챗봇 이용 시)', '과도한 요청 방지', '최대 1일'],
        ],
      },
    },
    {
      title: '2. 개인정보의 파기',
      items: [
        '보유 기간이 끝나거나 처리 목적을 이루면 지체 없이 파기합니다.',
        '전자 파일은 복구할 수 없는 방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.',
        '관계 법령에 따라 보관해야 하는 정보는 다른 정보와 분리해 그 기간 동안만 보관합니다.',
      ],
    },
    {
      title: '3. 개인정보의 제3자 제공',
      paragraphs: [
        '회사는 개인정보를 제3자에게 제공하지 않습니다. 다만 정보주체가 동의하거나 법률에 특별한 규정이 있는 경우는 예외로 합니다.',
      ],
    },
    {
      title: '4. 처리 위탁과 국외 이전',
      paragraphs: ['회사는 홈페이지 운영을 위해 아래 업체에 처리를 맡기며, 이 과정에서 개인정보가 국외로 이전됩니다.'],
      table: {
        head: ['수탁자', '맡기는 업무', '이전 국가', '이전 항목', '보유 기간'],
        rows: [
          ['OpenAI, L.L.C.', '챗봇 답변 생성', '미국', '챗봇 질문 내용', '수탁자 정책에 따름 (최대 30일)'],
          ['Railway Corporation', '챗봇 서버 운영', '미국', '챗봇 질문 내용, IP 주소', '처리 즉시 삭제 (IP는 최대 1일)'],
          ['Microsoft Corporation', '회사 메일(Microsoft 365)로 문의 전달·보관', '미국 등 Microsoft 데이터센터 소재국', '문의 내용, 이메일, 이름·회사명', '1번 표의 보유 기간'],
          ['Google LLC', '방문 통계 (Google Analytics)', '미국', '쿠키, 방문 기록', '14개월'],
        ],
      },
      after: [
        '이전 시기와 방법: 홈페이지·챗봇을 이용할 때 네트워크로 전송합니다.',
        '국외 이전을 원하지 않으면 챗봇 대신 이메일·전화로 문의하시고, 브라우저에서 쿠키를 차단하실 수 있습니다.',
      ],
    },
    {
      title: '5. 정보주체의 권리와 행사 방법',
      items: [
        '정보주체는 언제든지 개인정보의 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.',
        '아래 7번의 이메일·전화로 요청하시면 지체 없이 조치합니다. 법정대리인이나 위임받은 사람을 통해서도 요청할 수 있습니다.',
      ],
    },
    {
      title: '6. 쿠키 등 자동 수집 장치',
      items: [
        '회사는 방문 통계를 위해 Google Analytics 쿠키(_ga 등)를 사용합니다. 이름·연락처는 담지 않습니다.',
        '브라우저 설정에서 쿠키를 거부할 수 있습니다. 예: Chrome 설정 > 개인정보 보호 및 보안 > 서드 파티 쿠키.',
        '쿠키를 거부해도 홈페이지 이용에는 제한이 없습니다.',
      ],
    },
    {
      title: '7. 개인정보 보호책임자와 문의처',
      items: [
        '담당: (주)마그론 개인정보 보호 담당',
        '전화: 031-500-4633',
        '이메일: magron@magron.co.kr',
      ],
    },
    {
      title: '8. 안전성 확보 조치',
      items: [
        '개인정보에 접근하는 담당자를 최소화합니다.',
        '홈페이지와 챗봇의 모든 통신은 HTTPS로 암호화합니다.',
        '문의 메일함은 권한을 받은 담당자만 열 수 있습니다.',
      ],
    },
    {
      title: '9. 권익 침해 구제',
      paragraphs: ['개인정보 침해에 대한 신고나 상담은 아래 기관에 하실 수 있습니다.'],
      items: [
        '개인정보침해신고센터: privacy.kisa.or.kr / 국번 없이 118',
        '개인정보분쟁조정위원회: www.kopico.go.kr / 1833-6972',
        '대검찰청: www.spo.go.kr / 국번 없이 1301',
        '경찰청: ecrm.police.go.kr / 국번 없이 182',
      ],
    },
    {
      title: '10. 방침의 변경',
      paragraphs: ['이 방침은 2026년 10월 16일부터 적용합니다. 내용이 바뀌면 시행 7일 전에 이 페이지에 알립니다.'],
    },
  ],
}

const en: typeof ko = {
  eyebrow: 'Privacy',
  title: 'Privacy Policy',
  effective: 'Effective date: October 16, 2026',
  intro:
    'MAGRON Co., Ltd. ("we") protects the personal information of visitors to magron.kr under the Korean Personal Information Protection Act. This English version is provided for convenience; the Korean version prevails. Our online shop (ferrofluidshop.com) has its own policy.',
  sections: [
    {
      title: '1. What we collect, why, and for how long',
      paragraphs: ['This website has no sign-up or payment features. We process only the following.'],
      table: {
        head: ['Source', 'Items', 'Purpose', 'Retention'],
        rows: [
          ['Chatbot "Get a reply from our team"', 'Email (required), name/company (optional), conversation', 'Replying to inquiries and quotes', '1 year from submission'],
          ['Chatbot questions', 'Questions and answers, page, display language (no name or contact details)', 'Answering and reviewing inquiries', '1 year'],
          ['Email or phone inquiries', 'Email address, name, company, phone number, and anything you send us', 'Replying to inquiries, quotes, and sales', '1 year after handling (longer if required by law for a transaction)'],
          ['Collected automatically', 'Cookies, visit records (pages viewed, referrer, device and browser)', 'Visitor statistics, site improvement', '14 months'],
          ['Collected automatically', 'IP address (when using the chatbot)', 'Preventing excessive requests', 'Up to 1 day'],
        ],
      },
    },
    {
      title: '2. Deletion',
      items: [
        'We delete personal information without delay once the retention period ends or the purpose is fulfilled.',
        'Electronic files are deleted so they cannot be recovered; paper documents are shredded or incinerated.',
      ],
    },
    {
      title: '3. Disclosure to third parties',
      paragraphs: ['We do not provide personal information to third parties, except with your consent or where required by law.'],
    },
    {
      title: '4. Processors and international transfers',
      paragraphs: ['We use the following service providers. Personal information is transferred outside Korea in the process.'],
      table: {
        head: ['Provider', 'Service', 'Country', 'Items', 'Retention'],
        rows: [
          ['OpenAI, L.L.C.', 'Generating chatbot answers', 'United States', 'Chatbot questions', 'Per provider policy (up to 30 days)'],
          ['Railway Corporation', 'Hosting the chatbot server', 'United States', 'Chatbot questions, IP address', 'Deleted after processing (IP up to 1 day)'],
          ['Microsoft Corporation', 'Company email (Microsoft 365) for forwarding and keeping inquiries', 'United States and other Microsoft data center locations', 'Inquiry content, email, name/company', 'As in section 1'],
          ['Google LLC', 'Visitor statistics (Google Analytics)', 'United States', 'Cookies, visit records', '14 months'],
        ],
      },
      after: [
        'Transfers happen over the network when you use the website or chatbot.',
        'If you do not want your information transferred, contact us by email or phone instead of the chatbot, and block cookies in your browser.',
      ],
    },
    {
      title: '5. Your rights',
      items: [
        'You may request access to, correction, deletion, or suspension of processing of your personal information at any time.',
        'Contact us using the details in section 7 and we will act without delay. Requests may also be made through a legal representative.',
      ],
    },
    {
      title: '6. Cookies',
      items: [
        'We use Google Analytics cookies (such as _ga) for visitor statistics. They do not contain your name or contact details.',
        'You can refuse cookies in your browser settings. Refusing cookies does not limit your use of the website.',
      ],
    },
    {
      title: '7. Privacy contact',
      items: ['MAGRON Co., Ltd. privacy officer', 'Phone: +82-31-500-4632', 'Email: magron@magron.co.kr'],
    },
    {
      title: '8. Security measures',
      items: [
        'Access to personal information is limited to the staff who need it.',
        'All website and chatbot traffic is encrypted with HTTPS.',
        'The inquiry mailbox can be opened only by authorized staff.',
      ],
    },
    {
      title: '9. Changes',
      paragraphs: ['This policy applies from October 16, 2026. We will post any changes on this page 7 days before they take effect.'],
    },
  ],
}

const zh: typeof ko = {
  eyebrow: 'Privacy',
  title: '个人信息处理方针',
  effective: '施行日期：2026年10月16日',
  intro:
    'MAGRON 有限公司（以下称“公司”）依据韩国《个人信息保护法》保护 magron.kr 访问者的个人信息。本中文版仅供参考，以韩文版为准。在线商城（ferrofluidshop.com）适用其自身的方针。',
  sections: [
    {
      title: '1. 处理的项目、目的及保存期限',
      paragraphs: ['本网站没有会员注册及支付功能。公司仅处理以下信息。'],
      table: {
        head: ['来源', '项目', '目的', '保存期限'],
        rows: [
          ['聊天机器人“请工作人员回复”', '邮箱（必填）、姓名·公司（选填）、对话内容', '回复咨询、报价', '自提交之日起1年'],
          ['聊天机器人提问', '问答内容、提问页面、界面语言（不收集姓名及联系方式）', '提供回答、确认咨询内容', '1年'],
          ['邮件·电话咨询', '邮箱地址、姓名、公司、电话号码等您发送的信息', '回复咨询、报价及交易洽谈', '处理后1年（达成交易时按相关法律规定的期限）'],
          ['自动收集', 'Cookie、访问记录（浏览页面、来源、设备及浏览器信息）', '访问统计、改进网站', '14个月'],
          ['自动收集', 'IP 地址（使用聊天机器人时）', '防止过量请求', '最长1天'],
        ],
      },
    },
    {
      title: '2. 销毁',
      items: ['保存期限届满或目的达成后立即销毁。', '电子文件以无法恢复的方式删除，纸质文件粉碎或焚烧。'],
    },
    {
      title: '3. 向第三方提供',
      paragraphs: ['公司不向第三方提供个人信息，但取得您的同意或法律另有规定的情况除外。'],
    },
    {
      title: '4. 委托处理及境外转移',
      paragraphs: ['公司将以下业务委托给下列服务商，在此过程中个人信息会转移至韩国境外。'],
      table: {
        head: ['受托方', '委托业务', '转移国家', '转移项目', '保存期限'],
        rows: [
          ['OpenAI, L.L.C.', '生成聊天机器人回答', '美国', '聊天机器人提问内容', '按受托方政策（最长30天）'],
          ['Railway Corporation', '运营聊天机器人服务器', '美国', '聊天机器人提问内容、IP 地址', '处理后立即删除（IP 最长1天）'],
          ['Microsoft Corporation', '通过公司邮箱（Microsoft 365）转交及保存咨询', '美国等 Microsoft 数据中心所在国', '咨询内容、邮箱、姓名·公司', '同第1条'],
          ['Google LLC', '访问统计（Google Analytics）', '美国', 'Cookie、访问记录', '14个月'],
        ],
      },
      after: [
        '转移时间及方式：使用网站或聊天机器人时通过网络传输。',
        '如不希望转移，请通过邮件或电话咨询而非聊天机器人，并可在浏览器中拒绝 Cookie。',
      ],
    },
    {
      title: '5. 您的权利',
      items: ['您可随时要求查阅、更正、删除或停止处理您的个人信息。', '请通过第7条的联系方式提出，公司将立即处理。'],
    },
    {
      title: '6. Cookie',
      items: [
        '公司为统计访问使用 Google Analytics Cookie（如 _ga），其中不含姓名或联系方式。',
        '您可在浏览器设置中拒绝 Cookie，拒绝后不影响使用本网站。',
      ],
    },
    {
      title: '7. 个人信息保护联系方式',
      items: ['MAGRON 有限公司 个人信息保护负责人', '电话：+82-31-500-4632', '邮箱：magron@magron.co.kr'],
    },
    {
      title: '8. 安全措施',
      items: ['仅限必要人员访问个人信息。', '网站及聊天机器人的所有通信均采用 HTTPS 加密。', '咨询邮箱仅授权人员可以打开。'],
    },
    {
      title: '9. 变更',
      paragraphs: ['本方针自2026年10月16日起施行。如有变更，将于施行7日前在本页公告。'],
    },
  ],
}

export default { ko, en, zh }
