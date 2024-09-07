import React from 'react'

import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { songState } from '../state/SongAtom'
const CurrentSong = () => {
  const currentsong = useRecoilState(songState);
  return (
    <div className=' w-full mb-[7rem] p-2 rounded-2xl flex'>
        <Image src={currentsong[0].image} width={240} height={240} alt="currentsong"/>
    </div>
  )
}

export default CurrentSong