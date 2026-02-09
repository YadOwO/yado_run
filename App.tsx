import React, { useRef, useState } from 'react';
import { useScroll, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PersistentPill from './components/PersistentPill';
import IntroSection from './components/IntroSection';
import MenuSection from './components/MenuSection';
import ProfileSection from './components/ProfileSection';
import { ViewState } from './types';

const MainLayout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Hook into the scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    // This container defines the total scrollable height. 
    // 250vh allows for a comfortable scroll distance to transition between phases.
    <div ref={containerRef} className="relative h-[250vh] w-full">
      
      {/* Sticky Viewport: The content stays fixed while we scroll through the empty height */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Phase 1: Intro Quote */}
        <IntroSection scrollYProgress={scrollYProgress} />

        {/* Phase 2: Menu List */}
        <MenuSection scrollYProgress={scrollYProgress} onNavigate={handleNavigate} />
        
        {/* Overlays / Sub-pages */}
        <AnimatePresence>
          {currentView === 'profile' && (
            <ProfileSection onBack={handleBack} />
          )}
        </AnimatePresence>

        {/* Phase 3: Persistent UI (Always on top) */}
        <div className="relative z-[100]">
          <PersistentPill />
        </div>
        
      </div>
      
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