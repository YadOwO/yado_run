import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * 鼠标跟随光晕组件
 * 在桌面端渲染一个跟随鼠标的柔光效果，触摸设备上不渲染
 */
const CursorGlow: React.FC = () => {
  const { theme } = useTheme();
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch, mouseX, mouseY]);

  if (isTouch) return null;

  const glowColor =
    theme === 'dark'
      ? 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 30%, transparent 65%)'
      : 'radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 30%, transparent 65%)';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: glowColor,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 9,
      }}
    />
  );
};

export default CursorGlow;
