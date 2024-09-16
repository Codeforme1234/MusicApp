"use client";
import React, { useState } from "react";
import { MusicCard, PlaylistCard } from "../components";
import useMusicAPI from "../API/FetchMusic";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";
import { Song, Playlist } from "../Utils/interfaces";
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

  return (
    <div className="mt-6 pb-20">
      {/* Loading state */}
      {loading ? (
        <div className="text-white">Loading...</div>
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
