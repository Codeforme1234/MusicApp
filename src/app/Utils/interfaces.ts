export interface Song {
  title: string;
  image: string;
  artist: string;
  url: string;
}

export interface Playlist {
  id: number;
  name: string;
}

export interface SongState {
  currentSong: Song | null;
  playlist: Song[];
}
