import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * 返回按钮组件参数接口
 * @property {Function} onClick - 点击返回时的回调函数
 */
interface BackButtonProps {
  onClick: () => void;
}

/**
 * 统一的返回按钮组件
 * 包含淡入和滑入动画，固定在页面左上角
 *
 * @param {BackButtonProps} props - 组件属性
 */
const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1.2 } }}
      whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1.2 } }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="absolute top-12 left-8 md:left-12 z-[60] flex items-center justify-center w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md group transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/20"
      aria-label="Back"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <ArrowLeft className="w-5 h-5 text-black dark:text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default BackButton;
