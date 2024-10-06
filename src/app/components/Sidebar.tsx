import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  logo,
  homeicon,
  download,
  collection,
  left,
  discover,
  fav,
  local,
} from "@/public";
import SidebarItems from "./SidebarItems";
import { CollapsedSidebar } from "../state/Collapse";
import { useRecoilState } from "recoil";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CurrentSong from "./CurrentSong";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useRecoilState(CollapsedSidebar);
  const handleSidebarClick = () => {
    setCollapsed(!collapsed);
  };
  const featuresItems = [
    { icon: homeicon, label: "Home" },
    { icon: discover, label: "Discover" },
    { icon: collection, label: "Collections" },
  ];
  const [isLoading, setIsLoading] = useState(true);

  const libraryItems = [
    { icon: download, label: "Download" },
    { icon: fav, label: "Favourites" },
    { icon: local, label: "Local Files" },
  ];
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 700);
  }, []);

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="bg-[#101011] h-full py-8 px-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={24} height={24} />
          </div>
          {["Features", "Library"].map((section, index) => (
            <div key={index} className="mb-6">
              <Skeleton width={80} height={20} className="mb-4" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center mb-4">
                  <Skeleton circle width={24} height={24} className="mr-3" />
                  <Skeleton width={100} height={16} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className={`bg-[#101011] h-full py-8 px-6 overflow-y-auto`}>
      <div className="flex justify-between items-center">
        <Image src={logo} className="h-10 w-10" alt="logo" />

        <button className="lg:hidden block" onClick={handleSidebarClick}>
          <Image src={left} alt="menu" />
        </button>
      </div>
      <SidebarItems title="Features" items={featuresItems} />
      <SidebarItems title="Library" items={libraryItems} />
      <div className=" hidden lg:block absolute left-0 bottom-0">
        <CurrentSong />
      </div>
    </div>
  );
};

export default Sidebar;
