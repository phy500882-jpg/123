import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Notice } from '../types';
import { Search, Pin, Eye, Calendar, User, ChevronRight, X, ArrowLeft } from 'lucide-react';

export const NoticeView: React.FC = () => {
  const { notices, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
              <span>알림 마당</span>
              <span aria-hidden="true">·</span>
              <span>공식 공지사항</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              공지사항
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              선발 결과 발표, 일정 변동 안내, 사전 설명회 등 주요 사업 공지를 전달합니다.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="공지 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Notices Table / List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="divide-y divide-slate-100">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <button
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`w-full text-left p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    notice.isPinned ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {notice.isPinned && (
                        <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1 bg-blue-100/80 px-2 py-0.5 rounded">
                          <Pin className="w-3 h-3" />
                          <span>주요 공지</span>
                        </span>
                      )}
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {notice.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{notice.author}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{notice.date}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>조회 {notice.views}</span>
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                </button>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs sm:text-sm">
                등록된 공지사항이 없거나 검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Modal for viewing notice details */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200">
              
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  {selectedNotice.isPinned && (
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                      주요 공지
                    </span>
                  )}
                  <h2 className="text-lg sm:text-xl font-bold text-slate-950 mt-1">
                    {selectedNotice.title}
                  </h2>
                  <div className="text-xs text-slate-500 flex items-center gap-2 pt-1">
                    <span>작성자: {selectedNotice.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>등록일: {selectedNotice.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {selectedNotice.content}
              </div>

              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">문의: 천안시 사업운영팀 (010-0000-0000)</span>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900"
                >
                  확인 닫기
                </button>
              </div>

            </div>
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
