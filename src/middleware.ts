import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-up(.*)", "/sign-in(.*)"]);
const isProtectedRoute = createRouteMatcher(["/settings(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  // ? DOUBLE CHECK THIS ONE.
  // if (!isPublicRoute(req)) {
  //   await auth.protect();
  // }

  const authStatus = await auth();
  console.log("Auth status:", authStatus);

  console.log("Processing request for:", req.url);

  if (isProtectedRoute(req)) {
    console.log("Protected route detected:", req.url);
    auth.protect();
  } else {
    console.log("No protection applied for:", req.url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

console.log("Middleware matcher applied:", config.matcher);
