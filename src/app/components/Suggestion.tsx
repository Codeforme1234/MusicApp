import React from "react";
import song from '../../public/1546.png'
import MusicCard from "./MusicCard";
import shivers from '../../public/ed-sheeran-shivers-video.jpg'

interface SuggestionProps {
    searchQuery: string;
    handlePlay:()=> void;
  }

  const Suggestion: React.FC<SuggestionProps> = ({ searchQuery, handlePlay }) => {
    const recentlyPlayed = [
        {
            image:
              song,
            title: "Thunder",
            artist: "Imagine Dragons",
           
          },
        {
          image:
            "https://atwoodmagazine.com/wp-content/uploads/2023/07/vampire-Olivia-Rodrigo-2023.jpg",
          title: "Vampire",
          artist: "Olivia Rodrigo",
          
        },
        {
          image: shivers,
          title: "Shivers",
          artist: "Ed Sheeran",
         
        },
        {
          image:
            "https://thatgrapejuice.net/wp-content/uploads/2021/04/lil-nas-x-montero-call-me-by-your-name-montero-thatgrapejuice.jpg",
          title: "Montero",
          artist: "Lil Nas X",
         
        },
        {
          image: "https://www.dafont.com/forum/attach/orig/1/0/1058970.jpg",
          title: "Stay",
          artist: "The Kid LAROI & Justin Bieber",
         
        },
        {
          image:
            "https://blowyaspeakers.com/wp-content/uploads/2018/08/mello2-1024x683.jpg",
          title: "Happier",
          artist: "Marshmello",
         
        },
        {
          image:
            "https://headlineplanet.com/home/wp-content/uploads/2021/04/Justin-Bieber-Peaches.jpg",
          title: "Peaches",
          artist: "Justin Bieber",
         
        },
      ];

  const musicData = [
    {
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ec/32/c6/ec32c651-91aa-87a5-f987-b2089a81967a/735509841433.jpg/1200x1200bf-60.jpg",
      title: "Top 40 Hits",
      artist: "Various Artists",
    },
    {
      image: "https://i.scdn.co/image/ab67616d0000b273a1fd9e20adb3c397894cfda1",
      title: "Chill Vibes",
      artist: "Relaxing Sounds",
    },
    {
      image: "https://images2.imgbox.com/2d/a7/tyfDyRGO_o.jpg",
      title: "Rock Classics",
      artist: "Classic Rock Legends",
    },
    {
      image:
        "http://p1.music.126.net/AHZltTBhD1SpMFNkBxJyKQ==/109951164764352788.jpg",
      title: "Hip Hop Essentials",
      artist: "Hip Hop Stars",
    },
    {
      image: "https://i.ytimg.com/vi/gu9CpxVsxcA/maxresdefault.jpg",
      title: "Pop Hits 2024",
      artist: "Current Pop Icons",
    },
    {
      image:
        "https://s.mxmcdn.net/images-storage/albums/3/9/2/7/7/8/26877293_800_800.jpg",
      title: "Jazz Standards",
      artist: "Jazz Masters",
    },
  ];

  const allMusic = [...recentlyPlayed, ...musicData];

 
  const filteredList = allMusic.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="mt-6 pb-20 ">
      <div className="">
        <div>
          <div className="flex justify-between items-end">
            <h1 className="text-white text-2xl font-bold">Hello, Woilon</h1>
            <button className="text-gray-400 text-sm font-semibold">
              See all
            </button>
          </div>
          <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
            {musicData.map((music, index) => (
              <div key={index} className="flex-shrink-0 md:w-52 w-40 ">
                <MusicCard handlePlay={handlePlay} {...music} />
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-end">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button className="text-gray-400 text-sm font-semibold">
                See all
              </button>
            </div>
            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
            {filteredList.map((music, index) => (
            <div key={index} className="flex-shrink-0 md:w-52 w-40">
              <MusicCard handlePlay={handlePlay} {...music} />
            </div>
          ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button className="text-gray-400 text-sm font-semibold">
                See all
              </button>
            </div>
            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
            {filteredList.map((music, index) => (
            <div key={index} className="flex-shrink-0 md:w-52 w-40">
              <MusicCard handlePlay={handlePlay} {...music} />
            </div>
          ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button className="text-gray-400 text-sm font-semibold">
                See all
              </button>
            </div>
            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
            {filteredList.map((music, index) => (
            <div key={index} className="flex-shrink-0 md:w-52 w-40">
              <MusicCard handlePlay={handlePlay} {...music} />
            </div>
          ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-end">
              <h1 className="text-white text-xl font-bold">
                New releases for you
              </h1>
              <button className="text-gray-400 text-sm font-semibold">
                See all
              </button>
            </div>
            <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
            {filteredList.map((music, index) => (
            <div key={index} className="flex-shrink-0 md:w-52 w-40">
              <MusicCard handlePlay={handlePlay} {...music} />
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
