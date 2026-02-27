import React from "react";
import { motion, useTransform, MotionValue, animate } from "framer-motion";
import { useTranslation } from "react-i18next";

interface IntroSectionProps {
  scrollYProgress: MotionValue<number>;
}

const IntroSection: React.FC<IntroSectionProps> = ({ scrollYProgress }) => {
  const { t } = useTranslation();

  // Phase 1 transforms: Fade out and move up as user scrolls
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
  const blur = useTransform(scrollYProgress, [0, 0.35], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  /**
   * 滚动到底部 - 架构师优化版
   * 1. 精确计算最大滚动距离，防止数值溢出
   * 2. 增加 restDelta 提前结束动画，消除“余震”
   * 3. 监听用户交互，实现“手动优先”逻辑
   */
  const handleScrollToBottom = () => {
    // 计算浏览器实际能滚动的最大上限
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    // 如果已经基本到底（预留 2px 误差），则不再执行
    if (currentScroll >= maxScroll - 2) return;

    // 开启物理引擎动画
    const controls = animate(currentScroll, maxScroll, {
      type: "spring",
      stiffness: 30, // 柔和的起步拉力
      damping: 25, // 足够的阻尼感
      mass: 1.5, // 厚重的物理质量
      restDelta: 1, // 关键：距离目标 1px 时立即停止，防止阻塞反向滚动
      onUpdate: (latest) => window.scrollTo(0, latest),
    });

    // --- 用户干预即停逻辑 ---
    const stopAnimation = () => {
      controls.stop();
      // 停止后移除监听，节省性能
      window.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("touchstart", stopAnimation);
      window.removeEventListener("keydown", stopAnimation);
    };

    // 监听滚轮、触摸、键盘操作，一旦用户介入，立即交还控制权
    window.addEventListener("wheel", stopAnimation, { passive: true });
    window.addEventListener("touchstart", stopAnimation, { passive: true });
    window.addEventListener("keydown", stopAnimation, { passive: true });
  };

  return (
    <motion.div
      style={{ opacity, y, filter: `blur(${blur}px)`, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none"
    >
      <div className="max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black dark:text-white"
        >
          {t("quote")}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05, opacity: 0.6 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            delay: 2.5,
            duration: 1,
            whileHover: { delay: 0, duration: 0.2 },
            whileTap: { delay: 0, duration: 0.1 },
          }}
          onClick={handleScrollToBottom}
          className="mt-8 text-sm uppercase tracking-widest text-black/40 dark:text-white/40 cursor-pointer pointer-events-auto transition-colors hover:text-black dark:hover:text-white"
        >
          {t("scrollLabel")}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroSection;
