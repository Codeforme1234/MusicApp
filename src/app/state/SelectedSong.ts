import { atom } from 'recoil';
import { Song } from '../Utils/interfaces';

export const selectedSongAtom = atom<Song | null>({
  key: 'selectedSong',
  default: null,
}); 