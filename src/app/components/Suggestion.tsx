"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MusicCard, PlaylistCard } from "../components";
import useMusicAPI from "../API/FetchMusic";
import { fetchPixabayImageURL } from "../API/ImageApi";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";
import { Song, Playlist } from "../Utils/interfaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { selectedPlaylistAtom } from "../state/PlaylistAtom";
import { selectedSongAtom } from "../state/SelectedSong";

interface SuggestionProps {
  searchQuery: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ searchQuery }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [showAllPlaylists, setShowAllPlaylists] = useState(false);
  const [songData, setSongData] = useRecoilState(songState);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);
  const [selectedSong, setSelectedSong] = useRecoilState(selectedSongAtom);
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(null);

  const handleMusicCardClick = (song: Song) => {
    setSelectedSong(song);
    setSongData((prevState) => {
      // Check if the last song in the playlist is the same as the current song
      const lastSong = prevState.playlist[prevState.playlist.length - 1];
      const isSameAsPrevious = lastSong && 
        lastSong.title === song.title && 
        lastSong.artist === song.artist;

      // If it's the same, don't add it to the playlist
      if (isSameAsPrevious) {
        return {
          ...prevState,
          currentSong: song,
        };
      }

      // If it's different, add it to the playlist
      return {
        ...prevState,
        currentSong: song,
        playlist: prevState.currentSong
          ? [...prevState.playlist, prevState.currentSong]
          : prevState.playlist,
      };
    });
  };

  const fetchImageForPlaylist = useCallback(
    async (playlist: Playlist): Promise<Playlist> => {
      const imageUrl = await fetchPixabayImageURL(playlist.name);
      return { ...playlist, image: imageUrl || "" } as Playlist & {
        image: string;
      };
    },
    []
  );

  const handlePlaylistsFetched = useCallback(
    async (fetchedPlaylists: Playlist[]) => {
      // Remove the first two playlists
      const filteredPlaylists = fetchedPlaylists.slice(2);
      const playlistsWithImages = await Promise.all(
        filteredPlaylists.map(fetchImageForPlaylist)
      );
      setPlaylists(playlistsWithImages);
    },
    [fetchImageForPlaylist]
  );

  const handleSongsFetched = useCallback((fetchedSongs: Song[]) => {
    setSongs(fetchedSongs);
  }, []);

  const { loading: apiLoading } = useMusicAPI({
    onPlaylistsFetched: handlePlaylistsFetched,
    onSongsFetched: handleSongsFetched,
  });

  useEffect(() => {
    if (!apiLoading && songs.length > 0 && playlists.length > 0) {
      setIsLoading(false);
    }
  }, [apiLoading, songs, playlists]);

  const songsToShow = showAllSongs ? songs : songs.slice(0, 6);
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

  if (isLoading) {
    return <div className="mt-6 pb-20">{renderSkeletonLoader()}</div>;
  }

  return (
    <div className="mt-6 h-full pb-20">
      {/* Playlists Section */}
      <div className="flex justify-between items-end">
        <h1 className="text-white text-2xl font-bold">Your Playlists</h1>
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
            <div key={index}>
              <PlaylistCard 
                id={playlist.id}
                title={playlist.name} 
                isSelected={selectedPlaylist?.id === playlist.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Songs Section */}
      <div>
        <div className="flex justify-between items-end mt-8">
          <h1 className="text-white text-xl font-bold">New releases for you</h1>
          <button
            className="text-gray-400 text-sm font-semibold"
            onClick={() => setShowAllSongs(!showAllSongs)}
          >
            {showAllSongs ? "Show less" : "See all"}
          </button>
        </div>

        <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
          {songsToShow.map((song, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:w-52 w-40"
            >
              <MusicCard 
                {...song} 
                isSelected={selectedSong?.title === song.title && selectedSong?.artist === song.artist}
                onSelect={() => handleMusicCardClick(song)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
