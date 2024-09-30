"use client";
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  PlayList,
  Player,
  Center,
  CurrentSong,
  MobilePlayer,
} from "../components";
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
  const [openPlaylist, setOpenPlaylist] = useRecoilState(CollapsedPlaylist);
  const [openSidebar, setSidebar] = useRecoilState(CollapsedSidebar);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`flex relative flex-col w-screen overflow-x-clip`}>
      <SongStateManager />
      <div className="flex flex-row relative w-full h-[100vh] overflow-hidden md:h-[90vh]">
        <div className="w-[20%] hidden md:block">
          <Sidebar />
        </div>
        {/* <motion.div
          className={`bg-[#101011] h-full md:hidden transition-all duration-300 ease-in-out fixed top-0 left-0 z-50 ${
            openSidebar ? "w-full" : "w-0"
          }`}
          initial={{ x: "-100%" }} // Sidebar starts off-screen from the left
          animate={{ x: openSidebar ? 0 : "-100%" }} // Slide in from left and out to left
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
        </motion.div> */}

        {/* Main content */}
        <div
          className={`flex h-screen transition-all duration-300 ease-in-out ${
            open ? "w-full md:w-[87%]" : "w-full md:w-[65%]"
          }`}
        >
          <Center />
        </div>

        {/* Playlist with Framer Motion animation for mobile view */}
        <div className="w-[27%] hidden md:block">
          <Playlist />
        </div>
        <motion.div
          className={`md:hidden transition-all duration-300 ease-in-out fixed top-0 right-0 z-50 h-full ${
            openPlaylist
              ? "w-full"
              : "w-0"
          }`}
          initial={{ x: "100%" }} // Playlist starts off-screen in mobile view
          animate={{ x: openPlaylist ? 0 : "100%" }} // Slide in and out based on `openPlaylist`
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="h-full w-full">
            <Playlist />
          </div>
        </motion.div>
      </div>
      <div className=" md:hidden absolute bottom-0 left-0 w-full border-none h-[9vh] overflow-hidden p-3">
        <MobilePlayer />
      </div>

      {/* Player component */}
      <div className="hidden md:block">
        <Player />
      </div>
    </div>
  );
};

export default Dashboard;
