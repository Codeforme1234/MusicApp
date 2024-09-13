"use client";
import React, { useState } from "react";
import { Navigation, Banner, Suggestion } from "../components";

interface PlaylistProps {
  handlePlaylistClick: () => void;
  handleSidebarClick: () => void;
  handlePlay: () => void;
}
const Center: React.FC<PlaylistProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div
      className={`flex flex-col w-full px-4 md:px-6 bg-[#18191b] text-white`}
    >
      <Navigation />
      <div className="overflow-scroll no-scrollbar overflow-x-hidden">
        <div className="h-[80%]">
          <Banner />
          <Suggestion searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Center;
