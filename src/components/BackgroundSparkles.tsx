import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundSparkles() {
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, size: number, delay: number, duration: number }[]>([]);

  useEffect(() => {
    // Generate static sparkles to avoid re-renders
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      size: Math.random() * 4 + 1, // px
      delay: Math.random() * 5, // s
      duration: Math.random() * 4 + 3 // s
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-champagne-gold opacity-0"
          style={{
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: `0 0 ${s.size * 2}px var(--color-champagne-gold)`
          }}
          animate={{
            y: [0, -30, -60],
            opacity: [0, 0.4, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
