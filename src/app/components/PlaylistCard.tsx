import React from "react";

interface Props {
  title: string;
}

const PlaylistCard: React.FC<Props> = (props) => {
  return (
    <div className="flex-1 justify-center">
      <div className=" border h-[12rem] rounded-lg aspect-square"></div>
      <div className="text-sm mt-2 ">{props.title}</div>
    </div>
  );
};

export default PlaylistCard;
