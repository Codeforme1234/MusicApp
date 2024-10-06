import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  play,
  pause,
  heart,
  dots,
  forward,
  backward,
  upwardArrow,
  repeat,
  queueIcon,
  share,
  likedheart,
  desktop,
  next,
  mainpause,
  mainplay,
  shuffle,
} from "@/public";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";
import { playPauseAudio, changeVolume } from "./AudioControl";
import { playbackState } from "../state/PlayAndPause";
interface AdvancedMobilePlayerProps {
  onClose: () => void;
}

interface AdvancedMobilePlayerProps {
  onClose: () => void;
  isExpanded: boolean; // Add this prop
}

const AdvancedMobilePlayer: React.FC<AdvancedMobilePlayerProps> = ({
  onClose,
  isExpanded,
}) => {
  const [currentSong, setCurrentSong] = useRecoilState(songState);
  const [isPlaying, setIsPlaying] = useRecoilState(playbackState);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      const updateDuration = () => setDuration(audioRef.current?.duration || 0);
      const updateCurrentTime = () =>
        setCurrentTime(audioRef.current?.currentTime || 0);

      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", updateDuration);
        audioRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [currentSong.currentSong?.url]);

  const handlePlayPause = () => {
    playPauseAudio(audioRef, isPlaying, setIsPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      audioRef.current.currentTime =
        ((e.clientX - rect.left) / rect.width) * duration;
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressChange(e);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleProgressChange(e);
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const newTime = ((e.clientX - rect.left) / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${Math.floor(time % 60)
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className={`fixed inset-0 bg-black opacity-75 justify-between p-4 px-6 text-white z-50 flex flex-col advanced-player-transition ${isExpanded ? 'advanced-player-open' : 'advanced-player-closed'}`}>
      <audio ref={audioRef} src={currentSong.currentSong?.url || ""} />
      <div className="p-4 flex justify-between">
        <button onClick={onClose} className="text-2xl">
          <Image className="rotate-180" src={upwardArrow} alt="upward arrow" />
        </button>
        <div className="text-center">
          <div className="uppercase text-xs font-light">Playing from album</div>
          <div className="text-md "> Devesh</div>
        </div>
        <div className="rotate-90">
          <Image src={dots} alt="dots" width={20} height={20} />
        </div>
      </div>
      <div>
        <Image
        className="w-full rounded-xl"
          src={currentSong.currentSong?.image ?? ""}
          alt="Song cover"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between my-7">
          <div>
            <div className="uppercase text-lg font-semibold">{currentSong.currentSong?.title ?? "no song selected"}</div>
            <div className="text-xs"> {currentSong.currentSong?.artist ?? "no artist"}</div>
          </div>
          <div>
            <button onClick={() => setIsLiked(!isLiked)}>
              <Image 
                src={isLiked ? likedheart : heart} 
                alt="heart" 
                width={40} 
                height={40} 
                className={isLiked ? "text-green-500" : ""}
              />
            </button>
          </div>
        </div>
        <div>
          <div
            className="h-1 w-full bg-neutral-600 cursor-pointer relative"
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
            onMouseMove={handleProgressMouseMove}
            onMouseUp={handleProgressMouseUp}
            onMouseLeave={handleProgressMouseUp}
            ref={progressRef}
          >
            <div
              className="h-1 bg-blue-500"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <div>{formatTime(currentTime)}</div>
            <div>{formatTime(duration)}</div>
          </div>
        </div>
        <div className="text-white flex my-2 justify-between">
          <button onClick={() => setIsShuffleActive(!isShuffleActive)}>
            <Image
              src={shuffle}
              alt="shuffle"
              width={30}
              height={30}
              className={`me-4 ${isShuffleActive ? "text-green-500" : ""}`}
            />
          </button>
          <Image src={backward} alt="backward" width={40} height={40} className="" />
          <button onClick={handlePlayPause}>
            <Image 
              src={isPlaying ? mainpause : mainplay} 
              alt={isPlaying ? "Pause" : "Play"} 
              width={80} 
              height={80} 
            />
          </button>
          <Image src={forward} alt="forward" width={40} height={40} />
          <button onClick={() => setIsRepeatActive(!isRepeatActive)}>
            <Image 
              src={repeat} 
              alt="repeat" 
              width={30} 
              height={30} 
              className={`ms-4 ${isRepeatActive ? "text-green-500" : ""}`}
            />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <div><Image src={desktop} alt="desktop" width={20} height={20} /></div>
          <div className="flex justify-between">
            <Image src={share} alt="share" width={20} height={20} />
            <Image src={queueIcon} alt="queue" width={20} height={20} className="ms-6"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMobilePlayer;
