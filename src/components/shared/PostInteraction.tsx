"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { userId, isLoaded } = useAuth();

  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    },
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="extralight-xs flex flex-row items-center justify-between">
      <div className="my-4 flex flex-row items-center gap-8">
        <div className="flex flex-row items-center gap-2 rounded-xl bg-muted p-2">
          <form action={likeAction}>
            <button className="flex-center flex-row">
              <Image
                alt="Like"
                src={optimisticLike.isLiked ? "/liked.svg" : "/like.svg"}
                width={16}
                height={16}
                className="image-invert cursor-pointer"
              />
            </button>
          </form>

          <span className="text-muted-foreground">|</span>
          <p className="cursor-pointer text-muted-foreground hover:text-primary">
            {optimisticLike.likeCount}
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
            {commentNumber}
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
            {/* 12 */}
            <span className="hidden md:inline"> Share</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
