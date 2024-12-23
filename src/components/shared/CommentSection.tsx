import prisma from "@/lib/client";
import CommentsList from "./CommentsList";

const CommentSection = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="">
      <CommentsList
        comments={comments}
        postId={postId}
      />
    </div>
  );
};

export default CommentSection;
