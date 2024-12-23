import { Post as PostType, User } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import CommentSection from "./CommentSection";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostOptions from "./PostOptions";
import { auth } from "@clerk/nextjs/server";

type PostProps = PostType & { user: User } & { likes: [{ userId: string }] } & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: PostProps }) => {
  const { userId: currentUserId } = await auth();

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md">
      {/* //# USER */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            alt="Avatar"
            src={post.user.avatarUrl || "/avatar.svg"}
            width={40}
            height={40}
            className="size-10 rounded-full ring-2"
          />

          <span className="">{post.user.username}</span>
        </div>

        {currentUserId === post.userId && <PostOptions postId={post.id} />}
      </div>

      {/* //# CONTENT */}
      <div className="flex flex-col gap-4">
        {post.mediaUrl && (
          <div className="relative min-h-96 w-full">
            <Image
              alt="Post"
              src={post.mediaUrl}
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}

        <p>{post.content}</p>
      </div>

      {/* //# INTERACTION */}
      <Suspense fallback={"Post Interaction..."}>
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>

      <Suspense fallback={"Comment Section..."}>
        <CommentSection postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
