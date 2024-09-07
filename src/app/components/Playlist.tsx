import React, { useState } from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import { shivers, right, downarrow, notification, profile } from "@/public";
import useMusicAPI from "../API/FetchMusic"; // Import the API hook
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom";

interface PlaylistProp {
  handlePlaylistClick: () => void;
  handlePlay: () => void;
}

interface Playlist {
  id: number;
  name: string;
}

interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

const Playlist: React.FC<PlaylistProp> = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useRecoilState(songState);

  useMusicAPI({
    onPlaylistsFetched: setPlaylists,
    onSongsFetched: setSongs, 
    type: "popular", 
    page: 1,
    count: 5,
  });

  return (
    <div className="bg-[#0a0a0a] h-screen w-full py-8 px-6 pb-10">
      <div className="flex justify-between items-center">
        <Image src={profile} className="h-10 w-10 rounded-full" alt="logo" />
        <div>
          <div className="flex gap-2">
            <Image src={notification} alt="notification" />
            <Image src={downarrow} alt="arrow" />
            <button className="lg:hidden block">
              <Image src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <h1 className="text-white text-xl font-bold">Recently Played</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>

      <div className="overflow-scroll no-scrollbar overflow-x-hidden mt-2">
        <div className="flex flex-col text-white h-[200px]">
        {selectedSongs.playlist.map((song, index) => (
            <MusicCard
              key={index}
              image={song.image}
              title={song.title}
              artist={song.artist}
              timeAgo="Just now"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <h1 className="text-white text-xl font-bold">My Playlist</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>

      <div className="overflow-scroll no-scrollbar overflow-x-hidden text-white">
        <div className="flex flex-col text-white h-[200px] mt-2">
          {songs.map((song, index) => (
            <MusicCard
              key={index}
              image={song.image}
              title={song.title}
              artist={song.artist}
              timeAgo="Just now"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
