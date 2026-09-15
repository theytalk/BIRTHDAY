import { useState, useEffect } from 'react';

export function useAudio(url: string) {
  const [audio] = useState(() => new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const play = () => {
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(e => {
      console.log('Audio playback failed', e);
    });
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return { play, pause, isPlaying, audio };
}
