import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CakeScene({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0); // 0: initial, 1: lit, 2: blown out

  const handleClick = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6d9 25%, #fff0f8 50%, #ffb6d9 75%, #ff69b4 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Sparkle dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-25"
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />
      {/* Glowing orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-white/50 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-60 rounded-full bg-pink-300/30 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-60 rounded-full bg-white/40 blur-3xl pointer-events-none z-0" />

      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-deep-navy/70 hover:text-deep-navy font-sans text-xs uppercase tracking-widest z-50 transition-colors font-semibold"
      >
        ← Back
      </button>

      <div className="relative flex flex-col items-center justify-center z-10 gap-8" onClick={handleClick}>
        {/* Real Birthday Cake Image */}
        <div className="relative cursor-pointer select-none">
          {/* Flame on top of cake image */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <motion.div
                  className="w-6 h-10 bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 rounded-full blur-[2px] shadow-[0_0_20px_8px_rgba(255,200,0,0.5)]"
                  animate={{
                    scaleX: [1, 0.8, 1.1, 0.9, 1],
                    scaleY: [1, 1.1, 0.9, 1.05, 1],
                    y: [0, -2, 1, -1, 0],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'mirror' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke */}
          <AnimatePresence>
            {step === 2 && (
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-300 rounded-full blur-md pointer-events-none z-20"
                initial={{ opacity: 0.9, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -70, scale: 5 }}
                transition={{ duration: 2 }}
              />
            )}
          </AnimatePresence>

          <motion.img
            src="/assets/cake.png"
            alt="Birthday Cake"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl"
            animate={{ scale: step === 1 ? 1.04 : 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Text Prompt */}
        <div className="text-center h-16 pointer-events-none">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.p
                key="start"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-serif italic text-lg text-deep-navy/70"
              >
                Tap to light the candle ✨
              </motion.p>
            )}
            {step === 1 && (
              <motion.div key="lit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <p className="font-serif italic text-xl text-deep-navy drop-shadow-sm">Make a wish ✨</p>
                <p className="font-sans text-xs text-deep-navy/50 mt-2 tracking-widest uppercase">Tap when you're ready</p>
              </motion.div>
            )}
            {step === 2 && (
              <motion.p
                key="blown"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="font-serif italic text-xl text-deep-navy/90"
              >
                May all your wishes come true 🙏🏻
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
