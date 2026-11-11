import { CourseConfig, Applicant, Notice, FAQItem, ContactInquiry } from '../types';

export const INITIAL_COURSE_CONFIG: CourseConfig = {
  recruitmentStatus: 'open',
  title: '천안시 시민 AI강사 양성과정',
  subtitle: '천안에서, 천안 사람에게 AI를 가르칠 강사를 모십니다',
  targetCount: '30명 내외 (서류 및 대면 인터뷰)',
  recruitStartDate: '2026. 03. 16(월)',
  recruitEndDate: '2026. 04. 03(금) 18:00',
  courseStartDate: '2026. 04. 14(화)',
  courseEndDate: '2026. 06. 04(목)',
  courseSchedule: '매주 화·목 14:00 ~ 17:00 (총 16회 / 48시간)',
  courseLocation: '천안타운홀 및 천안시 청년센터 배움터 (실습 PC 완비)',
  tuitionFee: '전액 무료 (천안시 지원, 교재 및 실습비 전액 무상)',
  contactPhone: '010-0000-0000',
  contactEmail: '0000000@hanmail.net',
  contactHours: '평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)',
};

export const CHEONAN_DISTRICTS = {
  동남구: [
    '신안동(신부·안서)', '청룡동(청수·청당·삼룡·구룡)', '신방동(신방·용곡)',
    '일봉동(다가·용곡)', '원성1동', '원성2동', '중앙동(오룡·영성·사직·문화)',
    '문성동(성황·대흥)', '봉명동', '목천읍', '풍세면', '광덕면',
    '북면', '성남면', '수신면', '병천면', '동면'
  ],
  서북구: [
    '불당1동', '불당2동', '백석동', '부성1동(두정·신당)', '부성2동(두정·성성·차암)',
    '성정1동(성정·와촌)', '성정2동', '쌍용1동', '쌍용2동', '쌍용3동',
    '직산읍', '성환읍', '성거읍', '입장면'
  ]
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '[공고] 2026년 천안시 시민 AI강사 양성과정 교육생 모집 공고',
    date: '2026. 03. 16',
    isPinned: true,
    author: '천안시 사업운영팀',
    views: 428,
    content: `천안시에서는 디지털 대전환 시대에 발맞추어, 시민의 눈높이에서 실생활 중심의 생성형 AI 활용법을 친절하게 전달할 '시민 AI강사'를 양성합니다.

■ 모집 개요
- 과 정 명: 천안시 시민 AI강사 양성과정 (제1기)
- 모집 인원: 30명 내외
- 신청 자격: 천안시에 주민등록을 둔 시민 누구나 (연령, 학력, 전공 무관 / 비전공자 대환영)
- 교육 기간: 2026. 04. 14 ~ 2026. 06. 04 (매주 화·목 14:00~17:00, 총 16회 48시간)
- 교육 장소: 천안타운홀 및 천안시 청년센터 배움터 (실습 PC 완비)
- 수 강 료: 전액 무료 (교재 및 실습비 지원)
- 수료 혜택: 천안시장 명의 수료증 발급, 천안시 시민강사 인력풀 등록, 동남구·서북구 복지관/주민자치센터/도서관 강의 연계

■ 접수 기간 및 방법
- 접수 기간: 2026. 03. 16(월) ~ 2026. 04. 03(금) 18:00
- 접수 방법: 본 홈페이지 [신청서 작성하기] 온라인 접수

궁금하신 사항은 운영 사무국(010-0000-0000)으로 문의하시기 바랍니다.`
  },
  {
    id: 'notice-2',
    title: '[안내] 시민 AI강사 양성과정 사전 온·오프라인 설명회 개최 안내',
    date: '2026. 03. 20',
    isPinned: false,
    author: '천안시 사업운영팀',
    views: 295,
    content: `과정 지원을 망설이시는 시민분들을 위해 과정의 성격, 커리큘럼, 수료 후 활동 계획을 직접 설명해 드리는 설명회를 엽니다.

- 일시: 2026. 03. 25(수) 14:00 ~ 15:30
- 장소: 천안시 청년센터 2층 다목적실 (온라인 유튜브 라이브 동시 송출)
- 대상: 과정에 관심 있는 천안 시민 누구나 (사전 신청 없이 자유 참석)
- 내용: 과정 취지 소개, 질의응답(FAQ), 선발 기준 안내, 실제 강사 활동 인터뷰

어르신, 경력단절 여성, 은퇴자 분들의 많은 관심과 참여를 부탁드립니다.`
  },
  {
    id: 'notice-3',
    title: '[안내] 지원서 작성 가이드 — 컴퓨터를 잘 몰라도 당당히 지원하세요',
    date: '2026. 03. 18',
    isPinned: false,
    author: '천안시 사업운영팀',
    views: 382,
    content: `시민 AI강사는 복잡한 프로그래밍 코드를 짜는 기술자가 아닙니다.
우리 동네 이웃, 복지관의 어르신, 전통시장 상인분들께 "스마트폰으로 사진 글자 번역하기", "AI로 안내문 쉽게 쓰기"처럼 일상에 보탬이 되는 지식을 따뜻한 말로 가르쳐줄 사람이 필요합니다.

지원서의 '지원 동기'에는 거창한 IT 지식보다 '이웃에게 왜 배움을 나누고 싶은지' 진심 어린 마음을 적어주시면 됩니다.`
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'qualification',
    question: '컴퓨터를 잘 못 다루는데 지원해도 되나요?',
    answer: '네, 전공이나 전문 IT 자격증은 전혀 필요하지 않습니다. 본 과정은 어려운 코딩이나 알고리즘을 배우는 것이 아니라, 스마트폰과 컴퓨터를 활용한 일상 속 생성형 AI 도구를 친절하고 쉽게 이웃에게 전달하는 교수법에 집중합니다. 스마트폰 메신저와 인터넷 검색을 사용하실 수 있다면 누구나 참여하실 수 있으며, 전문 멘토 강사진이 기초부터 단계별로 함께합니다.'
  },
  {
    id: 'faq-2',
    category: 'qualification',
    question: '천안에 직장만 있고 주소가 다른 지역이면 신청할 수 있나요?',
    answer: '천안시에 주민등록상 주소를 둔 시민을 우선 선발합니다. 단, 천안 소재 직장 재직자나 천안시 관내 대학 재학생도 천안 생활권자로 인정하여 결원 시 심사를 거쳐 참여하실 수 있으므로, 지원서 작성 시 거주지 란에 해당 사유를 기재해 주시기 바랍니다.'
  },
  {
    id: 'faq-3',
    category: 'curriculum',
    question: '수강료가 있나요? 개인 노트북을 가져가야 하나요?',
    answer: '수강료는 전액 무료(천안시 전액 지원)이며, 교재와 실습 비용도 무상으로 제공됩니다. 교육장에 실습용 PC가 구비되어 있어 개인 노트북이 없으셔도 원활하게 참여하실 수 있습니다. 원하시는 경우 개인 노트북이나 태블릿을 지참하셔도 좋습니다.'
  },
  {
    id: 'faq-4',
    category: 'curriculum',
    question: '수업에 빠지면 수료가 안 되나요?',
    answer: '총 16회차(48시간) 교육 중 80% 이상(13회 이상) 출석하시고, 4단계의 모의 시연 강의 평가를 통과하셔야 공식 수료증(천안시장 명의)이 수여됩니다. 부득이한 경조사나 질병의 경우 증빙 제출 시 공결 처리가 가능합니다.'
  },
  {
    id: 'faq-5',
    category: 'activity',
    question: '수료하면 강사로 활동할 수 있다는 보장이 있나요?',
    answer: '수료생 전원은 천안시 공식 시민 강사 인력풀에 등록됩니다. 천안시 관내 동남구·서북구 종합사회복지관, 노인복지관, 주민자치센터, 작은도서관, 경로당 등 지역 교육 수요 기관과 활동 연계를 적극 추진하고 있습니다. 현장 출강 시 천안시 강사 수당 기준에 따른 강사료가 지급됩니다. (단, 기관의 개설 일정 및 강사 본인의 일정 조율에 따라 배정 시기는 차이가 있을 수 있습니다.)'
  },
  {
    id: 'faq-6',
    category: 'etc',
    question: '선발 결과는 언제, 어떻게 알려주나요?',
    answer: '모집 마감일(4월 3일) 직후 지원서 서류 심사를 거치며, 4월 7일(화) 1차 합격자에게 면접 일정 개별 문자를 발송합니다. 4월 9일(목) 간단한 대면 인터뷰(배움과 나눔에 대한 열정 확인) 후, 4월 10일(금)에 최종 선발 결과를 접수하신 휴대폰 번호로 문자(SMS) 및 본 사이트 공지사항으로 공지합니다.'
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-001',
    applicationNumber: 'CAI-2026-0001',
    createdAt: '2026-03-17 10:15',
    updatedAt: '2026-03-17 10:15',
    status: 'doc_passed',
    name: '김영희',
    birthDate: '1974-05-12',
    gender: '여성',
    phone: '010-1234-5678',
    district: '동남구',
    dong: '신안동(신부·안서)',
    email: 'younghee74@naver.com',
    education: '대졸',
    occupation: '방과후 학습 지도 경험 (경력단절 후 재취업 희망)',
    hasTeachingExp: true,
    teachingExpDetail: '초등학교 방과후 주산암산 및 컴퓨터 기초 강사 3년',
    aiFamiliarity: 'basic',
    motivation: '방과후 강사 경험이 있으나 AI 시대에 발맞춰 새롭게 도약하고 싶었습니다. 스마트폰을 어려워하시는 어르신들께 실생활에 도움 되는 AI 비서와 이미지 생성 도구를 따뜻하게 가르쳐드리고 싶습니다.',
    targetAudience: '어르신 복지관 및 경로당 디지털 배움터',
    aspiration: '어르신들이 손주들과 AI로 그림을 그리고 카톡으로 대화하는 기쁨을 선물하는 천안의 대표 시민강사가 되겠습니다.',
    privacyAgreed: true,
    notes: '대면 인터뷰 일정 조율 완료'
  },
  {
    id: 'app-002',
    applicationNumber: 'CAI-2026-0002',
    createdAt: '2026-03-17 14:30',
    updatedAt: '2026-03-17 14:30',
    status: 'submitted',
    name: '박성호',
    birthDate: '1962-09-20',
    gender: '남성',
    phone: '010-9876-5432',
    district: '서북구',
    dong: '불당1동',
    email: 'shpark62@daum.net',
    education: '대졸',
    occupation: '공직 퇴직 (사회공헌 활동 희망)',
    hasTeachingExp: false,
    teachingExpDetail: '직무 교육 및 봉사활동 멘토링 경험',
    aiFamiliarity: 'basic',
    motivation: '30여 년간 공직에 몸담고 정년퇴직한 후 지역사회를 위한 보람 있는 활동을 찾고 있었습니다. 60대의 눈높이에서 또래 시니어들에게 AI 기술을 쉽고 유용하게 전하겠습니다.',
    targetAudience: '주민자치센터 및 시니어 디지털 평생교실',
    aspiration: '퇴직 후 제2의 인생을 동네 이웃과 소통하는 봉사형 강사로 뜻깊게 채워가고 싶습니다.',
    privacyAgreed: true
  },
  {
    id: 'app-003',
    applicationNumber: 'CAI-2026-0003',
    createdAt: '2026-03-18 11:20',
    updatedAt: '2026-03-18 11:20',
    status: 'final_selected',
    name: '이지은',
    birthDate: '1988-11-03',
    gender: '여성',
    phone: '010-3344-5566',
    district: '서북구',
    dong: '백석동',
    email: 'jieun.lee@kakao.com',
    education: '전문대졸',
    occupation: '프리랜서 디자이너 겸 주민센터 문화교실 강사',
    hasTeachingExp: true,
    teachingExpDetail: '주민센터 스마트폰 사진 편집 강좌 2년',
    aiFamiliarity: 'intermediate',
    motivation: '평소 문화교실에서 강의를 진행하며 수강생분들이 생성형 AI에 대해 큰 호기심을 갖는 것을 체감했습니다. 체계적인 교수법을 익혀 동네 소상공인과 주부들을 위한 실무 교육을 만들고 싶습니다.',
    targetAudience: '동네 소상공인 및 청년 창업가, 주부 대상',
    aspiration: '천안 소상공인들이 홍보물과 마케팅 문구를 스스로 쉽게 만들 수 있도록 돕겠습니다.',
    privacyAgreed: true,
    notes: '최종 선발 완료 / OT 안내 문자 발송 완료'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: '정순자',
    phone: '010-5555-8888',
    email: 'soonja@hanmail.net',
    category: '자격 문의',
    message: '올해 65세인데 컴퓨터가 능숙하지 않아도 수업을 잘 따라갈 수 있을까요? 꼭 도전해보고 싶습니다.',
    createdAt: '2026-03-18 15:40',
    isAnswered: true,
    adminReply: '유선 전화로 안내드렸으며, 열정이 있으시다면 누구나 수강 가능함을 설명드렸습니다.'
  }
];
