"use client";
import React, { useState } from "react";
import { MusicCard, PlaylistCard } from "../components";
import APIComponent from "../API/FetchMusic";
import { songState } from "../state/SongAtom";
import { useSetRecoilState } from "recoil";

interface SuggestionProps {
  searchQuery: string;
  handlePlay: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ searchQuery, handlePlay }) => {
  const [songs, setSongs] = useState<any[]>([]); // State to store fetched songs
  const [playlists, setPlaylists] = useState<any[]>([]); // State to store fetched playlists
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null); // Selected playlist state
  const [showAllSongs, setShowAllSongs] = useState(false); // Control whether to show all songs or not
  const [showAllPlaylists, setShowAllPlaylists] = useState(false); // Control whether to show all playlists or not
  const setSelectedSong = useSetRecoilState(songState); // Recoil setter for selected song

  // Callback to handle songs fetched from API
  const handleSongsFetched = (fetchedSongs: any[]) => {
    setSongs(fetchedSongs);
  };

  // Callback to handle playlists fetched from API
  const handlePlaylistsFetched = (fetchedPlaylists: any[]) => {
    setPlaylists(fetchedPlaylists);
  };

  const handleMusicCardClick = (song: any) => {
    setSelectedSong(song); // Update Recoil atom with clicked song details
    console.log("Selected song:", song); // Log the selected song
  };

  const handlePlaylistClick = (playlistId: number) => {
    setSelectedPlaylist(playlistId); // Set selected playlist and trigger song fetching
  };

  // Filtered song list based on search query
  const filteredList = songs.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine whether to show all songs or limit to 6
  const songsToShow = showAllSongs ? filteredList : filteredList.slice(0, 6);

  // Limit playlists to 6 or show all
  const playlistsToShow = showAllPlaylists ? playlists : playlists.slice(0, 6);

  return (
    <div className="mt-6 pb-20">
      {/* Fetch playlists and songs */}
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
              onClick={() => setShowAllPlaylists(!showAllPlaylists)} // Toggle between showing all playlists and limiting to 6
            >
              {showAllPlaylists ? "Show less" : "See all"}
            </button>
          </div>

          {/* Playlist Section */}
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

          {/* Songs Section */}
          <div>
            <div className="flex justify-between items-end mt-8">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button
                className="text-gray-400 text-sm font-semibold"
                onClick={() => setShowAllSongs(!showAllSongs)} // Toggle between showing all songs and limiting to 6
              >
                {showAllSongs ? "Show less" : "See all"}
              </button>
            </div>

            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
              {songsToShow.map((music, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 md:w-52 w-40"
                  onClick={() => handleMusicCardClick(music)} // Handle click
                >
                  <MusicCard {...music} handlePlay={handlePlay} />
                </div>
              ))}
            </div>
          </div>

          {/* Additional UI sections */}
          <div>
            <div className="flex justify-between items-end ">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button
                className="text-gray-400 text-sm font-semibold"
                onClick={() => setShowAllSongs(!showAllSongs)} // Toggle between showing all songs and limiting to 6
              >
                {showAllSongs ? "Show less" : "See all"}
              </button>
            </div>
            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
              {songsToShow.map((music, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 md:w-52 w-40"
                  onClick={() => handleMusicCardClick(music)} // Handle click
                >
                  <MusicCard {...music} handlePlay={handlePlay} />
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
