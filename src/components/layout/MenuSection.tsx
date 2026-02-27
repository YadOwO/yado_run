import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewState } from '@/types';

interface MenuSectionProps {
  scrollYProgress: MotionValue<number>;
  onNavigate: (view: ViewState) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ scrollYProgress, onNavigate }) => {
  const { t } = useTranslation();
  
  const menuKeys: ViewState[] = ['profile', 'arch', 'play'];
  
  // Phase 2 transforms: Stagger in from bottom as intro fades out
  // Starts appearing around 0.25 progress, fully visible by 0.6
  const containerOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const containerY = useTransform(scrollYProgress, [0.2, 0.6], ["20%", "0%"]);
  const pointerEvents = useTransform(scrollYProgress, (pos: number) => pos > 0.4 ? 'auto' : 'none');

  return (
    <motion.div 
      style={{ opacity: containerOpacity, y: containerY, pointerEvents }}
      className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
    >
      <div className="w-full max-w-5xl">
        <ul className="flex flex-col space-y-12 md:space-y-16">
          {menuKeys.map((key, index) => (
            <MenuRow 
              key={key} 
              id={key}
              index={index}
              scrollYProgress={scrollYProgress}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const MenuRow: React.FC<{ 
  id: ViewState; 
  index: number; 
  scrollYProgress: MotionValue<number>;
  onNavigate: (view: ViewState) => void;
}> = ({ id, index, scrollYProgress, onNavigate }) => {
    const { t } = useTranslation();
    // Individual parallax/stagger effect for each row based on scroll
    // Each item enters slightly later than the previous
    const startOffset = 0.3 + (index * 0.1);
    const endOffset = 0.6 + (index * 0.1);
    
    const y = useTransform(scrollYProgress, [startOffset, endOffset], [100, 0]);
    const opacity = useTransform(scrollYProgress, [startOffset, endOffset], [0, 1]);

    const number = t(`menu.${id}.number`);
    const title = t(`menu.${id}.title`);
    const subtitle = t(`menu.${id}.subtitle`);

    return (
        <motion.li 
            style={{ y, opacity }}
            className="group relative cursor-pointer"
            onClick={() => onNavigate(id)}
        >
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-black/5 dark:border-white/10 pb-6 transition-colors duration-500 hover:border-black/20 dark:hover:border-white/30">
                {/* Number */}
                <span className="text-xs md:text-sm font-mono text-black/40 dark:text-white/40 tracking-widest">
                    {number}
                </span>

                {/* Main Title & Subtitle Container */}
                <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white transition-all duration-300 group-hover:pl-4 group-hover:text-black/80 dark:group-hover:text-white/90">
                        {title}
                    </h2>
                    
                    <div className="flex items-center justify-between md:justify-end gap-4">
                        <span className="text-sm md:text-base font-light tracking-wide text-black/50 dark:text-white/50 group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                            {subtitle}
                        </span>
                        
                        {/* Hover Arrow */}
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="opacity-0 group-hover:opacity-100 transform transition-all duration-300"
                        >
                            <ArrowRight className="text-black dark:text-white w-6 h-6" />
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Hover Glow/Background effect - subtle glass */}
            <div className="absolute -inset-4 -z-10 rounded-xl bg-black/0 dark:bg-white/0 transition-colors duration-500 group-hover:bg-black/[0.02] dark:group-hover:bg-white/[0.02] backdrop-blur-[1px]" />
        </motion.li>
    );
}

export default MenuSection;