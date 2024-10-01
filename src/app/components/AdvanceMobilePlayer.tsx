import React from "react";
import Image from "next/image";
import { play, pause, heart, likedheart, next } from "@/public";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";

interface AdvancedMobilePlayerProps {}

const AdvancedMobilePlayer: React.FC<AdvancedMobilePlayerProps> = ({}) => {
  const [currentSong, setCurrentSong] = useRecoilState(songState);

  return (
    <div className="fixed inset-0 bg-black text-white z-50 flex flex-col">hello</div>
  );
};

export default AdvancedMobilePlayer;
