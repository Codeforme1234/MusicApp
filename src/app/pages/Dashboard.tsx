"use client";
import { useState } from "react";
import { Sidebar, Center, PlayList, CurrentSong, Player } from "../components";
import openmenu from '../../public/open-line-svgrepo-com.svg'
import Image from 'next/image'

interface DashProp {}

const Dashboard: React.FC<DashProp> = (props) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="flex relative h-screen flex-col justify-center items-center overflow-x-clip  w-screen">
      <div className="flex flex-row w-full">
      <div className={`flex flex-col bg-[#101011] ${open ? 'w-6': 'w-[20%]'}`}>
        <button  onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} onClick={handleSidebar}>
          <Image src={openmenu} className={`mt-10  ${open ? 'block': 'hidden'}`} alt='open'/>
        </button>
        {isHovered && (
          <div className="absolute top-12 z-50 left-8 bg-gray-700 text-white p-2 rounded shadow-md">
            Toggle Sidebar
          </div>
        )}
        <Sidebar  handleSidebar ={handleSidebar}/>
        <CurrentSong/>
      </div>
        </div>
        <div className={` flex ${open ? 'w-[80%]' : 'w-[60%]'}`}>
          <Center />
        </div>
        <div className="flex w-[20%]">
          <PlayList />
        </div>
        <div className="absolute bottom-0">
          <Player />
        </div>
      </div>
  );
};

export default Dashboard;
