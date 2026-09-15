import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthday';
import FloatingDust from './FloatingDust';
import Glitters from './Glitters';

export default function MessageScene({ onBack }: { onBack: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <motion.div
      className="h-[100dvh] w-full relative flex flex-col overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #eed3dc 0%, #dbb1c0 30%, #b87b94 75%, #8f4664 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <FloatingDust />
      <Glitters />
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Grand glowing light top center */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(255,255,255,0.85) 0%, rgba(255,215,235,0.4) 40%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Bottom glowing aura */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom center, rgba(255,255,255,0.6) 0%, rgba(255,180,220,0.2) 50%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-white font-sans text-[10px] uppercase tracking-[0.25em] transition-colors drop-shadow-md"
      >
        <span className="text-base leading-none">←</span> Back
      </button>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-h-[100dvh]">

        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-champagne-gold/60" />
            <span className="text-champagne-gold text-sm tracking-widest">✦</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-champagne-gold/60" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-deep-navy tracking-wide mb-2">
            OTS Terooozzzz
          </h2>
          <p className="font-serif italic text-sm text-deep-navy/45 tracking-wider">
            Panas & Hujan Kita Terjang Bersama!
          </p>
        </motion.div>

        {/* 12 PHOTOS + ENVELOPE LAYOUT */}
        <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 lg:gap-16 px-2 md:px-8 mt-2 md:mt-4 max-h-full overflow-hidden relative">



          {/* FIRST HALF PHOTOS (Top on Mobile, Left on Desktop) */}
          <div className="relative grid grid-cols-3 md:grid-cols-2 gap-1.5 md:gap-3 w-[90vw] md:w-[40vw] max-w-[450px] md:max-w-[320px]">
            
            {/* Love 1 anchored to the top-left of this grid */}
            <img
              src="/assets/love 1.png"
              alt="Love"
              className="absolute -top-6 -left-4 md:-top-8 md:-left-8 w-14 sm:w-16 md:w-24 drop-shadow-lg z-40 pointer-events-none"
            />

            {birthdayData.galleryPhotos.slice(0, Math.ceil(birthdayData.galleryPhotos.length / 2)).map((photo, idx) => {
              const rotations = [-2, 1.5, 3, -1, 2, -1.5];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                  className="relative bg-white cursor-zoom-in transition-all duration-300 w-full"
                  style={{
                    rotate: `${rotations[idx % rotations.length]}deg`,
                    boxShadow: '0 4px 15px rgba(176, 0, 99, 0.1)',
                    padding: '3px 3px 12px 3px',
                  }}
                >
                  <img src={photo} alt="Memory" className="w-full aspect-square object-cover" />
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />
                </motion.div>
              );
            })}
          </div>

          {/* ENVELOPE (CENTER) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                className="relative z-30 cursor-pointer group flex flex-col items-center gap-1 md:gap-2 mx-1 md:mx-4 shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                onClick={() => setOpened(true)}
              >
                <motion.img
                  src="/assets/amplop.png"
                  alt="Envelope"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain"
                  style={{ filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))' }}
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* SECOND HALF PHOTOS (Bottom on Mobile, Right on Desktop) */}
          <div className="relative grid grid-cols-3 md:grid-cols-2 gap-1.5 md:gap-3 w-[90vw] md:w-[40vw] max-w-[450px] md:max-w-[320px]">
            
            {/* Love 2 anchored to the bottom-right of this grid */}
            <img
              src="/assets/love 2.png"
              alt="Love"
              className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 w-20 sm:w-24 md:w-28 drop-shadow-lg z-40 pointer-events-none"
            />

            {birthdayData.galleryPhotos.slice(Math.ceil(birthdayData.galleryPhotos.length / 2)).map((photo, idx) => {
              const rotations = [1.5, -2, -1, 3, -1.5, 2];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                  className="relative bg-white cursor-zoom-in transition-all duration-300 w-full"
                  style={{
                    rotate: `${rotations[idx % rotations.length]}deg`,
                    boxShadow: '0 4px 15px rgba(176, 0, 99, 0.1)',
                    padding: '3px 3px 12px 3px',
                  }}
                >
                  <img src={photo} alt="Memory" className="w-full aspect-square object-cover" />
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />
                </motion.div>
              );
            })}
          </div>


        </div>
      </div>

      {/* LETTER OVERLAY — premium paper style */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            style={{ background: 'rgba(180, 0, 80, 0.18)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white w-full max-w-2xl overflow-y-auto max-h-[92vh]"
              style={{
                boxShadow: '0 40px 100px rgba(180, 0, 80, 0.18), 0 0 0 1px rgba(212,175,55,0.12)',
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 22, stiffness: 85 }}
            >
              {/* Gold top border */}
              <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />

              <div className="px-8 py-10 md:px-16 md:py-12">
                {/* Header decoration */}
                <div className="flex items-center gap-3 justify-center mb-8">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-champagne-gold/30" />
                  <span className="text-champagne-gold text-base tracking-widest">✦</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-champagne-gold/30" />
                </div>

                <button
                  onClick={() => setOpened(false)}
                  className="absolute top-5 right-6 text-deep-navy/25 hover:text-deep-navy font-sans text-[10px] uppercase tracking-[0.2em] transition-colors"
                >
                  Tutup ✕
                </button>

                <div className="font-serif leading-loose text-sm md:text-base space-y-6 text-center text-deep-navy/80">
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-deep-navy mb-6 leading-snug tracking-wide">
                    🎉 Happy Birthday, Mrs. Ulfa Septiyani! 🎂
                  </h2>
                  <p>
                    Warmest birthday wishes from all of us at the Micro Unit of Mandiri KCP Kol. H. Burlian. May this new chapter of your life bring you good health, happiness, blessings, and continued success in everything you do.
                  </p>
                  <p>
                    We would also like to sincerely thank you for your continuous support, guidance, and encouragement to the Micro Unit throughout this journey. Your support has been a great motivation for us to keep growing, improving, and giving our very best contribution to the branch.
                  </p>
                  <p>
                    May you always be blessed with the strength and wisdom to lead, inspire, and bring our team toward even greater achievements.
                  </p>
                  <p className="italic font-semibold text-champagne-gold pt-2">
                    Happy Birthday, Mrs. Ulfa! May all your wishes and aspirations come true. 🙏🏻✨
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-10 pt-8 border-t border-champagne-gold/15 text-center">
                  <p className="font-script text-2xl text-champagne-gold mb-2">With warmest regards,</p>
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-deep-navy/40 font-medium">
                    Micro Unit — Mandiri KCP Kol. H. Burlian
                  </p>
                </div>

                {/* Bottom decoration */}
                <div className="flex items-center gap-3 justify-center mt-8">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-champagne-gold/30" />
                  <span className="text-champagne-gold text-base tracking-widest">✦</span>
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-champagne-gold/30" />
                </div>
              </div>

              {/* Gold bottom border */}
              <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
