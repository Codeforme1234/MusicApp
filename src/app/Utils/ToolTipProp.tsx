import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageWithTooltipProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export const ImageWithTooltip: React.FC<ImageWithTooltipProps> = ({
  src,
  alt,
  height,
  width,
  className = "",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setShowTooltip(true);
    }, 600);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className="z-99 relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={`${className} cursor-pointer`}
      />
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-200 ${
          showTooltip ? "opacity-100" : "opacity-0"
        }`}
      >
        {alt}
      </div>
    </div>
  );
};
