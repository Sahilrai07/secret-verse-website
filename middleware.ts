import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  publicRoutes,
  roleBasedRoutes,
  DEFAULT_REDIRECTS,
} from "./route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as keyof typeof roleBasedRoutes | undefined;
const isVerified =
  (req.auth?.user?.isVerified || req.auth?.user?.emailVerified) ?? false;
  // console.log("user", req.auth?.user); 


  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const verificationRoutes = ["/auth/verify", "/auth/verify-complete"];
  const isVerificationRoute = verificationRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // ✅ Allow NextAuth API routes
  if (isApiAuthRoute) return null;

  // ✅ Redirect ONLY logged-in but not verified users (except when already on verification flow)
  if (isLoggedIn && !isVerified && !isVerificationRoute) {
    return NextResponse.redirect(new URL("/auth/verify-email", req.url));
  }

  // ✅ Block logged-in verified users from hitting /auth/* (except verification routes)
  if (isLoggedIn && isVerified && pathname.startsWith("/auth") && !isVerificationRoute) {
    const role = userRole as keyof typeof DEFAULT_REDIRECTS | undefined;
    const redirectUrl =
      (role && DEFAULT_REDIRECTS[role]) || DEFAULT_REDIRECTS.USER;

    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // ✅ Force unauthenticated users to login (unless route is public or verification flow)
  if (isLoggedIn && !isPublicRoute && !isVerificationRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ Role-based access control (only for verified users)
  if (isLoggedIn && isVerified && userRole) {
    const allowedRoutes = roleBasedRoutes[userRole] || [];

    const isRestricted =
      Object.values(roleBasedRoutes)
        .flat()
        .some((route) => pathname.startsWith(route)) &&
      !allowedRoutes.some((route) => pathname.startsWith(route));

    if (isRestricted) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // ✅ Default allow
  return null;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
