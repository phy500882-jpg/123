import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, Share2, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, config, openShareModal, openNextTermModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: '과정 소개' },
    { id: 'curriculum', label: '커리큘럼' },
    { id: 'recruit', label: '모집 요강' },
    { id: 'apply', label: '온라인 신청' },
    { id: 'notice', label: '공지사항' },
    { id: 'faq', label: '자주 묻는 질문' },
    { id: 'contact', label: '문의처' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
  };

  const handlePrimaryAction = () => {
    if (config.recruitmentStatus === 'closed') {
      openNextTermModal();
    } else {
      setCurrentView('apply');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Single wordmark brand anchor */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left text-slate-900 group whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm">
            AI
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-950 leading-tight">
              천안시 시민 AI강사 양성과정
            </span>
            <span className="text-xs text-slate-500 font-medium tracking-tight hidden sm:inline">
              천안시 공식 배움터 시민강사단
            </span>
          </div>
        </button>

        {/* Zone 2: 7 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'apply' && currentView === 'apply-check');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'text-blue-900 font-semibold'
                    : 'hover:text-slate-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + Share */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={openShareModal}
            title="공유 및 홍보물 QR 안내"
            className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="공유 및 QR 안내"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrimaryAction}
            className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 ${
              config.recruitmentStatus === 'closed'
                ? 'bg-slate-700 text-white hover:bg-slate-800'
                : 'bg-blue-900 text-white hover:bg-blue-950 hover:shadow-sm'
            }`}
          >
            {config.recruitmentStatus === 'closed' ? '다음 기수 알림' : '신청서 작성하기'}
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="메뉴 열기/닫기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Flat 1-Tier Menu (NO nested menus) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in fade-in duration-150">
          <div className="flex flex-col divide-y divide-slate-100">
            <button
              onClick={() => handleNavClick('home')}
              className={`py-3 text-left text-base font-medium flex items-center justify-between ${
                currentView === 'home' ? 'text-blue-900 font-bold' : 'text-slate-800'
              }`}
            >
              <span>홈 (처음으로)</span>
            </button>
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'apply' && currentView === 'apply-check');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-3 text-left text-base font-medium flex items-center justify-between ${
                    isActive ? 'text-blue-900 font-bold' : 'text-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'apply' && config.recruitmentStatus === 'open' && (
                    <span className="text-xs bg-blue-100 text-blue-900 font-semibold px-2 py-0.5 rounded">
                      접수중
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href={`tel:${config.contactPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-800 rounded-lg font-medium text-sm hover:bg-slate-200"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>운영 문의 {config.contactPhone}</span>
              </a>
              <button
                onClick={handlePrimaryAction}
                className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold text-sm hover:bg-blue-950 text-center"
              >
                {config.recruitmentStatus === 'closed' ? '다음 기수 알림 신청' : '신청서 작성하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
