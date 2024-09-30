"use client";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { songState } from "../state/SongAtom";
import {
  shuffle,
  previous,
  next,
  loop,
  playIcon,
  device,
  share,
  pauseIcon,
  muteIcon,
  volumeIcon,
  likeIcon,
  heartIcon,
  upwardArrow,
} from "@/public";
import Image from "next/image";
import { truncateText } from "../Utils/TruncateText";
import { motion } from "framer-motion";
import { CollapsedSongDetails } from "../state/Collapse";
import { useRecoilState } from "recoil";

interface Song {
  url: string;
  title: string;
  artist: string;
}

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const songData = useRecoilValue(songState);
  const currentSong: Song = songData.currentSong || { url: "", title: "", artist: "" };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const updateDuration = () => setDuration(audioRef.current?.duration || 0);
      const updateCurrentTime = () => setCurrentTime(audioRef.current?.currentTime || 0);

      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.play().catch((error) => console.error("Error playing audio:", error));

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", updateDuration);
        audioRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [currentSong.url]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(console.error);
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) audioRef.current.volume = volumeValue;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

  return (
    <div className="text-white h-[10vh] overflow-hidden px-6 w-screen md:flex opacity-85 items-center py-6 bg-black">
      <audio ref={audioRef} src={currentSong?.url || ""} />
      <div className="md:flex w-full">
        <div className="hidden md:flex md:flex-row flex-col md:w-[20%] w-[5%] items-center gap-4">
          <div className="md:block hidden">
            <div className="text-lg">{truncateText(currentSong.title)}</div>
            <div className="text-sm">{truncateText(currentSong.artist)}</div>
          </div>
          <button onClick={() => setLiked(!liked)}>
            <Image src={liked ? likeIcon : heartIcon} alt={liked ? "Liked" : "Like"} />
          </button>
        </div>
        <div className="lg:w-[60%] w-full flex flex-col">
          <div className="flex justify-center gap-4">
            <button onClick={handlePlayPause}>
              <Image src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
            </button>
          </div>
          <div className="md:mx-16 mx-4">
            <div className="flex justify-between text-sm">
              <p>{formatTime(currentTime)}</p>
              <p>{formatTime(duration)}</p>
            </div>
            <div
              className="h-1 w-full bg-neutral-200 dark:bg-neutral-600 cursor-pointer"
              onClick={handleProgressClick}
              ref={progressRef}
            >
              <div
                className="h-1 bg-blue-500"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="md:w-[20%] flex justify-between m-2 p-2 text-lg items-center gap-4">
          <div className="md:hidden">
            <div className="text-lg">{truncateText(currentSong.title)}</div>
            <div className="text-sm">{truncateText(currentSong.artist)}</div>
          </div>
          <div className="flex">
            <button onClick={() => setIsMuted(!isMuted)}>
              <Image
                src={isMuted ? muteIcon : volumeIcon}
                alt="Volume/Mute"
                className="w-[40px]"
              />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
