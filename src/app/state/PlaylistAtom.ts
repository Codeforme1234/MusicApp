import { atom } from "recoil";

export const selectedPlaylistAtom = atom<number | null>({
  key: "selectedPlaylistAtom",
  default: null,
});

console.log(selectedPlaylistAtom);
