"use client";
import React, { useState } from "react";
import { Navigation, Banner, Suggestion } from "../components";

interface PlaylistProps {}
const Center: React.FC<PlaylistProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`flex flex-col h-full no-scrollbar w-full px-4 md:px-6 bg-[#18191b] text-white overflow-hidden`}
    >
      <div className="h-[9%]">
        <Navigation />
      </div>
      <div className="flex-grow overflow-y-auto h-[91%] no-scrollbar overflow-x-hidden">
        <div>
          <Banner />
        </div>
        <div>
          <Suggestion searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Center;
