import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, Copy, Check, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, openPrivacyModal, setCurrentView } = useApp();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-14 border-t border-slate-800 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Organization & Course Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">천안시 시민 AI강사 양성과정</span>
              <span className="text-xs text-blue-400 font-medium">제1기 모집</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              천안에서, 천안 시민에게 일상 속 인공지능 활용법을 눈높이에 맞추어 알기 쉽게 전달할 지역 기반 시민 강사를 육성합니다.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div>주최·주관: 천안시 | 운영: 천안시 시민 AI강사 양성과정 운영사무국</div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>교육장: 천안타운홀 및 천안시 청년센터 배움터</span>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry & Support */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold text-white text-sm">운영 및 접수 문의처</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-400">대표 전화:</span>
                <a
                  href={`tel:${config.contactPhone}`}
                  className="text-white hover:text-blue-300 font-medium underline-offset-4 hover:underline"
                >
                  {config.contactPhone}
                </a>
                <button
                  onClick={() => copyToClipboard(config.contactPhone, 'phone')}
                  className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition-colors"
                  title="전화번호 복사"
                  aria-label="전화번호 복사"
                >
                  {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-400">문의 메일:</span>
                <a
                  href={`mailto:${config.contactEmail}`}
                  className="text-white hover:text-blue-300 font-medium underline-offset-4 hover:underline"
                >
                  {config.contactEmail}
                </a>
                <button
                  onClick={() => copyToClipboard(config.contactEmail, 'email')}
                  className="p-1 hover:text-white text-slate-400 hover:bg-slate-800 rounded transition-colors"
                  title="이메일 복사"
                  aria-label="이메일 복사"
                >
                  {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-xs text-slate-400 pt-1">
                상담 시간: {config.contactHours}
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation & Legal */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-semibold text-white text-sm">바로가기</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('apply-check')}
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1"
                >
                  <span>내 신청서 조회·수정</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('notice')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  선발 공지 및 일정 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('faq')}
                  className="hover:text-white hover:underline transition-colors"
                >
                  자주 묻는 질문 (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={openPrivacyModal}
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>개인정보 처리방침</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Admin entrance */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 Cheonan City. All rights reserved. 본 웹사이트는 천안시 시민 AI강사 양성과정 모집을 위해 개설되었습니다.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openPrivacyModal}
              className="hover:text-slate-300 underline"
            >
              개인정보보호 원칙
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-slate-600 hover:text-slate-400 transition-colors"
              title="운영진 전용 관리자 화면"
            >
              관리자 모드
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
