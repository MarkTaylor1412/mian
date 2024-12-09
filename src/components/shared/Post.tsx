import { ArrowUp, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      {/* //# USER */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            alt="Avatar"
            src={"/taylor.jpg"}
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
      <div className="extralight-xs flex flex-row items-center justify-between">
        <div className="my-4 flex flex-row items-center gap-8">
          <div className="flex flex-row items-center gap-2 rounded-xl bg-muted p-2">
            <Image
              alt="Like"
              src={"/heart.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />

            <span className="text-muted-foreground">|</span>
            <p className="cursor-pointer text-muted-foreground hover:text-primary">
              12
              <span className="hidden md:inline"> Likes</span>
            </p>
          </div>

          <div className="flex flex-row items-center gap-2 rounded-xl bg-muted p-2">
            <Image
              alt="Comment"
              src={"/comment.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />

            <span className="text-muted-foreground">|</span>
            <p className="cursor-pointer text-muted-foreground hover:text-primary">
              12
              <span className="hidden md:inline"> Comments</span>
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-row items-center gap-2 rounded-xl bg-muted p-2">
            <Image
              alt="Share"
              src={"/share.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />

            <span className="text-muted-foreground">|</span>
            <p className="cursor-pointer text-muted-foreground hover:text-primary">
              12
              <span className="hidden md:inline"> Shares</span>
            </p>
          </div>
        </div>
      </div>

      <Comments />
    </div>
  );
};

export default Post;
