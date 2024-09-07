"use client";
import React, { useState, useEffect, useRef } from "react";
import shuffle from "../../../public/shuffle-2-svgrepo-com.svg";
import previous from "../../../public/previous-svgrepo-com.svg";
import next from "../../../public/next-svgrepo-com (1).svg";
import loop from "../../../public/loop-svgrepo-com.svg";
import Play from "../../../public/play-circle-svgrepo-com.svg";
import pause from "../../../public/pause-circle-svgrepo-com.svg";
import device from "../../../public/device-multiple-svgrepo-com.svg";
import share from "../../../public/share-svgrepo-com.svg";
import speaker from '../../../public/speaker-2-svgrepo-com.svg'
import mute from '../../../public/mute-svgrepo-com.svg'
import heart from '../../../public/heart-svgrepo-com copy.svg'
import like from '../../../public/heart-shine-svgrepo-com.svg'

import Image from "next/image";
interface PlayerProps {
    play:boolean
}

const Player: React.FC<PlayerProps> = ({play}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setIsliked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleLike= () => {
    setIsliked(!liked)
  }

  const handleMute = () => {
    if (isMuted) {
      const newVolume = 0.2;
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    } else {
      
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
    setIsMuted(!isMuted); 
  };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      const updateDuration = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      const updateCurrentTime = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

   
      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            updateDuration
          );
          audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (play && audioRef.current && !isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log("Error occurred while trying to play the audio:", error);
      });
      setIsPlaying(true);
    } else if (!play && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [play]); 

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Error occurred while trying to play the audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(e.target.value);
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };


  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickPositionX = e.clientX - rect.left;
      const newTime = (clickPositionX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  return (
    <div className="text-white px-6 w-screen flex items-center  py-6  bg-black">
      <audio ref={audioRef} src="/music/BYE.mp3" />
      <div className=" flex md:flex-row flex-col md:w-[20%] w-[5%] items-center gap-4  ">
        <div className="lg:block hidden">
          <div> Bye Bye Bye</div>
          <div>Deadpool & Wolverine</div>
        </div>
        <button onClick={handleLike}>
        <Image
                src={liked ? like : heart}
                alt={liked ? "like" : "liked"}
              />
        </button>
        <div className="md:block hidden">
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
              stroke="#FFF"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
              stroke="#FFF"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="lg:w-[60%] w-full  ">
        <div className=" flex flex-col">
          <div className="flex justify-center gap-4">
            <button>
              <Image src={shuffle} alt="shuffle" />
            </button>
            <button>
              <Image src={previous} alt="shuffle" />
            </button>
            <button onClick={handlePlayPause}>
              <Image
                src={isPlaying ? pause : Play}
                alt={isPlaying ? "Pause" : "Play"}
              />
            </button>

            <button>
              <Image src={next} alt="shuffle" />
            </button>
            <button>
              <Image src={loop} alt="shuffle" />
            </button>
          </div>
          <div className="md:mx-16 mx-4">
            <div className="mx-8 py-1">
              <div className="flex justify-between text-sm text-grey-darker">
                <p>{formatTime(currentTime)}</p>
                <p>{formatTime(duration)}</p>
              </div>
              <div className="">
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
          </div>
        </div>
        <div></div>
      </div>
      <div className="md:w-[20%] flex items-center gap-4 md:flex-row flex-col">
        <div className="flex w-full items-center gap-2 relative group">
          <button onClick={handleMute}>
          <Image
                src={isMuted ? mute : speaker}
                alt={isMuted ? "mute" : "volume"}
              />
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="md:w-full md:relative absolute md:rotate-0 -rotate-90 -right-14 -top-20 hidden md:group-hover:hidden group-hover:block"
          />
           <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full lg:block hidden"
          />
          {/* <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div className="h-1 bg-blue-500" style={{ width: "45%" }}></div>
            </div> */}
        </div>
        <div className="lg:block hidden">
          <svg
            width="25px"
            height="25px"
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
        <div className="lg:block hidden">
          <Image src={device} alt="device" />
        </div>
        <div className="lg:block hidden">
          <Image src={share} alt="device" />
        </div>
      </div>
    </div>
  );
};

export default Player;
