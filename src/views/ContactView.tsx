import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, Copy, Check, MapPin, Send, MessageSquare, Clock, ArrowLeft } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { config, addInquiry, setCurrentView } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('지원 자격 문의');
  const [message, setMessage] = useState('');

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('이름, 연락처, 문의 내용을 모두 입력해주세요.');
      return;
    }

    addInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      category,
      message: message.trim(),
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setErrorMsg('');
  };

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <span>문의처</span>
            <span aria-hidden="true">·</span>
            <span>운영 사무국 상담</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            문의 및 교육장 안내
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            과정 관련 궁금한 점이 있으시면 유선 전화, 이메일, 온라인 문의 양식을 통해 언제든 편하게 물어보세요.
          </p>
        </div>

        {/* 2-Column Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Phone Card */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Phone className="w-5 h-5" />
              <span>전화 상담</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              모바일 기기에서 번호를 터치하시면 바로 통화로 연결됩니다.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${config.contactPhone}`}
                className="text-lg font-bold font-mono text-slate-900 hover:text-blue-900 transition-colors"
              >
                {config.contactPhone}
              </a>
              <button
                onClick={() => copyToClipboard(config.contactPhone, 'phone')}
                className="px-2.5 py-1 text-xs bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 flex items-center gap-1"
                title="전화번호 복사"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? '복사됨' : '복사'}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>상담 시간: {config.contactHours}</span>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Mail className="w-5 h-5" />
              <span>이메일 문의</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              24시간 상시 접수 가능하며, 영업일 기준 1일 이내 회신드립니다.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${config.contactEmail}`}
                className="text-base font-bold text-slate-900 hover:text-blue-900 transition-colors truncate"
              >
                {config.contactEmail}
              </a>
              <button
                onClick={() => copyToClipboard(config.contactEmail, 'email')}
                className="px-2.5 py-1 text-xs bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 flex items-center gap-1 shrink-0"
                title="이메일 복사"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'email' ? '복사됨' : '복사'}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              주관 부서: 천안시 정보통신과 / 사업운영사무국
            </div>
          </div>

        </div>

        {/* Educational Venue Map & Directions */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <MapPin className="w-5 h-5 text-blue-900" />
            <span>교육장 위치 및 오시는 길</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <strong className="text-slate-900 font-bold block">천안타운홀 및 천안시 청년센터 배움터</strong>
                <p className="text-xs text-slate-600">
                  충청남도 천안시 동남구 옛시티홀길 10 (동남구청사 복합개발구역 내)
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-800">대중교통 이용 시</div>
                <div>· <strong>지하철/기차</strong>: 1호선 천안역 1번 출구 도보 5분</div>
                <div>· <strong>시내버스</strong>: 동남구청·천안역 정류장 하차 (1, 2, 11, 12, 13번 등)</div>
                <div>· <strong>주차 안내</strong>: 동남구청사 공영지하주차장 이용 (교육생 3시간 무료 주차권 지원)</div>
              </div>
            </div>

            {/* Stylized Civic Map Card */}
            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>교육장 약도</span>
                  <span className="text-[11px] font-normal text-slate-500">천안역 도보 5분</span>
                </div>
                {/* SVG Visual Map Schema */}
                <div className="bg-white rounded-lg p-3 border border-slate-200 aspect-video flex items-center justify-center text-center relative overflow-hidden">
                  <div className="space-y-1 z-10">
                    <span className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold shadow-xs">
                      배움터
                    </span>
                    <strong className="text-xs font-bold text-slate-900 block">천안타운홀 교육관</strong>
                    <span className="text-[10px] text-slate-500 block">천안역 1번 출구 방면</span>
                  </div>
                  {/* Road grid lines */}
                  <div className="absolute inset-0 border-t border-b border-slate-100 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <div className="absolute inset-0 border-l border-r border-slate-100 left-1/2 -translate-x-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 pt-2 text-center">
                ※ 첫날 오리엔테이션 시 상세 호실 문자를 다시 발송해 드립니다.
              </div>
            </div>

          </div>
        </section>

        {/* Online Inquiry Form (F-08) */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-900" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">온라인 문의 작성</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                전화 연결이 어려우시거나 서면으로 답변을 받고 싶으신 경우 남겨주시면 메일 또는 전화로 회신드립니다.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-900 text-sm">문의가 정상 접수되었습니다</h3>
              <p className="text-xs text-slate-600">
                작성해주신 내용이 운영 사무국으로 전달되었습니다. 확인 후 신속히 연락드리겠습니다.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800"
              >
                추가 문의 작성
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    이메일 주소 <span className="text-slate-400 font-normal">(선택)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    문의 유형
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                  >
                    <option value="지원 자격 문의">지원 자격 문의 (거주지, 연령 등)</option>
                    <option value="교육 일정 및 장소">교육 일정 및 장소 문의</option>
                    <option value="신청서 작성 오류">신청서 작성 및 수정 관련</option>
                    <option value="수료 후 활동 문의">수료 후 강사 활동 및 연계 문의</option>
                    <option value="기관 협업 문의">기관 협업 및 강사진 파견 문의</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  문의 내용 <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="궁금하신 내용을 구체적으로 적어주시면 신속하게 답변드리겠습니다."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-950 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>문의 접수하기</span>
                </button>
              </div>
            </form>
          )}
        </section>

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
