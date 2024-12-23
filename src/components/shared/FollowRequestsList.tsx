"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import { CheckCircle2, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useState } from "react";

type FollowRequestProps = FollowRequest & {
  sender: User;
};

const FollowRequestsList = ({
  requests,
}: {
  requests: FollowRequestProps[];
}) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    deleteOptimisticRequests(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    deleteOptimisticRequests(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequests, deleteOptimisticRequests] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((req) => req.id !== value),
  );

  return (
    <>
      {optimisticRequests.map((request) => (
        <div
          className="flex-between flex-row gap-4"
          key={request.id}
        >
          <Link href={`/profile/${request.sender.username}`}>
            <div className="flex-center flex-row gap-3">
              <Image
                alt="Avatar"
                src={request.sender.avatarUrl || "/avatar.svg"}
                width={28}
                height={28}
                className="size-7 rounded-full object-cover ring-2"
              />

              <span className="font-medium">{request.sender.username}</span>
            </div>
          </Link>

          <div className="flex-end flex-row gap-1 rounded-xl bg-accent">
            <form action={() => accept(request.id, request.sender.id)}>
              <button className="p-1">
                <CheckCircle2
                  size={20}
                  className="cursor-pointer fill-blue-500 hover:fill-blue-600 active:fill-blue-700"
                />
              </button>
            </form>

            <form action={() => decline(request.id, request.sender.id)}>
              <button className="p-1">
                <CircleX
                  size={20}
                  className="cursor-pointer fill-red-500 hover:fill-red-600 active:fill-red-700"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FollowRequestsList;
