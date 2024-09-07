import React from "react";
import Image from "next/image";
import MusicCard from "./MusicCard";
import { shivers, right, downarrow, notification, profile } from "@/public";

interface PlaylistProp {
  handlePlaylistClick: () => void;
  handlePlay:() => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const Playlist: React.FC<PlaylistProp> = ({ handlePlaylistClick, handlePlay }) => {
  const recentlyPlayed = [
    {
      image:
        "https://atwoodmagazine.com/wp-content/uploads/2023/07/vampire-Olivia-Rodrigo-2023.jpg",
      title: "Vampire",
      artist: "Olivia Rodrigo",
      timeAgo: "2 min ago",
    },
    {
      image: shivers,
      title: "Shivers",
      artist: "Ed Sheeran",
      timeAgo: "3 min ago",
    },
    {
      image:
        "https://thatgrapejuice.net/wp-content/uploads/2021/04/lil-nas-x-montero-call-me-by-your-name-montero-thatgrapejuice.jpg",
      title: "Montero",
      artist: "Lil Nas X",
      timeAgo: "4 min ago",
    },
    {
      image: "https://www.dafont.com/forum/attach/orig/1/0/1058970.jpg",
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      timeAgo: "5 min ago",
    },
    {
      image:
        "https://blowyaspeakers.com/wp-content/uploads/2018/08/mello2-1024x683.jpg",
      title: "Happier",
      artist: "Marshmello",
      timeAgo: "2 min ago",
    },
    {
      image:
        "https://headlineplanet.com/home/wp-content/uploads/2021/04/Justin-Bieber-Peaches.jpg",
      title: "Peaches",
      artist: "Justin Bieber",
      timeAgo: "3 min ago",
    },
  ];

  const shuffledRecentlyPlayed = shuffleArray([...recentlyPlayed]);

  return (
    <div className={`bg-[#0a0a0a] h-screen w-full py-8 px-6 pb-10 `}>
      <div className="flex justify-between items-center">
        <Image src={profile} className="h-10 w-10 rounded-full" alt="logo" />
        <div>
          <div className="flex gap-2">
            <Image src={notification} alt="notification" />
            <Image src={downarrow} alt="arrow" />
            <button className="lg:hidden block" onClick={handlePlaylistClick}>
              <Image src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <h1 className="text-white text-xl font-bold">Recently Played</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>
      <div className="overflow-scroll no-scrollbar overflow-x-hidden mt-2">
        <div className="flex flex-col text-white h-[250px]">
          {recentlyPlayed.map((item, index) => (
            <MusicCard
              key={index}
              image={item.image}
              title={item.title}
              artist={item.artist}
              timeAgo={item.timeAgo}
              handlePlay={handlePlay}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-end mt-6">
        <h1 className="text-white text-xl font-bold">My Playlist</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>
      <div className="overflow-scroll no-scrollbar overflow-x-hidden text-white">
        <div className="flex flex-col text-white h-[250px] mt-2">
          {shuffledRecentlyPlayed.map((item, index) => (
            <MusicCard
              key={index}
              image={item.image}
              title={item.title}
              artist={item.artist}
              timeAgo={item.timeAgo}
              handlePlay={handlePlay}
            />
          ))}
        </div>
      </div>
      <button className="bg-white rounded-xl font-extrabold px-6 py-2 flex justify-center text-center w-full mt-8">
        Create New Playlist
      </button>
    </div>
  );
};

export default Playlist;
