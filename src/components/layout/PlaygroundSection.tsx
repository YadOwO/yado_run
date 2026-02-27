import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/ui/BackButton';

/**
 * 游乐场部分组件参数接口
 * @property {Function} onBack - 处理返回上一级的回调函数
 */
interface PlaygroundSectionProps {
  onBack: () => void;
}

/**
 * 游乐场展示组件
 * 展示用户的个人兴趣爱好，使用 Apple 风格的卡片网格布局
 * 
 * @param {PlaygroundSectionProps} props - 组件属性
 */
const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  /** 从翻译文件中获取兴趣项列表配置 */
  const items = t('playground.items', { returnObjects: true }) as Array<{ category: string; title: string }>;

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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#000000]"
    >
      <BackButton onClick={onBack} />

      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        {/* 页面头部区域 */}
        <header className="mb-16 md:mb-24 flex flex-col items-center">
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-black/40 dark:text-white/40 mb-6"
          >
            {t('playground.subtitle')}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black dark:text-white"
          >
            {t('playground.title')}
          </motion.h1>
        </header>

        {/* 兴趣卡片网格展示 */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1.2 } }}
              whileTap={{ scale: 0.98, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1.2 } }}
              className="group relative flex flex-col items-center justify-center p-12 md:p-16 rounded-3xl bg-[#F5F5F7]/50 dark:bg-[#111111] border border-black/5 dark:border-white/5 transition-colors duration-500 hover:bg-[#F5F5F7] dark:hover:bg-[#1A1A1A]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-6">
                {item.category}
              </h3>
              <p className="text-xl md:text-2xl font-medium tracking-tight text-black dark:text-white text-center whitespace-pre-line leading-relaxed">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlaygroundSection;
