"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, PlayList, Player, Center, CurrentSong } from "../components";
import Image from "next/image";
import right from "../../public/right-2-svgrepo-com.svg";
import logo from "../../public/Untitled design (6).png";
import SongStateManager from "../Utils/LocalStorage";
import Playlist from "../components/Playlist";
import { CollapsedPlaylist, CollapsedSidebar } from "../state/Collapse";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const [openPlaylist, setOpenPlaylist] = useRecoilState(CollapsedPlaylist);
  const [openSidebar, setSidebar] = useRecoilState(CollapsedSidebar);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const handlePlay = () => {
    setPlay(!play);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebar = () => {
    setOpen(!open);
  };

  const handlePlaylistClick = () => {
    setOpenPlaylist(!openPlaylist);
  };

  const handleSidebarClick = () => {
    setSidebar(!openSidebar);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black">
        <Image
          src={logo}
          className="animate-bounce h-12 w-12"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div
      className={`flex relative h-screen flex-col overflow-hidden w-screen overflow-x-clip`}
    >
      <SongStateManager />
      <div className="flex flex-row w-full h-full">
        <div className="w-[20%] hidden md:block">
          <Sidebar />
        </div>

        {/* Sidebar with Framer Motion animation for mobile view */}
        <motion.div
          className={`bg-[#101011] h-full md:hidden transition-all duration-500 ease-in-out ${
            openSidebar ? "w-full absolute top-0 left-0 z-50 block" : "hidden"
          } ${open ? "w-6" : "w-[20%]"}`}
          initial={{ x: "-100%" }} // Sidebar starts off-screen from the left
          animate={{ x: openSidebar ? 0 : "-100%" }} // Slide in from left and out to left
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col h-full">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleSidebar}
            >
              <Image
                src={right}
                className={`mt-10 ${open ? "block" : "hidden"}`}
                alt="open"
              />
            </button>
            {isHovered && (
              <div className="absolute top-12 z-50 left-8 bg-gray-700 text-white p-2 rounded shadow-md">
                Toggle Sidebar
              </div>
            )}
            <Sidebar />
            <CurrentSong />
          </div>
        </motion.div>

        {/* Main content */}
        <div
          className={`flex h-screen transition-all duration-500 ease-in-out ${
            open ? "w-full lg:w-[87%]" : "w-full lg:w-[65%]"
          }`}
        >
          <Center />
        </div>

        {/* Playlist with Framer Motion animation for mobile view */}
        <div className="w-[27%]">
          <Playlist />
        </div>
        <motion.div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            openPlaylist
              ? "w-full absolute top-0 right-0 z-50 block"
              : "lg:w-[27%]"
          }`}
          initial={{ x: "100%" }} // Playlist starts off-screen in mobile view
          animate={{ x: openPlaylist ? 0 : "100%" }} // Slide in and out based on `openPlaylist`
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex">
            <Playlist />
          </div>
        </motion.div>
      </div>

      {/* Player component */}
      <div className="absolute bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Dashboard;
