import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ onOpen, opened }: { onOpen: () => void, opened: boolean }) {
  const [isPressing, setIsPressing] = useState(false);

  return (
    <div className="relative w-80 h-56 perspective-1000 cursor-pointer" 
         onMouseDown={() => !opened && setIsPressing(true)}
         onMouseUp={() => {
           if (!opened) {
             setIsPressing(false);
             onOpen();
           }
         }}
         onTouchStart={() => !opened && setIsPressing(true)}
         onTouchEnd={() => {
           if (!opened) {
             setIsPressing(false);
             onOpen();
           }
         }}
    >
      <motion.div 
        className="w-full h-full relative transform-style-3d"
        animate={{
          y: opened ? 40 : 0,
        }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Back of envelope (inside) */}
        <div className="absolute inset-0 bg-deep-navy shadow-inner rounded-md" />
        
        {/* Letter inside */}
        <motion.div 
          className="absolute left-4 right-4 top-4 h-64 bg-paper-white rounded-sm shadow-md flex flex-col items-center justify-center p-6 text-center"
          initial={{ y: 0, zIndex: 10 }}
          animate={{ 
            y: opened ? -120 : 0,
            zIndex: opened ? 30 : 10
          }}
          transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 40 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <h2 className="font-script text-4xl mb-4 text-champagne-gold">Happy Birthday</h2>
            <p className="font-serif text-xl text-deep-navy mb-6">Mrs. Ulfa Septiyani</p>
            <p className="font-sans text-xs text-deep-navy/70 uppercase tracking-widest">
              From all of us at<br/>
              Micro Unit — Mandiri KCP Kol. H. Burlian
            </p>
            <div className="mt-8">
              <p className="font-serif text-sm italic text-deep-navy/80">
                "Today is a little more special,<br/>because today is yours."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Envelope bottom flap */}
        <div className="absolute bottom-0 w-full h-full overflow-hidden rounded-md z-20 pointer-events-none">
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[120%] h-full bg-deep-navy shadow-[0_-5px_15px_rgba(0,0,0,0.2)] rotate-45 transform origin-bottom" />
        </div>
        
        {/* Envelope side flaps */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-[#0d2240] shadow-[5px_0_15px_rgba(0,0,0,0.1)] [clip-path:polygon(0_0,100%_50%,0_100%)]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0d2240] shadow-[-5px_0_15px_rgba(0,0,0,0.1)] [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
        </div>

        {/* Top flap */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none transform origin-top"
          initial={{ rotateX: 0 }}
          animate={{ 
            rotateX: opened ? 180 : 0,
            zIndex: opened ? 5 : 30
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-[#112a4d] shadow-[0_5px_15px_rgba(0,0,0,0.2)] [clip-path:polygon(0_0,100%_0,50%_60%)]" />
        </motion.div>

        {/* Wax Seal */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-champagne-gold to-[#a68625] shadow-lg flex items-center justify-center border border-[#ffd700]/30 cursor-pointer"
              animate={{
                scale: isPressing ? 0.9 : 1,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-serif text-paper-white font-bold text-lg drop-shadow-md">US</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
