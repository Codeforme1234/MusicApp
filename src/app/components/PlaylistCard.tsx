import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Assuming you're using Next.js for the Image component
import { fetchPixabayImageURL } from '../API/ImageApi';

interface Props {
  title: string;
}

const PlaylistCard: React.FC<Props> = (props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      const data = await fetchPixabayImageURL(props.title);
      if (data) {
        setImageUrl(data);
      } else {
        // Generate a random number to get a unique image from Picsum
        setImageUrl(`https://picsum.photos/240/240?random=${Math.random()}`);
      }
    }

    fetchImage();
  }, [props.title]);

  return (
    <div className="flex-1 justify-center">
      <div className="h-[12rem] rounded-lg aspect-square">
        {imageUrl && (
          <Image
            className="aspect-square object-cover"
            height={240}
            width={240}
            src={imageUrl}
            alt={props.title}
          />
        )}
      </div>
      <div className="text-sm mt-2">{props.title}</div>
    </div>
  );
};

export default PlaylistCard;
