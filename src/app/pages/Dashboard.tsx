import React from "react";
import { Sidebar, Center, PlayList, Player } from "../components";

interface DashProp {
  // Define your props here
}

const Dashboard: React.FC<DashProp> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-[60%] flex">
          <Center />
        </div>
        <PlayList />
      </div>
      <Player />
    </div>
  );
};

export default Dashboard;
