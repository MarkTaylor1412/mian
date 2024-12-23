"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to follow!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to block!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follow.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to accept follow request!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to decline follow request!");
  }
};

export const updateProfile = async (
  previousState: { success: boolean; failed: boolean },
  payload: { formData: FormData; coverUrl: string },
) => {
  const { formData, coverUrl } = payload;

  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== ""),
  );

  const Profile = z.object({
    coverUrl: z.string().max(255).optional(),
    firstname: z.string().max(25).optional(),
    surname: z.string().max(25).optional(),
    bio: z.string().max(255).optional(),
    education: z.string().max(100).optional(),
    nationality: z.string().max(100).optional(),
    externalLink: z.string().max(100).optional(),
  });

  const validatedFields = Profile.safeParse({ ...filteredFields, coverUrl });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    // throw new Error("Invalid fields");
    return {
      success: false,
      failed: true,
    };
  }

  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });

    console.log(validatedFields.data);

    return {
      success: true,
      failed: false,
    };
  } catch (error) {
    console.log(error);
    // throw new Error("Unable to update profile!");
    return {
      success: false,
      failed: true,
    };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingLike = await prisma.postLike.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to like post!");
  }
};

export const addPost = async (formData: FormData, mediaUrl: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  const content = formData.get("content") as string;

  const Content = z.string().min(1).max(255);
  const validatedContent = Content.safeParse(content);

  if (!validatedContent.success) {
    return;
  }

  try {
    await prisma.post.create({
      data: {
        userId,
        content: validatedContent.data,
        mediaUrl,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to add post!");
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete post!");
  }
};

export const addComment = async (postId: number, message: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    const createdComment = await prisma.comment.create({
      data: {
        postId,
        userId,
        message,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to add comment!");
  }
};

export const deleteComment = async (commentId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete comment!");
  }
};

export const addStory = async (mediaUrl: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        mediaUrl,
        expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Unable to add story!");
  }
};

export const deleteStory = async (storyId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.story.delete({
      where: {
        id: storyId,
        userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Unable to delete story!");
  }
};
