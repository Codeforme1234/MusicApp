"use client";
import React, { useState } from "react";
import { MusicCard, PlaylistCard } from "../components";
import APIComponent from "../API/FetchMusic";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";

interface SuggestionProps {
  searchQuery: string;
  handlePlay: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ searchQuery, handlePlay }) => {
  const [songs, setSongs] = useState<any[]>([]); 
  const [playlists, setPlaylists] = useState<any[]>([]); 
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null); 
  const [showAllSongs, setShowAllSongs] = useState(false); 
  const [showAllPlaylists, setShowAllPlaylists] = useState(false); 
  const [songData, setSongData] = useRecoilState(songState); 

  const handleSongsFetched = (fetchedSongs: any[]) => {
    setSongs(fetchedSongs);
  };

  const handlePlaylistsFetched = (fetchedPlaylists: any[]) => {
    setPlaylists(fetchedPlaylists);
  };

  const handleMusicCardClick = (song: any) => {
    setSongData(prevState => {
      const updatedPlaylist = prevState.currentSong
        ? [...prevState.playlist, prevState.currentSong]
        : prevState.playlist;

      return {
        ...prevState,
        currentSong: song, 
        playlist: updatedPlaylist, 
      };
    });
    console.log("Selected song:", song); 
  };

  const handlePlaylistClick = (playlistId: number) => {
    setSelectedPlaylist(playlistId); 
  };
  const filteredList = songs.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const songsToShow = showAllSongs ? filteredList : filteredList.slice(0, 6);

  const playlistsToShow = showAllPlaylists ? playlists : playlists.slice(0, 6);

  return (
    <div className="mt-6 pb-20">
      <APIComponent
        onSongsFetched={handleSongsFetched}
        onPlaylistsFetched={handlePlaylistsFetched}
      />

      <div className="">
        <div>
          <div className="flex justify-between items-end">
            <h1 className="text-white text-2xl font-bold">Hello, Woilon</h1>
            <button
              className="text-gray-400 text-sm font-semibold"
              onClick={() => setShowAllPlaylists(!showAllPlaylists)}
            >
              {showAllPlaylists ? "Show less" : "See all"}
            </button>
          </div>

          <div className="text-white mt-4">
            <div className="overflow-x-auto space-x-4 flex gap-4 no-scrollbar">
              {playlistsToShow.map((playlist, index) => (
                <button
                  key={index}
                  onClick={() => handlePlaylistClick(playlist.id)}
                >
                  <PlaylistCard title={playlist.name} />
                </button>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
