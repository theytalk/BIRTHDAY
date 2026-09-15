import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthday';

function Confetti() {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50 + "vw",
    y: Math.random() * 100 + "vh",
    size: Math.random() * 6 + 2,
    color: Math.random() > 0.5 ? '#d4af37' : '#fdfbf7', // gold or ivory
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute top-0 left-1/2 rounded-full"
          style={{ width: p.size, height: p.size, backgroundColor: p.color, opacity: 0.8 }}
          initial={{ x: "-50%", y: "110vh", opacity: 0 }}
          animate={{
            x: p.x,
            y: "-10vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function FinalReveal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: Initial dark navy background
    // 1: Photo reveal
    // 2: Title reveal
    // 3: Message paragraphs
    
    const sequence = [
      { step: 1, delay: 2000 },
      { step: 2, delay: 6000 },
      { step: 3, delay: 9000 },
      { step: 4, delay: 13000 },
      { step: 5, delay: 17000 },
      { step: 6, delay: 21000 },
      { step: 7, delay: 25000 }, // final text & confetti
    ];

    const timers = sequence.map(s => setTimeout(() => setStep(s.step), s.delay));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full bg-deep-navy text-paper-white relative flex flex-col items-center py-20 px-4 sm:px-8 overflow-y-auto"
      initial={{ backgroundColor: "#fdfbf7" }} // starts warm ivory
      animate={{ backgroundColor: "#0a192f" }} // fades to deep navy
      transition={{ duration: 2 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-5">
        <h1 className="font-sans text-[15vw] font-bold tracking-[0.2em] uppercase whitespace-nowrap select-none">
          Happy Birthday
        </h1>
      </div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        
        {/* Main Photo Reveal */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div 
              className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-sm overflow-hidden shadow-2xl mb-12 border border-white/10"
              initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <img 
                src={birthdayData.mainPhoto} 
                alt="Main" 
                className="w-full h-full object-cover object-top"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl sm:text-4xl text-champagne-gold mb-2" style={{ textShadow: "0 0 15px rgba(255, 105, 180, 0.4)" }}>Happy Birthday,</h2>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold mb-4 tracking-wide" style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}>{birthdayData.recipientDisplayName}</h1>
              <p className="font-sans text-xs tracking-widest uppercase text-paper-white/60">{birthdayData.branch}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message Paragraphs */}
        <div className="space-y-12 text-center max-w-xl text-paper-white/90 font-serif leading-relaxed text-sm sm:text-base px-4">
          <AnimatePresence>
            {step >= 3 && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
                {birthdayData.mainMessage[1]}
              </motion.p>
            )}
            {step >= 4 && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
                {birthdayData.mainMessage[2]}
              </motion.p>
            )}
            {step >= 5 && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
                {birthdayData.mainMessage[3]}
              </motion.p>
            )}
            {step >= 6 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="pt-8">
                <p className="font-serif text-xl sm:text-2xl text-champagne-gold italic mb-16">
                  {birthdayData.mainMessage[4]}
                </p>
                <div className="mt-16 text-center">
                  <p className="font-script text-2xl text-paper-white mb-2">With warmest regards,</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-paper-white/60">
                    {birthdayData.signature.split('—')[0]}
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase text-paper-white/40 mt-1">
                    {birthdayData.signature.split('—')[1]}
                  </p>
                  <div className="w-12 h-0.5 bg-muted-yellow mx-auto mt-6 opacity-70" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {step === 7 && <Confetti />}
    </motion.div>
  );
}
