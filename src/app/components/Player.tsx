"use client";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom"; 
import { shuffle, previous, next, loop, playIcon, pauseIcon, muteIcon, volumeIcon, likeIcon, heartIcon } from "@/public";
import Image from "next/image";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [songData, setSongData] = useRecoilState(songState); // Using Recoil state for song data

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

      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", updateDuration);
        audioRef.current?.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, []);

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
    `${Math.floor(time / 60)}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

  return (
    <div className="text-white px-6 w-screen flex items-center py-6 bg-black">
      <audio ref={audioRef} src={songData?.url || ""} />
      <div className="flex md:flex-row flex-col md:w-[20%] w-[5%] items-center gap-4">
        <div className="lg:block hidden">
          <div>{songData.title}</div>
          <div>{songData.artist}</div>
        </div>
        <button onClick={handleLike}>
          <Image src={liked ? likeIcon : heartIcon} alt={liked ? "Liked" : "Like"} />
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
      <div className="md:w-[20%] flex items-center gap-4">
        <button onClick={handleMute}>
          <Image src={isMuted ? muteIcon : volumeIcon} alt="Volume/Mute" />
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
  );
};

export default Player;
