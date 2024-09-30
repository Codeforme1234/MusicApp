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
  onPlaylistsFetched: (playlists: Playlist[]) => void; 
  onSongsFetched: (songs: Song[]) => void;
  selectedPlaylist?: Playlist | null; 
  type?: string; 
  page?: number; 
  count?: number; 
}

const useMusicAPI = ({
  onPlaylistsFetched,
  onSongsFetched,
  selectedPlaylist,
  type = "",
  page = 1,
  count = 5,
}: APIComponentProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`https://api-v2.hearthis.at/categories/`);
      const data = await response.json();
      const fetchedPlaylists = data.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.name,
      }));
      onPlaylistsFetched(fetchedPlaylists); 
    } catch (error) {
      console.error("Error fetching playlists:", error);
    } finally {
      setLoading(false);
    }
  };

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
      console.log(data);
      const fetchedSongs = data.map((song: any) => ({
        title: song.title,
        artist: song.user.username,
        image: song.artwork_url,
        url: song.stream_url,
      }));
      onSongsFetched(fetchedSongs); 
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists(); 
  }, []);

  useEffect(() => {
    fetchSongs(); 
  }, [selectedPlaylist, type, page, count]);

  return { loading };
};

export default useMusicAPI;
