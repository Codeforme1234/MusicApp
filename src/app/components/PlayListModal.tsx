import React, { useState, useEffect } from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import { notification, profile, downarrow, right } from "@/public";
import useMusicAPI from "../API/FetchMusic";
import { useRecoilState, useRecoilValue } from "recoil";
import { songState } from "../state/SongAtom";
import { CollapsedPlaylist } from "../state/Collapse";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Song } from "../Utils/interfaces";
import { selectedPlaylistAtom } from "../state/PlaylistAtom";
import { Playlist } from "../Utils/interfaces";
import { selectedSongAtom } from "../state/SelectedSong";

interface PlayListModalProps {
  onClose: () => void;
}

const PlayListModal: React.FC<PlayListModalProps> = ({ onClose }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useRecoilState(songState);
  const [collapsed, setCollapsed] = useRecoilState(CollapsedPlaylist);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] =
    useRecoilState(selectedPlaylistAtom);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(
    null
  );
  const [selectedSong, setSelectedSong] = useRecoilState(selectedSongAtom);

  const PlaylistSkeleton = () => (
    <div className="mt-4">
      <Skeleton height={200} width="100%" className="mb-4" />
      <Skeleton width={150} height={24} className="mb-4" />
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center mb-4">
          <Skeleton width={50} height={50} className="mr-4" />
          <div>
            <Skeleton width={150} height={20} className="mb-2" />
            <Skeleton width={100} height={16} />
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    setIsLoading(true);
  }, [selectedPlaylist]);

  useMusicAPI({
    onPlaylistsFetched: () => {},
    onSongsFetched: (fetchedSongs) => {
      setSongs(fetchedSongs);
      setIsLoading(false);
    },
    selectedPlaylist:
      selectedPlaylist.id !== null
        ? { id: selectedPlaylist.id, name: `Playlist ${selectedPlaylist.id}` }
        : null,
    count: 10,
  });

  function handleCollapsedClick() {
    setCollapsed(!collapsed);
  }

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setSelectedSongs((prevState) => ({
      ...prevState,
      currentSong: song,
      playlist: [...prevState.playlist, song],
    }));
  };

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] h-full w-full pt-8 px-6 overflow-hidden flex flex-col">
        <PlaylistSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] h-full w-full pt-8 px-6 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-2 mb-2" onClick={onClose}>
            <button className=" block" onClick={handleCollapsedClick}>
              <Image
                className="rotate-180"
                src={right}
                alt="right"
                height={20}
                width={20}
              />
            </button>
            <button className="text-white">Close</button>
          </div>
        </div>
      </div>
      <div className="flex-grow no-scrollbar overflow-y-auto">
        {selectedPlaylist.image && (
          <div className="mt-4">
            <Image
              src={selectedPlaylist.image}
              alt="Playlist cover"
              width={200}
              height={200}
              className="rounded-lg w-full"
            />
          </div>
        )}
        <div className="flex justify-between items-end mt-4">
          <h1 className="text-white uppercase font-semibold text-xl md:text-sm">
            {selectedPlaylist.id !== null
              ? selectedPlaylist.title || "Bass"
              : "No playlist selected"}
          </h1>
        </div>
        <div className="mb-4 ">
          <div className="mt-2">
            <div className="flex flex-col text-white">
              {songs.map((song, index) => (
                <MusicCard
                  key={index}
                  image={song.image}
                  title={song.title}
                  artist={song.artist}
                  timeAgo="."
                  isSelected={
                    selectedSong?.title === song.title &&
                    selectedSong?.artist === song.artist
                  }
                  onSelect={() => handleSongSelect(song)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayListModal;
