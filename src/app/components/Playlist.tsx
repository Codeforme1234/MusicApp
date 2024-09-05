import React from "react";

interface PlaylistProp {
  // Define your props here
}

const PlayList: React.FC<PlaylistProp> = (props) => {
  return (
    <div>
      <div>Playlist</div>
      <div className="bg-[#0a0a0a]"></div>
    </div>
  );
};

export default PlayList;
