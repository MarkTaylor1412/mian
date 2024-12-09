import { User } from "@prisma/client";
import { Suspense } from "react";
import FollowRequests from "./FollowRequests";
import InfoCard from "./InfoCard";
import MediaCard from "./MediaCard";
import ProfileCard from "./ProfileCard";
import ThemeToggle from "./ThemeToggle";

const RightSideBar = ({
  user,
  type,
}: {
  user?: User;
  type: "home" | "profile";
}) => {
  return (
    <div className="mr-4 flex flex-col gap-6 rounded-lg">
      {type === "home" && (
        <Suspense fallback="Loading...">
          <ProfileCard />
        </Suspense>
      )}

      {user ? (
        <>
          <Suspense fallback="Loading...">
            <InfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <MediaCard user={user} />
          </Suspense>
        </>
      ) : null}

      <FollowRequests />
      {/* <Birthdays /> */}
      {/* <Advertisement size="md" /> */}
      <ThemeToggle />
    </div>
  );
};

export default RightSideBar;
