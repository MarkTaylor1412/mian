import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoriesList from "./StoriesList";

const Stories = async () => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiredAt: {
        gt: new Date(),
      },
      // OR: [
      //   {
      //     user: {
      //       followers: {
      //         some: {
      //           followerId: currentUserId,
      //         },
      //       },
      //     },
      //     userId: currentUserId,
      //   },
      // ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="hidden-scrollbar overflow-x-scroll rounded-lg bg-card p-4 text-xs shadow-md">
      <div className="flex w-max flex-row gap-8">
        <StoriesList
          stories={stories}
          userId={currentUserId}
        />
      </div>
    </div>
  );
};

export default Stories;
