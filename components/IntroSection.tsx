import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black dark:text-white"
        >
          {t('quote')}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-8 text-sm uppercase tracking-widest text-black/40 dark:text-white/40"
        >
           {t('scrollLabel')}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroSection;