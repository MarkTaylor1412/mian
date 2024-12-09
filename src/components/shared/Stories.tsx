import Image from "next/image";
import React from "react";

const Stories = () => {
  return (
    <div className="hidden-scrollbar overflow-x-scroll rounded-lg bg-card p-4 text-xs shadow-md">
      <div className="flex w-max flex-row gap-8">
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/story.svg"}
            width={80}
            height={80}
            className="image-invert size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/kitten.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        {/* <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <Image
            alt="Story"
            src={"/bbyboo.jpg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">Kokokrunch</p>
        </div> */}
      </div>
    </div>
  );
};

export default Stories;
