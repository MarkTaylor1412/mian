"use client";

import { deletePost } from "@/lib/actions";
import { LoaderCircle, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const PostOptions = ({
  postId,
  className,
}: {
  postId: number;
  className?: string;
}) => {
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false);

  const handleDeletePost = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <MoreHorizontal
        className={`cursor-pointer ${className}`}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="flex-center light-sm absolute right-0 top-4 z-30 flex-col gap-5 rounded-lg bg-popover p-4 shadow-md *:cursor-pointer">
          <form action={handleDeletePost}>
            <button
              className="text-red-500 hover:text-red-600 active:text-red-700 disabled:cursor-not-allowed"
              disabled={pending}
            >
              {pending ? (
                <span className="flex-center flex-row gap-1">
                  <LoaderCircle className="animate-spin" />
                  Deleting
                </span>
              ) : (
                <span className="flex-center flex-row gap-1">
                  <Trash />
                  Delete
                </span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostOptions;
