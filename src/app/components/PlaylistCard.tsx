import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPixabayImageURL } from "../API/ImageApi";
import { useSetRecoilState } from "recoil";
import { selectedPlaylistAtom } from "../state/PlaylistAtom";

interface Props {
  id: number;
  title: string;
  isSelected: boolean;
}

const PlaylistCard: React.FC<Props> = ({ id, title, isSelected }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const setSelectedPlaylist = useSetRecoilState(selectedPlaylistAtom);

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

  const handleClick = () => {
    setSelectedPlaylist({ id, title, image: imageUrl });
  };

  return (
    <div
      className="flex flex-col cursor-pointer justify-center"
      onClick={handleClick}
    >
      <div
        className={`relative h-[10rem] md:h-[12rem] rounded-lg  aspect-square `}
      >
        {imageUrl && (
          <Image
            className="aspect-square object-cover rounded-lg"
            height={200}
            width={200}
            src={imageUrl}
            alt={title}
          />
        )}
        <div
          className={`absolute inset-0 rounded-lg transition-opacity duration-200 ${
            isSelected
              ? "bg-black bg-opacity-40"
              : "bg-black bg-opacity-0 hover:bg-opacity-20"
          }`}
        ></div>
      </div>
      <div className="text-sm mt-2">{title}</div>
    </div>
  );
};

export default PlaylistCard;
