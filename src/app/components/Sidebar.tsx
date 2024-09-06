'use client';
import React from "react";
import Image from "next/image";
import logo from "../../public/Untitled design (6).png";
import homeicon from "../../public/home-2-svgrepo-com.svg";
import download from "../../public/download-svgrepo-com.svg";
import collection from '../../public/collection-svgrepo-com.svg';
import discover from '../../public/discover-svgrepo-com.svg';
import fav from '../../public/heart-svgrepo-com.svg';
import local from "../../public/files-svgrepo-com.svg";
import left from "../../public/left-2-svgrepo-com.svg";
import SidebarItems from "./SidebarItems";

interface SidebarProps {
  handleSidebar: () => void;
  handleSidebarClick:()=>void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleSidebar, handleSidebarClick }) => {
  const featuresItems = [
    { icon: homeicon, label: "Home" },
    { icon: discover, label: "Discover" },
    { icon: collection, label: "Collections" },
  ];

  const libraryItems = [
    { icon: download, label: "Download" },
    { icon: fav, label: "Favourites" },
    { icon: local, label: "Local Files" },
  ];

  return (
    <div className={`bg-[#101011]  h-full py-8 px-6`}>
      <div className="flex justify-between items-center">
        <Image src={logo} className="h-10 w-10" alt="logo" />
        <button className="lg:block hidden" onClick={handleSidebar}>
          <Image src={left} alt="menu" />
        </button>
        <button className="lg:hidden block" onClick={handleSidebarClick}>
          <Image src={left} alt="menu" />
        </button>
      </div>
      <SidebarItems title="Features" items={featuresItems} />
      <SidebarItems title="Library" items={libraryItems} />
    </div>
  );
};

export default Sidebar;
