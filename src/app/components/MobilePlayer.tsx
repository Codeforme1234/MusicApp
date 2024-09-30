"use client";
import React from "react";
import { songState } from "../state/SongAtom";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { truncateText } from "../Utils/TruncateText";
import { play, pause, desktop, heart } from "@/public/index";

const MobilePlayer = () => {
  const { currentSong } = useRecoilValue(songState);
  return (
    <div className=" rounded-md h-full bg-[#222222] flex justify-between items-center ">
      <div className="flex ">
        <div className="p-2">
          <Image
            className="rounded-md"
            src={currentSong?.image ?? ""}
            alt="song-image"
            width={50}
            height={50}
          />
        </div>
        <div className="flex text-xs text-white flex-col justify-center">
          <p>{truncateText(currentSong?.title, 25)}</p>
          <p>{truncateText(currentSong?.artist, 20)}</p>
        </div>
      </div>
      <div className="flex justify-between space-x-4 me-2 items-center ">
        <div>
          <Image src={desktop}  alt="device-icon" width={37} height={37} />
        </div>
        <div>
          <Image src={heart} alt="heart-icon" width={35} height={35} />
        </div>

        <div>
          <Image src={play} alt="play-icon" width={28} height={28} />
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
