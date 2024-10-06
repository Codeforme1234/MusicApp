"use client";
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  PlayList,
  Player,
  Center,
  CurrentSong,
  MobilePlayer,
} from "../components";
import SongStateManager from "../Utils/LocalStorage";
import Playlist from "../components/Playlist";
import { CollapsedPlaylist, CollapsedSidebar } from "../state/Collapse";
import { useRecoilState } from "recoil";
import PlayListModal from "../components/PlayListModal";
import { selectedPlaylistAtom } from "../state/PlaylistAtom";

const Dashboard = () => {
  const [openPlaylist, setOpenPlaylist] = useRecoilState(CollapsedPlaylist);
  const [openSidebar, setOpenSidebar] = useRecoilState(CollapsedSidebar);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);

  useEffect(() => {
    if (selectedPlaylist.id !== null) {
      setOpenPlaylist(true);
    } else {
      setOpenPlaylist(false);
    }
  }, [selectedPlaylist, setOpenPlaylist]);

  const handleCloseModal = () => {
    setSelectedPlaylist({ id: null, title: null, image: null });
    setOpenPlaylist(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden ">
      <SongStateManager />
      <div className="flex flex-row relative w-full h-full overflow-hidden">
        <div
          className={`w-[80%] lg:w-[20%] fixed lg:relative h-full z-20 transition-transform duration-300 ease-in-out ${
            openSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar />
        </div>
        <div className="flex overflow-hidden">
          <Center />
        </div>
        <div
          className={`w-[80%] lg:w-[27%] fixed lg:relative right-0 h-full z-20 transition-transform duration-300 ease-in-out ${
            openPlaylist ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          {selectedPlaylist.id !== null ? (
            <PlayListModal onClose={handleCloseModal} />
          ) : (
            <Playlist />
          )}
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full border-none h-[9vh] overflow-hidden p-3 z-30">
        <MobilePlayer />
      </div>
      <div className="hidden md:block h-[12vh]">
        <Player />
      </div>
    </div>
  );
};

export default Dashboard;
