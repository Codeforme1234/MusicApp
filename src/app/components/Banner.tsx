'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { banner1, banner2, banner3, banner4 } from '@/public';
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
            className={`rounded-xl h-[300px] w-full object-cover absolute inset-0 transition-opacity duration-1000 hover:opacity-40 ${
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
