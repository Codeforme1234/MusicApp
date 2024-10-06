"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MusicCard, PlaylistCard } from "../components";
import createMusicAPI from "../API/FetchMusic";
import { fetchPixabayImageURL } from "../API/ImageApi";
import { songState } from "../state/SongAtom";
import { useRecoilState } from "recoil";
import { Song, Playlist } from "../Utils/interfaces";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { selectedPlaylistAtom } from "../state/PlaylistAtom";
import { selectedSongAtom } from "../state/SelectedSong";
import { shuffleArray } from "../Utils/ShuffleArray";
import { playbackState } from "../state/PlayAndPause";

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
  const [shuffledSongs, setShuffledSongs] = useState<Song[]>([]);
  const [newReleases, setNewReleases] = useState<Song[]>([]);
  const [recommended, setRecommended] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<Song[]>([]);
  const [trending, setTrending] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useRecoilState(playbackState);
  const [isApiLoading, setIsApiLoading] = useState(true);

  const handleMusicCardClick = (song: Song) => {
    setSelectedSong(song);
    setIsPlaying(true); // Set playback state to true when a song is clicked
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
    const totalSongs = fetchedSongs.length;
    const songsPerCategory = Math.floor(totalSongs / 4);

    setSongs(fetchedSongs);
    setNewReleases(shuffleArray(fetchedSongs.slice(0, songsPerCategory)));
    setRecommended(shuffleArray(fetchedSongs.slice(songsPerCategory, songsPerCategory * 2)));
    setFavorites(shuffleArray(fetchedSongs.slice(songsPerCategory * 2, songsPerCategory * 3)));
    setTrending(shuffleArray(fetchedSongs.slice(songsPerCategory * 3)));
  }, []);

  const { fetchPlaylists, fetchSongs } = createMusicAPI({
    onPlaylistsFetched: handlePlaylistsFetched,
    onSongsFetched: handleSongsFetched,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsApiLoading(true);
      try {
        const [playlistsData, songsData] = await Promise.all([
          fetchPlaylists(),
          fetchSongs()
        ]);
        // Handle the fetched data here if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsApiLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (!isApiLoading && songs.length > 0 && playlists.length > 0) {
      setIsLoading(false);
    }
  }, [isApiLoading, songs, playlists]);

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

  const renderSongRow = (title: string, songsToRender: Song[]) => (
    <div>
      <div className="flex justify-between items-end mt-8">
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <button
          className="text-gray-400 text-sm font-semibold"
          onClick={() => setShowAllSongs(!showAllSongs)}
        >
          {showAllSongs ? "Show less" : "See all"}
        </button>
      </div>

      <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
        {songsToRender.slice(0, showAllSongs ? songsToRender.length : 5).map((song, index) => (
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
  );

  const playlistsToShow = playlists.slice(0, 5); // Adjust the number as needed

  return (
    <div className="mt-6 h-full pb-20">
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
            <div key={index} className="flex-shrink-0">
              <PlaylistCard 
                id={playlist.id}
                title={playlist.name} 
                isSelected={selectedPlaylist?.id === playlist.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Songs Sections */}
      {renderSongRow("New releases for you", newReleases)}
      {renderSongRow("Recommended for you", recommended)}
      {renderSongRow("Your favorites", favorites)}
      {renderSongRow("Trending now", trending)}
    </div>
  );
};

export default Suggestion;
