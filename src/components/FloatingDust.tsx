import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingDust() {
  const [particles, setParticles] = useState<{
    id: number,
    x: number,
    y: number,
    size: number,
    duration: number,
    delay: number,
    directionX: number,
    directionY: number,
    opacity: number,
    blur: number
  }[]>([]);

  useEffect(() => {
    // Generate a mix of tiny dust and larger glowing bokeh
    const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 80;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => {
      const isBokeh = i % 5 === 0; // Every 5th particle is a larger, blurred bokeh light
      
      return {
        id: i,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: isBokeh ? Math.random() * 15 + 10 : Math.random() * 3 + 1, // Larger if bokeh
        duration: isBokeh ? Math.random() * 20 + 20 : Math.random() * 10 + 10, // Slower if bokeh
        delay: Math.random() * -30, // Random start time
        directionX: (Math.random() - 0.5) * 30, // Drift across screen
        directionY: (Math.random() - 0.5) * 40 - 10, // Drift mostly upwards
        opacity: isBokeh ? Math.random() * 0.15 + 0.1 : Math.random() * 0.4 + 0.2,
        blur: isBokeh ? Math.random() * 4 + 2 : Math.random() * 1, // Blur for depth of field
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 230, 240, 0.6) 50%, transparent 100%)',
            boxShadow: `0 0 ${p.size * 1.5}px rgba(255, 255, 255, 0.6)`,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            x: [0, p.directionX, 0],
            y: [0, p.directionY, p.directionY * 1.5],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
