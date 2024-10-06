"use client";
import { atom } from "recoil";
import { Song, SongState } from "../Utils/interfaces";

export const songState = atom<SongState>({
  key: "songState",
  default: {
    currentSong: null,
    playlist: [],
  },
});

