import { atom } from "recoil";

export const selectedPlaylistAtom = atom<{ id: number | null; image: string | null }>({
  key: "selectedPlaylistAtom",
  default: { id: null, image: null },
});

// Remove the console.log statement
