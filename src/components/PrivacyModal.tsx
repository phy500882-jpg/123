import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Check } from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyModalOpen, closePrivacyModal } = useApp();

  if (!isPrivacyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-900" />
            <h3 className="text-lg font-bold text-slate-900">개인정보 처리 및 수집·이용 방침</h3>
          </div>
          <button
            onClick={closePrivacyModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-blue-50/70 rounded-lg border border-blue-100 text-blue-950 font-medium text-xs leading-normal">
            천안시 시민 AI강사 양성과정은 「개인정보 보호법」 등 관련 법령에 따라 참여자의 개인정보를 안전하게 보호하며, 수집 항목을 최소화하여 투명하게 운영합니다.
          </div>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">1. 수집하는 개인정보 항목</h4>
            <p>
              본 과정 신청 및 접수 시 다음의 최소한의 필수 정보를 수집합니다:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li><strong>기본 식별 정보</strong>: 성명, 생년월일, 성별, 거주 구·동(천안시 거주 확인용)</li>
              <li><strong>연락처 정보</strong>: 휴대전화번호, 이메일 주소 (선발 안내 및 공지 수신용)</li>
              <li><strong>역량 및 지원 정보</strong>: 최종학력, 강의/봉사 경험 여부 및 내용, 디지털 활용 역량 자가진단, 지원 동기 및 활동 포부</li>
              <li><span className="text-rose-700 font-semibold">※ 주민등록번호는 절대 수집하지 않습니다. 본인 확인은 선발 후 오프라인에서 최소한의 서류로 진행됩니다.</span></li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">2. 개인정보의 수집 및 이용 목적</h4>
            <p>
              수집된 개인정보는 다음의 목적에 한하여 사용되며, 목적 이외의 용도로는 활용되지 않습니다:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li>천안시 시민 AI강사 양성과정 서류 및 면접 전형 심사</li>
              <li>합격·선발 결과 안내 및 오리엔테이션 일정 SMS/이메일 발송</li>
              <li>과정 운영 중 출결 관리 및 수료증(천안시장 명의) 발급</li>
              <li>수료 후 천안시 관내 복지관·도서관 등 시민 강사 인력풀 등록 및 활동 연계</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">3. 개인정보의 보유 및 이용 기간</h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li><strong>미선발 지원자</strong>: 최종 선발 결과 공고일로부터 30일 이내 안전하게 파기</li>
              <li><strong>최종 수료자</strong>: 수료 후 1년간 강사 활동 연계 및 이력 관리를 위해 보관 후 파기 (동의 철회 시 즉시 파기)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">4. 동의 거부 권리 및 불이익 안내</h4>
            <p className="text-slate-600 text-xs sm:text-sm">
              신청자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수 항목 수집에 동의하지 않으실 경우 적격 여부 확인이 불가능하여 과정 지원이 제한될 수 있습니다.
            </p>
          </section>

          <section className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div>개인정보 관리 책임: 천안시 시민 AI강사 양성과정 사업운영팀</div>
            <div>문의 및 열람·정정·삭제 요청: 010-0000-0000 / 0000000@hanmail.net</div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={closePrivacyModal}
            className="px-5 py-2 bg-blue-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-950 transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>확인하였습니다</span>
          </button>
        </div>

      </div>
    </div>
  );
};
