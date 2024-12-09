import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Advertisement = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="light-sm flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      <div className="flex-between flex-row gap-4 font-medium">
        <span className="text-muted-foreground">Sponsored by</span>
        <Image
          alt="More"
          src={"/more.svg"}
          width={16}
          height={16}
          className="image-invert cursor-pointer"
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {/* <div className="relative">
          <Image
              alt="Advertisement"
              src={"/kitten.jpg"}
              fill
              className='rounded-md object-cover'
              />
        </div> */}

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati in
          atque blanditiis at magnam ratione distinctio, cum facilis recusandae?
          Atque tempora neque perferendis et? Libero quibusdam dolores ipsa
          velit accusantium.
        </p>

        <Button>Learn More</Button>
      </div>
    </div>
  );
};

export default Advertisement;
