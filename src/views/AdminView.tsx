import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Applicant, Notice, FAQItem, ContactInquiry } from '../types';
import {
  Users, Download, Search, Settings, MessageSquare,
  FileText, HelpCircle, Check, X, ShieldAlert,
  Edit, Trash2, Send, Plus, ArrowLeft, RefreshCw
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    applicants, updateApplicant, config, updateConfig,
    notices, addNotice, deleteNotice,
    faqs, addFaq, deleteFaq,
    inquiries, markInquiryAnswered,
    nextBatchList, showSmsPreview, setCurrentView
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'applicants' | 'sms' | 'settings' | 'notices' | 'faqs' | 'inquiries' | 'nextBatch'>('applicants');

  // Applicants Filter & Search
  const [applicantSearch, setApplicantSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  // SMS Simulator State
  const [smsTarget, setSmsTarget] = useState<'doc_passed' | 'final_selected' | 'all'>('doc_passed');
  const [smsTemplateType, setSmsTemplateType] = useState<'doc_pass' | 'final_pass' | 'reject'>('doc_pass');
  const [smsCustomTitle, setSmsCustomTitle] = useState('[천안시] 시민 AI강사 양성과정 1차 서류 심사 결과 안내');
  const [smsCustomBody, setSmsCustomBody] = useState(`[천안시] {이름}님, 시민 AI강사 양성과정 1차 서류 심사에 합격하셨습니다.

■ 2차 대면 인터뷰 안내
- 일시: 2026. 04. 09(목) 14:00 (개별 배정 시간 준수)
- 장소: 천안시 청년센터 배움터 2층
- 준비물: 신분증 지참 (단정한 복장)

참석 여부를 회신해 주시기 바랍니다.
문의: 운영사무국 ${config.contactPhone}`);

  // Settings State
  const [editConfig, setEditConfig] = useState(config);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  // New Notice / FAQ states
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticePinned, setNewNoticePinned] = useState(false);
  const [isAddingNotice, setIsAddingNotice] = useState(false);

  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState<'qualification' | 'curriculum' | 'activity' | 'etc'>('qualification');
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'cheonan2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    setAuthError(false);
  };

  // Export Applicants to CSV with UTF-8 BOM (PRD F-09)
  const handleExportCSV = () => {
    const headers = [
      '접수번호', '성명', '생년월일', '성별', '연락처', '이메일',
      '거주구', '거주동', '학력', '현재상태', '강의경험유무',
      '강의경험상세', 'AI활용수준', '희망강의분야', '지원동기',
      '접수일시', '심사진행상태'
    ];

    const rows = applicants.map(a => [
      `"${a.applicationNumber}"`,
      `"${a.name}"`,
      `"${a.birthDate}"`,
      `"${a.gender}"`,
      `"${a.phone}"`,
      `"${a.email || '-'}"`,
      `"${a.district}"`,
      `"${a.dong}"`,
      `"${a.education}"`,
      `"${a.occupation || '-'}"`,
      `"${a.hasTeachingExp ? '유' : '무'}"`,
      `"${(a.teachingExpDetail || '').replace(/"/g, '""')}"`,
      `"${a.aiFamiliarity}"`,
      `"${(a.targetAudience || '').replace(/"/g, '""')}"`,
      `"${(a.motivation || '').replace(/"/g, '""')}"`,
      `"${a.createdAt}"`,
      `"${a.status}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `천안시_시민AI강사_지원자명단_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredApplicants = applicants.filter(a => {
    const matchSearch =
      a.name.includes(applicantSearch) ||
      a.phone.includes(applicantSearch) ||
      a.applicationNumber.toLowerCase().includes(applicantSearch.toLowerCase()) ||
      a.dong.includes(applicantSearch);
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchDistrict = districtFilter === 'all' || a.district === districtFilter;
    return matchSearch && matchStatus && matchDistrict;
  });

  const handleStatusChange = (appNum: string, newStatus: Applicant['status']) => {
    updateApplicant(appNum, { status: newStatus });
    if (selectedApplicant && selectedApplicant.applicationNumber === appNum) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleTemplateSelect = (type: 'doc_pass' | 'final_pass' | 'reject') => {
    setSmsTemplateType(type);
    if (type === 'doc_pass') {
      setSmsCustomTitle('[천안시] 시민 AI강사 양성과정 1차 서류 심사 결과 안내');
      setSmsCustomBody(`[천안시] {이름}님, 시민 AI강사 양성과정 1차 서류 심사에 합격하셨습니다.\n\n■ 2차 대면 인터뷰 안내\n- 일시: 2026. 04. 09(목) 14:00\n- 장소: 천안시 청년센터 배움터 2층\n- 준비물: 신분증 지참\n\n문의: 운영사무국 ${config.contactPhone}`);
    } else if (type === 'final_pass') {
      setSmsCustomTitle('[천안시] 시민 AI강사 양성과정 최종 선발 축하 안내');
      setSmsCustomBody(`[천안시] {이름}님, 축하드립니다! 천안시 시민 AI강사 양성과정 제1기 교육생으로 최종 선발되셨습니다.\n\n■ 개강식 및 1회차 교육\n- 일시: 2026. 04. 14(화) 14:00\n- 장소: 천안타운홀 배움터\n- 준비물: 필기도구 (PC 구비 완료)\n\n문의: 운영사무국 ${config.contactPhone}`);
    } else {
      setSmsCustomTitle('[천안시] 시민 AI강사 양성과정 전형 결과 안내');
      setSmsCustomBody(`[천안시] {이름}님, 천안시 시민 AI강사 양성과정에 보내주신 관심과 성원에 깊이 감사드립니다.\n\n제한된 정원으로 인해 아쉽게도 이번 기수에는 모시지 못하게 되었습니다. 차기 기수 모집 시 우선 안내해 드리겠습니다.\n\n천안시 사업운영팀 드림`);
    }
  };

  const handleSendBulkSms = () => {
    let targetList = applicants;
    if (smsTarget === 'doc_passed') {
      targetList = applicants.filter(a => a.status === 'doc_passed');
    } else if (smsTarget === 'final_selected') {
      targetList = applicants.filter(a => a.status === 'final_selected');
    }

    if (targetList.length === 0) {
      alert('발송 대상자가 0명입니다. 먼저 지원자의 심사 상태를 변경해 주세요.');
      return;
    }

    // Trigger SMS simulation for the first target
    const sampleTarget = targetList[0];
    const personalizedBody = smsCustomBody.replace('{이름}', sampleTarget.name);

    showSmsPreview(
      sampleTarget.phone,
      smsCustomTitle,
      personalizedBody + `\n\n(외 ${targetList.length - 1}명에게 일괄 동시 발송 완료)`
    );
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(editConfig);
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 2500);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;
    const now = new Date();
    const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;
    addNotice({
      title: newNoticeTitle.trim(),
      content: newNoticeContent.trim(),
      isPinned: newNoticePinned,
      date: dateStr,
      author: '천안시 사업운영팀',
    });
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticePinned(false);
    setIsAddingNotice(false);
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    addFaq({
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory,
    });
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    setIsAddingFaq(false);
  };

  // Login view if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="py-16 md:py-24 bg-slate-100 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white p-8 rounded-2xl border border-slate-300 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">운영진 전용 관리자 모드</h1>
            <p className="text-xs text-slate-500">
              천안시 시민 AI강사 양성과정 사업 운영진만 접근 가능합니다.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg text-center">
                비밀번호가 올바르지 않습니다.
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">관리자 비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력 (기본: cheonan2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-950 transition-colors shadow-2xs"
              >
                관리자 로그인
              </button>
              
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                데모 바로 로그인 (평가용)
              </button>
            </div>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setCurrentView('home')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              홈페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Admin Header */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                사업운영국
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                천안시 시민 AI강사 양성과정 통합 관리 콘솔
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              신청자 현황 관리, CSV 엑셀 다운로드, 선발 결과 문자 발송, 공지 및 FAQ 관리를 수행합니다.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>사이트 바로가기</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3.5 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Admin Quick Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block mb-1">총 지원자 접수</span>
            <strong className="text-xl font-bold text-slate-900 font-mono">{applicants.length}명</strong>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block mb-1">1차 서류 합격자</span>
            <strong className="text-xl font-bold text-amber-700 font-mono">
              {applicants.filter(a => a.status === 'doc_passed').length}명
            </strong>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block mb-1">최종 선발 완료</span>
            <strong className="text-xl font-bold text-emerald-700 font-mono">
              {applicants.filter(a => a.status === 'final_selected').length}명
            </strong>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-slate-500 block mb-1">현재 모집 상태</span>
            <strong className="text-sm font-bold text-blue-900">
              {config.recruitmentStatus === 'open' ? '모집 진행중 (정상)' : config.recruitmentStatus === 'closed' ? '모집 마감' : '모집 준비중'}
            </strong>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 p-1 flex items-center gap-1 overflow-x-auto shadow-2xs">
          {[
            { id: 'applicants', label: `신청자 관리 (${applicants.length})`, icon: Users },
            { id: 'sms', label: '선발 결과 SMS 발송', icon: Send },
            { id: 'settings', label: '모집 일정 및 사이트 설정', icon: Settings },
            { id: 'notices', label: `공지사항 (${notices.length})`, icon: FileText },
            { id: 'faqs', label: `FAQ 관리 (${faqs.length})`, icon: HelpCircle },
            { id: 'inquiries', label: `온라인 문의 (${inquiries.length})`, icon: MessageSquare },
            { id: 'nextBatch', label: `차기 기수 알림자 (${nextBatchList.length})`, icon: Plus },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Applicants List (F-09) */}
        {activeTab === 'applicants' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            
            {/* Filter & Action Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative w-48 sm:w-60">
                  <input
                    type="text"
                    placeholder="이름, 번호, 접수번호 검색..."
                    value={applicantSearch}
                    onChange={(e) => setApplicantSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="all">전체 상태</option>
                  <option value="submitted">서류 접수</option>
                  <option value="doc_passed">서류 합격</option>
                  <option value="final_selected">최종 선발</option>
                  <option value="rejected">미선정</option>
                  <option value="canceled">취소</option>
                </select>

                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="all">전체 구</option>
                  <option value="동남구">동남구</option>
                  <option value="서북구">서북구</option>
                </select>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>엑셀(CSV) 다운로드</span>
              </button>
            </div>

            {/* Applicants Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 whitespace-nowrap">접수번호</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">성명</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">연락처</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">지역</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">강의경험</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">희망강의분야</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">상태</th>
                    <th className="py-2.5 px-3 whitespace-nowrap">심사 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {app.applicationNumber}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedApplicant(app)}
                            className="hover:text-blue-900 hover:underline"
                          >
                            {app.name}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono whitespace-nowrap">{app.phone}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">{app.district} {app.dong}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {app.hasTeachingExp ? (
                            <span className="text-blue-800 font-semibold">유 (경험있음)</span>
                          ) : (
                            <span className="text-slate-500">무 (신규)</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 max-w-[150px] truncate" title={app.targetAudience}>
                          {app.targetAudience}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {app.status === 'submitted' && <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded">접수</span>}
                          {app.status === 'doc_passed' && <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold rounded">서류합격</span>}
                          {app.status === 'final_selected' && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded">최종선발</span>}
                          {app.status === 'rejected' && <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded">미선정</span>}
                          {app.status === 'canceled' && <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded">취소</span>}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStatusChange(app.applicationNumber, 'doc_passed')}
                              title="서류 합격 처리"
                              className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded text-[11px] hover:bg-amber-100"
                            >
                              서류합격
                            </button>
                            <button
                              onClick={() => handleStatusChange(app.applicationNumber, 'final_selected')}
                              title="최종 선발 처리"
                              className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-[11px] hover:bg-emerald-100"
                            >
                              최종선발
                            </button>
                            <button
                              onClick={() => setSelectedApplicant(app)}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] hover:bg-slate-200"
                            >
                              상세보기
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        조건에 맞는 지원자가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200">
              
              <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-mono">
                    접수번호: {selectedApplicant.applicationNumber} ({selectedApplicant.createdAt})
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">
                    {selectedApplicant.name} 지원자 상세 심사 카드
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div>성별: <strong>{selectedApplicant.gender}</strong></div>
                  <div>생년월일: <strong>{selectedApplicant.birthDate}</strong></div>
                  <div>연락처: <strong className="font-mono">{selectedApplicant.phone}</strong></div>
                  <div>이메일: <strong>{selectedApplicant.email || '-'}</strong></div>
                  <div>거주지: <strong>{selectedApplicant.district} {selectedApplicant.dong}</strong></div>
                  <div>학력: <strong>{selectedApplicant.education}</strong></div>
                  <div>직업/상태: <strong>{selectedApplicant.occupation || '-'}</strong></div>
                  <div>AI활용수준: <strong>{selectedApplicant.aiFamiliarity}</strong></div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs">강의 및 봉사 경험</div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs leading-relaxed">
                    {selectedApplicant.hasTeachingExp
                      ? (selectedApplicant.teachingExpDetail || '있음')
                      : '경험 없음 (신규 도전)'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs">희망 강의 대상 분야</div>
                  <div className="p-3 bg-slate-50 rounded-lg text-xs font-semibold text-blue-950">
                    {selectedApplicant.targetAudience}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-slate-900 text-xs">지원 동기 및 참여 각오</div>
                  <div className="p-3.5 bg-slate-50 rounded-lg text-xs leading-relaxed whitespace-pre-line border border-slate-200">
                    {selectedApplicant.motivation}
                  </div>
                </div>

                {/* Status Switch Buttons */}
                <div className="pt-2 space-y-2">
                  <div className="font-bold text-slate-900 text-xs">심사 결과 변경</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleStatusChange(selectedApplicant.applicationNumber, 'submitted')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                        selectedApplicant.status === 'submitted' ? 'bg-blue-900 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      서류 접수
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplicant.applicationNumber, 'doc_passed')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                        selectedApplicant.status === 'doc_passed' ? 'bg-amber-800 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      1차 서류 합격
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplicant.applicationNumber, 'final_selected')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                        selectedApplicant.status === 'final_selected' ? 'bg-emerald-800 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      최종 선발
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedApplicant.applicationNumber, 'rejected')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                        selectedApplicant.status === 'rejected' ? 'bg-slate-700 text-white' : 'bg-white text-slate-700'
                      }`}
                    >
                      미선정
                    </button>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  닫기
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SMS Simulator & Dispatcher (F-10) */}
        {activeTab === 'sms' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">선발 결과 일괄 문자(SMS) 발송 시스템</h2>
              <p className="text-xs text-slate-500 mt-1">
                서류 합격, 대면 인터뷰 안내, 최종 선발 안내 문자를 템플릿 기반으로 일괄 시뮬레이션 발송합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Template & Targets */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">발송 대상 그룹</label>
                  <select
                    value={smsTarget}
                    onChange={(e) => setSmsTarget(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="doc_passed">
                      1차 서류 합격자 ({applicants.filter(a => a.status === 'doc_passed').length}명)
                    </option>
                    <option value="final_selected">
                      최종 선발 완료자 ({applicants.filter(a => a.status === 'final_selected').length}명)
                    </option>
                    <option value="all">
                      전체 접수자 ({applicants.length}명)
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">표준 메시지 템플릿 선택</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleTemplateSelect('doc_pass')}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center ${
                        smsTemplateType === 'doc_pass' ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold' : 'border-slate-200'
                      }`}
                    >
                      서류 합격 안내
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTemplateSelect('final_pass')}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center ${
                        smsTemplateType === 'final_pass' ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                      }`}
                    >
                      최종 선발 축하
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTemplateSelect('reject')}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center ${
                        smsTemplateType === 'reject' ? 'border-slate-700 bg-slate-100 text-slate-900 font-bold' : 'border-slate-200'
                      }`}
                    >
                      미선정 위로
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">문자 제목</label>
                  <input
                    type="text"
                    value={smsCustomTitle}
                    onChange={(e) => setSmsCustomTitle(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">문자 내용 ({'{이름}'} 치환 지원)</label>
                  <textarea
                    rows={7}
                    value={smsCustomBody}
                    onChange={(e) => setSmsCustomBody(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg text-xs font-sans leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleSendBulkSms}
                  className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-blue-950 transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                  <span>선택 대상자 일괄 발송 시뮬레이션</span>
                </button>
              </div>

              {/* Right: Phone Preview Screen */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs bg-white rounded-2xl border border-slate-300 shadow-lg overflow-hidden">
                  <div className="bg-slate-900 text-white px-4 py-2 text-[11px] font-mono flex items-center justify-between">
                    <span>메시지 수신 미리보기</span>
                    <span>천안시청</span>
                  </div>
                  <div className="p-4 space-y-2 bg-slate-50 min-h-[220px]">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs text-xs space-y-1.5 whitespace-pre-line text-slate-800">
                      <div className="font-bold text-blue-900 pb-1 border-b border-slate-100">
                        {smsCustomTitle}
                      </div>
                      <div>
                        {smsCustomBody.replace('{이름}', '김영희')}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-t border-slate-200 text-center text-[10px] text-slate-400">
                    실제 발송 시 지원자의 실명으로 자동 치환됩니다.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: Settings Editor (F-06, F-09) */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveConfig} className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">모집 일정 및 사이트 환경 설정</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  모집 상태 전환(시작 전 / 모집 중 / 마감), 접수 기간, 문의처 정보를 실시간으로 수정합니다.
                </p>
              </div>
              {configSaveSuccess && (
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded font-bold">
                  설정이 저장되었습니다!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">모집 상태 자동 전환</label>
                <select
                  value={editConfig.recruitmentStatus}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, recruitmentStatus: e.target.value as any }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="open">모집 중 (온라인 접수 버튼 활성화)</option>
                  <option value="upcoming">모집 준비 중</option>
                  <option value="closed">모집 마감 (다음 기수 알림 버튼으로 자동 전환)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">선발 인원</label>
                <input
                  type="text"
                  value={editConfig.targetCount}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, targetCount: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">모집 시작일</label>
                <input
                  type="text"
                  value={editConfig.recruitStartDate}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, recruitStartDate: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">모집 마감일 (D-Day 기준)</label>
                <input
                  type="text"
                  value={editConfig.recruitEndDate}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, recruitEndDate: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">교육 시작일 ~ 종료일</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={editConfig.courseStartDate}
                    onChange={(e) => setEditConfig(prev => ({ ...prev, courseStartDate: e.target.value }))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={editConfig.courseEndDate}
                    onChange={(e) => setEditConfig(prev => ({ ...prev, courseEndDate: e.target.value }))}
                    className="w-full p-2.5 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">교육 일정 안내</label>
                <input
                  type="text"
                  value={editConfig.courseSchedule}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, courseSchedule: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">대표 문의 전화번호</label>
                <input
                  type="text"
                  value={editConfig.contactPhone}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, contactPhone: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">대표 문의 이메일</label>
                <input
                  type="text"
                  value={editConfig.contactEmail}
                  onChange={(e) => setEditConfig(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-950 transition-colors shadow-2xs"
              >
                설정 저장 반영
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: Notices Manager */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">공지사항 관리</h2>
                <p className="text-xs text-slate-500">홈페이지에 게시되는 공지글을 등록하고 삭제합니다.</p>
              </div>
              <button
                onClick={() => setIsAddingNotice(!isAddingNotice)}
                className="px-3 py-1.5 bg-blue-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>새 공지 등록</span>
              </button>
            </div>

            {isAddingNotice && (
              <form onSubmit={handleCreateNotice} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">공지 제목</label>
                  <input
                    type="text"
                    required
                    placeholder="제목을 입력하세요"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">공지 본문</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="내용을 작성하세요"
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="pinnedCheck"
                    checked={newNoticePinned}
                    onChange={(e) => setNewNoticePinned(e.target.checked)}
                  />
                  <label htmlFor="pinnedCheck" className="text-slate-700">상단 고정 (주요 공지)</label>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNotice(false)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-900 text-white rounded font-semibold"
                  >
                    게시하기
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {notices.map((n) => (
                <div key={n.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {n.isPinned && <span className="bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded font-bold text-[10px]">고정</span>}
                      <strong className="text-slate-900 font-bold">{n.title}</strong>
                    </div>
                    <span className="text-slate-500 text-[11px]">{n.date} · 조회 {n.views}</span>
                  </div>
                  <button
                    onClick={() => deleteNotice(n.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    title="공지 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FAQs Manager */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">FAQ 문항 관리</h2>
                <p className="text-xs text-slate-500">자주 묻는 질문 항목을 추가하고 관리합니다.</p>
              </div>
              <button
                onClick={() => setIsAddingFaq(!isAddingFaq)}
                className="px-3 py-1.5 bg-blue-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>FAQ 문항 추가</span>
              </button>
            </div>

            {isAddingFaq && (
              <form onSubmit={handleCreateFaq} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">분류</label>
                  <select
                    value={newFaqCategory}
                    onChange={(e) => setNewFaqCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="qualification">지원 자격 및 선발</option>
                    <option value="curriculum">교육 과정 및 실습</option>
                    <option value="activity">수료 후 강사 활동</option>
                    <option value="etc">기타 및 준비물</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">질문 (Q)</label>
                  <input
                    type="text"
                    required
                    placeholder="질문 제목을 입력하세요"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">답변 (A)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="상세 답변을 작성하세요"
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingFaq(false)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-900 text-white rounded font-semibold"
                  >
                    추가하기
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {faqs.map((f) => (
                <div key={f.id} className="p-4 flex items-start justify-between gap-4 text-xs hover:bg-slate-50">
                  <div className="space-y-1">
                    <strong className="text-slate-900 font-bold block">Q. {f.question}</strong>
                    <p className="text-slate-600 leading-relaxed text-[11px] line-clamp-2">{f.answer}</p>
                  </div>
                  <button
                    onClick={() => deleteFaq(f.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded shrink-0"
                    title="문항 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Inquiries Manager (F-08) */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">온라인 문의 접수 내역</h2>
              <p className="text-xs text-slate-500">홈페이지 [문의] 양식으로 시민들이 남겨주신 문의글입니다.</p>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 space-y-2 text-xs hover:bg-slate-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{inq.name}</span>
                        <span className="text-slate-500 font-mono">({inq.phone})</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">{inq.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">{inq.createdAt}</span>
                        {inq.isAnswered ? (
                          <span className="text-emerald-700 font-bold text-[11px]">처리완료</span>
                        ) : (
                          <button
                            onClick={() => markInquiryAnswered(inq.id, '유선 안내 완료')}
                            className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-semibold text-[11px] hover:bg-blue-200"
                          >
                            답변 완료 처리
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-800 leading-relaxed">
                      {inq.message}
                    </div>
                    {inq.adminReply && (
                      <div className="text-[11px] text-emerald-800 font-medium">
                        운영진 메모: {inq.adminReply}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  접수된 문의 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: Next Batch Subscribers (F-11) */}
        {activeTab === 'nextBatch' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">다음 기수 사전 알림 신청 명단</h2>
              <p className="text-xs text-slate-500">다음 2기 모집 오픈 시 문자 발송할 사전 신청자 명단입니다.</p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">신청자 성명</th>
                    <th className="py-2.5 px-3">휴대전화번호</th>
                    <th className="py-2.5 px-3">등록일시</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {nextBatchList.length > 0 ? (
                    nextBatchList.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{sub.name}</td>
                        <td className="py-2.5 px-3 font-mono">{sub.phone}</td>
                        <td className="py-2.5 px-3 text-slate-500">{sub.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-500">
                        아직 사전 알림을 등록한 시민이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
