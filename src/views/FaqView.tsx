import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, Search, Phone, Mail, HelpCircle, ArrowLeft } from 'lucide-react';

export const FaqView: React.FC = () => {
  const { faqs, config, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'qualification', label: '지원 자격 및 선발' },
    { id: 'curriculum', label: '교육 과정 및 실습' },
    { id: 'activity', label: '수료 후 강사 활동' },
    { id: 'etc', label: '기타 및 준비물' },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
            <span>도움말</span>
            <span aria-hidden="true">·</span>
            <span>자주 묻는 질문</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            자주 묻는 질문 (FAQ)
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            시민 여러분께서 가장 자주 질문하시는 내용을 분야별로 모았습니다.
          </p>
        </div>

        {/* Search Bar & Categories */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="질문 검색 (예: 컴퓨터, 노트북, 수료증, 주소 등)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          {/* Interactive Category Segmented Controls (functional buttons with click handlers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-shadow"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-blue-900 font-extrabold text-sm sm:text-base shrink-0">Q.</span>
                      <span className="leading-snug">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/40">
                      <div className="flex items-start gap-2.5">
                        <span className="text-emerald-700 font-extrabold text-sm shrink-0">A.</span>
                        <div className="space-y-2 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 bg-white rounded-xl border border-slate-200 text-center text-slate-500 text-xs sm:text-sm">
              검색 조건에 맞는 질문이 없습니다. 다른 단어로 검색해 보세요.
            </div>
          )}
        </div>

        {/* Unresolved Callout Card */}
        <div className="p-6 bg-white rounded-xl border border-blue-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              원하시는 답변을 찾지 못하셨나요?
            </h3>
            <p className="text-xs text-slate-600">
              운영사무국으로 전화 주시면 친절하고 정확하게 상담해 드립니다.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${config.contactPhone}`}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{config.contactPhone} 전화상담</span>
            </a>
            <button
              onClick={() => setCurrentView('contact')}
              className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-200"
            >
              온라인 문의
            </button>
          </div>
        </div>

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
