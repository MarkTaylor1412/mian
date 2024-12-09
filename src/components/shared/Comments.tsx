import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

const Comments = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center gap-4">
        <Image
          alt="Avatar"
          src={"/bbyboo1.jpg"}
          width={32}
          height={32}
          className="size-8 rounded-full ring-2"
        />

        <div className="light-sm relative flex w-full flex-1 flex-row items-center justify-between rounded-xl bg-accent p-1">
          <Input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent pr-12"
          />

          <Image
            alt="Emoji"
            src={"/emoji-smile.svg"}
            width={16}
            height={16}
            className="image-invert absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>

      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        <div className="mt-6 flex flex-row justify-center gap-4">
          <Image
            alt="Avatar"
            src={"/taylor.jpg"}
            width={40}
            height={40}
            className="size-10 rounded-full ring-1"
          />

          <div className="light-sm flex flex-1 flex-col gap-2">
            <span className="font-medium">Taylor</span>

            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
              modi doloribus suscipit soluta, repellendus eos minus, dolor odit
              tempora quam deserunt dolores ducimus? Quae sit corrupti incidunt
              aspernatur laboriosam nisi.
            </p>

            <div className="extralight-xs mt-2 flex flex-row items-center gap-8 text-muted-foreground">
              <div className="flex flex-row items-center gap-1">
                <Image
                  alt="Like"
                  src={"/heart.svg"}
                  width={12}
                  height={12}
                  className="image-invert cursor-pointer"
                />
                <span>|</span>
                <span>12</span>
              </div>

              <div className="cursor-pointer hover:text-primary">Reply</div>
            </div>
          </div>

          <div>
            <Image
              alt="Like"
              src={"/like.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />
            <Image
              alt="Reply"
              src={"/reply.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />
            <Image
              alt="More"
              src={"/more.svg"}
              width={16}
              height={16}
              className="image-invert cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
