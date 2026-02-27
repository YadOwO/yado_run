import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 架构部分组件参数接口
 * @property {Function} onBack - 处理返回上一级的回调函数
 */
interface ArchitectureSectionProps {
  onBack: () => void;
}

/**
 * 架构展示组件
 * 展示项目的整体架构和核心理念
 * 
 * @param {ArchitectureSectionProps} props - 组件属性
 */
const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  /** 从翻译文件中获取架构项列表配置 */
  const items = t('architecture.items', { returnObjects: true }) as Array<{ title: string; description: string }>;

  /** 容器动画变体配置：控制整体的淡入淡出及子元素的交错动画 */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  /** 子元素动画变体配置：使用 Apple 风格的弹簧物理动画 */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 1.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 z-50 flex flex-col bg-[#F5F5F7] dark:bg-[#1D1D1F] p-8 md:p-24 overflow-y-auto"
    >
      {/* 返回按钮：统一的 Apple 风格绝对定位 */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={onBack}
        className="absolute top-12 left-8 md:left-12 flex items-center gap-2 group transition-opacity hover:opacity-70"
      >
        <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
      </motion.button>

      <div className="max-w-6xl mx-auto w-full pt-20">
        {/* 页面头部区域 */}
        <header className="mb-20">
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm tracking-widest uppercase text-[#1D1D1F]/40 dark:text-[#F5F5F7]/40 mb-4"
          >
            {t('architecture.subtitle')}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1D1D1F] dark:text-[#F5F5F7]"
          >
            {t('architecture.title')}
          </motion.h1>
        </header>

        {/* 架构列表网格展示 */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative border-b border-[#1D1D1F]/10 dark:border-[#F5F5F7]/10 pb-8"
            >
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3 group-hover:translate-x-2 transition-transform duration-300">
                {item.title}
              </h3>
              <p className="text-[#1D1D1F]/60 dark:text-[#F5F5F7]/60 text-lg leading-relaxed max-w-md">
                {item.description}
              </p>
              
              {/* 悬浮下划线效果 */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1D1D1F] dark:bg-[#F5F5F7] group-hover:w-full transition-all duration-500 ease-in-out opacity-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArchitectureSection;
