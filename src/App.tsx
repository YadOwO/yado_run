import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import PersistentPill from '@/components/ui/PersistentPill';
import IntroSection from '@/components/layout/IntroSection';
import MenuSection from '@/components/layout/MenuSection';
import ProfileSection from '@/components/layout/ProfileSection';
import ArchitectureSection from '@/components/layout/ArchitectureSection';
import PlaygroundSection from '@/components/layout/PlaygroundSection';
import { ViewState } from '@/types';

/**
 * 主应用布局组件
 * 负责管理页面的整体布局、视图状态和滚动捕捉效果
 */
const MainLayout: React.FC = () => {
  /** 当前展示的视图状态：默认为主页 ('home') */
  const [currentView, setCurrentView] = useState<ViewState>('home');

  /**
   * 处理导航跳转
   * @param {ViewState} view - 目标视图状态
   */
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  /**
   * 处理返回操作
   * 将视图状态重置为主页
   */
  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    // The main container becomes the scrollable snapping element
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* 覆盖层/子页面：通过动画过渡切换 */}
      <AnimatePresence>
        {currentView === 'profile' && (
          <ProfileSection onBack={handleBack} />
        )}
        {currentView === 'arch' && (
          <ArchitectureSection onBack={handleBack} />
        )}
        {currentView === 'play' && (
          <PlaygroundSection onBack={handleBack} />
        )}
      </AnimatePresence>

      {/* 常驻 UI：主题/语言切换胶囊 */}
      <div className="fixed z-[100] bottom-0 right-0">
        <PersistentPill />
      </div>

      {/* 介绍区域：首屏滚动捕捉 */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center relative">
        <IntroSection />
      </section>

      {/* 菜单区域：次屏滚动捕捉 */}
      <section className="min-h-screen w-full snap-start flex flex-col items-center justify-center relative bg-off-white dark:bg-black">
        <MenuSection onNavigate={handleNavigate} />
      </section>
      
    </div>
  );
};

/**
 * 应用程序根组件
 * 封装所有全局上下文提供者
 */
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