// audioControls.ts
import { RefObject } from "react";

export const playPauseAudio = (
  audioRef: RefObject<HTMLAudioElement>,
  isPlaying: boolean,
  setIsPlaying: (value: boolean) => void
) => {
  if (audioRef.current) {
    isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(console.error);
    setIsPlaying(!isPlaying);
  }
};

export const changeVolume = (
  audioRef: RefObject<HTMLAudioElement>,
  volume: number,
  setVolume: (value: number) => void
) => {
  if (audioRef.current) {
    audioRef.current.volume = volume;
  }
  setVolume(volume);
};
