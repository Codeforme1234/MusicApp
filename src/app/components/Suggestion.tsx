import Image from "next/image";
import React from "react";
import song from "../../public/1_hAaRg1su8VZxpGTXPTrKSg.png";

interface SuggestionProp {
  // Define your props here
}

const Suggestion: React.FC<SuggestionProp> = (props) => {
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
          <div className=" text-white overflow-x-scroll  w-full no-scrollbar oveflow-y-hidden grid grid-rows-1 grid-cols-4 gap-4">
            <div className="my-6  space-y-1">
              <div className="rounded-lg">
                <Image
                  className="rounded-xl aspect-square object-cover "
                  src={song}
                  alt=""
                />
              </div>
              <div className="text-sm font-medium">Today's Hot Hits</div>
              <div className=" text-xs font-light text-wrap vo ">
                The most played tracks right now
              </div>
            </div>
            <div className="my-6  space-y-1">
              <div className="rounded-lg ">
                <Image
                  className="rounded-xl aspect-square object-cover "
                  src={song}
                  alt=""
                />
              </div>
              <div className="text-sm font-medium">Today's Hot Hits</div>
              <div className=" text-xs font-light text-wrap vo ">
                The most played tracks right now
              </div>
            </div>
            <div className="my-6  space-y-1">
              <div className="rounded-lg">
                <Image
                  className="rounded-xl aspect-square object-cover "
                  src={song}
                  alt=""
                />
              </div>
              <div className="text-sm font-medium">Today's Hot Hits</div>
              <div className=" text-xs font-light text-wrap vo ">
                The most played tracks right now
              </div>
            </div>
            <div className="my-6  space-y-1">
              <div className="rounded-lg">
                <Image
                  className="rounded-xl aspect-square object-cover "
                  src={song}
                  alt=""
                />
              </div>
              <div className="text-sm font-medium">Today's Hot Hits</div>
              <div className=" text-xs font-light text-wrap vo ">
                The most played tracks right now
              </div>
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
            <div className=" text-white overflow-x-scroll  w-full no-scrollbar oveflow-y-hidden grid grid-rows-1 grid-cols-4 gap-4">
              <div className="my-6  space-y-1">
                <div className="rounded-lg">
                  <Image
                    className="rounded-xl aspect-square object-cover "
                    src={song}
                    alt=""
                  />
                </div>
                <div className="text-sm font-medium">Today's Hot Hits</div>
                <div className=" text-xs font-light text-wrap vo ">
                  The most played tracks right now
                </div>
              </div>
              <div className="my-6  space-y-1">
                <div className="rounded-lg ">
                  <Image
                    className="rounded-xl aspect-square object-cover "
                    src={song}
                    alt=""
                  />
                </div>
                <div className="text-sm font-medium">Today's Hot Hits</div>
                <div className=" text-xs font-light text-wrap vo ">
                  The most played tracks right now
                </div>
              </div>
              <div className="my-6  space-y-1">
                <div className="rounded-lg">
                  <Image
                    className="rounded-xl aspect-square object-cover "
                    src={song}
                    alt=""
                  />
                </div>
                <div className="text-sm font-medium">Today's Hot Hits</div>
                <div className=" text-xs font-light text-wrap vo ">
                  The most played tracks right now
                </div>
              </div>
              <div className="my-6  space-y-1">
                <div className="rounded-lg">
                  <Image
                    className="rounded-xl aspect-square object-cover "
                    src={song}
                    alt=""
                  />
                </div>
                <div className="text-sm font-medium">Today's Hot Hits</div>
                <div className=" text-xs font-light text-wrap vo ">
                  The most played tracks right now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
