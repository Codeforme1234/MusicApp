"use client";
import { atom } from "recoil";
import { Song, SongState } from "../Utils/interfaces";

export const songState = atom<SongState>({
  key: "songState",
  default: {
    currentSong: {
      artist: "Blues is the Truth",
      image:
        "https://img.hearthis.at/1/7/2/_/uploads/9657207/image_track/11416089/w500_q70_----1728073086145.jpg",
      title: "Blues is the Truth 724",
      url: "https://hearthis.app/ian-mchugh/blues-is-the-truth-724/listen/?s=FUc",
    },
    playlist: [],
  },
});
