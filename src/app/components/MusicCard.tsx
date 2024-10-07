import Image, { StaticImageData } from "next/image";
import React from "react";
import { playbtn } from "@/public";
import { truncateText } from "../Utils/TruncateText";
import { useState } from "react";

interface MusicItemProps {
  image: StaticImageData | string;
  title: string;
  artist: string;
  description?: string;
  timeAgo?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const MusicCard: React.FC<MusicItemProps> = ({
  image,
  title,
  artist,
  description,
  timeAgo,
  isSelected,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const firstWord = title.split(' ')[0];

  return (
    <div
      className={`flex  justify-between cursor-pointer ${
        timeAgo ? "my-2  items-center" : "my-6  space-y-1"
      } ${
        timeAgo && isSelected
          ? "border-2 border-opacity-25 border-green-200 p-1 "
          : "border-2 border-opacity-10 border-black p-1"
      }`}
      onClick={onSelect}
    >
      <div className={`flex ${timeAgo ? "flex-row gap-2" : "flex-col gap-2"}`}>
        <div
          className={`relative rounded-lg group ${
            timeAgo ? "flex items-center w-12" : ""
          }`}
        >
          {imageError ? (
            <div className={`bg-black text-white flex items-center justify-center ${
              timeAgo ? "h-10 w-10 rounded-sm text-xs" : "h-[200px] w-[200px] rounded-xl text-lg"
            }`}>
              {firstWord}
            </div>
          ) : (
            <Image
              className={`aspect-square overflow-hidden object-fill ${
                timeAgo ? "h-10 w-10 rounded-sm" : "rounded-xl"
              }`}
              height={200}
              width={200}
              src={image}
              alt={title}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out rounded-xl"></div>
          {isSelected && (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 `}
            >
              <Image
                src={playbtn}
                alt="Play"
                className={`text-green-600 ${
                  timeAgo ? "h-3 w-3" : "h-10 w-10"
                }`}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div
            className={`text-sm font-medium1 ${
              timeAgo ? "text-[12px] w-[110px]" : ""
            }`}
          >
            {truncateText(title, 10)}
          </div>
          <div className="text-xs font-light text-wrap">
            {truncateText(artist, 10)}
          </div>
        </div>
      </div>
      {description && (
        <div className="text-xs font-light text-wrap">{description}</div>
      )}
      {timeAgo !== "." && (
        <div className="text-xs text-gray-400 font-light">{timeAgo}</div>
      )}
    </div>
  );
};

export default MusicCard;
