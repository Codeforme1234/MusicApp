import { atom } from 'recoil';

export const playbackState = atom({
  key: 'playbackState',
  default: false,
});