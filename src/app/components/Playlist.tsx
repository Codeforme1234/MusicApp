import Image from "next/image";
import profile from "../../public/austin-neill-hgo1wfpxl3i-unsplash.jpg";
import notification from "../../public/notification-svgrepo-com.svg";
import downarrow from "../../public/down-arrow-5-svgrepo-com (1).svg";
import playlist from "../../public/1546.png";
import right from "../../../public/right-2-svgrepo-com.svg";
import { MusicCard } from "../components";

interface PlaylistProp {
  handlePlaylistClick: () => void;
}

const PlayList: React.FC<PlaylistProp> = ({ handlePlaylistClick }) => {
  const recentlyPlayed = [
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
    {
      image: playlist,
      title: "Bones",
      artist: "Imagine Dragons",
      timeAgo: "4 min ago",
    },
  ];
  return (
    <div className={`bg-[#0a0a0a] h-screen w-full py-8 px-6 pb-10 `}>
      <div className="flex justify-between items-center">
        <Image src={profile} className="h-10 w-10 rounded-full" alt="logo" />
        <div>
          <div className="flex gap-2">
            <Image src={notification} alt="notification" />
            <Image src={downarrow} alt="arrow" />
            <button className="md:hidden block" onClick={handlePlaylistClick}>
              <Image src={right} alt="right" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <h1 className="text-white text-xl font-bold">Recently Played</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>
      <div className="overflow-scroll no-scrollbar overflow-x-hidden">
        <div className="flex flex-col text-white h-[250px]">
          {recentlyPlayed.map((item, index) => (
            <MusicCard
              key={index}
              image={item.image}
              title={item.title}
              artist={item.artist}
              timeAgo={item.timeAgo}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <h1 className="text-white text-xl font-bold">My Playlist</h1>
        <button className="text-gray-400 text-sm font-semibold">See all</button>
      </div>
      <div className="overflow-scroll no-scrollbar overflow-x-hidden text-white">
        <div className="flex flex-col text-white h-[250px]">
          {recentlyPlayed.map((item, index) => (
            <MusicCard
              key={index}
              image={item.image}
              title={item.title}
              artist={item.artist}
              timeAgo={item.timeAgo}
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

export default PlayList;
