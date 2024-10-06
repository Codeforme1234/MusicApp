import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import { notification, profile, downarrow, right } from "@/public";
import createMusicAPI from "../API/FetchMusic";
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom";
import { reverseArray } from "../Utils/ReverseArr";
import { CollapsedPlaylist } from "../state/Collapse";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { selectedSongAtom } from "../state/SelectedSong";

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
  const [collapsed, setCollapsed] = useRecoilState(CollapsedPlaylist);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useRecoilState(selectedSongAtom);

  const handlePlaylistsFetched = useCallback((fetchedPlaylists: Playlist[]) => {
    setPlaylists(fetchedPlaylists);
    setIsLoading(false);
  }, []);

  const handleSongsFetched = useCallback((fetchedSongs: Song[]) => {
    setSongs(fetchedSongs);
  }, []);

  const { fetchPlaylists, fetchSongs } = createMusicAPI({
    onPlaylistsFetched: handlePlaylistsFetched,
    onSongsFetched: handleSongsFetched,
    type: "popular",
    page: 1,
    count: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchPlaylists(), fetchSongs()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  function handleCollapsedClick() {
    setCollapsed(!collapsed);
  }
  const profileURL =
    "https://media.licdn.com/dms/image/v2/D5603AQGf0VI5kjmT6g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719045170102?e=1730937600&v=beta&t=7i_mVXFx4nWrtnO-_zJKCMSkSKYKgcg4AlWQvK-oiJk";
  const reversedPlaylist = reverseArray(selectedSongs.playlist);

  const handleSongSelect = useCallback(
    (song: Song) => {
      setSelectedSong(song);
      setSelectedSongs((prevState) => ({
        ...prevState,
        currentSong: song,
        playlist: [...prevState.playlist, song],
      }));
    },
    [setSelectedSong, setSelectedSongs]
  );

  if (isLoading) {
    return <PlaylistSkeleton />;
  }

  return (
    <div className="bg-[#0a0a0a] h-full w-full pt-8 px-6  overflow-hidden flex flex-col">
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
          </div>
        </div>
      </div>
      <div className="flex-grow no-scrollbar overflow-y-auto">
        <div className="flex justify-between  items-end mt-4">
          <h1 className="text-white font-semibold text-xl md:text-sm">
            Recently Played
          </h1>
          <button className="text-gray-400 text-sm font-semibold">
            See all
          </button>
        </div>
        <div className="mb-4 max-h-[35%] overflow-auto no-scrollbar">
          <div className="mt-2">
            <div className="flex flex-col text-white">
              {reversedPlaylist.map((song: Song, index: number) => (
                <MusicCard
                  key={index}
                  image={song.image}
                  title={song.title}
                  artist={song.artist}
                  timeAgo="Just now"
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
        <div className="flex justify-between mb-2 items-end mt-4">
          <h1 className="text-white text-sm font-semibold">My Playlist</h1>
          <button className="text-gray-400 text-sm font-semibold">
            See all
          </button>
        </div>
        <div className="mb-4 max-h-[35%] overflow-y-auto no-scrollbar">
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
        <div className="bg-white text-black font-semibold text-sm text-center p-3 rounded-md">
          Create new Playlist
        </div>
      </div>
    </div>
  );
};

const PlaylistSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="bg-[#0a0a0a] h-full w-full py-8 px-6 pb-10 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="flex justify-center items-center space-x-3">
            <Skeleton circle width={40} height={40} />
            <Skeleton width={80} height={24} />
          </div>
          <div className="flex gap-2">
            <Skeleton width={24} height={24} />
            <Skeleton width={24} height={24} />
            <Skeleton width={24} height={24} className="lg:hidden" />
          </div>
        </div>
        <div className="flex-grow no-scrollbar overflow-y-auto">
          {["Recently Played", "My Playlist"].map((section, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-end mt-4">
                <Skeleton width={160} height={32} />
                <Skeleton width={64} height={24} />
              </div>
              <div className="mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 mb-4">
                    <Skeleton width={48} height={48} />
                    <div className="flex-1">
                      <Skeleton width="75%" height={20} className="mb-2" />
                      <Skeleton width="50%" height={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Playlist;
