import React from "react";
import right from "../../public/right-2-svgrepo-com.svg";
import left from "../../public/left-2-svgrepo-com.svg";
import dots from "../../public/dots-horizontal-svgrepo-com.svg";
import Image from "next/image";
interface Navprop {
  // Define your props here
}

const Nav: React.FC<Navprop> = (props) => {
  return (
    <div className="w-full flex mt-6 gap-6 justify-center items-center">
      <div className="w-1/8 flex gap-2 ">
        <div>
          <Image src={left} alt="left" />{" "}
        </div>
        <div>
          {" "}
          <Image src={right} alt="left" />
        </div>
      </div>
      <div className="round w-full  ">
        <div className="relative py-3  rounded-3xl w-full max-w-4xl">
          <input
            type="text"
            className="rounded-3xl p-3 w-full"
            placeholder="Search for artist, songs or albums"
          />

          <button type="submit" className="absolute right-6 top-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-1/8">
        {" "}
        <Image src={dots} alt="menu" />{" "}
      </div>
    </div>
  );
};

export default Nav;
