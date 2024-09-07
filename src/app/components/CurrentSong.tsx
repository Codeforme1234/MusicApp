import React from 'react'

import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { songState } from '../state/SongAtom'
const CurrentSong = () => {
  const songData = useRecoilValue(songState);
  const currentSong = songData.currentSong || {};
  
  return (
    <div className=' w-full mb-[7rem] p-2 flex'>
        <Image src={currentSong.image} width={240} height={240} alt="currentsong"/>
    </div>
  )
}

export default CurrentSong