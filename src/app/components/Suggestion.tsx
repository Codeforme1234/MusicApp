"use client";
import React, { useState } from "react";
import { MusicCard, PlaylistCard } from "../components";
import useMusicAPI from "../API/FetchMusic";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";
import { Song, Playlist } from "../Utils/interfaces";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SuggestionProps {
  searchQuery: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ searchQuery }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);
  const [songData, setSongData] = useRecoilState(songState);

  const handleMusicCardClick = (song: Song) => {
    setSongData((prevState) => {
      const updatedPlaylist = prevState.currentSong
        ? [...prevState.playlist, prevState.currentSong]
        : prevState.playlist;

      return {
        ...prevState,
        currentSong: song,
        playlist: updatedPlaylist,
      };
    });
  };

  const handlePlaylistClick = (playlistId: number) => {
    setSelectedPlaylist(playlistId);
  };

  const { loading } = useMusicAPI({
    onPlaylistsFetched: setPlaylists,
    onSongsFetched: setSongs,
    selectedPlaylist: playlists.find((p) => p.id === selectedPlaylist) || null,
  });

  const filteredList = songs.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const songsToShow = showAllSongs ? filteredList : filteredList.slice(0, 6);
  const playlistsToShow = showAllPlaylists ? playlists : playlists.slice(0, 6);

  const renderSkeletonLoader = () => (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <>
        <div className="flex justify-between items-end mb-4">
          <Skeleton width={150} height={24} />
          <Skeleton width={50} height={16} />
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Skeleton width={160} height={160} />
              <Skeleton width={140} height={20} className="mt-2" />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-end mt-8 mb-4">
          <Skeleton width={180} height={24} />
          <Skeleton width={50} height={16} />
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex-shrink-0">
              <Skeleton width={160} height={160} />
              <Skeleton width={140} height={20} className="mt-2" />
            </div>
          ))}
        </div>
      </>
    </SkeletonTheme>
  );

  return (
    <div className="mt-6 pb-20">
      {loading ? (
        renderSkeletonLoader()
      ) : (
        <>
          {/* Playlists Section */}
          <div className="flex justify-between items-end">
            <h1 className="text-white text-2xl font-bold">Hello, Devesh</h1>
            <button
              className="text-gray-400 text-sm font-semibold"
              onClick={() => setShowAllPlaylists(!showAllPlaylists)}
            >
              {showAllPlaylists ? "Show less" : "See all"}
            </button>
          </div>

          <div className="text-white mt-4">
            <div className="overflow-x-auto flex gap-4 no-scrollbar">
              {playlistsToShow.map((playlist, index) => (
                <PlaylistCard key={index} title={playlist.name} />
              ))}
            </div>
          </div>

          {/* Songs Section */}
          <div>
            <div className="flex justify-between items-end mt-8">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button
                className="text-gray-400 text-sm font-semibold"
                onClick={() => setShowAllSongs(!showAllSongs)}
              >
                {showAllSongs ? "Show less" : "See all"}
              </button>
            </div>

            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
              {songsToShow.map((music, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 md:w-52 w-40"
                  onClick={() => handleMusicCardClick(music)}
                >
                  <MusicCard {...music} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end mt-8">
              <h1 className="text-white text-xl font-bold">
                Specials for you
              </h1>
              <button
                className="text-gray-400 text-sm font-semibold"
                onClick={() => setShowAllSongs(!showAllSongs)}
              >
                {showAllSongs ? "Show less" : "See all"}
              </button>
            </div>

            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
              {songsToShow.map((music, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 md:w-52 w-40"
                  onClick={() => handleMusicCardClick(music)}
                >
                  <MusicCard {...music} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Suggestion;
