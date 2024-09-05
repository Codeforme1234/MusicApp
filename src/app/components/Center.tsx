import React from "react";
import { Nav, Banner, Suggestion } from "./index";

interface CenterProp {
  // Define your props here
}

const Center: React.FC<CenterProp> = (props) => {
  return (
    <div className="flex flex-col">
      <Nav />
      <Banner />
      <Suggestion />
    </div>
  );
};

export default Center;
