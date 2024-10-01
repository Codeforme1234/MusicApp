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
    <div className=""> 
    <div className="flex flex-col h-[93vh] w-screen overflow-hidden">
      <SongStateManager />
      <div className="flex flex-row relative w-full h-full overflow-hidden">
        <div className="w-[20%] hidden md:block">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-grow overflow-hidden">
          <Center />
        </div>
        <div className="w-[27%] hidden md:block">
          <Playlist />
        </div>
      </div>
      <div className="md:hidden absolute bg-[#18191b] bottom-0 left-0 w-full border-none h-[9vh] overflow-hidden p-3">
        <MobilePlayer />
      </div>
      {/* Player component */}
      <div className="hidden md:block h-[10vh]">
        <Player />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
