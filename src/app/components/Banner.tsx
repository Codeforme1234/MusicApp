'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import banner1 from '../../public/maxresdefault.jpg';
import banner2 from '../../public/maxresdefault (2).jpg';
import banner3 from '../../public/istock_000043549038_medium_wide-e825e6a2a49bc79f4d924300a48eba1cb39d21d8-s1400-c100.jpg';
import banner4 from '../../public/dua-lipa-1920-x-1080-background-6zkgnpg786cvcz7c.jpg';

const images = [banner1, banner2, banner3, banner4]; 

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className='mt-4'>
      <div className='relative w-full h-[300px]'>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            className={`rounded-xl h-[300px] object-cover absolute inset-0 transition-opacity duration-1000 hover:opacity-40 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            alt={`banner-${index}`}
            priority={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
