import { title } from "process";
import { atom } from "recoil";

export const selectedPlaylistAtom = atom<{
  id: number | null;
  title: string | null;
  image: string | null;
}>({
  key: "selectedPlaylistAtom",
  default: { id: null, title: null, image: null },
});

// Remove the console.log statement
