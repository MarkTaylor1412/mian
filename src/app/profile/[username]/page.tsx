import Feed from "@/components/shared/Feed";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = await params.username;
  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          followings: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  let isBlocked;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="relative top-8 flex flex-row gap-6 pt-6">
      {/* //# LEFTSIDEBAR */}
      <div className="hidden w-[25%] lg:block">
        <LeftSideBar />
      </div>

      {/* //# CENTRE */}
      <div className="w-full lg:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex-center flex-col rounded-md bg-card">
            <div className="relative h-64 w-full">
              <Image
                alt="Cover"
                src={user.coverUrl || "/cover.svg"}
                fill
                className="rounded-md object-cover"
              />
              <Image
                alt="Avatar"
                src={user.avatarUrl || "/avatar.svg"}
                width={128}
                height={128}
                className="absolute -bottom-16 left-0 right-0 m-auto size-32 rounded-full object-cover ring ring-card"
              />
            </div>

            <h1 className="bold-2xl mt-20">{user.username}</h1>
            <span className="regular-base text-muted-foreground">{user.firstname && user.surname
            ? user.firstname + " " + user.surname
            : ""}</span>

            <div className="flex-center my-4 flex-row gap-12">
              <div className="flex-center flex-col">
                <span className="medium-lg">{user._count.posts}</span>
                <span className="light-sm">Posts</span>
              </div>
              <div className="flex-center flex-col">
                <span className="medium-lg">{user._count.followers}</span>
                <span className="light-sm">Followers</span>
              </div>
              <div className="flex-center flex-col">
                <span className="medium-lg">{user._count.followings}</span>
                <span className="light-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>

      {/* //# RIGHTSIDEBAR */}
      <div className="hidden w-[25%] lg:block">
        <RightSideBar
          user={user}
          type="profile"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
