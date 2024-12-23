import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import InfoCardInteraction from "./InfoCardInteraction";
import InfoEditCard from "./InfoEditCard";

const InfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followRes = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="light-sm flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      <div className="flex-between flex-row gap-4 font-medium">
        <span className="text-muted-foreground">User Information</span>
        {currentUserId === user.id ? (
          <InfoEditCard user={user} />
        ) : (
          <span className="link-button">View all</span>
        )}
      </div>

      <div className="flex flex-col gap-4 text-muted-foreground">
        <div className="flex-start flex-row gap-2">
          <span className="medium-lg text-primary">
            {user.firstname && user.surname
              ? user.firstname + " " + user.surname
              : ""}
          </span>
          <span className="light-sm">{user.username}</span>
        </div>

        {user.bio && <kbd>{user.bio}</kbd>}

        {user.education && (
          <div className="flex-start flex-row gap-2">
            <Image
              alt="Education"
              src={"/education.svg"}
              width={16}
              height={16}
              className="image-invert"
            />
            <span>{user.education}</span>
          </div>
        )}

        {user.nationality && (
          <div className="flex-start flex-row gap-2">
            <Image
              alt="Nationality"
              src={"/nationality.svg"}
              width={16}
              height={16}
              className="image-invert"
            />
            <span>{user.nationality}</span>
          </div>
        )}

        {user.externalLink && (
          <div className="flex-start flex-row gap-2">
            <Image
              alt="External Link"
              src={"/external-link.svg"}
              width={16}
              height={16}
              className="image-invert"
            />
            <Link
              href={user.externalLink}
              className="link-button"
            >
              {user.externalLink}
            </Link>
          </div>
        )}

        {user.createdAt && (
          <div className="flex-start flex-row gap-2">
            <Image
              alt="Date"
              src={"/date.svg"}
              width={16}
              height={16}
              className="image-invert"
            />
            <span>Joined {formattedDate}</span>
          </div>
        )}

        {currentUserId && currentUserId !== user.id && (
          <InfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default InfoCard;
