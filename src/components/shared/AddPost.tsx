// "use server";
import Image from "next/image";
// import React, { useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { Button } from "../ui/button";

const AddPost = () => {
  // const { userId, isLoaded, isSignedIn } = auth();
  // console.log(userId, isLoaded, isSignedIn);

  // const { userId } = useAuth();
  // const { userId, isLoaded, isSignedIn } = useAuth(); // Lấy userId và trạng thái loading từ Clerk
  // console.log(userId, isLoaded, isSignedIn);

  // if (isLoaded) return <span>Loaded</span>
  // if (isSignedIn) return <span>Signed In</span>

  // console.log("userId:", userId);
  // return <span>{userId}</span>

  // useEffect(() => {
  //   if (!isLoaded) return; // Chờ dữ liệu từ Clerk được tải
  //   if (!userId) {
  //     console.log("User is not logged in.");
  //   } else {
  //     console.log("User ID:", userId); // Log userId nếu đã đăng nhập
  //   }
  // }, [userId, isLoaded]);

  // const test = async (formData: FormData) => {
  //   // "use server";

  //   if (!userId) {
  //     console.log("User is not authenticated.");
  //     return;
  //   }
  //   const content = formData.get("content") as string;
  //   try {
  //     const req = await prisma.post.create({
  //       data: {
  //         userId: userId,
  //         content: content,
  //       },
  //     });
  //     console.log("Post created:", req);
  //   } catch (error) {
  //     console.log("Error creating post:", error);
  //   }
  // };

  return (
    <div className="light-sm flex justify-between gap-4 rounded-lg bg-card p-4 shadow-md">
      {/* AVATAR */}
      <Image
        alt="Avatar"
        src={"/taylor.jpg"}
        width={48}
        height={48}
        className="image-invertE my-4 size-12 rounded-full object-cover"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          className="flex flex-row gap-4"
          // action={test}
        >
          <Textarea
            placeholder="What's on your mind?"
            className="flex-1 rounded-lg bg-accent p-2"
            id="content"
            name="content"
          />

          <Button
          // onClick={test}
          >
            Send
          </Button>

          <Image
            alt="Emoji"
            src={"/emoji-smile.svg"}
            width={20}
            height={20}
            className="image-invert cursor-pointer self-end"
          />
        </form>

        {/* POST OPTIONS */}
        <div className="extralight-xs mt-4 flex flex-wrap items-center gap-4">
          <div className="flex cursor-pointer items-center gap-2">
            <Image
              alt="Photo"
              src={"/photo.svg"}
              width={20}
              height={20}
              className="image-invert"
            />
            <p>Photo</p>
          </div>

          <div className="flex cursor-pointer items-center gap-2">
            <Image
              alt="Video"
              src={"/video.svg"}
              width={20}
              height={20}
              className="image-invert"
            />
            <p>Video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
