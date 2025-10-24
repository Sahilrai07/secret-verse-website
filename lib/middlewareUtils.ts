import { NextResponse } from "next/server";
import { publicRoutes, authRoutes, roleBasedRoutes, DEFAULT_REDIRECTS } from "../route";

export const isApiOrAuthRoute = (pathname: string) => {
  return pathname.startsWith("/api/auth") || authRoutes.some((r) => pathname.startsWith(r));
};

export const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((r) => pathname.startsWith(r));
};

export const handleUnauthorizedRedirect = (req: Request) => {
  console.log("🚫 Not logged in, redirecting to /auth/login");
  return NextResponse.redirect(new URL("/auth/login", req.url));
};

export const handleRoleRedirect = (req: Request, role: string, pathname: string) => {
  console.log(`🚫 User role "${role}" cannot access "${pathname}", redirecting to /unauthorized`);
  return NextResponse.redirect(new URL("/unauthorized", req.url));
};

export const handleDefaultRedirect = (req: Request, userRole: string) => {
  const redirectUrl =
    userRole && userRole in DEFAULT_REDIRECTS
      ? DEFAULT_REDIRECTS[userRole as keyof typeof DEFAULT_REDIRECTS]
      : "/";
  console.log(`➡ Redirecting "${userRole}" to ${redirectUrl}`);
  return NextResponse.redirect(new URL(redirectUrl, req.url));
};

export const canAccessRoleRoute = (role: string, pathname: string) => {
  for (const r in roleBasedRoutes) {
    const allowedPaths = roleBasedRoutes[r];
    if (allowedPaths.some((path) => pathname.startsWith(path))) {
      return r === role;
    }
  }
  return true;
};
