"use client";
import { atom } from "recoil";

export const CollapsedPlaylist = atom<boolean>({
  key: "CollapsedPlaylist",
  default: false,
});

export const CollapsedSidebar = atom<boolean>({
  key: "CollapsedSidebar",
  default: false,
});
