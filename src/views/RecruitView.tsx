import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, FileText, CheckCircle, ArrowRight, Printer } from 'lucide-react';

export const RecruitView: React.FC = () => {
  const { config, setCurrentView } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const downloadNoticeDocument = () => {
    const textContent = `[2026년 천안시 시민 AI강사 양성과정(제1기) 교육생 모집 공고문]

1. 추진 목적
천안시 관내 복지관, 경로당, 도서관 등 지역 이웃의 눈높이에 맞춰 일상 속 생성형 AI 활용법을 전파할 시민 강사를 선발 및 육성하고자 함.

2. 모집 개요
- 과 정 명: 천안시 시민 AI강사 양성과정 (제1기)
- 모집 인원: ${config.targetCount}
- 지원 자격: 공고일 현재 천안시에 주민등록을 둔 시민 (연령·학력·전공 무관 / 비전공자 대환영)
- 교육 기간: ${config.courseStartDate} ~ ${config.courseEndDate} (${config.courseSchedule})
- 교육 장소: ${config.courseLocation}
- 수 강 료: 전액 무료 (천안시 전액 지원 / 교재 및 실습비 무상)

3. 지원 자격 및 우대 사항
[기본 자격]
- 스마트폰 및 PC 인터넷 기본 활용이 가능한 천안 시민
- 교육 수료 후 관내 복지관, 도서관 등에서 강사로 활동할 의지와 열정이 있는 자

[우대 사항]
- 방과후 강사, 평생교육 강사, 마을공동체 활동 등 강의 및 봉사 경험자
- 경력단절 여성, 50·60대 신중년 및 은퇴자로서 사회공헌 의지가 높은 자

4. 선발 절차 및 일정
- 원서 접수: ${config.recruitStartDate} ~ ${config.recruitEndDate}
- 1차 서류 심사: 2026. 04. 06(월) (지원 동기, 활동 의지, 교수 적합성)
- 서류 합격 발표: 2026. 04. 07(화) (개별 SMS 발송)
- 2차 대면 인터뷰: 2026. 04. 09(목) (인성, 소통 능력, 열정 확인)
- 최종 합격 발표: 2026. 04. 10(금) 14:00 (홈페이지 공지 및 개별 SMS)

5. 수료 혜택
- 천안시장 명의 수료증 발급 (출석 80% 이상 및 모의 시연 통과 시)
- 천안시 공식 시민강사 인력풀 등록
- 동남구·서북구 종합복지관, 작은도서관 '찾아가는 배움터' 강사 출강 연계
- 출강 시 천안시 강사 수당 기준에 따른 강사료 지급

6. 문의처
- 천안시 시민 AI강사 양성과정 사업운영팀 (전화: ${config.contactPhone} / 메일: ${config.contactEmail})
- 상담 시간: ${config.contactHours}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '2026_천안시_시민AI강사_모집요강.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="py-12 md:py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest mb-2">
              <span>모집 요강</span>
              <span aria-hidden="true">·</span>
              <span>공식 선발 기준 안내</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              2026년 교육생 모집 요강
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              천안시 시민 AI강사 양성과정 제1기 공식 선발 요강 전문입니다.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={downloadNoticeDocument}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>{downloadSuccess ? '다운로드 완료!' : '공고문 전문 다운로드'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs transition-colors hidden sm:flex"
              title="인쇄하기"
            >
              <Printer className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* 1. 모집 기본 사항 (Table) */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 font-bold text-slate-900 text-base">
            1. 모집 개요 및 신청 자격
          </div>
          <table className="w-full text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-5 bg-slate-50/50 font-bold text-slate-900 w-32 sm:w-44 whitespace-nowrap">
                  모집 인원
                </td>
                <td className="py-3 px-5 font-bold text-slate-900">
                  {config.targetCount}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-5 bg-slate-50/50 font-bold text-slate-900 whitespace-nowrap">
                  지원 자격
                </td>
                <td className="py-3 px-5 leading-relaxed">
                  <strong>천안시에 주민등록을 둔 시민 누구나</strong> (연령·학력·전공 무관)<br />
                  <span className="text-slate-500 text-xs">
                    ※ 컴퓨터 비전공자 대환영. 스마트폰과 기본 웹 서핑이 가능한 분이면 누구나 지원하실 수 있습니다.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-5 bg-slate-50/50 font-bold text-slate-900 whitespace-nowrap">
                  우대 사항
                </td>
                <td className="py-3 px-5 leading-relaxed space-y-1">
                  <div>· 경력단절 여성, 50·60대 신중년 및 은퇴자</div>
                  <div>· 방과후 강사, 주민센터 교실, 자원봉사 등 지역 교육 및 봉사 경험자</div>
                  <div>· 과정 수료 후 관내 복지관 및 도서관 출강 활동이 가능한 자</div>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-5 bg-slate-50/50 font-bold text-slate-900 whitespace-nowrap">
                  수강료
                </td>
                <td className="py-3 px-5 text-blue-900 font-bold">
                  {config.tuitionFee}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-5 bg-slate-50/50 font-bold text-slate-900 whitespace-nowrap">
                  제출 서류
                </td>
                <td className="py-3 px-5 leading-relaxed">
                  본 홈페이지 온라인 신청서 1부 (별도 종이 서류 제출 없음)<br />
                  <span className="text-slate-500 text-xs">
                    ※ 주민등록번호는 수집하지 않으며, 거주지 확인은 선발 후 오프라인에서 주민등록등본 확인으로 갈음합니다.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 2. 선발 기준 및 심사 배점 */}
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 font-bold text-slate-900 text-base">
            2. 선발 기준 및 심사 절차
          </div>
          <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
            <p className="leading-relaxed">
              화려한 스펙이나 전문 IT 지식보다, <strong>이웃과의 소통 능력</strong>과 <strong>성실한 참여 의지</strong>를 최우선으로 평가합니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-blue-900 block">1차 전형 (50점)</span>
                <strong className="text-sm font-bold text-slate-900 block">서류 심사</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                  <li>지원 동기의 진정성 및 명확성 (20점)</li>
                  <li>과정 참여 의지 및 출석 성실도 기대치 (15점)</li>
                  <li>지역 사회 나눔 및 강의 적합성 (15점)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                <span className="text-xs font-bold text-blue-900 block">2차 전형 (50점)</span>
                <strong className="text-sm font-bold text-slate-900 block">대면 인터뷰</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                  <li>인성 및 이웃에 대한 따뜻한 소통 태도 (25점)</li>
                  <li>수료 후 지역 강의 활동 가능 여부 (25점)</li>
                  <li>※ IT 지식 테스트가 아니므로 부담 없이 참여 가능</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 접수 방법 및 유의사항 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 text-xs sm:text-sm text-slate-700">
          <h3 className="font-bold text-slate-900 text-base">
            3. 유의 사항
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 leading-relaxed">
            <li>접수 마감 시간({config.recruitEndDate}) 이후에는 접수 및 수정이 불가합니다.</li>
            <li>기재 내용이 사실과 다를 경우 선발이 취소될 수 있습니다.</li>
            <li>접수 완료 시 접수번호가 SMS 문자로 즉시 발송되오니 수신 여부를 확인하시기 바랍니다.</li>
            <li>문의사항: 운영 사무국 (전화 {config.contactPhone} / 메일 {config.contactEmail})</li>
          </ul>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('apply')}
            className="px-8 py-3.5 bg-blue-900 text-white font-bold rounded-xl text-sm sm:text-base hover:bg-blue-950 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>온라인 신청서 작성하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
