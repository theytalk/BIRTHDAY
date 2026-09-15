import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Glitters() {
  const [particles, setParticles] = useState<{
    id: number,
    x: number,
    y: number,
    size: number,
    duration: number,
    delay: number,
  }[]>([]);

  useEffect(() => {
    // Generate shiny glitter particles
    const newParticles = Array.from({ length: 60 }).map((_, i) => {
      return {
        id: i,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: Math.random() * 3 + 2, // 2px to 5px
        duration: Math.random() * 1.5 + 1, // Fast twinkling
        delay: Math.random() * -10, // Random start time
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 223, 186, 0.8) 40%, transparent 80%)',
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0, 1, 0],
            scale: [0.5, 1.2, 0.5, 1.2, 0.5],
            rotate: [0, 180],
          }}
          transition={{
            y: { duration: p.duration * 10, repeat: Infinity, ease: "linear" },
            opacity: { duration: p.duration, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: p.duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: p.duration * 2, repeat: Infinity, ease: "linear" },
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
