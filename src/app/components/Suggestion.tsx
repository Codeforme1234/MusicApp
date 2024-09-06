import Image from "next/image";
import React from "react";
import song from "../../public/1_hAaRg1su8VZxpGTXPTrKSg.png";
import MusicCard from "./MusicCard";

interface SuggestionProp {
  // Define your props here
}

const Suggestion: React.FC<SuggestionProp> = (props) => {
  const musicData = [
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
    {
      image: song,
      title: "Today's Hot Hits",
      artist: "The most played tracks right now",
    },
  ];
  return (
    <div className="mt-6 pb-20">
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
              <div key={index} className="flex-shrink-0 md:w-52 w-40">
                {" "}
                <MusicCard {...music} />
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
              {musicData.map((music, index) => (
                <div key={index} className="flex-shrink-0 md:w-52 w-40 ">
                  {" "}
                  <MusicCard {...music} />
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
