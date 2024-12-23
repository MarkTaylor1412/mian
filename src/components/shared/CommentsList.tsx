"use client";

import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useOptimistic, useState } from "react";
import { addComment } from "@/lib/actions";

type CommentProps = Comment & { user: User };

const CommentsList = ({
  comments,
  postId,
}: {
  comments: CommentProps[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [message, setMessage] = useState("");

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentState,
    (state, value: CommentProps) => [value, ...state],
  );

  const handleAddComment = async () => {
    if (!user || !message) return;

    addOptimisticComments({
      id: Math.random(),
      message,
      postId: postId,
      userId: user.id,
      user: {
        id: user.id,
        username: "Working on it...",
        avatarUrl: user.imageUrl || "/avatar.svg",
        coverUrl: "",
        firstname: "",
        surname: "",
        bio: "",
        education: "",
        nationality: "",
        externalLink: "",
        createdAt: new Date(Date.now()),
      },
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    try {
      const createdComment = await addComment(postId, message);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {}
  };

  return (
    <>
      {user && (
        <div className="flex flex-row items-center gap-4">
          <Image
            alt="Avatar"
            src={user.imageUrl || "/avatar.svg"}
            width={32}
            height={32}
            className="size-8 rounded-full ring-2"
          />

          <form
            action={handleAddComment}
            className="light-sm relative flex w-full flex-1 flex-row items-center justify-between rounded-xl bg-accent p-1"
          >
            <Input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent pr-12"
              onChange={(e) => setMessage(e.target.value)}
            />

            <Image
              alt="Emoji"
              src={"/emoji-smile.svg"}
              width={16}
              height={16}
              className="image-invert absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </form>
        </div>
      )}

      {/* //# COMMENTS */}
      <div>
        {optimisticComments.map((comment) => (
          <div
            className="mt-6 flex-center flex-row gap-4"
            key={comment.id}
          >
            <Image
              alt="Avatar"
              src={comment.user.avatarUrl || "/avatar.svg"}
              width={40}
              height={40}
              className="size-10 rounded-full ring-1"
            />

            <div className="light-sm flex flex-1 flex-col gap-2">
              <span className="font-medium">{comment.user.username}</span>

              <p>{comment.message}</p>

              
            </div>

            <div className="flex-center flex-col gap-1">
              <Image
                alt="Like"
                src={"/like.svg"}
                width={12}
                height={12}
                className="image-invert cursor-pointer"
              />
              <Image
                alt="Reply"
                src={"/reply.svg"}
                width={12}
                height={12}
                className="image-invert cursor-pointer"
              />
              <Image
                alt="Delete"
                src={"/delete.svg"}
                width={12}
                height={12}
                className="image-invert cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentsList;
