import { useEffect, useState } from "react";

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

interface APIComponentProps {
  onPlaylistsFetched: (playlists: Playlist[]) => void; // Callback to send playlists to parent
  onSongsFetched: (songs: Song[]) => void; // Callback to send songs back to parent
  selectedPlaylist?: Playlist | null; // Selected playlist to fetch songs
  type?: string; // Type: "popular" or "new"
  page?: number; // Page number for pagination
  count?: number; // Number of items per page
}

const APIComponent: React.FC<APIComponentProps> = ({
  onPlaylistsFetched,
  onSongsFetched,
  selectedPlaylist,
  type = "", // Default empty, will fetch general feed
  page = 1,
  count = 5,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch playlists (Categories in this case)
  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`https://api-v2.hearthis.at/categories/`);
      const data = await response.json();
      const fetchedPlaylists = data.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
      }));
      console.log(fetchPlaylists);
      onPlaylistsFetched(fetchedPlaylists); // Pass playlists to parent
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch songs based on feed type (popular/new) or selected playlist
  const fetchSongs = async () => {
    setLoading(true);
    let url = `https://api-v2.hearthis.at/feed/?page=${page}&count=${count}`;
    if (type) {
      url = `https://api-v2.hearthis.at/feed/?type=${type}&page=${page}&count=${count}`;
    } else if (selectedPlaylist) {
      url = `https://api-v2.hearthis.at/categories/${selectedPlaylist.id}/?page=${page}&count=${count}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const fetchedSongs = data.map((song: any) => ({
        title: song.title,
        artist: song.user.username,
        image: song.artwork_url,
        url: song.stream_url,
      }));
      onSongsFetched(fetchedSongs); // Pass songs to parent component
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists(); // Fetch playlists (categories) on mount
  }, []);

  useEffect(() => {
    fetchSongs(); // Fetch songs when a type or playlist is selected
  }, [selectedPlaylist, type, page, count]);

  return null; // No UI
};

export default APIComponent;
