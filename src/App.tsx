/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PrivacyModal } from './components/PrivacyModal';
import { ShareModal } from './components/ShareModal';
import { NextTermModal } from './components/NextTermModal';
import { SmsSimModal } from './components/SmsSimModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { CurriculumView } from './views/CurriculumView';
import { RecruitView } from './views/RecruitView';
import { ApplyView } from './views/ApplyView';
import { ApplyCheckView } from './views/ApplyCheckView';
import { NoticeView } from './views/NoticeView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'curriculum':
        return <CurriculumView />;
      case 'recruit':
        return <RecruitView />;
      case 'apply':
        return <ApplyView />;
      case 'apply-check':
        return <ApplyCheckView />;
      case 'notice':
        return <NoticeView />;
      case 'faq':
        return <FaqView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileBottomBar />

      {/* Global Modals */}
      <PrivacyModal />
      <ShareModal />
      <NextTermModal />
      <SmsSimModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
