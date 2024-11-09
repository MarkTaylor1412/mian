import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Image
        alt="Loader"
        src={"/loader.svg"}
        width={24}
        height={24}
      />
    </div>
  );
};

export default Loader;
