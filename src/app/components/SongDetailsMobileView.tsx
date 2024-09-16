import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { songState } from "../state/SongAtom";
import { useRecoilValue } from "recoil";

interface Props {
  // Define your props here
}

const SongDetailsMV: React.FC<Props> = (props) => {
  const currentSong = useRecoilValue(songState).currentSong;
  return (
    <motion.div
      className="bg-[#ffffffa2] h-[60vh] flex flex-col  p-3 w-full mt-2 shadow-lg rounded-lg" // Adjust styles as needed
      initial={{ y: "100%", opacity: 0 }} // Start below the viewport
      animate={{ y: 0, opacity: 1 }} // Move to its position and fade in
      exit={{ y: "100%", opacity: 0 }} // Move back to the bottom and fade out
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 3, // Duration for the move
        ease: "easeInOut",
      }}
    >
      <div className="flex items-center flex-col ">

      <Image src={currentSong?.image ?? ""} width={350} height={350} className=" rounded-lg" alt="current song" />
      </div>
      <div className="flex flex-col justify-center items-start text-black mt-4">
        <div className="text-2xl font-bold">{currentSong?.title ?? ""}</div>
        <div className="text-lg font-semibold">- {currentSong?.artist ?? ""}</div>
        </div>
    </motion.div>
  );
};

export default SongDetailsMV;
