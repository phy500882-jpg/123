export type RecruitmentStatus = 'upcoming' | 'open' | 'closed';

export interface CourseConfig {
  recruitmentStatus: RecruitmentStatus;
  title: string;
  subtitle: string;
  targetCount: string;
  recruitStartDate: string;
  recruitEndDate: string;
  courseStartDate: string;
  courseEndDate: string;
  courseSchedule: string;
  courseLocation: string;
  tuitionFee: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
}

export type ApplicationStatus = 'submitted' | 'doc_passed' | 'final_selected' | 'rejected' | 'canceled';

export interface Applicant {
  id: string;
  applicationNumber: string;
  createdAt: string;
  updatedAt: string;
  status: ApplicationStatus;
  name: string;
  birthDate: string;
  gender: '남성' | '여성';
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
  notes?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  isPinned: boolean;
  content: string;
  author: string;
  views: number;
}

export interface FAQItem {
  id: string;
  category: 'qualification' | 'curriculum' | 'activity' | 'etc';
  question: string;
  answer: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  createdAt: string;
  isAnswered: boolean;
  adminReply?: string;
}

export interface NextBatchSubscription {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}
