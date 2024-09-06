import Image from "next/image";
import profile from "../../public/austin-neill-hgo1wfpxl3i-unsplash.jpg";
import notification from "../../public/notification-svgrepo-com.svg";
import downarrow from "../../public/down-arrow-5-svgrepo-com (1).svg";
import playlist from "../../public/1546.png";

interface PlaylistProp {
  // Define your props here
}

const PlayList: React.FC<PlaylistProp> = (props) => {
  return (
    <div className="bg-[#0a0a0a] h-full w-full py-8 px-6 pb-10">
      <div className="flex justify-between items-center">
        <Image src={profile} className="h-10 w-10 rounded-full" alt="logo" />
        <div>
          <div className="flex gap-2">
            <Image src={notification} alt="notification" />
            <Image src={downarrow} alt="arrow" />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-end">
          <h1 className="text-white text-xl font-bold">Recently Played</h1>
          <button className="text-gray-400 text-sm font-semibold">
            See all
          </button>
        </div>
        <div className="overflow-scroll no-scrollbar overflow-x-hidden">
          <div className="h-[220px]">
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap vo ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap ">
                  4 min ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-end">
          <h1 className="text-white text-xl font-bold">My Playlist</h1>
          <button className="text-gray-400 text-sm font-semibold">
            See all
          </button>
        </div>
        <div className="overflow-scroll no-scrollbar overflow-x-hidden">
          <div className="h-[220px]">
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap  ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap  ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap  ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex text-gray-400 items-center gap-2">
                  <Image src={playlist} className="h-12 w-12" alt="song" />
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">Bones</div>
                    <div className=" text-xs font-light text-wrap ">
                      Imagine Dragons
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" text-xs text-gray-400 font-light text-wrap  ">
                  4 min ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="bg-white rounded-xl font-extrabold px-6 py-2 flex justify-center text-center w-full mt-4">
        Create New Playlist
      </button>
    </div>
  );
};

export default PlayList;
