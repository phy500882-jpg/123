import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, Printer, QrCode, Share2 } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, closeShareModal, config } = useApp();
  const [copied, setCopied] = useState(false);
  const [copiedKakao, setCopiedKakao] = useState(false);

  if (!isShareModalOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cheonan-ai.kr';
  
  const kakaoMessage = `[천안시] 시민 AI강사 양성과정 모집 안내\n\n"천안에서, 천안 사람에게 AI를 가르칠 강사를 모십니다"\n- 신청 자격: 천안 시민 누구나 (전공·연령 무관)\n- 교육비: 전액 무료 (교재 제공)\n- 모집 기간: ${config.recruitStartDate} ~ ${config.recruitEndDate}\n- 온라인 신청: ${currentUrl}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyKakaoText = () => {
    navigator.clipboard.writeText(kakaoMessage);
    setCopiedKakao(true);
    setTimeout(() => setCopiedKakao(false), 2000);
  };

  const handlePrintPoster = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-900" />
            <h3 className="text-lg font-bold text-slate-900">과정 공유 및 오프라인 홍보물</h3>
          </div>
          <button
            onClick={closeShareModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Section 1: URL Copy */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              홈페이지 주소 복사
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-700 font-mono select-all focus:outline-none"
              />
              <button
                onClick={copyUrl}
                className="px-3.5 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨' : '복사'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: KakaoTalk / Band formatted text copy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                카카오톡 / 네이버 밴드 공유 문구
              </label>
              <button
                onClick={copyKakaoText}
                className="text-xs text-blue-800 hover:text-blue-950 font-semibold flex items-center gap-1"
              >
                {copiedKakao ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKakao ? '문구 복사완료' : '전체 문구 복사'}</span>
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
              {kakaoMessage}
            </div>
          </div>

          {/* Section 3: QR Code for Apartment / Resident Center Bulletin */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-amber-200 shadow-2xs">
                {/* SVG QR Code Illustration representing instant mobile scanning */}
                <svg className="w-20 h-20 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner top-left */}
                  <rect x="10" y="10" width="24" height="24" fill="currentColor" />
                  <rect x="14" y="14" width="16" height="16" fill="white" />
                  <rect x="18" y="18" width="8" height="8" fill="currentColor" />
                  {/* Outer corner top-right */}
                  <rect x="66" y="10" width="24" height="24" fill="currentColor" />
                  <rect x="70" y="14" width="16" height="16" fill="white" />
                  <rect x="74" y="18" width="8" height="8" fill="currentColor" />
                  {/* Outer corner bottom-left */}
                  <rect x="10" y="66" width="24" height="24" fill="currentColor" />
                  <rect x="14" y="70" width="16" height="16" fill="white" />
                  <rect x="18" y="74" width="8" height="8" fill="currentColor" />
                  {/* Data patterns */}
                  <rect x="42" y="12" width="6" height="6" />
                  <rect x="52" y="18" width="6" height="6" />
                  <rect x="42" y="28" width="6" height="6" />
                  <rect x="12" y="44" width="6" height="6" />
                  <rect x="24" y="48" width="6" height="6" />
                  <rect x="40" y="40" width="20" height="20" rx="3" fill="#1e3a8a" />
                  <text x="50" y="53" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">AI</text>
                  <rect x="68" y="42" width="6" height="6" />
                  <rect x="80" y="50" width="6" height="6" />
                  <rect x="44" y="68" width="6" height="6" />
                  <rect x="54" y="76" width="6" height="6" />
                  <rect x="68" y="68" width="6" height="6" />
                  <rect x="78" y="78" width="8" height="8" />
                </svg>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 text-sm">
                  <QrCode className="w-4 h-4 text-amber-800" />
                  <span>아파트 게시판 및 오프라인 홍보용 QR</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-normal">
                  스마트폰 카메라로 비추면 바로 신청 화면으로 연결됩니다. 아파트 승강기나 행정복지센터 부착용 안내문을 즉시 인쇄하실 수 있습니다.
                </p>
                <div className="pt-1 text-[11px] text-amber-800">
                  문의: {config.contactPhone}
                </div>
              </div>
            </div>

            <button
              onClick={handlePrintPoster}
              className="w-full py-2 bg-white border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold hover:bg-amber-100/60 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>오프라인 안내문 인쇄하기 (A4 출력)</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={closeShareModal}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
