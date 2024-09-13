import React from "react";
import Image from "next/image";
import { logo, homeicon, download, collection,left, discover, fav, local } from "@/public";
import SidebarItems from "./SidebarItems";
import { CollapsedSidebar } from "../state/Collapse";
import { useRecoilState } from "recoil";


interface SidebarProps {
}

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

  const libraryItems = [
    { icon: download, label: "Download" },
    { icon: fav, label: "Favourites" },
    { icon: local, label: "Local Files" },
  ];

  return (
    <div className={`bg-[#101011]  h-full py-8 px-6`}>
      <div className="flex justify-between items-center">
        <Image src={logo} className="h-10 w-10" alt="logo" />
        
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
