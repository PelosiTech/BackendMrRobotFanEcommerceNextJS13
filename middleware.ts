import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // // redirect them to organization selection page
    // console.log(auth)
    // if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-selection"){
    //   const orgSelection = new URL('/', req.url)
    //   return NextResponse.redirect(orgSelection)
    // }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
