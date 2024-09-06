import React from 'react'
import currentsong from '../../public/1546.png'
import Image from 'next/image'
const CurrentSong = () => {
  return (
    <div className=' w-full  flex'>
        <Image src={currentsong} alt="currentsong"/>
    </div>
  )
}

export default CurrentSong