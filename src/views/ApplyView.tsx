import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CHEONAN_DISTRICTS } from '../data/initialData';
import {
  Check, ArrowRight, ArrowLeft, Copy,
  CheckCircle2, AlertCircle, Save
} from 'lucide-react';

interface FormData {
  name: string;
  birthDate: string;
  gender: '여성' | '남성';
  phone: string;
  district: '동남구' | '서북구';
  dong: string;
  email: string;
  education: string;
  occupation: string;
  hasTeachingExp: boolean;
  teachingExpDetail: string;
  aiFamiliarity: 'beginner' | 'basic' | 'intermediate' | 'advanced';
  motivation: string;
  targetAudience: string;
  aspiration: string;
  privacyAgreed: boolean;
}

const INITIAL_FORM: FormData = {
  name: '',
  birthDate: '',
  gender: '여성',
  phone: '',
  district: '동남구',
  dong: CHEONAN_DISTRICTS['동남구'][0],
  email: '',
  education: '대졸',
  occupation: '',
  hasTeachingExp: false,
  teachingExpDetail: '',
  aiFamiliarity: 'basic',
  motivation: '',
  targetAudience: '어르신 복지관 및 경로당 디지털 배움터',
  aspiration: '',
  privacyAgreed: false,
};

export const ApplyView: React.FC = () => {
  const { addApplicant, config, openPrivacyModal, setCurrentView } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 is complete
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedAppNumber, setCompletedAppNumber] = useState<string>('');
  const [copiedAppNum, setCopiedAppNum] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  // Check draft on load (F-02)
  useEffect(() => {
    const savedDraft = localStorage.getItem('cai_apply_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        if (parsed && parsed.name) {
          setHasDraft(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Auto-save draft on form change (F-02)
  useEffect(() => {
    if (step < 4) {
      localStorage.setItem('cai_apply_draft', JSON.stringify(formData));
    }
  }, [formData, step]);

  const loadDraft = () => {
    const savedDraft = localStorage.getItem('cai_apply_draft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
      setHasDraft(false);
    }
  };

  const discardDraft = () => {
    localStorage.removeItem('cai_apply_draft');
    setHasDraft(false);
  };

  const validatePhone = (phoneStr: string): boolean => {
    const cleaned = phoneStr.replace(/[^0-9]/g, '');
    return /^010[0-9]{8}$/.test(cleaned);
  };

  const formatPhoneNumber = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    // Immediate validation
    if (formatted.length >= 12 && !validatePhone(formatted)) {
      setErrors(prev => ({ ...prev, phone: '010으로 시작하는 11자리 휴대전화 번호를 입력해주세요.' }));
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '성명을 입력해주세요.';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 입력해주세요.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '휴대전화번호를 입력해주세요.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '올바른 휴대폰 번호 형식을 입력해주세요 (예: 010-1234-5678).';
    }
    if (!formData.dong) {
      newErrors.dong = '거주 읍·면·동을 선택해주세요.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 주소 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.motivation.trim()) {
      newErrors.motivation = '지원 동기를 50자 이상 작성해주세요.';
    } else if (formData.motivation.trim().length < 30) {
      newErrors.motivation = '지원 동기를 최소 30자 이상 구체적으로 적어주세요.';
    }

    if (formData.hasTeachingExp && !formData.teachingExpDetail.trim()) {
      newErrors.teachingExpDetail = '강의 또는 봉사 경험 내용을 간략히 적어주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.privacyAgreed) {
      newErrors.privacyAgreed = '개인정보 수집 및 이용에 동의해주셔야 접수가 가능합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const newApplicant = addApplicant({
      name: formData.name.trim(),
      birthDate: formData.birthDate,
      gender: formData.gender,
      phone: formData.phone.trim(),
      district: formData.district,
      dong: formData.dong,
      email: formData.email.trim(),
      education: formData.education,
      occupation: formData.occupation.trim(),
      hasTeachingExp: formData.hasTeachingExp,
      teachingExpDetail: formData.teachingExpDetail.trim(),
      aiFamiliarity: formData.aiFamiliarity,
      motivation: formData.motivation.trim(),
      targetAudience: formData.targetAudience,
      aspiration: formData.aspiration.trim(),
      privacyAgreed: formData.privacyAgreed,
    });

    setCompletedAppNumber(newApplicant.applicationNumber);
    setStep(4);
    localStorage.removeItem('cai_apply_draft');
  };

  const copyAppNumber = () => {
    navigator.clipboard.writeText(completedAppNumber);
    setCopiedAppNum(true);
    setTimeout(() => setCopiedAppNum(false), 2000);
  };

  // If recruitment is closed
  if (config.recruitmentStatus === 'closed') {
    return (
      <div className="py-16 md:py-24 bg-slate-50 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">모집이 마감되었습니다</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            2026년 천안시 시민 AI강사 양성과정(제1기) 모집이 마감되었습니다.<br />
            보내주신 성원에 감사드리며, 다음 기수 모집 소식을 먼저 받아보실 수 있습니다.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => setCurrentView('apply-check')}
              className="w-full py-3 bg-white border border-slate-300 text-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-100"
            >
              내 접수 내역 조회하기
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="w-full py-3 bg-blue-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-950"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Step Progress & Time Indicator */}
        {step < 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-blue-900">
                천안시 시민 AI강사 온라인 신청
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Save className="w-3.5 h-3.5 text-slate-400" />
                <span>작성 중 자동 저장됨</span>
                <span aria-hidden="true">·</span>
                <span>예상 소요 시간: 3~5분</span>
              </span>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-2 rounded-full transition-colors ${step >= 1 ? 'bg-blue-900' : 'bg-slate-200'}`} />
              <div className={`h-2 rounded-full transition-colors ${step >= 2 ? 'bg-blue-900' : 'bg-slate-200'}`} />
              <div className={`h-2 rounded-full transition-colors ${step >= 3 ? 'bg-blue-900' : 'bg-slate-200'}`} />
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className={step === 1 ? 'text-blue-900 font-bold' : ''}>1단계: 기본 정보</span>
              <span className={step === 2 ? 'text-blue-900 font-bold' : ''}>2단계: 경력 및 지원동기</span>
              <span className={step === 3 ? 'text-blue-900 font-bold' : ''}>3단계: 동의 및 제출</span>
            </div>
          </div>
        )}

        {/* Draft Restore Notification Banner (F-02) */}
        {hasDraft && step === 1 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4 text-amber-700 shrink-0" />
              <span>이전에 작성 중이던 임시 저장 데이터가 있습니다.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={loadDraft}
                className="px-3 py-1.5 bg-amber-800 text-white font-semibold rounded-md text-xs hover:bg-amber-900"
              >
                이어쓰기
              </button>
              <button
                onClick={discardDraft}
                className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 text-xs"
              >
                새로작성
              </button>
            </div>
          </div>
        )}

        {/* Step 1: 기본 정보 */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">1단계: 신청자 기본 인적사항</h2>
              <p className="text-xs text-slate-500 mt-1">
                천안시 거주 확인 및 합격자 개별 안내 문자(SMS) 수신을 위해 정확히 입력해 주세요.
              </p>
            </div>

            <div className="space-y-4">
              {/* 성명 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  성명 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (e.target.value.trim()) {
                      setErrors(prev => { const n = { ...prev }; delete n.name; return n; });
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-900/20 focus:border-blue-900'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* 생년월일 & 성별 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    생년월일 <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, birthDate: e.target.value }));
                      if (e.target.value) {
                        setErrors(prev => { const n = { ...prev }; delete n.birthDate; return n; });
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.birthDate ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-900/20 focus:border-blue-900'
                    }`}
                  />
                  {errors.birthDate && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.birthDate}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    성별 <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: '여성' }))}
                      className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                        formData.gender === '여성'
                          ? 'border-blue-900 bg-blue-50 text-blue-900'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      여성
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: '남성' }))}
                      className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                        formData.gender === '남성'
                          ? 'border-blue-900 bg-blue-50 text-blue-900'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      남성
                    </button>
                  </div>
                </div>
              </div>

              {/* 휴대폰 번호 (F-03 실시간 검증) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  휴대전화번호 <span className="text-rose-600">*</span>
                  <span className="text-slate-500 font-normal ml-1">(접수번호 및 선발 결과 SMS 수신용)</span>
                </label>
                <input
                  type="tel"
                  maxLength={13}
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-900/20 focus:border-blue-900'
                  }`}
                />
                {errors.phone ? (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    숫자만 입력하셔도 하이픈(-)이 자동으로 적용됩니다.
                  </p>
                )}
              </div>

              {/* 거주지 (천안시 구·동 선택) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  천안시 거주 지역 <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formData.district}
                    onChange={(e) => {
                      const dist = e.target.value as '동남구' | '서북구';
                      setFormData(prev => ({
                        ...prev,
                        district: dist,
                        dong: CHEONAN_DISTRICTS[dist][0]
                      }));
                    }}
                    className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    <option value="동남구">천안시 동남구</option>
                    <option value="서북구">천안시 서북구</option>
                  </select>

                  <select
                    value={formData.dong}
                    onChange={(e) => setFormData(prev => ({ ...prev, dong: e.target.value }))}
                    className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    {CHEONAN_DISTRICTS[formData.district].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 이메일 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  이메일 주소 <span className="text-slate-400 font-normal">(선택)</span>
                </label>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* 현재 상태/직업 & 학력 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    최종 학력 <span className="text-slate-400 font-normal">(참고용)</span>
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  >
                    <option value="고졸">고등학교 졸업</option>
                    <option value="전문대졸">전문대학 졸업</option>
                    <option value="대졸">대학교 졸업</option>
                    <option value="대학원졸">대학원 이상</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    현재 상태 또는 주요 이력
                  </label>
                  <input
                    type="text"
                    placeholder="예: 주부, 방과후 강사, 은퇴자, 프리랜서 등"
                    value={formData.occupation}
                    onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={goToNextStep}
                className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg text-sm hover:bg-blue-950 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>다음: 경력 및 지원동기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 경력 및 지원 동기 */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">2단계: 경력 및 지원 동기</h2>
              <p className="text-xs text-slate-500 mt-1">
                거창한 IT 기술보다 우리 이웃에게 배움을 전하고 싶은 진심을 편안하게 적어주세요.
              </p>
            </div>

            <div className="space-y-5">
              
              {/* 강의/봉사 경험 유무 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  강의, 교육 지도 또는 주민 봉사활동 경험이 있으신가요?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasTeachingExp: true }))}
                    className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                      formData.hasTeachingExp
                        ? 'border-blue-900 bg-blue-50 text-blue-900'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    경험 있음 (방과후, 문화센터, 봉사 등)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasTeachingExp: false }))}
                    className={`py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                      !formData.hasTeachingExp
                        ? 'border-blue-900 bg-blue-50 text-blue-900'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    경험 없음 (처음 도전)
                  </button>
                </div>

                {formData.hasTeachingExp && (
                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="어떤 분야의 강의나 봉사 경험이었는지 간략히 적어주세요 (예: 주산암산 강사 2년, 복지관 스마트폰 봉사)"
                      value={formData.teachingExpDetail}
                      onChange={(e) => setFormData(prev => ({ ...prev, teachingExpDetail: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                    />
                    {errors.teachingExpDetail && (
                      <p className="text-xs text-rose-600 mt-1">{errors.teachingExpDetail}</p>
                    )}
                  </div>
                )}
              </div>

              {/* AI/디지털 친숙도 자가진단 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  현재 본인의 디지털/AI 도구 활용 수준은 어느 정도인가요?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'beginner', label: '기초 입문', desc: '스마트폰 검색, 카톡 사용 위주' },
                    { id: 'basic', label: '단순 활용', desc: '챗GPT 등 AI를 호기심에 몇 번 써봄' },
                    { id: 'intermediate', label: '자주 활용', desc: '문서 작성, 번역, 이미지 생성 등 일상에 써봄' },
                    { id: 'advanced', label: '숙련자', desc: '업무나 강의에 AI 도구를 다양하게 접목해봄' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, aiFamiliarity: item.id as any }))}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        formData.aiFamiliarity === item.id
                          ? 'border-blue-900 bg-blue-50 text-blue-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 수료 후 희망 강의 대상 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  수료 후 어떤 이웃에게 가장 먼저 AI를 알려주고 싶으신가요?
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                >
                  <option value="어르신 복지관 및 경로당 디지털 배움터">경로당 및 노인복지관 어르신 (스마트폰 AI 비서, 사진 복원)</option>
                  <option value="작은도서관 및 아동·청소년 배움터">작은도서관 어린이 및 청소년 (AI 동화책 만들기)</option>
                  <option value="주민자치센터 일반 주민 및 주부">주민자치센터 이웃 주민 및 주부 (생활 문서, 가계부 AI)</option>
                  <option value="전통시장 및 동네 소상공인">동네 소상공인 및 자영업자 (가게 홍보문구, 포스터 제작)</option>
                </select>
              </div>

              {/* 지원 동기 (서술형) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    지원 동기 및 참여 각오 <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {formData.motivation.length} / 500자
                  </span>
                </div>
                <textarea
                  rows={5}
                  maxLength={500}
                  placeholder="본 과정에 지원하시게 된 계기와 수료 후 어떤 강사로 이웃과 만나고 싶으신지 솔직하게 작성해주세요. (예: 어르신들의 디지털 소외를 덜어드리고 싶어서, 퇴직 후 지역 사회에 보람찬 나눔을 실천하고 싶어서 등)"
                  value={formData.motivation}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, motivation: e.target.value }));
                    if (e.target.value.trim().length >= 30) {
                      setErrors(prev => { const n = { ...prev }; delete n.motivation; return n; });
                    }
                  }}
                  className={`w-full p-3.5 border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.motivation ? 'border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:ring-blue-900/20 focus:border-blue-900'
                  }`}
                />
                {errors.motivation && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.motivation}</span>
                  </p>
                )}
              </div>

            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium text-xs flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>이전 단계</span>
              </button>
              <button
                type="button"
                onClick={goToNextStep}
                className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg text-sm hover:bg-blue-950 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>다음: 동의 및 최종 제출</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 개인정보 동의 및 최종 제출 */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">3단계: 개인정보 동의 및 최종 제출</h2>
              <p className="text-xs text-slate-500 mt-1">
                작성하신 신청 내용을 최종 검토하신 후 개인정보 수집·이용에 동의하여 제출해주세요.
              </p>
            </div>

            {/* Summary preview */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>신청자 요약 정보</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-900 font-normal hover:underline"
                >
                  수정하기
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div>성명: <strong>{formData.name}</strong> ({formData.gender})</div>
                <div>생년월일: {formData.birthDate}</div>
                <div>연락처: <span className="font-mono font-bold text-slate-900">{formData.phone}</span></div>
                <div>거주지: {formData.district} {formData.dong}</div>
              </div>
              <div className="pt-1 text-slate-600">
                희망 활동: {formData.targetAudience}
              </div>
            </div>

            {/* Privacy Box */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950">
                  개인정보 수집 및 이용 동의 <span className="text-rose-600">*</span>
                </span>
                <button
                  type="button"
                  onClick={openPrivacyModal}
                  className="text-xs text-blue-900 underline font-semibold hover:text-blue-950"
                >
                  약관 전문 보기
                </button>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                천안시 시민 AI강사 양성과정은 본인 확인, 교육생 선발 심사, 출결 및 수료증 발급, 향후 강사 활동 연계 목적으로 최소한의 개인정보를 수집·이용합니다. (주민등록번호는 수집하지 않음)
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.privacyAgreed}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, privacyAgreed: e.target.checked }));
                    if (e.target.checked) {
                      setErrors(prev => { const n = { ...prev }; delete n.privacyAgreed; return n; });
                    }
                  }}
                  className="w-4 h-4 text-blue-900 rounded focus:ring-blue-900"
                />
                <span className="text-xs font-bold text-slate-900">
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
              {errors.privacyAgreed && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.privacyAgreed}</span>
                </p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium text-xs flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>이전 단계</span>
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-lg text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>신청서 최종 제출하기</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 4: 접수 완료 안내 (F-04) */}
        {step === 4 && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
                온라인 신청서가 정상 접수되었습니다
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                천안시 시민 AI강사 양성과정에 지원해주셔서 진심으로 감사드립니다.<br />
                접수 확인 및 결과 안내 문자(SMS)가 입력하신 연락처({formData.phone})로 발송되었습니다.
              </p>
            </div>

            {/* Application Number Box */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto space-y-2">
              <span className="text-xs text-slate-500 font-medium block">나의 공식 접수번호</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-mono font-extrabold text-blue-950 tracking-wider">
                  {completedAppNumber}
                </span>
                <button
                  onClick={copyAppNumber}
                  className="p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                  title="접수번호 복사"
                  aria-label="접수번호 복사"
                >
                  {copiedAppNum ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                접수번호는 추후 신청 내역 조회 및 수정 시 필요하오니 메모해 두시기 바랍니다.
              </p>
            </div>

            {/* Next Steps Notification */}
            <div className="text-left bg-blue-50/60 p-4 rounded-xl border border-blue-100 max-w-md mx-auto text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-blue-950">이후 선발 일정 안내</div>
              <div>· 1차 서류 심사 결과: 2026. 04. 07(화) 개별 문자 통보</div>
              <div>· 2차 대면 인터뷰: 2026. 04. 09(목) (천안시 청년센터 배움터)</div>
              <div>· 최종 선발 발표: 2026. 04. 10(금) 14:00</div>
              <div>· 문의사항: 운영 사무국 {config.contactPhone}</div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentView('apply-check')}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-50"
              >
                신청 내역 조회·수정 확인
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-950"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
