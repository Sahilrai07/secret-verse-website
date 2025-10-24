import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  publicRoutes,
  authRoutes,
  roleBasedRoutes,
  DEFAULT_REDIRECTS,
} from "@/route"; // small constants only
import { getAuthUser } from "./authCheck";

export async function handleMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const user = await getAuthUser(req);

  // Allow NextAuth API endpoints
  if (pathname.startsWith("/api/auth") || authRoutes.some(r => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Public routes
  const isPublic = publicRoutes.some(r => pathname.startsWith(r));
  if (isPublic) return NextResponse.next();

  // Redirect unauthenticated users
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Role-based routes
  for (const role in roleBasedRoutes) {
    const allowedPaths = roleBasedRoutes[role];
    if (allowedPaths.some(r => pathname.startsWith(r))) {
      if (user.role !== role) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  // Redirect authenticated users from "/" to dashboard
  if (pathname === "/") {
    const redirectUrl =
      user?.role && user.role in DEFAULT_REDIRECTS
        ? DEFAULT_REDIRECTS[user.role as keyof typeof DEFAULT_REDIRECTS]
        : "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  return NextResponse.next();
}
