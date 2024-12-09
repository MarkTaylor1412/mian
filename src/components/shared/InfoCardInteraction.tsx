"use client";

import { useOptimistic, useState } from "react";
import { Button } from "../ui/button";
import { switchBlock, switchFollow } from "@/lib/actions";

const InfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    blocked: isUserBlocked,
    following: isFollowing,
    followingRequestSent: isFollowingSent,
  });

  const follow = async () => {
    switchOptimisticState("follow");

    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      throw new Error("Unable to follow user. Please try again later!");
    }
  };

  const block = async () => {
    switchOptimisticState("block");

    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      throw new Error("Unable to block user. Please try again later!");
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked },
  );

  return (
    <>
      <form action={follow}>
        <Button className="w-full hover:opacity-90 active:opacity-80">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
              ? "Following Request Sent"
              : "Follow"}
        </Button>
      </form>

      <form
        action={block}
        className="self-end"
      >
        <Button className="extralight-xs cursor-pointer bg-transparent p-0 text-red-500 hover:text-red-600 active:text-destructive">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </Button>
      </form>
    </>
  );
};

export default InfoCardInteraction;
