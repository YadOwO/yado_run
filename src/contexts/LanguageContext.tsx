import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, LanguageContextType } from '@/types';
import '@/lib/i18n';

/** 语言上下文实例，用于在组件树中共享语言状态 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * 语言状态提供者组件
 * 封装并提供全局的多语言切换状态和方法
 * 
 * @param {React.ReactNode} children - 子组件
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  /** 当前选中的语言标识 */
  const language = i18n.language as Language;

  /**
   * 切换语言的方法
   * 在中英文之间进行切换
   */
  const toggleLanguage = () => {
    const nextLang = language === 'EN' ? 'CN' : 'EN';
    i18n.changeLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * 获取语言上下文的自定义 Hook
 * @returns {LanguageContextType} 包含当前语言状态和切换方法的对象
 * @throws {Error} 如果在 LanguageProvider 外部使用将抛出错误
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};