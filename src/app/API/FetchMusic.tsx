import { useEffect, useState } from 'react';

// Define the structure for the song data
interface Song {
  title: string;
  artist: string;
  image: string;
}

// Props for the APIComponent
interface APIComponentProps {
  onSongsFetched: (songs: Song[]) => void;
}

const APIComponent: React.FC<APIComponentProps> = ({ onSongsFetched }) => {
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch songs from the API
  const fetchSongs = async () => {
    try {
      const response = await fetch(`https://api-v2.hearthis.at/feed/?page=1&count=10`);
      const data = await response.json();
      const fetchedSongs = data.map((song: any) => ({
        title: song.title,
        artist: song.user.username,
        image: song.artwork_url, // Make sure to handle image URL correctly
        url:song.stream_url,
      }));
      onSongsFetched(fetchedSongs); // Pass the songs to the parent component
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return null; // No UI, just fetching and passing data
};

export default APIComponent;
