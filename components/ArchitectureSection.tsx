import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ArchitectureSectionProps {
  onBack: () => void;
}

const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onBack }) => {
  const { t } = useTranslation();
  
  const items = t('architecture.items', { returnObjects: true }) as Array<{ title: string; description: string }>;

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
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        variants={itemVariants}
        className="fixed top-8 left-8 p-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 hover:scale-110 transition-transform"
      >
        <ArrowLeft className="w-6 h-6 text-[#1D1D1F] dark:text-[#F5F5F7]" />
      </motion.button>

      <div className="max-w-6xl mx-auto w-full pt-20">
        {/* Header Section */}
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

        {/* Grid Section */}
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
              
              {/* Subtle underline hover effect */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1D1D1F] dark:bg-[#F5F5F7] group-hover:w-full transition-all duration-500 ease-in-out opacity-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArchitectureSection;
