"use client";

import { addPost } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import DynamicButton from "./DynamicButton";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState<any>("");

  if (!isLoaded)
    return (
      <div className="flex animate-pulse justify-between gap-4 rounded-lg bg-card p-4 shadow-md">
        {/* //# AVATAR Skeleton */}
        <div className="h-12 w-12 translate-y-4 rounded-full bg-accent" />
        {/* //# POST Skeleton */}
        <div className="flex-1">
          <div className="relative flex flex-row gap-4">
            {/* //# Textarea Skeleton */}
            <div className="peer h-20 flex-1 rounded-lg bg-accent" />
            {/* //# Icons Skeleton */}
            <div className="flex-center absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-2">
              <div className="h-6 w-6 rounded-full bg-card" />
              <div className="mt-2 h-6 w-6 rounded-full bg-card" />
            </div>
          </div>
          {/* //# POST OPTIONS Skeleton */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-accent" />
              <div className="h-4 w-10 rounded bg-accent" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-accent" />
              <div className="h-4 w-10 rounded bg-accent" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="light-sm flex justify-between gap-4 rounded-lg bg-card p-4 shadow-md">
      {/* //# AVATAR */}
      <Image
        alt="Avatar"
        src={user?.imageUrl || "/avatar.svg"}
        width={48}
        height={48}
        className="image-invertE my-4 size-12 rounded-full object-cover"
      />

      {/* //# POST */}
      <div className="flex-1">
        <form
          className="relative flex flex-row gap-4"
          action={(formData) => addPost(formData, mediaUrl?.secure_url)}
        >
          <Textarea
            placeholder="What's on your mind?"
            className="peer flex-1 rounded-lg bg-accent pr-8"
            id="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex-center absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-2">
            <Image
              alt="Emoji"
              src={"/emoji-smile.svg"}
              width={24}
              height={24}
              className="image-invert cursor-pointer"
            />
            <DynamicButton
              type="add-post"
              className=""
            />
          </div>
        </form>

        {/* //# POST OPTIONS */}
        <CldUploadWidget
          uploadPreset="mian_platform"
          onSuccess={(result, { widget }) => {
            setMediaUrl(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div className="extralight-xs mt-4 flex flex-wrap items-center gap-4">
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => open()}
                >
                  <Image
                    alt="Photo"
                    src={"/photo.svg"}
                    width={20}
                    height={20}
                    className="image-invert"
                  />
                  <p>Photo</p>
                </div>

                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => open()}
                >
                  <Image
                    alt="Video"
                    src={"/video.svg"}
                    width={20}
                    height={20}
                    className="image-invert"
                  />
                  <p>Video</p>
                </div>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default AddPost;
