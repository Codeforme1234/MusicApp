"use client";
import { atom } from "recoil";

export const songState = atom({
  key: "songState",
  default: {
    title: "",
    artist: "",
    image: "",
    url: "",
  },
});
