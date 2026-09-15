import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Small Letter Gift
function SmallLetter({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (!opened) {
      setOpened(true);
      onOpen();
    }
  };

  return (
    <div className="relative w-48 h-32 cursor-pointer perspective-1000 mx-auto" onClick={handleOpen}>
      <motion.div className="w-full h-full relative transform-style-3d">
        <div className="absolute inset-0 bg-[#e6dfd1] shadow-md rounded-sm border border-[#d5ccba]" />
        
        {/* Letter content sliding out */}
        <motion.div 
          className="absolute left-2 right-2 top-2 h-40 bg-paper-white shadow-lg p-3 text-center flex flex-col justify-center border border-warm-ivory/50"
          initial={{ y: 0, zIndex: 10 }}
          animate={{ y: opened ? -140 : 0, zIndex: opened ? 30 : 10 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: opened ? 1 : 0 }} transition={{ delay: 0.5 }}>
            <p className="font-serif italic text-xs mb-2">A little note for you.</p>
            <p className="font-sans text-[10px] leading-relaxed text-deep-navy/80">
              Thank you for your continuous support, guidance, and encouragement.<br/><br/>
              Your support has been a great motivation for us to keep growing, improving, and giving our very best contribution.
            </p>
            <p className="font-script text-sm mt-3 text-champagne-gold">— Micro Unit</p>
          </motion.div>
        </motion.div>

        {/* Flaps */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute bottom-0 w-full h-1/2 bg-[#dcd4c3] [clip-path:polygon(0_100%,50%_0,100%_100%)] shadow-inner" />
          <motion.div 
            className="absolute top-0 w-full h-[60%] bg-[#cfc5b1] origin-top"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: opened ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Birthday Cake Gift
function Cake({ onOpen }: { onOpen: () => void }) {
  const [step, setStep] = useState(0); // 0: initial, 1: lit, 2: blown out

  const handleClick = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
      onOpen();
    }
  };

  return (
    <div className="relative w-40 h-40 mx-auto cursor-pointer flex flex-col items-center justify-end" onClick={handleClick}>
      {/* Candle */}
      <div className="relative w-3 h-12 bg-[#fdfbf7] border border-[#e6dfd1] rounded-t-sm z-10 mb-[-2px]">
        {/* Flame */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div 
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-muted-yellow to-[#ff9d00] rounded-full blur-[1px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.1, 0.9, 1.05, 1],
                opacity: [0.8, 1, 0.9, 1, 0.8],
                y: [0, -2, 1, -1, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }}
            />
          )}
        </AnimatePresence>
        
        {/* Smoke */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full blur-sm"
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -40, scale: 3 }}
              transition={{ duration: 1.5 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Cake Body */}
      <div className="relative w-32 h-16 bg-deep-navy rounded-md shadow-lg border-t-4 border-champagne-gold z-20 flex items-center justify-center">
        {/* Frosting detail */}
        <div className="absolute top-2 w-full flex justify-around px-2">
          <div className="w-2 h-2 rounded-full bg-champagne-gold/50" />
          <div className="w-2 h-2 rounded-full bg-champagne-gold/50" />
          <div className="w-2 h-2 rounded-full bg-champagne-gold/50" />
          <div className="w-2 h-2 rounded-full bg-champagne-gold/50" />
        </div>
      </div>
      {/* Plate */}
      <div className="w-40 h-4 bg-[#e6dfd1] rounded-[50%] -mt-2 z-10 shadow-xl" />

      {/* Text Prompt */}
      <div className="absolute -bottom-16 w-64 text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p key="lit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif italic text-sm text-deep-navy/80">
              Make a wish ✨<br/><span className="text-xs font-sans not-italic text-deep-navy/50">Tap the candle when you're ready.</span>
            </motion.p>
          )}
          {step === 2 && (
            <motion.p key="blown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif italic text-sm text-deep-navy/80">
              May all your wishes come true.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Flowers Gift
function Flowers({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (!opened) {
      setOpened(true);
      onOpen();
    }
  };

  return (
    <div className="relative w-40 h-56 mx-auto cursor-pointer" onClick={handleClick}>
      <motion.div 
        className="w-full h-full flex flex-col items-center justify-end"
        animate={{ y: opened ? -10 : 0 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        {/* Flowers */}
        <div className="relative w-32 h-32 -mb-8 z-10">
          <motion.div 
            className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[#fdfbf7] shadow-sm border border-[#e6dfd1]"
            animate={{ scale: opened ? 1.2 : 1, x: opened ? -10 : 0, rotate: opened ? -15 : 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div 
            className="absolute top-0 right-6 w-14 h-14 rounded-full bg-paper-white shadow-sm border border-[#e6dfd1]"
            animate={{ scale: opened ? 1.25 : 1, y: opened ? -15 : 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          />
          <motion.div 
            className="absolute top-8 right-2 w-10 h-10 rounded-full bg-muted-yellow/80 shadow-sm border border-[#e6dfd1]"
            animate={{ scale: opened ? 1.1 : 1, x: opened ? 15 : 0, rotate: opened ? 20 : 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Wrapping */}
        <div className="relative w-20 h-28 bg-deep-navy z-20 overflow-hidden shadow-lg" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)' }}>
           <div className="absolute top-10 w-full h-2 bg-champagne-gold/60" />
        </div>
      </motion.div>

      {/* Text Prompt */}
      <div className="absolute -bottom-24 w-64 -left-12 text-center pointer-events-none">
        <AnimatePresence>
          {opened && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="font-serif italic text-sm text-deep-navy/80 mb-1">These are for you.</p>
              <p className="font-sans text-[10px] leading-relaxed text-deep-navy/60">
                May this new chapter bring you happiness, good health, blessings, and continued success.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GiftScene({ onComplete }: { onComplete: () => void }) {
  const [openedCount, setOpenedCount] = useState(0);

  const handleGiftOpen = () => {
    setOpenedCount(prev => prev + 1);
  };

  return (
    <motion.div 
      className="min-h-screen w-full py-20 px-6 relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center mb-24 mt-10">
        <h2 className="font-serif text-3xl mb-4 text-deep-navy">These are for you.</h2>
        <p className="font-sans text-sm tracking-wide text-deep-navy/60 uppercase">A few little things for your special day.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-32 md:gap-12 mt-12">
        <SmallLetter onOpen={handleGiftOpen} />
        <Cake onOpen={handleGiftOpen} />
        <Flowers onOpen={handleGiftOpen} />
      </div>

      {/* Progress Indicator */}
      <div className="mt-32 flex gap-4 text-champagne-gold text-lg">
        <span>{openedCount >= 1 ? '✦' : '○'}</span>
        <span>{openedCount >= 2 ? '✦' : '○'}</span>
        <span>{openedCount >= 3 ? '✦' : '○'}</span>
      </div>

      <AnimatePresence>
        {openedCount === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.5 }}
            className="mt-16 flex flex-col items-center"
          >
            <p className="font-serif italic text-xl text-deep-navy/80 mb-8">
              "But some of the best gifts aren't things..."
            </p>
            <button 
              onClick={onComplete}
              className="text-sm font-sans uppercase tracking-widest text-deep-navy border border-deep-navy/30 px-6 py-3 rounded-full hover:bg-deep-navy hover:text-paper-white transition-colors"
            >
              Buka Galeri Kenangan
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
