import { ArrowUp, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import Comment from "./Comment";

const Post = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md ring">
      {/* //# USER */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            alt="Avatar"
            src={"/bbyboo1.jpg"}
            width={40}
            height={40}
            className="size-10 rounded-full ring-2"
          />

          <span className="">Kokokrunch</span>
        </div>

        <MoreHorizontal className="cursor-pointer" />
      </div>

      {/* //# DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <div className="relative min-h-96 w-full">
          <Image
            alt="Post"
            src={"/kitten.jpg"}
            fill
            className="rounded-md object-cover"
          />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          assumenda cupiditate qui debitis laborum eveniet officiis sint
          voluptatem vel suscipit consequatur fugit, accusamus incidunt, a
          doloribus deserunt natus cumque mollitia!
        </p>
      </div>

      {/* //# INTERACTION */}
      <div className="flex items-center justify-between flex-row extralight-xs">
        <div className="flex flex-row items-center gap-8 my-4">
          <div className="flex flex-row items-center gap-2 bg-muted p-2 rounded-xl">
            <Image
              alt="Like"
              src={"/heart.svg"}
              width={16}
              height={16}
              className="cursor-pointer invert-image"
            />

            <span className="text-muted-foreground">|</span>
            <p className="text-muted-foreground hover:text-primary cursor-pointer">
              12
              <span className="hidden md:inline"> Likes</span>
            </p>
          </div>
          
          <div className="flex flex-row items-center gap-2 bg-muted p-2 rounded-xl">
            <Image
              alt="Comment"
              src={"/comment.svg"}
              width={16}
              height={16}
              className="cursor-pointer invert-image"
            />

            <span className="text-muted-foreground">|</span>
            <p className="text-muted-foreground hover:text-primary cursor-pointer">
              12
              <span className="hidden md:inline"> Comments</span>
            </p>
          </div>
        </div>
        <div className="">
        <div className="flex flex-row items-center gap-2 bg-muted p-2 rounded-xl">
            <Image
              alt="Share"
              src={"/share.svg"}
              width={16}
              height={16}
              className="cursor-pointer invert-image"
            />

            <span className="text-muted-foreground">|</span>
            <p className="text-muted-foreground hover:text-primary cursor-pointer">
              12
              <span className="hidden md:inline"> Shares</span>
            </p>
          </div>
        </div>
      </div>

      <Comment/>
    </div>
  );
};

export default Post;
