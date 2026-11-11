import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const { config, setCurrentView } = useApp();

  const curriculumRows = [
    // 1단계: AI 익히기
    {
      session: '1회차',
      stage: 'AI 익히기',
      topic: '오리엔테이션 및 인공지능의 일상화',
      detail: '과정 목표 안내, 생성형 AI의 기본 개념, 챗GPT 등 주요 대화형 AI 가입 및 스마트폰 앱 설치',
      outcome: '스마트폰 AI 도구 세팅 완료'
    },
    {
      session: '2회차',
      stage: 'AI 익히기',
      topic: '일상 속 대화형 AI 프롬프트 기초',
      detail: '어르신·주민이 바로 쓰는 질문법(길 찾기, 약 복용 주의사항 요약, 사투리 번역, 편지 쓰기)',
      outcome: '생활 밀착형 프롬프트 질의문 작성'
    },
    {
      session: '3회차',
      stage: 'AI 익히기',
      topic: '시각 AI 도구와 이미지 생성',
      detail: '사진 속 글자 추출(OCR), 이미지 생성 AI로 추억 사진 복원 및 카카오톡 축하 카드 제작',
      outcome: '가족 카톡용 AI 일러스트 엽서 1종'
    },
    {
      session: '4회차',
      stage: 'AI 익히기',
      topic: '안전한 AI 활용과 디지털 윤리',
      detail: '생성형 AI 할루시네이션(거짓 정보) 구별법, 개인정보 입력 주의점, 보이스피싱 딥페이크 예방법',
      outcome: '어르신 대상 안전 수칙 체크리스트'
    },

    // 2단계: 가르치기
    {
      session: '5회차',
      stage: '가르치기',
      topic: '성인 및 시니어 학습자 눈높이 교수법',
      detail: '50-80대 학습자의 신체적·심리적 특성 이해, 반복 설명 기법, 디지털 공포증 완화 대화법',
      outcome: '눈높이 화법 가이드라인 정리'
    },
    {
      session: '6회차',
      stage: '가르치기',
      topic: '1시간 원데이 클래스 교안 기획',
      detail: '학습 목표 설정, 도입-전개-정리 3단계 수업 흐름도 구성, 시간 배분 전략',
      outcome: '1회차(60분) 표준 강의 계획서'
    },
    {
      session: '7회차',
      stage: '가르치기',
      topic: '큰 글씨 시각 보조교재 제작 실습',
      detail: 'PPT 및 캔바(Canva)를 활용한 24pt 이상 큰 글씨 교재 제작, 화면 캡처 화살표 표기법',
      outcome: '시니어 맞춤형 실습 교재 슬라이드'
    },
    {
      session: '8회차',
      stage: '가르치기',
      topic: '수업 중 돌발 상황 대처법',
      detail: '와이파이 끊김, 비밀번호 분실, 계정 잠김 등 현장 돌발 상황 10대 시나리오 대처 실습',
      outcome: '현장 비상 대응 매뉴얼 숙지'
    },

    // 3단계: 현장 실습
    {
      session: '9회차~12회차',
      stage: '현장 실습',
      topic: '동료 수강생 대상 모의 시연 강의 (1:1 멘토링)',
      detail: '수강생 1인당 15분 단위 모의 강의 진행, 동료 평가 및 현직 전문 강사의 1:1 강점·보완점 피드백 코칭',
      outcome: '모의 강의 녹화본 및 맞춤 피드백표'
    },
    {
      session: '13회차~14회차',
      stage: '현장 실습',
      topic: '피드백 반영 최종 교안 고도화',
      detail: '지적 사항 수정, 실제 복지관 및 도서관 교육 환경에 맞춘 교안 리허설',
      outcome: '완성형 표준 강사 포트폴리오'
    },

    // 4단계: 수료 평가
    {
      session: '15회차',
      stage: '수료 평가',
      topic: '최종 시연 평가 심사',
      detail: '전문 심사위원단(천안시 및 교육전문가) 대상 최종 10분 시연 강의 심사',
      outcome: '강사 적격성 심사 통과'
    },
    {
      session: '16회차',
      stage: '수료 평가',
      topic: '수료식 및 천안시 시민강사단 위촉',
      detail: '천안시장 명의 수료증 수여, 강사단 위촉장 전달, 향후 관내 기관 출강 일정 오리엔테이션',
      outcome: '수료증 및 강사단 등록'
    }
  ];

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <span>커리큘럼</span>
            <span aria-hidden="true">·</span>
            <span>주차별 학습 계획</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            체계적인 4단계 교육과정
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            이론 중심이 아닙니다. 기초 AI 실습부터 교수법, 모의 강의, 최종 시연까지 실제 강사로 데뷔할 수 있도록 훈련합니다.
          </p>
        </div>

        {/* 교육 개요 블록 (PRD 6.8 교육 개요) */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
            교육 기본 개요
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block mb-1">교육 기간</span>
              <strong className="text-slate-900 font-bold">{config.courseStartDate} ~ {config.courseEndDate}</strong>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block mb-1">요일 및 시간</span>
              <strong className="text-slate-900 font-bold">매주 화·목 14:00 ~ 17:00</strong>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block mb-1">총 회차 / 시간</span>
              <strong className="text-slate-900 font-bold">총 16회차 / 48시간</strong>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block mb-1">교육 장소</span>
              <strong className="text-slate-900 font-bold">천안타운홀 및 배움터</strong>
            </div>
          </div>
        </section>

        {/* '수료하면 할 수 있는 것' (PRD 6.3) */}
        <section className="bg-blue-900 text-white p-6 sm:p-8 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-300" />
            <h2 className="text-base sm:text-lg font-bold">
              수료생이 할 수 있는 구체적인 행동 목표
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-blue-100">
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold">✓</span>
              <span>동네 복지관에서 어르신 대상 스마트폰 AI 활용 1시간 특강을 혼자서 진행할 수 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold">✓</span>
              <span>작은도서관 및 주민센터에서 큰 글씨 실습 교재를 직접 만들어 수업을 설계합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold">✓</span>
              <span>수강생들의 스마트폰 접속 오류나 기기 조작 돌발 상황에 침착하게 대처합니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300 font-bold">✓</span>
              <span>가짜 뉴스와 보이스피싱을 구별하는 안전한 디지털 윤리를 이웃에게 교육합니다.</span>
            </li>
          </ul>
        </section>

        {/* 주차별 상세 표 (PRD 6.8 테이블) */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              회차별 세부 강의 계획서
            </h2>
            <span className="text-xs text-slate-500">
              ※ 현장 상황에 따라 일부 순서 및 예시 주제는 조정될 수 있습니다.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200">
              <thead className="bg-slate-100/70 text-slate-700 font-semibold">
                <tr>
                  <th className="py-3 px-4 whitespace-nowrap">회차</th>
                  <th className="py-3 px-4 whitespace-nowrap">단계</th>
                  <th className="py-3 px-4">주제</th>
                  <th className="py-3 px-4">세부 학습 내용</th>
                  <th className="py-3 px-4 whitespace-nowrap">실습 결과물</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {curriculumRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {row.session}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-blue-900">
                        {row.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 min-w-[140px]">
                      {row.topic}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed min-w-[240px]">
                      {row.detail}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-800 whitespace-nowrap">
                      {row.outcome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 수료 요건 (PRD 6.3) */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-base">
            공식 수료 기준 및 요건
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="block text-slate-900 font-bold mb-1">1. 출석률 80% 이상 충족</strong>
              <span>총 16회차(48시간) 중 13회차 이상 정상 출석 (증빙 가능한 질병·경조사는 공결 인정)</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="block text-slate-900 font-bold mb-1">2. 모의 시연 강의 심사 통과</strong>
              <span>15회차 최종 모의 강의 시연 평가(태도, 전달력, 교안 구성)에서 기준 점수 이상 획득</span>
            </div>
          </div>
        </section>

        {/* Apply CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('apply')}
            className="px-8 py-3.5 bg-blue-900 text-white font-bold rounded-xl text-sm sm:text-base hover:bg-blue-950 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>시민 AI강사 신청서 작성하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
