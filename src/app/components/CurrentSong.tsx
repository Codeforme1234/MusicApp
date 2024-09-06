import React from "react";
import Image from "next/image";
import currentsong from "../../public/1546.png";

interface Props {
  // Define your props here
}

const CurrentSong: React.FC<Props> = (props) => {
  return (
    <div className=" w-full  flex">
      <Image src={currentsong} alt="currentsong" />
    </div>
  );
};

export default CurrentSong;
