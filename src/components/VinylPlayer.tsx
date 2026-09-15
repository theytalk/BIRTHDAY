import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VinylPlayer({ onPlay, onComplete }: { onPlay: () => void, onComplete: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleToggle = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      onPlay();
      // Show next button after a short delay
      setTimeout(() => setShowNext(true), 4000);
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-warm-ivory transition-colors duration-1000"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="text-center mb-16 z-10">
        <h2 className="font-serif text-3xl mb-4 text-deep-navy">A song for your special day.</h2>
      </div>

      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Vinyl Player Base */}
        <div className="absolute inset-0 bg-[#e6dfd1] rounded-lg shadow-2xl border-4 border-[#cfc5b1]" />
        
        {/* Vinyl Record */}
        <motion.div 
          className="relative w-[85%] h-[85%] rounded-full bg-very-dark-navy shadow-inner border border-black flex items-center justify-center overflow-hidden"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {/* Grooves */}
          <div className="absolute inset-4 rounded-full border border-white/5" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-12 rounded-full border border-white/5" />
          <div className="absolute inset-16 rounded-full border border-white/5" />
          
          {/* Label */}
          <div className="w-1/3 h-1/3 bg-gradient-to-br from-champagne-gold to-[#a68625] rounded-full flex flex-col items-center justify-center border-2 border-black/20 shadow-md">
            <span className="font-sans text-[8px] sm:text-[10px] font-bold text-very-dark-navy tracking-widest uppercase text-center leading-tight">
              For<br/>Mrs. Ulfa
            </span>
            <div className="w-3 h-3 bg-warm-ivory rounded-full mt-1 border border-black/30 shadow-inner" />
          </div>
        </motion.div>

        {/* Tonearm */}
        <motion.div 
          className="absolute right-4 top-8 w-8 h-48 origin-top shadow-lg"
          initial={{ rotate: -20 }}
          animate={{ rotate: isPlaying ? 25 : -20 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="w-4 h-4 rounded-full bg-gray-300 mx-auto shadow-md border border-gray-400" />
          <div className="w-1.5 h-36 bg-gradient-to-r from-gray-200 to-gray-400 mx-auto" />
          <div className="w-6 h-10 bg-gradient-to-br from-gray-700 to-gray-900 mx-auto rounded-sm transform rotate-[30deg] origin-top translate-y-[-2px] border border-gray-600 shadow-md" />
        </motion.div>
      </div>

      <div className="mt-16 flex flex-col items-center z-10">
        {!isPlaying ? (
          <button 
            onClick={handleToggle}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-paper-white font-sans text-sm tracking-widest uppercase hover:bg-[#112a4d] transition-colors shadow-lg"
          >
            <span className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-paper-white border-b-[5px] border-b-transparent ml-1" />
            Play
          </button>
        ) : (
          <p className="font-serif italic text-deep-navy/70 mb-4 animate-pulse">
            Playing...
          </p>
        )}
        
        {!isPlaying && (
          <p className="font-serif italic text-sm text-deep-navy/60 mt-6">
            Press play and stay for a moment.
          </p>
        )}

        {showNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 text-center"
          >
            <p className="font-serif italic text-lg text-deep-navy mb-8">Before you go...</p>
            <button 
              onClick={onComplete}
              className="text-sm font-sans uppercase tracking-widest text-deep-navy border-b border-deep-navy/30 pb-1 hover:border-deep-navy transition-colors"
            >
              There's one last thing
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
