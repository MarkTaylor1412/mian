import Image from "next/image";
import React from "react";
import { Textarea } from "../ui/textarea";

const AddPost = () => {
  return (
    <div className="light-sm flex justify-between gap-4 rounded-lg bg-card p-4 shadow-md ring">
      {/* AVATAR */}
      <Image
        alt="Avatar"
        src={"/bbyboo2.jpg"}
        width={48}
        height={48}
        className="invert-imageE my-4 size-12 rounded-full object-cover"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <div className="flex flex-row gap-4">
          <Textarea
            placeholder="What's on your mind?"
            className="rounded-lg bg-input"
          ></Textarea>

          <Image
            alt="Emoji"
            src={"/emoji-smile.svg"}
            width={20}
            height={20}
            className="invert-image size-5 cursor-pointer self-end"
          />
        </div>

        {/* POST OPTIONS */}
        <div className="extralight-xs mt-4 flex flex-wrap items-center gap-4">
          <div className="flex cursor-pointer items-center gap-2">
            <Image
              alt="Photo"
              src={"/photo.svg"}
              width={20}
              height={20}
              className="invert-image"
            />
            <p>Photo</p>
          </div>

          <div className="flex cursor-pointer items-center gap-2">
            <Image
              alt="Video"
              src={"/video.svg"}
              width={20}
              height={20}
              className="invert-image"
            />
            <p>Video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
