import AddPost from "@/components/shared/AddPost";
import Feed from "@/components/shared/Feed";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import Stories from "@/components/shared/Stories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Homepage = async() => {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  
  
  return (
    <div className="flex flex-row gap-6 pt-6 relative top-8">
      {/* //# LEFTSIDEBAR */}
      <div className="hidden w-[25%] lg:block">
        <LeftSideBar />
      </div>

      {/* //# CENTRE */}
      <div className="w-full lg:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>

      {/* //# RIGHTSIDEBAR */}
      <div className="hidden w-[25%] lg:block">
        <RightSideBar type="home" />
      </div>
    </div>
  );
};

export default Homepage;
