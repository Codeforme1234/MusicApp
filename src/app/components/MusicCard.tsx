import Image, { StaticImageData } from "next/image";
import React from "react";

interface MusicItemProps {
  image: StaticImageData;
  title: string;
  artist: string;
  description?: string;
  timeAgo?: string;
}

const MusicCard: React.FC<MusicItemProps> = ({
  image,
  title,
  artist,
  description,
  timeAgo,
}) => {
  return (
    <div
      className={` flex justify-between ${
        timeAgo ? " my-2 items-center" : "my-6  space-y-1"
      }`}
    >
      <div className={`flex ${timeAgo ? " flex-row gap-2" : "flex-col gap-2"}`}>
        <div className="rounded-lg">
          <Image
            className={` aspect-square object-cover ${
              timeAgo ? "h-10 w-10 rounded-sm" : "rounded-xl"
            }`}
            src={image}
            alt={title}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs font-light text-wrap">{artist}</div>
        </div>
      </div>
      {description && (
        <div className="text-xs font-light text-wrap">{description}</div>
      )}
      {timeAgo && (
        <div className="text-xs text-gray-400 font-light">{timeAgo}</div>
      )}
    </div>
  );
};

export default MusicCard;
