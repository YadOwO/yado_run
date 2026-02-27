import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const IntroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
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
          className="mt-8 text-sm uppercase tracking-widest text-black/40 dark:text-white/40 cursor-pointer transition-colors hover:text-black dark:hover:text-white"
        >
          {t("scrollLabel")}
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection;
