import React, { useState, useEffect } from 'react';
import Image from "next/image";
import MusicCard from "./MusicCard";
import { notification, profile, downarrow, right } from "@/public";
import useMusicAPI from "../API/FetchMusic";
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom";
import { CollapsedPlaylist } from "../state/Collapse";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Song } from '../Utils/interfaces'; // Add this import

interface PlayListModalProps {
  playlist: {
    id: number;
    name: string;
  };
  onClose: () => void;
}

const PlayListModal: React.FC<PlayListModalProps> = ({ playlist, onClose }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSongs, setSelectedSongs] = useRecoilState(songState);
  const [collapsed, setCollapsed] = useRecoilState(CollapsedPlaylist);
  const [isLoading, setIsLoading] = useState(true);

  const profileURL =
    "https://media.licdn.com/dms/image/v2/D5603AQGf0VI5kjmT6g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719045170102?e=1730937600&v=beta&t=7i_mVXFx4nWrtnO-_zJKCMSkSKYKgcg4AlWQvK-oiJk";

  useMusicAPI({
    onPlaylistsFetched: () => {},
    onSongsFetched: (fetchedSongs) => {
      setSongs(fetchedSongs);
      setIsLoading(false);
    },
    selectedPlaylist: playlist,
    count: 20,
  });

  function handleCollapsedClick() {
    setCollapsed(!collapsed);
  }

  if (isLoading) {
    // return <PlaylistSkeleton />;
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#0a0a0a] h-full w-full pt-8 px-6 overflow-hidden flex flex-col">
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
            <button className="lg:hidden block" onClick={handleCollapsedClick}>
              <Image src={right} alt="right" />
            </button>
            <button onClick={onClose} className="text-white">Close</button>
          </div>
        </div>
      </div>
      <div className="flex-grow no-scrollbar overflow-y-auto">
        <div className="flex justify-between items-end mt-4">
          <h1 className="text-white font-semibold text-xl md:text-sm">
            {playlist.name}
          </h1>
        </div>
        <div className="mb-4 max-h-[90%] overflow-auto no-scrollbar">
          <div className="mt-2">
            <div className="flex flex-col text-white">
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
      </div>
    </div>
  );
};

// const PlaylistSkeleton: React.FC = () => {
//   // ... (keep the existing PlaylistSkeleton component)
// };

export default PlayListModal;
