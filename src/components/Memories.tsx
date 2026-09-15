import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthday';

function Lightbox({ photo, onClose }: { photo: string, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-very-dark-navy/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-pointer"
      onClick={onClose}
    >
      <motion.img 
        src={photo} 
        alt="Memory" 
        className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      <button 
        className="absolute top-6 right-6 text-paper-white/50 hover:text-paper-white font-sans text-sm uppercase tracking-widest"
        onClick={onClose}
      >
        Close
      </button>
    </motion.div>
  );
}

export default function Memories({ onComplete }: { onComplete: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
  return (
    <motion.div 
      className="min-h-screen w-full py-24 px-4 flex flex-col items-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center mb-16 max-w-lg">
        <h2 className="font-serif text-3xl mb-4 text-deep-navy">Beberapa momen untuk dikenang.</h2>
        <p className="font-serif italic text-lg text-deep-navy/70">Melewati setiap tantangan dan pencapaian bersama.</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mb-32 place-items-center">
        {birthdayData.galleryPhotos.map((photo, idx) => {
          // Generate pseudo-random rotations and offsets based on index
          const rot = (idx % 2 === 0 ? 1 : -1) * ((idx % 3) + 1) * 2;
          const yOff = (idx % 3) * 10;
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: yOff, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, zIndex: 20, rotate: 0 }}
              className="relative bg-paper-white p-2 pb-8 sm:p-3 sm:pb-12 shadow-[0_5px_15px_rgba(0,0,0,0.15)] rounded-sm cursor-zoom-in w-full max-w-[250px] transform"
              style={{ rotate: `${rot}deg` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo} alt="Memory" className="w-full h-40 sm:h-56 object-cover rounded-sm border border-warm-ivory/50" loading="lazy" />
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center mt-12 mb-32"
      >
        <p className="font-serif italic text-2xl text-deep-navy/80 mb-16">
          Thank you for being part of these memories.
        </p>

        <p className="font-sans text-sm tracking-widest text-deep-navy/50 uppercase mb-4">
          And for all the moments still to come...
        </p>
        <h3 className="font-serif text-3xl text-deep-navy mb-12">This one's for you.</h3>

        <button 
          onClick={onComplete}
          className="text-sm font-sans uppercase tracking-widest text-champagne-gold border-b border-champagne-gold/30 pb-1 hover:border-champagne-gold transition-colors"
        >
          Continue
        </button>
      </motion.div>

      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
