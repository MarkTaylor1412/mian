import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const ProfileCard = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  console.log(user);

  if (!user) return null;

  return (
    <div className="light-sm flex flex-col gap-6 rounded-lg bg-card p-4 shadow-md">
      <div className="relative h-20">
        <Image
          alt="Cover"
          src={user.coverUrl || "/cover.svg"}
          fill
          className="rounded-md object-cover"
        />

        <Image
          alt="Avatar"
          src={user.avatarUrl || "/avatar.svg"}
          width={48}
          height={48}
          className="absolute -bottom-6 left-0 right-0 z-10 m-auto size-12 rounded-full object-cover ring ring-card"
        />
      </div>

      <div className="flex-center h-20 flex-col gap-2">
        <Link href={`/profile/${user.id}`}>
          <span className="medium-lg">{user.username}</span>
        </Link>
        <span className="regular-base">
          {user.firstname && user.surname
            ? user.firstname + " " + user.surname
            : ""}
        </span>

        <div className="flex-center flex-row gap-2">
          <div className="flex flex-row">
            <Image
              alt="Follower"
              src={"/kitten.jpg"}
              width={12}
              height={12}
              className="size-3 rounded-full object-cover"
            />
            <Image
              alt="Follower"
              src={"/kitten.jpg"}
              width={12}
              height={12}
              className="size-3 rounded-full object-cover"
            />
            <Image
              alt="Follower"
              src={"/kitten.jpg"}
              width={12}
              height={12}
              className="size-3 rounded-full object-cover"
            />
          </div>
          <span className="extralight-xs text-muted-foreground">
            {user._count.followers} Followers
          </span>
        </div>
      </div>
      <Link href={`/profile/${user.username}`}>
        <Button className="w-full">My Profile</Button>
      </Link>
    </div>
  );
};

export default ProfileCard;
