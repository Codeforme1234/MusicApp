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
import SongDetailsMV from "./SongDetailsMobileView";

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
  const [collapsed, setCollapsed] = useRecoilState(CollapsedSongDetails);

  const handleCollapsedClick = () => {
    setCollapsed(!collapsed);
  };

  const songData = useRecoilValue(songState);
  const currentSong: Song = songData.currentSong || {
    url: "",
    title: "",
    artist: "",
  };

  const handleLike = () => setLiked(!liked);

  const handleMute = () => {
    const newVolume = isMuted ? 0.2 : 0;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      const updateDuration = () => setDuration(audioRef.current?.duration || 0);
      const updateCurrentTime = () =>
        setCurrentTime(audioRef.current?.currentTime || 0);

      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);

      // Automatically play the song when the component mounts
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing audio:", error));

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", updateDuration);
        audioRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [currentSong.url]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch((error) => console.log(error));
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
      const newTime = ((e.clientX - rect.left) / rect.width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60)}:${Math.floor(time % 60)
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className="text-white px-6 w-screen md:flex opacity-85 items-center py-6 bg-black">
      <audio ref={audioRef} src={currentSong?.url || ""} />
      {!collapsed && <SongDetailsMV />}
      <motion.div
        className=" md:hidden" // Adjust styles as needed
        animate={{ y: [0, -5, 0, -5, 0] }} // Bounce effect
        transition={{
          duration: 3, // Duration of the animation
          ease: "easeInOut",
          repeat: 2,
        }}
        onClick={handleCollapsedClick}
      >
        <div className="text-center flex align-center justify-center items-center  my-4">
          {collapsed ? <span>Swipe to know more</span> : <span>Click to Hide</span>}
          <Image src={upwardArrow} className={`ml-2 ${collapsed?"":"rotate-180"}`} alt="upward arrow" />
        </div>
      </motion.div>
      <div className="md:flex w-full ">
        <div className="hidden md:flex md:flex-row flex-col  md:w-[20%] w-[5%] items-center gap-4">
          <div className="md:block hidden">
            <div className="text-lg">{truncateText(currentSong.title)}</div>
            <div className="text-sm">{truncateText(currentSong.artist)}</div>
          </div>
          <button onClick={handleLike}>
            <Image
              src={liked ? likeIcon : heartIcon}
              alt={liked ? "Liked" : "Like"}
            />
          </button>
        </div>
        <div className="lg:w-[60%] w-full flex flex-col">
          <div className="flex justify-center gap-4">
            <button>
              <Image src={shuffle} alt="Shuffle" />
            </button>
            <button>
              <Image src={previous} alt="Previous" />
            </button>
            <button onClick={handlePlayPause}>
              <Image src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
            </button>
            <button>
              <Image src={next} alt="Next" />
            </button>
            <button>
              <Image src={loop} alt="Loop" />
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
          <div className="md:hidden ">
            <div className="text-lg">{truncateText(currentSong.title)}</div>
            <div className="text-sm">{truncateText(currentSong.artist)}</div>
          </div>
          <div className=" flex">
            <button onClick={handleMute}>
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
          <div className="lg:block hidden w-[40px]">
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z"
                fill="#FFF"
              />
            </svg>
          </div>
          <div className="lg:block hidden w-[40px]">
            <Image src={device} alt="device" />
          </div>
          <div className="lg:block hidden w-[40px]">
            <Image src={share} alt="device" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
