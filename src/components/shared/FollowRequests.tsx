import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowRequestsList from "./FollowRequestsList";

const FollowRequests = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;

  return (
    <div className="light-sm flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      <div className="flex-between flex-row gap-4 font-medium">
        <span className="text-muted-foreground">Follow Requests</span>
        <span className="link-button">View all</span>
      </div>

      {/* //# REQUESTS */}
      <FollowRequestsList requests={requests} />
    </div>
  );
};

export default FollowRequests;
