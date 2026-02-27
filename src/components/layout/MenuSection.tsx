import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewState } from '@/types';

interface MenuSectionProps {
  onNavigate: (view: ViewState) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onNavigate }) => {
  const menuKeys: ViewState[] = ['profile', 'arch', 'play'];
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 w-full h-full">
      <div className="w-full max-w-5xl">
        <ul className="flex flex-col space-y-12 md:space-y-16">
          {menuKeys.map((key, index) => (
            <MenuRow 
              key={key} 
              id={key}
              index={index}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const MenuRow: React.FC<{ 
  id: ViewState; 
  index: number; 
  onNavigate: (view: ViewState) => void;
}> = ({ id, index, onNavigate }) => {
    const { t } = useTranslation();

    const number = t(`menu.${id}.number`);
    const title = t(`menu.${id}.title`);
    const subtitle = t(`menu.${id}.subtitle`);

    return (
        <motion.li 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
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