import React from 'react';
import { useApp } from '../context/AppContext';
import { X, MessageSquare, Check, Bell } from 'lucide-react';

export const SmsSimModal: React.FC = () => {
  const { smsPreview, closeSmsPreview } = useApp();

  if (!smsPreview || !smsPreview.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 flex flex-col">
        
        {/* Simulated Phone Top Bar */}
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-sans font-bold">새 문자 메시지 수신</span>
          </div>
          <button
            onClick={closeSmsPreview}
            className="text-slate-400 hover:text-white p-0.5 rounded"
            aria-label="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sender Info Bar */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
          <div>
            <span className="text-slate-500">발신:</span>{' '}
            <strong className="text-slate-900">천안시 시민강사사업단 (010-0000-0000)</strong>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">방금 전</div>
        </div>

        {/* SMS Message Bubble */}
        <div className="p-4 bg-slate-50 flex-1">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <MessageSquare className="w-4 h-4 text-blue-900" />
              <h4 className="font-bold text-slate-900 text-sm">{smsPreview.title}</h4>
            </div>
            <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
              {smsPreview.body}
            </div>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100">
              <span>수신번호: {smsPreview.phone}</span>
              <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                <Check className="w-3 h-3" /> 발송 완료
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={closeSmsPreview}
            className="w-full py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors"
          >
            확인 (메시지 닫기)
          </button>
        </div>

      </div>
    </div>
  );
};
