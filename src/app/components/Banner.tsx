import React from "react";
import Image from "next/image";
import logo from "../../public/logo.png"

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
            className="rounded-xl  object-cover"
            alt="banner"
            height={200}
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
