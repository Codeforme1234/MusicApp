"use client";
import React, { useState } from "react";
import shuffle from "../../public/shuffle-2-svgrepo-com.svg";
import previous from "../../public/previous-svgrepo-com.svg";
import next from "../../public/next-svgrepo-com (1).svg";
import loop from "../../public/loop-svgrepo-com.svg";
import Play from "../../public/play-circle-svgrepo-com.svg";
import pause from "../../public/pause-circle-svgrepo-com.svg";
import device from "../../public/device-multiple-svgrepo-com.svg";
import share from "../../public/share-svgrepo-com.svg";

import Image from "next/image";

interface Playerprop {
  // Define your props here
}

const Player: React.FC<Playerprop> = (props) => {
  const [play, setplay] = useState(false);

  const handleplaypause = () => {
    setplay(!play);
  };
  return (
    <div className="text-white px-6 w-screen flex  py-6  bg-black">
      <div className=" flex w-[20%] items-center gap-4">
        <div>
          <div> Date</div>
          <div>chin chowe</div>
        </div>
        <div>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z"
              fill="#FFF"
            />
          </svg>
        </div>
        <div>
          <svg
             width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
              stroke="#FFF"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
              stroke="#FFF"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="w-[60%]  ">
        <div className=" flex flex-col">
          <div className="flex justify-center gap-4">
            <button>
              <Image src={shuffle} alt="shuffle" />
            </button>
            <button>
              <Image src={previous} alt="shuffle" />
            </button>
            {play ? (
              <button onClick={handleplaypause}>
                <Image src={Play} alt="shuffle" />
              </button>
            ) : (
              <button onClick={handleplaypause}>
                <Image src={pause} alt="shuffle" />
              </button>
            )}

            <button>
              <Image src={next} alt="shuffle" />
            </button>
            <button>
              <Image src={loop} alt="shuffle" />
            </button>
          </div>
          <div className="mx-16">
            <div className="mx-8 py-1">
              <div className="flex justify-between text-sm text-grey-darker">
                <p>0:40</p>
                <p>4:20</p>
              </div>
              <div className="">
                <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                  <div
                    className="h-1 bg-blue-500"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-[20%] flex items-center gap-4">
        <div className="flex w-full items-center gap-2">
          <div>
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M16 8.99998C16.5 9.49998 17 10.5 17 12C17 13.5 16.5 14.5 16 15M3 10.5V13.5C3 14.6046 3.5 15.5 5.5 16C7.5 16.5 9 21 12 21C14 21 14 3 12 3C9 3 7.5 7.5 5.5 8C3.5 8.5 3 9.39543 3 10.5Z"
                stroke="#FFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
              <div className="h-1 bg-blue-500" style={{ width: "45%" }}></div>
            </div>
        </div>
        <div>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 4.5C10.314 4.5 9 5.80455 9 7.35V12.15C9 13.6955 10.314 15 12 15C13.686 15 15 13.6955 15 12.15L15 7.35C15 5.80455 13.686 4.5 12 4.5ZM7.5 7.35C7.5 4.919 9.54387 3 12 3C14.4561 3 16.5 4.919 16.5 7.35L16.5 12.15C16.5 14.581 14.4561 16.5 12 16.5C9.54387 16.5 7.5 14.581 7.5 12.15V7.35ZM6.75 12.75C6.75 15.1443 9.0033 17.25 12 17.25C14.9967 17.25 17.25 15.1443 17.25 12.75H18.75C18.75 15.9176 16.0499 18.3847 12.75 18.7129V21H11.25V18.7129C7.95007 18.3847 5.25 15.9176 5.25 12.75H6.75Z"
              fill="#FFF"
            />
          </svg>
        </div>
        <div><Image src={device} alt="device"/></div>
        <div><Image src={share} alt="device"/></div>
      </div>
    </div>
  );
};

export default Player;
