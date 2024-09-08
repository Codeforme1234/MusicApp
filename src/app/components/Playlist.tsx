import React, { useState } from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import { notification, profile, downarrow, right } from "@/public";
import useMusicAPI from "../API/FetchMusic";
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom";
import { reverseArray } from "../Utils/ReverseArr";

interface PlaylistProp {}

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
  const profileURL =  
    "https://media.licdn.com/dms/image/v2/D5603AQGf0VI5kjmT6g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719045170102?e=1730937600&v=beta&t=7i_mVXFx4nWrtnO-_zJKCMSkSKYKgcg4AlWQvK-oiJk";
  useMusicAPI({
    onPlaylistsFetched: setPlaylists,
    onSongsFetched: setSongs,
    type: "popular",
    page: 1,
    count: 5,
  });

  const reversedPlaylist = reverseArray(selectedSongs.playlist);

  return (
    <div className="bg-[#0a0a0a] h-screen w-full py-8 px-6 pb-10">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-3">
          <Image
            src={profileURL}
            width={30}
            height={30}
            className="h-10 w-10 rounded-full"
            alt="logo"
          />
          <div className="text-white font-medium text-lg">Devesh</div>
        </div>
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
          {reversedPlaylist.map((song: Song, index: number) => (
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
        <div className="flex flex-col text-white h-[260px] mt-2">
          {songs.map((song, index) => (
            <MusicCard
              key={index}
              image={song.image}
              title={song.title}
              artist={song.artist}
              timeAgo="."
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
