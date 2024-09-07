"use client";
import { atom } from "recoil";

export const theme = atom({
  key: "theme",
  default: {
    theme: "",
  },
});
