import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '@/types';

/** 主题上下文实例，用于在组件树中共享明暗主题状态 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题状态提供者组件
 * 封装并提供全局的明暗主题状态和切换方法，并与本地存储同步
 * 
 * @param {React.ReactNode} children - 子组件
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /** 
   * 初始化主题状态，逻辑如下：
   * 1. 优先读取 localStorage 中的主题设置
   * 2. 如果没有记录，则读取当前 DOM 元素上的 class 属性
   * 3. 默认回退到深色模式 (dark)
   */
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  /**
   * 监听主题变化副作用：
   * 1. 更新根节点 DOM 的 class 属性以应用对应的 CSS 变量
   * 2. 将最新的主题状态同步持久化到 localStorage
   */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * 切换主题的方法
   * 在明亮模式和深色模式之间进行切换
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 获取主题上下文的自定义 Hook
 * @returns {ThemeContextType} 包含当前主题状态和切换方法的对象
 * @throws {Error} 如果在 ThemeProvider 外部使用将抛出错误
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};