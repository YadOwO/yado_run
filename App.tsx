import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PersistentPill from './components/PersistentPill';
import IntroSection from './components/IntroSection';
import MenuSection from './components/MenuSection';

const MainLayout: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook into the scroll progress of the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // This container defines the total scrollable height. 
    // 250vh allows for a comfortable scroll distance to transition between phases.
    <div ref={containerRef} className="relative h-[250vh] w-full">
      
      {/* Sticky Viewport: The content stays fixed while we scroll through the empty height */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Phase 1: Intro Quote */}
        <IntroSection scrollYProgress={scrollYProgress} />

        {/* Phase 2: Menu List */}
        <MenuSection scrollYProgress={scrollYProgress} />
        
        {/* Phase 3: Persistent UI (Always on top) */}
        <PersistentPill />
        
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