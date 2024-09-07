"use client";
import { atom } from "recoil";

export const songState = atom({
  key: "songState",
  default: {
    currentSong: {
      title: "jarri",
      image: "https://img.hearthis.at/c/r/o/_/uploads/7533692/image_track/11354105/w500_q70_m1725061521----cropped_1725061497485.jpg",
      artist: "Nu Soul Mod Breaks",
      url: "https://hearthis.app/jarri-lg/01-rec-2024-08-30/listen/?s=ET0tS",
    },
    playlist: [],
  },
});
