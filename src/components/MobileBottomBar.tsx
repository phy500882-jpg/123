import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, FileEdit, BellRing } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { config, currentView, setCurrentView, openNextTermModal } = useApp();

  // If already on apply page during form editing, keep it accessible or allow calling
  const isApplyActive = currentView === 'apply';

  const handleActionClick = () => {
    if (config.recruitmentStatus === 'closed') {
      openNextTermModal();
    } else {
      setCurrentView('apply');
    }
  };

  return (
    <aside aria-label="모바일 빠른 신청 및 전화 상담" className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Telephone Call CTA button */}
        <a
          href={`tel:${config.contactPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs active:scale-[0.98]"
          aria-label="운영 사무국 전화 상담 연결"
        >
          <Phone className="w-4 h-4 text-blue-900 shrink-0" />
          <span className="whitespace-nowrap">전화 문의</span>
        </a>

        {/* Primary Action Button */}
        <button
          onClick={handleActionClick}
          className={`flex-2 flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg text-sm font-bold text-white transition-all shadow-sm active:scale-[0.98] ${
            config.recruitmentStatus === 'closed'
              ? 'bg-slate-700 hover:bg-slate-800'
              : 'bg-blue-900 hover:bg-blue-950'
          }`}
        >
          {config.recruitmentStatus === 'closed' ? (
            <>
              <BellRing className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">다음 기수 알림</span>
            </>
          ) : (
            <>
              <FileEdit className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">{isApplyActive ? '작성 계속하기' : '신청서 작성하기'}</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
