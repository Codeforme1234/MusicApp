import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPixabayImageURL } from "../API/ImageApi";

interface Props {
  title: string;
  isSelected: boolean;
}

const PlaylistCard: React.FC<Props> = ({ title, isSelected }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const data = await fetchPixabayImageURL(title);
      if (data) {
        setImageUrl(data);
      } else {
        setImageUrl(`https://picsum.photos/240/240?random=${Math.random()}`);
      }
    }

    fetchImage();
  }, [title]);

  return (
    <div className="flex flex-col justify-center">
      <div className={`h-[10rem] md:h-[12rem] rounded-lg aspect-square ${isSelected ? 'border-2 border-green-500' : ''}`}>
        {imageUrl && (
          <Image
            className="aspect-square object-cover rounded-lg"
            height={200}
            width={200}
            src={imageUrl}
            alt={title}
          />
        )}
      </div>
      <div className="text-sm mt-2">{title}</div>
    </div>
  );
};

export default PlaylistCard;
