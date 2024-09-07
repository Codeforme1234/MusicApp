"use client";
import React from "react";
import song from "../../public/1546.png";
import MusicCard from "./MusicCard";
import shivers from "../../public/ed-sheeran-shivers-video.jpg";
import APIComponent from "../API/FetchMusic";
import { songState } from "../state/SongAtom";
import { useSetRecoilState } from "recoil";
interface SuggestionProps {
  searchQuery: string;
  handlePlay: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ searchQuery, handlePlay }) => {
  const [songs, setSongs] = React.useState<any[]>([]); // State to store fetched songs
  const setSelectedSong = useSetRecoilState(songState); // Recoil setter for selected song

  // Callback to handle songs fetched from API
  const handleSongsFetched = (fetchedSongs: any[]) => {
    setSongs(fetchedSongs);
  };
  const handleMusicCardClick = (song: any) => {
    setSelectedSong(song); // Update Recoil atom with clicked song details
    console.log("Selected song:", song); // Log the selected song
  };
  const filteredList = songs.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // <div className="mt-6 pb-20 ">
    //   <div className="">
    //     <div>
    //       <div className="flex justify-between items-end">
    //         <h1 className="text-white text-2xl font-bold">Hello, Woilon</h1>
    //         <button className="text-gray-400 text-sm font-semibold">
    //           See all
    //         </button>
    //       </div>
    //       <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
    //         {musicData.map((music, index) => (
    //           <div key={index} className="flex-shrink-0 md:w-52 w-40 ">
    //             <MusicCard handlePlay={handlePlay} {...music} />
    //           </div>
    //         ))}
    //       </div>

    //       <div>
    //         <div className="flex justify-between items-end">
    //           <h1 className="text-white text-xl font-bold">
    //             New releases for you
    //           </h1>
    //           <button className="text-gray-400 text-sm font-semibold">
    //             See all
    //           </button>
    //         </div>
    //         <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
    //           {filteredList.map((music, index) => (
    //             <div key={index} className="flex-shrink-0 md:w-52 w-40">
    //               <MusicCard handlePlay={handlePlay} {...music} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div>
    //         <div className="flex justify-between items-end">
    //           <h1 className="text-white text-xl font-bold">
    //             New releases for you
    //           </h1>
    //           <button className="text-gray-400 text-sm font-semibold">
    //             See all
    //           </button>
    //         </div>
    //         <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
    //           {filteredList.map((music, index) => (
    //             <div key={index} className="flex-shrink-0 md:w-52 w-40">
    //               <MusicCard handlePlay={handlePlay} {...music} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div>
    //         <div className="flex justify-between items-end">
    //           <h1 className="text-white text-xl font-bold">
    //             New releases for you
    //           </h1>
    //           <button className="text-gray-400 text-sm font-semibold">
    //             See all
    //           </button>
    //         </div>
    //         <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
    //           <div key={index} className="flex-shrink-0 md:w-52 w-40">
    //             <MusicCard handlePlay={handlePlay} {...music} />
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="flex justify-between items-end">
    //           <h1 className="text-white text-xl font-bold">
    //             New releases for you
    //           </h1>
    //           <button className="text-gray-400 text-sm font-semibold">
    //             See all
    //           </button>
    //         </div>
    //         <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
    //           {filteredList.map((music, index) => (
    //             <div key={index} className="flex-shrink-0 md:w-52 w-40">
    //               <MusicCard handlePlay={handlePlay} {...music} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="mt-6 pb-20 ">
      <APIComponent onSongsFetched={handleSongsFetched} /> {/* Fetch songs */}

      <div className="text-white overflow-x-auto w-full no-scrollbar flex gap-4">
        {filteredList.map((music, index) => (
          <div
            key={index}
            className="flex-shrink-0 md:w-52 w-40"
            onClick={() => handleMusicCardClick(music)} // Handle click
          >
            <MusicCard {...music} handlePlay={handlePlay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
