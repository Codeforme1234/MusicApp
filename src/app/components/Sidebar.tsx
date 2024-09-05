import React from "react";
import Image from "next/image";
import logo from "../../public/Untitled design (6).png";
import menu from "../../public/menu-alt-02-svgrepo-com.svg";
import homeicon from "../../public/home-2-svgrepo-com.svg";

interface SideProp {
  // Define your props here
}

const Sidebar: React.FC<SideProp> = (props) => {
  return (
    <div className="bg-[#101011] h-full w-full py-8 px-6 pb-10 ">
      <div className="flex justify-between items-center">
        <Image src={logo} className="h-10 w-10" alt="logo" />
        <div>
          <Image src={menu} alt="menu" />
        </div>
      </div>
      <div className="mt-6">
        <div>
          <h4 className="uppercase text-gray-400 font-semibold text-xs py-1">
            Features
          </h4>
          <div className="flex flex-col gap-2">
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Home
              </h4>
            </div>
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Discover
              </h4>
            </div>
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Collections
              </h4>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="uppercase text-gray-400 font-semibold text-xs mt-2 my-2">
            Library
          </h4>
          <div className="flex flex-col gap-3 whitespace-nowrap">
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Download
              </h4>
            </div>
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Favourites
              </h4>
            </div>
            <div className="group w-full gap-4 flex items-center">
              <Image
                src={homeicon}
                className="group-hover:fill-[#2563eb]"
                alt="icon"
              />
              <h4 className=" text-gray-300 font-medium text-sm group-hover:text-blue-600">
                Local Files
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
