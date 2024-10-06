import React, { use } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { songState } from "../state/SongAtom";
interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

const CurrentSong = () => {
  const songData = useRecoilValue(songState);
  const currentSong = songData.currentSong;

  return (
    <div className={`w-full`}>
      {currentSong ? (
        <Image
          src={currentSong.image}
          width={240}
          height={240}
          alt="current song"
          className="w-full"
        />
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
};

export default CurrentSong;
