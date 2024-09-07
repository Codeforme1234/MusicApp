import Image, { StaticImageData } from "next/image";
import React from "react";
import { playbtn } from "@/public";
import { truncateText } from "../Utils/TruncateText";

interface MusicItemProps {
  image: StaticImageData | string;
  title: string;
  artist: string;
  description?: string;
  timeAgo?: string;
}

const MusicCard: React.FC<MusicItemProps> = ({ image, title, artist, description, timeAgo}) => {
  return (
    <div className={` flex justify-between ${timeAgo ? ' my-2 items-centerc' : 'my-6  space-y-1'}`}>
        <div className={`flex ${timeAgo ? ' flex-row gap-2' : 'flex-col gap-2'}`}>

      <div className={`relative rounded-lg group ${timeAgo ? 'flex items-center w-12':''}`}>
        <Image className={` aspect-square  overflow-hidden object-fill ${timeAgo ? 'h-10 w-10 rounded-sm':'rounded-xl'}`} height={200} width={200} src={image} alt={title} />
        <button 
            className={`absolute cursor-pointer inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-xl`}
          >
            <Image src={playbtn} alt="Play" className={` ${timeAgo ? 'h-3 w-3' :'h-10 w-10'}`} />
          </button>
      </div>
      <div className="flex flex-col">

      <div className={`text-sm font-medium1 ${timeAgo ? 'text-[12px] w-[110px]':''}`}>{truncateText(title)}</div>
      <div className="text-xs font-light text-wrap">{truncateText(artist, 10)}</div>
      </div>
        </div>
      {description && <div className="text-xs font-light text-wrap">{description}</div>}
      {timeAgo && <div className="text-xs text-gray-400 font-light">{timeAgo}</div>}
    </div>
  );
};

export default MusicCard;
