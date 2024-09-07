import React from "react";
import Image from "next/image";

interface SidebarItemsProps {
  title: string;
  items: { icon: string; label: string }[];
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ title, items }) => {
  return (
    <div className="mt-6">
      <h4 className="uppercase text-gray-400 font-semibold text-sm py-1">
        {title}
      </h4>
      <div className="flex flex-col mt-2 gap-2">
        {items.map((item, index) => (
          <div key={index} className="group w-full gap-4 flex items-center">
            <Image
              src={item.icon}
              className="group-hover:fill-[#2563eb]"
              alt="icon"
            />
            <h4 className="text-gray-300 font-medium text-lg group-hover:text-blue-600">
              {item.label}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarItems;
