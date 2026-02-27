import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BackButton from '@/components/ui/BackButton';

/**
 * 个人简介组件参数接口
 * @property {Function} onBack - 处理返回上一级的回调函数
 */
interface ProfileSectionProps {
  onBack: () => void;
}

/**
 * 个人简介展示组件
 * 展示用户的个人信息、角色及联系方式
 * 
 * @param {ProfileSectionProps} props - 组件属性
 */
const ProfileSection: React.FC<ProfileSectionProps> = ({ onBack }) => {
  const { t } = useTranslation();

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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  /** 子元素动画变体配置：定义元素的初始和出现状态及过渡动画 */
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1D1D1F]"
    >
      <BackButton onClick={onBack} />

      <div className="w-full max-w-3xl">
        <header className="mb-12">
          <motion.span 
            variants={itemVariants}
            className="text-xs md:text-sm font-mono text-black/40 dark:text-white/40 tracking-[0.3em] uppercase mb-4 block"
          >
            01 {t('profile.labels.profile')}
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-semibold tracking-tighter text-black dark:text-white mb-6"
          >
            {t('profile.title')}
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-24 h-[1px] bg-black/10 dark:bg-white/20 mb-12"
          />
        </header>

        <section className="space-y-12">
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl leading-relaxed text-black/80 dark:text-white/80 font-light"
          >
            {t('profile.description')}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-8 border-t border-black/5 dark:border-white/5 space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40">{t('profile.labels.role')}</span>
              <span className="text-sm md:text-base text-black/60 dark:text-white/60">— {t('profile.role')}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40">{t('profile.labels.identity')}</span>
              <span className="text-sm md:text-base text-black/60 dark:text-white/60">— {t('profile.identity')}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40">{t('profile.labels.contact')}</span>
              <a 
                href={`mailto:${t('profile.email')}`}
                className="text-sm md:text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors underline decoration-black/10 dark:decoration-white/10 underline-offset-4"
              >
                — {t('profile.email')}
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
