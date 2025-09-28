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

// type UserRole = keyof typeof roleBasedRoutes;

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as
    | keyof typeof roleBasedRoutes
    | undefined;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // ✅ Allow NextAuth API routes (e.g. /auth/session, /auth/callback)
  if (isApiAuthRoute) return null;

  // ✅ Block logged-in users from accessing ANY /auth/* pages (login, register, etc.)
  if (isLoggedIn && pathname.startsWith("/auth")) {
    const role = userRole as keyof typeof DEFAULT_REDIRECTS | undefined;
    const redirectUrl =
      (role && DEFAULT_REDIRECTS[role]) || DEFAULT_REDIRECTS.USER;

    return NextResponse.redirect(new URL(redirectUrl, nextUrl));
  }

  // ✅ Force unauthenticated users to login if route isn’t public
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // ✅ Role-based access control
  if (isLoggedIn && userRole) {
    const allowedRoutes = roleBasedRoutes[userRole] || [];

    const isRestricted =
      Object.values(roleBasedRoutes)
        .flat()
        .some((route) => pathname.startsWith(route)) &&
      !allowedRoutes.some((route) => pathname.startsWith(route));

    if (isRestricted) {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  // ✅ Default: allow access
  return null;
});

export const config = {
  // Protect everything except Next.js internals & static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
