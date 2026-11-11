import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Applicant } from '../types';
import { Search, Edit3, XCircle, CheckCircle2, ArrowLeft, Save } from 'lucide-react';

export const ApplyCheckView: React.FC = () => {
  const { findApplicant, updateApplicant, cancelApplicant, config, setCurrentView } = useApp();

  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchAppNum, setSearchAppNum] = useState('');
  
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editMotivation, setEditMotivation] = useState('');
  const [editTeachingExp, setEditTeachingExp] = useState('');
  const [editTargetAudience, setEditTargetAudience] = useState('');
  const [editSuccessMsg, setEditSuccessMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setEditSuccessMsg('');
    setIsEditing(false);

    if (!searchName.trim() || !searchPhone.trim() || !searchAppNum.trim()) {
      setErrorMsg('성명, 휴대폰번호, 접수번호를 모두 입력해주세요.');
      return;
    }

    const found = findApplicant(searchName, searchPhone, searchAppNum);
    setSearched(true);
    if (found) {
      setApplicant(found);
      setEditMotivation(found.motivation);
      setEditTeachingExp(found.teachingExpDetail);
      setEditTargetAudience(found.targetAudience);
    } else {
      setApplicant(null);
    }
  };

  const handleSaveEdit = () => {
    if (!applicant) return;
    if (!editMotivation.trim()) {
      alert('지원 동기를 입력해주세요.');
      return;
    }

    const success = updateApplicant(applicant.applicationNumber, {
      motivation: editMotivation.trim(),
      teachingExpDetail: editTeachingExp.trim(),
      targetAudience: editTargetAudience.trim(),
    });

    if (success) {
      setApplicant(prev => prev ? {
        ...prev,
        motivation: editMotivation.trim(),
        teachingExpDetail: editTeachingExp.trim(),
        targetAudience: editTargetAudience.trim(),
      } : null);
      setIsEditing(false);
      setEditSuccessMsg('신청서 내용이 성공적으로 수정되었습니다.');
      setTimeout(() => setEditSuccessMsg(''), 3000);
    }
  };

  const handleCancelApplication = () => {
    if (!applicant) return;
    if (confirm('정말로 지원 신청을 취소하시겠습니까? 취소 후에는 재접수가 필요합니다.')) {
      cancelApplicant(applicant.applicationNumber);
      setApplicant(prev => prev ? { ...prev, status: 'canceled' } : null);
      alert('신청이 취소되었습니다.');
    }
  };

  const getStatusBadge = (status: Applicant['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-900 font-bold rounded text-xs">서류 접수 완료</span>;
      case 'doc_passed':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded text-xs">1차 서류 합격 (면접 대상)</span>;
      case 'final_selected':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold rounded text-xs">최종 선발 완료</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold rounded text-xs">선발 미선정</span>;
      case 'canceled':
        return <span className="px-2.5 py-1 bg-rose-100 text-rose-700 font-bold rounded text-xs">신청 취소됨</span>;
      default:
        return null;
    }
  };

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <span>신청 관리</span>
            <span aria-hidden="true">·</span>
            <span>조회 및 수정</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            내 신청 내역 조회 및 수정
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            신청 시 발급받으신 접수번호와 인적사항으로 현재 진행 상태를 확인하고 내용을 수정하실 수 있습니다.
          </p>
        </div>

        {/* Search Form Card */}
        <form onSubmit={handleSearch} className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-900" />
            <span>신청 내역 확인을 위한 정보 입력</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">성명</label>
              <input
                type="text"
                placeholder="예: 김영희"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">휴대전화번호</label>
              <input
                type="text"
                placeholder="010-0000-0000"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">접수번호</label>
              <input
                type="text"
                placeholder="예: CAI-2026-0001"
                value={searchAppNum}
                onChange={(e) => setSearchAppNum(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-950 transition-colors shadow-2xs"
            >
              신청 내역 조회하기
            </button>
          </div>
        </form>

        {/* Search Results */}
        {searched && (
          <div>
            {applicant ? (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
                
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500 font-mono">접수번호: {applicant.applicationNumber}</div>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">{applicant.name} 님의 신청 내역</div>
                  </div>
                  <div>
                    {getStatusBadge(applicant.status)}
                  </div>
                </div>

                {editSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{editSuccessMsg}</span>
                  </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg">
                  <div>생년월일: <span className="font-medium text-slate-900">{applicant.birthDate}</span></div>
                  <div>성별: <span className="font-medium text-slate-900">{applicant.gender}</span></div>
                  <div>연락처: <span className="font-mono font-medium text-slate-900">{applicant.phone}</span></div>
                  <div>거주지: <span className="font-medium text-slate-900">{applicant.district} {applicant.dong}</span></div>
                  <div>접수일시: <span className="text-slate-500">{applicant.createdAt}</span></div>
                  <div>최종수정: <span className="text-slate-500">{applicant.updatedAt}</span></div>
                </div>

                {/* Editable Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">희망 강의 대상</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTargetAudience}
                        onChange={(e) => setEditTargetAudience(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-800 font-medium">
                        {applicant.targetAudience}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">강의 / 봉사 경험</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTeachingExp}
                        onChange={(e) => setEditTeachingExp(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-800">
                        {applicant.hasTeachingExp ? (applicant.teachingExpDetail || '있음') : '처음 도전'}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">지원 동기 및 참여 각오</label>
                    {isEditing ? (
                      <textarea
                        rows={5}
                        maxLength={500}
                        value={editMotivation}
                        onChange={(e) => setEditMotivation(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg text-xs"
                      />
                    ) : (
                      <div className="p-3.5 bg-slate-50 rounded-lg text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                        {applicant.motivation}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  {applicant.status !== 'canceled' && config.recruitmentStatus === 'open' && (
                    <>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>수정사항 저장</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-2 text-slate-600 hover:text-slate-800 text-xs"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>신청 내용 수정하기</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelApplication}
                            className="px-3 py-2 text-rose-700 hover:text-rose-900 text-xs flex items-center gap-1 hover:underline"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>신청 취소</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  <div className="text-[11px] text-slate-400">
                    모집 마감({config.recruitEndDate}) 전까지 자유롭게 수정 가능합니다.
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">일치하는 신청 내역을 찾을 수 없습니다</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  성명, 휴대폰번호, 접수번호가 정확히 입력되었는지 다시 확인해 주세요. (예: CAI-2026-0001 형식)
                </p>
                <div className="pt-2 text-xs text-slate-500">
                  접수번호를 분실하신 경우 운영사무국({config.contactPhone})으로 문의하시면 확인을 도와드립니다.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('home')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>메인 홈으로 돌아가기</span>
          </button>
        </div>

      </div>
    </div>
  );
};
