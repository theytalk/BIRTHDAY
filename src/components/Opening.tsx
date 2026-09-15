import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './Envelope';

export default function Opening({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [opened, setOpened] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2000); // Show "A little something..."
    const timer2 = setTimeout(() => setStep(2), 5000); // Show "Mrs. Ulfa"
    const timer3 = setTimeout(() => setStep(3), 8000); // Show Envelope
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      setShowNextPrompt(true);
    }, 4000);
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute text-center"
          >
            <p className="font-serif italic text-lg text-deep-navy/70">A little something for you.</p>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute text-center"
          >
            <p className="font-serif italic text-lg text-deep-navy/70">Mrs. Ulfa</p>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center z-10"
          >
            <div className="mb-20 sm:mb-32">
              <Envelope onOpen={handleOpen} opened={opened} />
            </div>
            
            <AnimatePresence>
              {!opened && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 font-sans text-sm tracking-widest text-deep-navy/50 uppercase"
                >
                  Tap to open
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNextPrompt && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
            className="absolute bottom-12 flex flex-col items-center text-deep-navy/60 hover:text-deep-navy transition-colors"
          >
            <span className="font-serif italic mb-2">There's something more for you</span>
            <span className="animate-bounce">↓</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
