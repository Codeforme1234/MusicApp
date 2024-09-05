import React from "react";
import { Sidebar, Center, PlayList, CurrentSong, Player } from "../components";

interface DashProp {}

const Dashboard: React.FC<DashProp> = (props) => {
  return (
    <div className="flex relative h-screen flex-col justify-center items-center w-screen">
      <div className="flex flex-row w-full">
        <div className="flex w-[20%] flex-col pb-10">
          <Sidebar />
          <CurrentSong />
        </div>
        <div className="w-[60%] flex">
          <Center />
        </div>
        <div className="flex w-[20%]">
          <PlayList />
        </div>
        <div className="absolute bottom-0">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
