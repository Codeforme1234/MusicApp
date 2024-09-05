import React from "react";
import { Nav, Banner, Suggestion } from "./index";

interface CenterProp {
  // Define your props here
}

const Center: React.FC<CenterProp> = (props) => {
  return (
    <div className="flex flex-col w-full bg-[#18191b] px-6">
      <Nav />
      <div className="overflow-scroll no-scrollbar overflow-x-hidden">
        <div className="h-[665px]"></div>
        <Banner />
        <Suggestion />
      </div>
    </div>
  );
};

export default Center;
