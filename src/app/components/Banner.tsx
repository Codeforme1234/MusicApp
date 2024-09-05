import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png";

interface Props {
  // Define your props here
}

const Banner: React.FC<Props> = (props) => {
  return (
    <>
      <div>Banner</div>
      <div className="mt-4 ">
        <div className="">
          <Image
            src={logo}
            className="rounded-xl h-[300px] object-cover"
            alt="banner"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
