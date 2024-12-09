import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const MediaCard = async ({ user }: { user: User }) => {
  const mediaPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
      mediaUrl: { not: null },
    },

    take: 9,

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="light-sm flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      <div className="flex-between flex-row gap-4 font-medium">
        <span className="text-muted-foreground">Media</span>
        <Link
          href={"#"}
          className="link-button extralight-xs hover:light-sm"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        {mediaPosts.length ? (
          mediaPosts.map((post) => (
            <div
              className="relative h-24 w-1/5"
              key={post.id}
            >
              <Image
                alt="Media"
                src={post.mediaUrl!}
                fill
                className="rounded-md object-cover"
              />
            </div>
          ))
        ) : (
          <div className="flex-center size-24">No media yet.</div>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
