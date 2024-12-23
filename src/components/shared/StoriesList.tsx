"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CheckCircle, PlusCircle } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryProps = Story & { user: User };

const StoriesList = ({
  stories,
  userId,
}: {
  stories: StoryProps[];
  userId: string;
}) => {
  const { user } = useUser();

  const [storiesList, setStoriesList] = useState(stories);
  const [mediaUrl, setMediaUrl] = useState<any>();

  const [optimisticStories, addOptimisticStories] = useOptimistic(
    storiesList,
    (state, value: StoryProps) => [...state, value],
  );

  const handleAddStory = async () => {
    if (!mediaUrl?.secure_url) return;

    addOptimisticStories({
      id: Math.random(),
      mediaUrl: mediaUrl.secure_url,
      userId: userId,
      user: {
        id: userId,
        username: "Working on it...",
        avatarUrl: user?.imageUrl || "/avatar.svg",
        coverUrl: "",
        firstname: "",
        surname: "",
        bio: "",
        education: "",
        nationality: "",
        externalLink: "",
        createdAt: new Date(Date.now()),
      },
      createdAt: new Date(Date.now()),
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    try {
      const createdStory = await addStory(mediaUrl.secure_url);
      setStoriesList((prev) => [createdStory, ...prev]);
      setMediaUrl(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="mian_platform"
        onSuccess={(result, { widget }) => {
          setMediaUrl(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="relative flex cursor-pointer flex-col items-center gap-2">
              <Image
                alt="Story"
                src={mediaUrl?.secure_url || user?.imageUrl || "/avatar.svg"}
                width={80}
                height={80}
                className="size-20 rounded-full object-cover ring-2"
                onClick={() => open()}
              />
              <p className="font-medium text-muted-foreground">Your Story</p>

              <form
                action={handleAddStory}
                className="absolute bottom-5 right-0 cursor-pointer rounded-full"
              >
                {mediaUrl ? (
                  <>
                    <button className="rounded-full">
                      <CheckCircle className="fill-green-500 hover:fill-green-600 active:fill-green-700" />
                    </button>
                  </>
                ) : (
                  <PlusCircle
                    className="fill-blue-500 hover:fill-blue-600 active:fill-blue-700"
                    onClick={() => open()}
                  />
                )}
              </form>
            </div>
          );
        }}
      </CldUploadWidget>

      {optimisticStories.map((story) => (
        <div
          className="flex cursor-pointer flex-col items-center gap-2"
          key={story.id}
        >
          <Image
            alt="Story"
            src={story.user.avatarUrl || "/avatar.svg"}
            width={80}
            height={80}
            className="size-20 rounded-full ring-2"
          />
          <p className="font-medium">{story.user.username}</p>
        </div>
      ))}
    </>
  );
};

export default StoriesList;
