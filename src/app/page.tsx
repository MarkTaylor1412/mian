import AddPost from "@/components/shared/AddPost";
import Feed from "@/components/shared/Feed";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import Stories from "@/components/shared/Stories";
import Topbar from "@/components/shared/Topbar";
import React from "react";

const Homepage = () => {
  return (
    <div className="">
      <Topbar />

      <div className="flex flex-row gap-6 bg-background pt-6 top-24 relative">
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
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
