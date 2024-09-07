"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { songState } from "../state/SongAtom";
import { SongState } from "./interfaces";

const SongStateManager = () => {
  const [currentSongState, setCurrentSongState] = useRecoilState(songState);
  const [isRestored, setIsRestored] = useState(false); 

  useEffect(() => {
    const storedSongState = sessionStorage.getItem("songState");

    if (storedSongState) {
      setCurrentSongState(JSON.parse(storedSongState) as SongState);
    }

    setIsRestored(true);
  }, [setCurrentSongState]);

  useEffect(() => {
    if (isRestored) {
      sessionStorage.setItem("songState", JSON.stringify(currentSongState));
    }
  }, [currentSongState, isRestored]);

  if (!isRestored) return null; 

  return null; 
};

export default SongStateManager;
