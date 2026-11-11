import React, { createContext, useContext, useState, useEffect } from 'react';
import { CourseConfig, Applicant, Notice, FAQItem, ContactInquiry, NextBatchSubscription } from '../types';
import { INITIAL_COURSE_CONFIG, INITIAL_NOTICES, INITIAL_FAQS, INITIAL_APPLICANTS, INITIAL_INQUIRIES } from '../data/initialData';

interface AppContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  config: CourseConfig;
  updateConfig: (newConfig: Partial<CourseConfig>) => void;
  applicants: Applicant[];
  addApplicant: (applicantData: Omit<Applicant, 'id' | 'applicationNumber' | 'createdAt' | 'updatedAt' | 'status'>) => Applicant;
  updateApplicant: (applicationNumber: string, updatedData: Partial<Applicant>) => boolean;
  cancelApplicant: (applicationNumber: string) => boolean;
  findApplicant: (name: string, phone: string, applicationNumber: string) => Applicant | undefined;
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'views'>) => void;
  deleteNotice: (id: string) => void;
  faqs: FAQItem[];
  addFaq: (faq: Omit<FAQItem, 'id'>) => void;
  deleteFaq: (id: string) => void;
  inquiries: ContactInquiry[];
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'isAnswered'>) => void;
  markInquiryAnswered: (id: string, reply: string) => void;
  nextBatchList: NextBatchSubscription[];
  addNextBatchSubscriber: (name: string, phone: string) => boolean;
  openPrivacyModal: () => void;
  closePrivacyModal: () => void;
  isPrivacyModalOpen: boolean;
  openShareModal: () => void;
  closeShareModal: () => void;
  isShareModalOpen: boolean;
  openNextTermModal: () => void;
  closeNextTermModal: () => void;
  isNextTermModalOpen: boolean;
  smsPreview: { isOpen: boolean; phone: string; title: string; body: string } | null;
  showSmsPreview: (phone: string, title: string, body: string) => void;
  closeSmsPreview: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('home');

  // Load from localStorage or defaults
  const [config, setConfig] = useState<CourseConfig>(() => {
    const saved = localStorage.getItem('cai_config');
    return saved ? JSON.parse(saved) : INITIAL_COURSE_CONFIG;
  });

  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    const saved = localStorage.getItem('cai_applicants');
    return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('cai_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('cai_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('cai_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [nextBatchList, setNextBatchList] = useState<NextBatchSubscription[]>(() => {
    const saved = localStorage.getItem('cai_next_batch');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal states
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNextTermModalOpen, setIsNextTermModalOpen] = useState(false);
  const [smsPreview, setSmsPreview] = useState<{ isOpen: boolean; phone: string; title: string; body: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cai_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('cai_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('cai_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('cai_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('cai_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('cai_next_batch', JSON.stringify(nextBatchList));
  }, [nextBatchList]);

  // Window scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const updateConfig = (newConfig: Partial<CourseConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addApplicant = (applicantData: Omit<Applicant, 'id' | 'applicationNumber' | 'createdAt' | 'updatedAt' | 'status'>): Applicant => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const applicationNumber = `CAI-2026-${randomNum}`;

    const newApplicant: Applicant = {
      ...applicantData,
      id: `app-${Date.now()}`,
      applicationNumber,
      createdAt: dateStr,
      updatedAt: dateStr,
      status: 'submitted',
    };

    setApplicants(prev => [newApplicant, ...prev]);

    // Trigger SMS simulation modal for F-04
    showSmsPreview(
      newApplicant.phone,
      '천안시 시민 AI강사 양성과정 접수 완료',
      `[천안시] ${newApplicant.name}님, 시민 AI강사 양성과정 온라인 신청이 정상 접수되었습니다.\n\n- 접수번호: ${applicationNumber}\n- 모집 기간: ${config.recruitStartDate} ~ ${config.recruitEndDate}\n- 서류 심사 결과 발표: 4월 7일(화) 예정 (개별 문자 및 공지사항)\n- 신청 조회 및 수정: 홈페이지 [신청 조회·수정] 메뉴에서 접수번호로 가능합니다.\n\n문의: 운영사무국 ${config.contactPhone}`
    );

    return newApplicant;
  };

  const updateApplicant = (applicationNumber: string, updatedData: Partial<Applicant>): boolean => {
    let found = false;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setApplicants(prev => prev.map(app => {
      if (app.applicationNumber === applicationNumber) {
        found = true;
        return {
          ...app,
          ...updatedData,
          updatedAt: dateStr
        };
      }
      return app;
    }));
    return found;
  };

  const cancelApplicant = (applicationNumber: string): boolean => {
    return updateApplicant(applicationNumber, { status: 'canceled' });
  };

  const findApplicant = (name: string, phone: string, applicationNumber: string): Applicant | undefined => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const cleanAppNum = applicationNumber.trim().toUpperCase();
    const cleanName = name.trim();

    return applicants.find(app => {
      const matchName = app.name.trim() === cleanName;
      const matchPhone = app.phone.replace(/[^0-9]/g, '') === cleanPhone;
      const matchAppNum = app.applicationNumber.trim().toUpperCase() === cleanAppNum;
      return matchName && matchPhone && matchAppNum;
    });
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'views'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `notice-${Date.now()}`,
      views: 1
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addFaq = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const addInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'isAnswered'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: dateStr,
      isAnswered: false
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const markInquiryAnswered = (id: string, reply: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          isAnswered: true,
          adminReply: reply
        };
      }
      return inq;
    }));
  };

  const addNextBatchSubscriber = (name: string, phone: string): boolean => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) return false;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setNextBatchList(prev => [
      { id: `next-${Date.now()}`, name: name.trim(), phone, createdAt: dateStr },
      ...prev
    ]);
    return true;
  };

  const showSmsPreview = (phone: string, title: string, body: string) => {
    setSmsPreview({ isOpen: true, phone, title, body });
  };

  const closeSmsPreview = () => {
    setSmsPreview(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        config,
        updateConfig,
        applicants,
        addApplicant,
        updateApplicant,
        cancelApplicant,
        findApplicant,
        notices,
        addNotice,
        deleteNotice,
        faqs,
        addFaq,
        deleteFaq,
        inquiries,
        addInquiry,
        markInquiryAnswered,
        nextBatchList,
        addNextBatchSubscriber,
        openPrivacyModal: () => setIsPrivacyModalOpen(true),
        closePrivacyModal: () => setIsPrivacyModalOpen(false),
        isPrivacyModalOpen,
        openShareModal: () => setIsShareModalOpen(true),
        closeShareModal: () => setIsShareModalOpen(false),
        isShareModalOpen,
        openNextTermModal: () => setIsNextTermModalOpen(true),
        closeNextTermModal: () => setIsNextTermModalOpen(false),
        isNextTermModalOpen,
        smsPreview,
        showSmsPreview,
        closeSmsPreview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
