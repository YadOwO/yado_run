import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import PersistentPill from '@/components/ui/PersistentPill';
import IntroSection from '@/components/layout/IntroSection';
import MenuSection from '@/components/layout/MenuSection';
import ProfileSection from '@/components/layout/ProfileSection';
import ArchitectureSection from '@/components/layout/ArchitectureSection';
import { ViewState } from '@/types';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    // The main container becomes the scrollable snapping element
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* Overlays / Sub-pages */}
      <AnimatePresence>
        {currentView === 'profile' && (
          <ProfileSection onBack={handleBack} />
        )}
        {currentView === 'arch' && (
          <ArchitectureSection onBack={handleBack} />
        )}
      </AnimatePresence>

      {/* Phase 3: Persistent UI (Always on top) */}
      <div className="fixed z-[100] bottom-0 right-0">
        <PersistentPill />
      </div>

      {/* Phase 1: Intro Section */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center relative">
        <IntroSection />
      </section>

      {/* Phase 2: Menu Section */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center relative bg-off-white dark:bg-black">
        <MenuSection onNavigate={handleNavigate} />
      </section>
      
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;