import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from './hooks/useAudio';
import { birthdayData } from './data/birthday';
import BackgroundSparkles from './components/BackgroundSparkles';
import MessageScene from './components/MessageScene';
import CakeScene from './components/CakeScene';

type AppState = 'HOME' | 'CHOICE' | 'MESSAGE' | 'CAKE';

function App() {
  const { play, pause, isPlaying } = useAudio(birthdayData.music);
  const [appState, setAppState] = useState<AppState>('HOME');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appState]);


  if (appState === 'MESSAGE') {
    return <MessageScene onBack={() => setAppState('CHOICE')} />;
  }

  if (appState === 'CAKE') {
    return <CakeScene onBack={() => setAppState('CHOICE')} />;
  }

  return (
    <div 
      className="relative min-h-screen bg-black text-paper-white font-sans overflow-y-auto overflow-x-hidden selection:bg-champagne-gold/30"
      onClick={() => { 
        if (!isPlaying) play(); 
        if (appState === 'HOME') setAppState('CHOICE');
      }}
    >
      <div className="film-grain z-50 pointer-events-none" />
      <BackgroundSparkles />

      {/* Full-screen Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <motion.img 
          src={birthdayData.mainPhoto} 
          alt="Background" 
          className="w-full h-full object-cover object-center"
          animate={{ opacity: appState === 'CHOICE' ? 0.4 : 0.8 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[2px]"
          animate={{ opacity: appState === 'CHOICE' ? 1 : 0.8 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 md:p-8 flex items-center justify-center pointer-events-none">
        <div className="font-serif tracking-[0.3em] uppercase text-sm md:text-base text-white/90 font-semibold drop-shadow-md">
          {birthdayData.sender}
        </div>
      </nav>

      {/* Persistent Audio Control */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => {
              e.stopPropagation();
              isPlaying ? pause() : play();
            }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10 text-xs font-medium uppercase tracking-widest text-white/80 hover:text-white transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold animate-pulse" />
            Playing
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-40 cursor-pointer pointer-events-auto">
        <AnimatePresence mode="wait">
          {appState === 'HOME' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl w-full text-center flex flex-col items-center"
            >
              {/* Main Title */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight text-white drop-shadow-2xl">
                Happy Birthday,<br/>
                <span className="italic font-light">{birthdayData.recipientDisplayName}</span>
              </h1>

              {/* Subtitle */}
              <p className="font-serif italic text-lg md:text-xl text-champagne-gold/90 mb-16 tracking-wide">
                "May all your wishes and aspirations come true."
              </p>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 animate-pulse mt-20"
              >
                Tap anywhere to continue
              </motion.p>
            </motion.div>
          )}

          {appState === 'CHOICE' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16 z-20 pointer-events-auto"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setAppState('MESSAGE'); }}
                className="group w-48 h-48 rounded-full border border-champagne-gold/40 flex flex-col items-center justify-center gap-3 font-serif italic text-2xl text-white hover:bg-champagne-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,105,180,0.1)] hover:shadow-[0_0_40px_rgba(255,105,180,0.4)]"
              >
                <img src="/assets/message.png" alt="Message" className="w-16 h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                <span>Message</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setAppState('CAKE'); }}
                className="group w-48 h-48 rounded-full border border-champagne-gold/40 flex flex-col items-center justify-center gap-3 font-serif italic text-2xl text-white hover:bg-champagne-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,105,180,0.1)] hover:shadow-[0_0_40px_rgba(255,105,180,0.4)]"
              >
                <img src="/assets/cake.png" alt="Cake" className="w-16 h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
                <span>Cake</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
