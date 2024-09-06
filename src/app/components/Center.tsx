"use client";
import React, { useState } from "react";
import { Navigation, Banner, Suggestion } from "../components";

interface PlaylistProps {
  handlePlaylistClick: () => void;
  handleSidebarClick: () => void;
  handlePlay: () => void;
  theme: string; // Add theme prop
}
const Center: React.FC<PlaylistProps> = ({
  handlePlaylistClick,
  handleSidebarClick,
  handlePlay,
  theme, // Receive theme
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={`flex flex-col w-full px-4 md:px-6 ${theme === 'day' ? 'bg-white text-black' : 'bg-[#18191b] text-white'}`}>
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSidebarClick={handleSidebarClick}
        handlePlaylistClick={handlePlaylistClick}
      />
      <div className="overflow-scroll no-scrollbar overflow-x-hidden">
        <div className="h-[80%]">
          <Banner />
          <Suggestion handlePlay={handlePlay} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Center;
