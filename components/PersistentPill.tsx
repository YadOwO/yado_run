import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const PersistentPill: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
        
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-xs font-medium tracking-wider text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Toggle Language"
        >
          <Globe size={14} />
          <span>{language}</span>
        </button>

        <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-6 h-6 rounded-full text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

      </div>
    </motion.div>
  );
};

export default PersistentPill;