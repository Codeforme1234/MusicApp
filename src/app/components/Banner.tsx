'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { banner1, banner2, banner3, banner4 } from '@/public';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';

const images = [banner1, banner2, banner3, banner4];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 400);

    return () => clearInterval(interval);
  }, []);

  const bannerContent = isLoading ? (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton height={300} className="rounded-xl" />
    </SkeletonTheme>
  ) : (
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
  );

  return (
    <div className='mt-4 h-[300px] w-full'>
      {bannerContent}
    </div>
  );
};

export default Banner;
