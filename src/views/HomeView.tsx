import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar, MapPin, Users, Award, ChevronRight,
  Phone, Mail, Copy, Check, Clock, Sparkles,
  ArrowRight, ShieldCheck, HeartHandshake, BookOpen,
  HelpCircle, ChevronDown, BellRing
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { config, setCurrentView, openNextTermModal } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [dDay, setDDay] = useState<number | string>('D-24');

  // Calculate D-Day
  useEffect(() => {
    // recruitEndDate: e.g., '2026. 04. 03'
    const match = config.recruitEndDate.match(/(\d{4})\.\s*(\d{2})\.\s*(\d{2})/);
    if (match) {
      const targetYear = parseInt(match[1], 10);
      const targetMonth = parseInt(match[2], 10) - 1;
      const targetDay = parseInt(match[3], 10);
      const targetDate = new Date(targetYear, targetMonth, targetDay, 18, 0, 0);
      const now = new Date();
      const diffTime = targetDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setDDay(`D-${diffDays}`);
      } else if (diffDays === 0) {
        setDDay('D-Day (오늘 18시 마감)');
      } else {
        setDDay('접수 마감');
      }
    }
  }, [config.recruitEndDate]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col">
      
      {/* 1. 히어로 섹션 */}
      <section className="bg-slate-950 text-white relative overflow-hidden py-16 md:py-24 border-b border-slate-800">
        {/* Subtle civic structural background accents - NO cheesy neon */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          {/* Metadata Kicker without pills - clean typographic separators */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-blue-300 font-medium mb-4">
            <span>천안시 공식 사업</span>
            <span aria-hidden="true">·</span>
            <span>시민 맞춤형 디지털 포용</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-amber-300">
              {config.recruitmentStatus === 'closed' ? '접수 마감' : `모집 마감 ${dDay}`}
            </span>
          </div>

          {/* Main Headline (PRD 7.4) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5 [text-wrap:balance]">
            천안에서, 천안 사람에게<br className="hidden sm:inline" /> AI를 가르칠 강사를 모십니다
          </h1>

          {/* Subtitle (PRD 7.4) */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 [text-wrap:balance]">
            전공은 상관없습니다. 수료하면 우리 동네 복지관·도서관에서 이웃의 눈높이에 맞춰 직접 강의합니다.
          </p>

          {/* Key Quick Facts Badges (quiet style) */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 mb-9">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>접수 기간: {config.recruitStartDate} ~ {config.recruitEndDate}</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>선발 정원: {config.targetCount}</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>수강료 전액 무료</span>
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            {config.recruitmentStatus === 'closed' ? (
              <button
                onClick={openNextTermModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-base transition-all shadow-md flex items-center justify-center gap-2"
              >
                <BellRing className="w-4 h-4" />
                <span>다음 기수 알림 신청</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('apply')}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-base transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 group"
              >
                <span>신청서 작성하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            <button
              onClick={() => setCurrentView('recruit')}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-base transition-colors flex items-center justify-center gap-1.5"
            >
              <span>모집 요강 전문</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            신청서 작성 예상 소요 시간: 약 3~5분 (임시저장 지원)
          </div>

        </div>
      </section>

      {/* 2. 핵심 요약 바 (5칸 - PRD 6.1 Section 2) */}
      <section className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Box 1: 지원 자격 */}
            <div className="flex flex-col pt-3 md:pt-0 md:px-3 first:pt-0 first:px-0">
              <span className="text-xs text-slate-500 font-medium mb-1">지원 자격</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                천안 시민 누구나
              </strong>
              <span className="text-xs text-slate-600 mt-0.5">
                연령·학력·전공 무관 (비전공자 환영)
              </span>
            </div>

            {/* Box 2: 교육 기간 */}
            <div className="flex flex-col pt-3 md:pt-0 md:px-3">
              <span className="text-xs text-slate-500 font-medium mb-1">교육 기간</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                2026. 04. 14 ~ 06. 04
              </strong>
              <span className="text-xs text-slate-600 mt-0.5">
                화·목 14~17시 (16회/48시간)
              </span>
            </div>

            {/* Box 3: 교육 장소 */}
            <div className="flex flex-col pt-3 md:pt-0 md:px-3">
              <span className="text-xs text-slate-500 font-medium mb-1">교육 장소</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                천안타운홀 및 배움터
              </strong>
              <span className="text-xs text-slate-600 mt-0.5">
                실습 PC 완비 (개인기기 불필요)
              </span>
            </div>

            {/* Box 4: 수강 비용 */}
            <div className="flex flex-col pt-3 md:pt-0 md:px-3">
              <span className="text-xs text-slate-500 font-medium mb-1">수강 비용</span>
              <strong className="text-sm sm:text-base font-bold text-blue-900 leading-snug">
                전액 무료
              </strong>
              <span className="text-xs text-slate-600 mt-0.5">
                천안시 지원 (교재 무상 제공)
              </span>
            </div>

            {/* Box 5: 모집 정원 */}
            <div className="flex flex-col pt-3 md:pt-0 md:px-3">
              <span className="text-xs text-slate-500 font-medium mb-1">모집 정원</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {config.targetCount}
              </strong>
              <span className="text-xs text-slate-600 mt-0.5">
                서류 및 대면 인터뷰 선발
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 이런 분을 찾습니다 (PRD 6.1 Section 3 - '비전공자 환영' 명시) */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-center">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-900 mb-2">
              지원 대상 안내
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
              이런 천안 시민을 찾고 있습니다
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto [text-wrap:balance]">
              AI 전문가를 뽑는 과정이 아닙니다. 이웃의 속도에 맞춰 한 걸음씩 이끌어줄 따뜻한 마음을 가진 분이면 충분합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            
            {/* Persona 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900 mb-1">경력 전환 희망자</div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  경력단절 여성 · 방과후 강사
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "아이들을 가르쳤던 경험은 있는데 AI는 낯설어요."<br />
                  학생을 대했던 교수법에 실생활 AI 도구를 덧붙여 새로운 강사 커리어를 시작하실 수 있도록 돕습니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                수료 후 복지관·작은도서관 주간 강의 연계
              </div>
            </div>

            {/* Persona 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900 mb-1">지역 소통 교육자</div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  주민자치센터 · 커뮤니티 강사
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "기존 강의에 AI 활용법을 녹여내고 싶어요."<br />
                  수강생들이 가장 궁금해하는 최신 실생활 AI 기능과 맞춤형 수업자료 제작법을 체계적으로 훈련합니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                강의 영역 확장 및 표준 교안 패키지 제공
              </div>
            </div>

            {/* Persona 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900 mb-1">은퇴 사회공헌</div>
                <h4 className="font-bold text-slate-900 text-base mb-2">
                  퇴직 교사 · 공무원 · 전문직
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "퇴직 후 동네 어르신들께 의미 있는 봉사를 하고 싶어요."<br />
                  또래 시니어의 눈높이에 맞춰 보이스피싱 예방, 스마트폰 AI 비서 활용법을 친근하게 가르칠 수 있습니다.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                경로당 및 시니어 복지관 디지털 배움터 연계
              </div>
            </div>

          </div>

          {/* Reassurance Callout (Problem Definition 2 Response) */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-blue-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-950 text-sm sm:text-base">
                <HeartHandshake className="w-5 h-5 text-blue-900 shrink-0" />
                <span>"컴퓨터를 잘 다루지 못하는데 정말 괜찮을까요?"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                네, 문제 없습니다. 본 과정은 코딩을 배우는 곳이 아닙니다. 일상에서 유용한 스마트폰 AI 도구를 이웃에게 친절하게 설명하는 방법을 전문 교수진과 단계별로 실습합니다.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('about')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors"
            >
              과정 추진 배경 보기
            </button>
          </div>

        </div>
      </section>

      {/* 4. 무엇을 배우나요 (PRD 6.1 Section 4) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-center">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-900 mb-2">
              체계적인 4단계 교육과정
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              무엇을 배우나요?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              배움에서 끝나지 않고 실제 강의 현장에 설 수 있도록 4단계로 구성했습니다.
            </p>
          </div>

          <div className="space-y-3.5 mb-8">
            
            {/* Step 1 */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0">
                  1단계
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    AI 익히기: 일상 속 생성형 AI 기초 및 실습
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    스마트폰 AI 비서, 사진 기반 번역/문서 요약, 일상 프롬프트 작성법, 안전한 AI 윤리
                  </p>
                </div>
              </div>
              <span className="text-xs text-blue-950 font-medium whitespace-nowrap bg-blue-100/70 px-2.5 py-1 rounded">
                실습 결과물: 나만의 AI 활용 포트폴리오
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0">
                  2단계
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    가르치기: 눈높이 교수법과 수업 설계
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    어르신·주부·소상공인 대상 눈높이 화법, 1회 완성 강의안 작성, 시각 교재 제작
                  </p>
                </div>
              </div>
              <span className="text-xs text-blue-950 font-medium whitespace-nowrap bg-blue-100/70 px-2.5 py-1 rounded">
                실습 결과물: 맞춤형 1시간 분량 표준 교안
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0">
                  3단계
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    현장 실습: 모의 강의와 피드백 코칭
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    동료 수강생 대상 15분 모의 강의 시연, 전문 강사진의 1:1 보완 피드백
                  </p>
                </div>
              </div>
              <span className="text-xs text-blue-950 font-medium whitespace-nowrap bg-blue-100/70 px-2.5 py-1 rounded">
                실습 결과물: 시연 강의 녹화 및 피드백 리포트
              </span>
            </div>

            {/* Step 4 */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 sm:mt-0">
                  4단계
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    수료 평가 및 천안시 강사단 위촉
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    출석률 80% 이상 + 최종 시연 심사 통과 시 수료증(천안시장 명의) 수여 및 인력풀 등록
                  </p>
                </div>
              </div>
              <span className="text-xs text-amber-950 font-medium whitespace-nowrap bg-amber-100 px-2.5 py-1 rounded">
                공식 혜택: 천안시장 명의 수료증 발급
              </span>
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentView('curriculum')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-950 hover:underline"
            >
              <span>주차별 상세 커리큘럼 및 수료 요건 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. 수료 후 활동 (PRD 6.1 Section 5 & PRD 6.9 대응) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-center">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-900 mb-2">
              활동 연계 로드맵
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight [text-wrap:balance]">
              수료 후 어디서 어떻게 활동하나요?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto [text-wrap:balance]">
              단순 교육 수료로 끝나지 않습니다. 천안시와 운영기관이 지역 교육 수요처와 체계적으로 연결합니다.
            </p>
          </div>

          {/* Activity Flow Diagram */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 mb-8 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-500 block mb-1">01단계</span>
                <strong className="text-sm font-bold text-slate-900 block">과정 수료</strong>
                <span className="text-[11px] text-slate-500 mt-1 block">천안시장 명의 수료증</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-500 block mb-1">02단계</span>
                <strong className="text-sm font-bold text-slate-900 block">강사 풀 등록</strong>
                <span className="text-[11px] text-slate-500 mt-1 block">천안시 공식 인력풀 등재</span>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-200">
                <span className="text-xs font-semibold text-blue-900 block mb-1">03단계</span>
                <strong className="text-sm font-bold text-blue-950 block">현장 출강 연계</strong>
                <span className="text-[11px] text-blue-900/80 mt-1 block">복지관·도서관·센터 배정</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-500 block mb-1">04단계</span>
                <strong className="text-sm font-bold text-slate-900 block">지속 보수교육</strong>
                <span className="text-[11px] text-slate-500 mt-1 block">신규 AI 도구 멘토링 지원</span>
              </div>

            </div>
          </div>

          {/* Activity Place Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">현장 연계처 01</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1.5">종합사회복지관 및 노인복지관</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                어르신을 위한 "스마트폰 AI 비서와 말벗 도구", "손주와 소통하는 AI 사진 만들기" 강좌 운영
              </p>
              <div className="mt-3 text-[11px] text-slate-400">
                연계 상태: 지역 기관과 연계 추진 중
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">현장 연계처 02</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1.5">시립도서관 및 작은도서관</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                학부모 및 어린이를 위한 "생성형 AI로 그림책 만들기", "올바른 디지털 학습법" 특강
              </p>
              <div className="mt-3 text-[11px] text-slate-400">
                연계 상태: 지역 기관과 연계 추진 중
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">현장 연계처 03</span>
              <h5 className="font-bold text-slate-900 text-sm mb-1.5">주민자치센터 및 평생배움터</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                동네 상인과 주민을 위한 "AI로 가게 홍보문구 쓰기", "생활 속 번역 및 서류 정리"
              </p>
              <div className="mt-3 text-[11px] text-slate-400">
                연계 상태: 지역 기관과 연계 추진 중
              </div>
            </div>

          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">※ 수료생 지원 및 활동 안내 (PRD 준수 고지)</div>
            <div>· 강사 출강 시 천안시 강사 수당 지급 기준에 따른 소정의 강사료가 지급됩니다.</div>
            <div>· 수료 후에도 최신 생성형 AI 트렌드와 강의 노하우를 공유하는 정기 보수교육이 무상 제공됩니다.</div>
            <div>· 활동 기관과 일정은 수료 후 개인의 희망 시간대 및 거주 지역(동남구/서북구)을 고려하여 개별 안내됩니다.</div>
          </div>

        </div>
      </section>

      {/* 6. 전체 일정 (PRD 6.1 Section 6) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-center">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-900 mb-2">
              추진 일정
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              과정 일정 한눈에 보기
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              선발부터 교육, 현장 활동 연계까지의 상세 일정입니다.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            
            {/* Timeline item 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-blue-900 ring-4 ring-white" />
              <div className="text-xs font-bold text-blue-900 uppercase">01. 교육생 모집 (현재 진행중)</div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {config.recruitStartDate} ~ {config.recruitEndDate}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                홈페이지를 통한 온라인 신청서 접수 (서류 평가 진행)
              </p>
            </div>

            {/* Timeline item 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-500 uppercase">02. 서류 발표 및 대면 인터뷰</div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                2026. 04. 07(화) 발표 / 04. 09(목) 면접
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                배움과 이웃 나눔에 대한 열의 확인 (천안시 청년센터 배움터)
              </p>
            </div>

            {/* Timeline item 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-500 uppercase">03. 최종 선발 발표 및 오리엔테이션</div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                2026. 04. 10(금) 14:00
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                선발자 개별 안내 문자 발송 및 사이트 공지 (30명 내외)
              </p>
            </div>

            {/* Timeline item 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-500 uppercase">04. 본 교육 과정 운영</div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {config.courseStartDate} ~ {config.courseEndDate}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {config.courseSchedule} / 장소: {config.courseLocation}
              </p>
            </div>

            {/* Timeline item 5 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-500 uppercase">05. 수료 평가 및 현장 활동 연계</div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                2026. 06월 중순 이후 순차 연계
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                천안시장 수료증 수여, 강사풀 등록 후 관내 복지관 및 도서관 특강 출강
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. 자주 묻는 질문 (PRD 6.1 Section 7 - Top 4 Accordion) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-center">
            <h2 className="text-xs uppercase tracking-widest font-semibold text-blue-900 mb-2">
              궁금한 점 해결
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              자주 묻는 질문
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              시민분들께서 가장 많이 문의하시는 내용을 모았습니다.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleFaq('faq-1')}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
              >
                <span>컴퓨터를 잘 못 다루는데 지원해도 되나요?</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqId === 'faq-1' ? 'rotate-180' : ''}`} />
              </button>
              {openFaqId === 'faq-1' && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  네, 전공이나 IT 전문 자격증은 전혀 필요하지 않습니다. 본 과정은 코딩이나 알고리즘을 배우는 것이 아니라, 스마트폰과 인터넷 브라우저를 기반으로 일상 속 AI 도구를 친절하고 쉽게 이웃에게 전달하는 교수법에 집중합니다. 기초부터 전문 강사진이 함께 지도해 드립니다.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleFaq('faq-2')}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
              >
                <span>수강료가 있나요? 노트북을 직접 가져가야 하나요?</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqId === 'faq-2' ? 'rotate-180' : ''}`} />
              </button>
              {openFaqId === 'faq-2' && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  수강료는 전액 무료(천안시 전액 지원)이며, 교재와 실습 비용도 무상으로 제공됩니다. 교육장에 실습용 PC가 구비되어 있어 개인 노트북이 없으셔도 원활하게 참여하실 수 있습니다.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleFaq('faq-3')}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
              >
                <span>수료하면 실제 강사로 활동할 수 있나요?</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqId === 'faq-3' ? 'rotate-180' : ''}`} />
              </button>
              {openFaqId === 'faq-3' && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  수료생 전원은 천안시 공식 시민 강사 인력풀에 등록됩니다. 천안시 관내 복지관, 주민자치센터, 작은도서관, 경로당 등 지역 교육 수요 기관과 활동 연계를 추진합니다. 출강 시 천안시 강사 수당 기준에 따른 강사료가 지급됩니다.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => toggleFaq('faq-4')}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
              >
                <span>천안에 직장만 있고 주소지가 다르면 신청 가능한가요?</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqId === 'faq-4' ? 'rotate-180' : ''}`} />
              </button>
              {openFaqId === 'faq-4' && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  천안시에 주민등록상 주소를 둔 시민을 1순위로 선발합니다. 다만, 천안 소재 직장 재직자 또는 관내 대학 재학생도 결원 시 심사를 거쳐 참여하실 수 있으므로 지원서 작성 시 거주지란에 관련 내용을 기재해 주시기 바랍니다.
                </div>
              )}
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentView('faq')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-900 hover:text-blue-950 hover:underline"
            >
              <span>자주 묻는 질문 전체(6문항) 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. 문의 및 신청 (PRD 6.1 Section 8) */}
      <section className="py-14 sm:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            궁금한 점은 전화로 편하게 물어보세요
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
            신청서 작성 중 막히는 부분이 있거나 지원 자격이 고민되시면 언제든 운영사무국으로 연락해 주시기 바랍니다.
          </p>

          {/* Contact Direct Box with tel: and copy buttons */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              
              {/* Phone Direct */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-medium block">운영 문의 전화</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${config.contactPhone}`}
                    className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>{config.contactPhone}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(config.contactPhone, 'contact-phone')}
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="전화번호 복사"
                  >
                    {copiedType === 'contact-phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">모바일에서 번호 터치 시 즉시 전화 연결</div>
              </div>

              {/* Email Direct */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-medium block">문의 메일</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${config.contactEmail}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-2 truncate"
                  >
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="truncate">{config.contactEmail}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(config.contactEmail, 'contact-email')}
                    className="p-1 text-slate-400 hover:text-white rounded"
                    title="이메일 복사"
                  >
                    {copiedType === 'contact-email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400">상담 가능: {config.contactHours}</div>
              </div>

            </div>
          </div>

          {/* Big Action Apply Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {config.recruitmentStatus === 'closed' ? (
              <button
                onClick={openNextTermModal}
                className="w-full sm:w-auto px-10 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <BellRing className="w-5 h-5" />
                <span>다음 기수 사전 알림 신청하기</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('apply')}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
              >
                <span>신청서 작성하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button
              onClick={() => setCurrentView('contact')}
              className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-sm sm:text-base transition-colors"
            >
              온라인 문의글 남기기
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
