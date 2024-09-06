import React from "react";
import { Nav, Banner, Suggestion } from "./index";

interface CenterProp {
    handlePlaylistClick: () => void;
    handleSidebarClick:() => void;
  }

const Center: React.FC<CenterProp> = ({ handlePlaylistClick, handleSidebarClick }) => {
  return (
    <div className='flex flex-col w-full bg-[#18191b] px-4 md:px-6'>
        <Nav handleSidebarClick={handleSidebarClick} handlePlaylistClick={handlePlaylistClick}/>
      <div className="overflow-scroll no-scrollbar overflow-x-hidden">
      <div className='h-[80%]'>
        <Banner />
        <Suggestion />
      </div>
    </div>
    </div>
  );
};

export default Center;
