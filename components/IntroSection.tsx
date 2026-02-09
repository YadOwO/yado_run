import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { contentData } from '../types';

interface IntroSectionProps {
  scrollYProgress: MotionValue<number>;
}

const IntroSection: React.FC<IntroSectionProps> = ({ scrollYProgress }) => {
  const { language } = useLanguage();
  
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-black dark:text-white">
          {contentData[language].quote}
        </h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 text-sm uppercase tracking-widest text-black/40 dark:text-white/40"
        >
           {language === 'EN' ? 'Scroll to explore' : '滑动探索'}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroSection;