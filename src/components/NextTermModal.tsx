import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, BellRing, Check, ShieldCheck } from 'lucide-react';

export const NextTermModal: React.FC = () => {
  const { isNextTermModalOpen, closeNextTermModal, addNextBatchSubscriber, openPrivacyModal } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isNextTermModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678).');
      return;
    }
    if (!agreed) {
      setError('개인정보 수집 및 안내 문자 수신에 동의해주세요.');
      return;
    }

    addNextBatchSubscriber(name, phone);
    setSubmitted(true);
    setError('');
  };

  const handleClose = () => {
    setName('');
    setPhone('');
    setSubmitted(false);
    setError('');
    closeNextTermModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-900" />
            <h3 className="text-lg font-bold text-slate-900">다음 기수 모집 알림 신청</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">알림 등록이 완료되었습니다</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                차기 기수(제2기) 모집 일정이 확정되는 즉시 입력하신 번호({phone})로 가장 먼저 알림 문자를 발송해 드리겠습니다.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-5 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                이번 기수를 놓치셨거나 다음 일정을 미리 안내받고 싶으신 시민분들은 연락처를 남겨주시면 모집 개시 시점에 문자(SMS)로 안내드립니다.
              </p>

              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  성명 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  휴대전화번호 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-blue-900 focus:ring-blue-900"
                  />
                  <span>
                    [필수] 다음 기수 모집 안내 문자 발송을 위한 개인정보(성명, 전화번호) 수집 및 이용에 동의합니다.{' '}
                    <button
                      type="button"
                      onClick={openPrivacyModal}
                      className="text-blue-900 underline hover:text-blue-950 font-medium"
                    >
                      처리방침 보기
                    </button>
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors shadow-2xs"
                >
                  알림 신청하기
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
