"use client";

import { FollowRequest, User } from "@prisma/client";
import { CheckCircle2, CircleX } from "lucide-react";
import Image from "next/image";

type RequestWithUserProps = FollowRequest & {
  sender: User;
};

const FollowRequestsList = ({
  requests,
}: {
  requests: RequestWithUserProps[];
}) => {
  return (
    <>
      {requests.map(request => (
        <div className="flex-between flex-row gap-4" key={request.id}>
        <div className="flex-center flex-row gap-2">
          <Image
            alt="Avatar"
            src={request.sender.avatarUrl || "/avatar.svg"}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover ring-2"
          />

          <span className="font-medium">{request.sender.username}</span>
        </div>

        <div className="flex-end flex-row gap-2 rounded-xl bg-muted p-1">
          <CheckCircle2
            size={20}
            className="cursor-pointer fill-blue-500 hover:fill-blue-600 active:fill-blue-700"
          />
          <CircleX
            size={20}
            className="cursor-pointer fill-red-500 hover:fill-red-600 active:fill-red-700"
          />
        </div>
      </div>
      ))  
    }
    </>
  );
};

export default FollowRequestsList;
