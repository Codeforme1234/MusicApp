import React from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { songState } from '../state/SongAtom';

interface Song {
  title: string;
  artist: string;
  image: string;
  url: string;
}

const CurrentSong = () => {
  const songData = useRecoilValue(songState);
  const currentSong = songData.currentSong;

  return (
    <div className='w-full mb-[7rem] p-2 flex'>
      {currentSong ? (
        <Image src={currentSong.image} width={240} height={240} alt="current song" />
      ) : (
        <p>No song selected</p> 
      )}
    </div>
  );
};

export default CurrentSong;
