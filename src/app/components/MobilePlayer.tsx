"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { songState } from "../state/SongAtom";
import Image from "next/image";
import { truncateText } from "../Utils/TruncateText";
import { play, pause, heart, desktop, likedheart } from "@/public";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AdvancedMobilePlayer from "./AdvanceMobilePlayer";

interface Song {
  image: string;
  url: string;
  title: string;
  artist: string;
}

const MobilePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songData = useRecoilValue(songState);
  const setSongData = useSetRecoilState(songState);
  const currentSong: Song = songData.currentSong || {
    image: "",
    url: "",
    title: "",
    artist: "",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      const updatePlayState = () => setIsPlaying(!audioRef.current?.paused);
      audioRef.current.addEventListener("play", updatePlayState);
      audioRef.current.addEventListener("pause", updatePlayState);

      return () => {
        audioRef.current?.removeEventListener("play", updatePlayState);
        audioRef.current?.removeEventListener("pause", updatePlayState);
      };
    }
  }, [currentSong.url]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
      setSongData((prevState) => ({
        ...prevState,
        isPlaying: !isPlaying,
      }));
    }
  };
  const tryit = () => {
    console.log("tryit");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#222222" highlightColor="#444444">
        <div className="bg-[#222222] text-white p-2 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Skeleton width={40} height={40} className="rounded-lg" />
              <div>
                <Skeleton width={100} height={16} />
                <Skeleton width={80} height={12} />
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <Skeleton width={29} height={29} />
              <Skeleton width={29} height={29} />
              <Skeleton width={29} height={29} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className={` bg-[#222222] text-white p-2 rounded-lg`}>
      <audio ref={audioRef} src={currentSong?.url || ""} />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={tryit}>
          <Image
            src={currentSong.image}
            alt="Album Art"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <div className="text-sm font-semibold">
              {truncateText(currentSong.title, 25)}
            </div>
            <div className="text-xs text-gray-400">
              {truncateText(currentSong.artist, 20)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div>
            <Image src={desktop} alt="Desktop" width={29} height={29} />
          </div>
          <button onClick={handleLike}>
            <Image
              src={isLiked ? likedheart : heart}
              alt={isLiked ? "Liked" : "Like"}
              width={29}
              height={29}
            />
          </button>
          <button onClick={handlePlayPause}>
            <Image
              src={isPlaying ? pause : play}
              alt={isPlaying ? "Pause" : "Play"}
              width={isPlaying ? 29 : 25}
              height={isPlaying ? 29 : 25}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
