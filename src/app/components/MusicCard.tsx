import Image, { StaticImageData } from "next/image";
import React from "react";
import { playbtn } from "@/public";

interface MusicItemProps {
  image: StaticImageData | string;
  title: string;
  artist: string;
  description?: string;
  timeAgo?: string;
  handlePlay:() => void;
}

const MusicCard: React.FC<MusicItemProps> = ({ image, title, artist, description, timeAgo,handlePlay }) => {
  return (
    <div className={` flex justify-between ${timeAgo ? ' my-2 items-center' : 'my-6  space-y-1'}`}>
        <div className={`flex ${timeAgo ? ' flex-row gap-2' : 'flex-col gap-2'}`}>

      <div className="relative rounded-lg group">
        <Image className={` aspect-square object-cover ${timeAgo ? 'h-10 w-10 rounded-sm object-contain':'rounded-xl'}`} height={200} width={200} src={image} alt={title} />
        <button onClick={handlePlay}
            className={`absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl`}
          >
            <Image src={playbtn} alt="Play" className={` ${timeAgo ? 'h-3 w-3' :'h-10 w-10'}`} />
          </button>
      </div>
      <div className="flex flex-col">

      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs font-light text-wrap">{artist}</div>
      </div>
        </div>
      {description && <div className="text-xs font-light text-wrap">{description}</div>}
      {timeAgo && <div className="text-xs text-gray-400 font-light">{timeAgo}</div>}
    </div>
  );
};

export default MusicCard;
