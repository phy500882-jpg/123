import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, MapPin, Building, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <span>과정 소개</span>
            <span aria-hidden="true">·</span>
            <span>추진 배경 및 철학</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            천안시가 시민 AI강사를 양성하는 이유
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            디지털 대전환 시대, 가장 좋은 강사는 멀리 있는 기술 전문가가 아니라 우리 동네 이웃의 마음과 눈높이를 가장 잘 아는 천안 시민입니다.
          </p>
        </div>

        {/* 1. 추진 배경 (Background) */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            1. 왜 천안 시민 강사인가요?
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              생성형 AI(인공지능)는 더 이상 IT 전문가의 전유물이 아닌, 스마트폰과 컴퓨터를 통해 일상과 직무를 혁신하는 생활 도구가 되었습니다. 하지만 우리 주변 경로당, 복지관, 도서관, 골목 상권의 어르신들과 소상공인들은 여전히 AI를 "어렵고 복잡한 기술"로 느끼며 높은 진입장벽을 겪고 있습니다.
            </p>
            <p>
              기존의 1회성 외부 강사 초청 특강은 어려운 전문 용어로 인해 일상에 정착되기 어려웠습니다. 이에 천안시는 시민이 직접 AI의 기본 원리와 활용법을 배우고, 이웃의 눈높이에 맞는 언어로 가르치는 <strong>'지역 밀착형 시민 AI강사 양성 체계'</strong>를 마련했습니다.
            </p>
          </div>
        </section>

        {/* 2. 3대 핵심 방향 */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            2. 과정의 3대 핵심 운영 원칙
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">원칙 01</span>
              <h3 className="font-bold text-slate-900 text-base mb-2">기술보다 눈높이 교수법</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                복잡한 코딩이나 수학 이론을 배제하고, 어르신과 주민들이 바로 체감할 수 있는 실생활 활용 중심의 교수법을 훈련합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">원칙 02</span>
              <h3 className="font-bold text-slate-900 text-base mb-2">배움에서 동네 활동으로</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                수료생을 천안시 강사 인력풀에 등록하여 동남구·서북구 복지관, 도서관, 주민센터의 '찾아가는 배움터' 강사로 연계합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-blue-900 block mb-1">원칙 03</span>
              <h3 className="font-bold text-slate-900 text-base mb-2">수료 후에도 함께 성장</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                급변하는 AI 도구에 발맞춰 정기적인 보수교육과 강사진 네트워킹을 지원하여 지속 가능한 강사 활동을 뒷받침합니다.
              </p>
            </div>

          </div>
        </section>

        {/* 3. 주최 및 운영 기관 */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            3. 주최 · 주관 및 교육 환경
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">주최 및 주관: 천안시</strong>
                <p className="text-xs text-slate-600 mt-1">
                  천안시 정보통신 및 시민 평생교육 정책의 일환으로 예산 전액을 지원하여 시민 누구나 무료로 참여합니다.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">교육 시설: 천안타운홀 및 배움터</strong>
                <p className="text-xs text-slate-600 mt-1">
                  최신 실습용 PC와 대형 전자칠판, 고속 무선 네트워크가 완비되어 있어 개인 장비 없이도 편리하게 수강하실 수 있습니다.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom CTA Block */}
        <div className="p-6 bg-blue-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg">천안시민 강사단에 지금 도전해보세요</h3>
            <p className="text-xs sm:text-sm text-blue-200">
              비전공자 환영, 30명 내외 선발, 수강료 전액 무료
            </p>
          </div>
          <button
            onClick={() => setCurrentView('apply')}
            className="px-6 py-3 bg-white text-blue-950 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>신청서 작성하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
