import { NextRequest } from "next/server";
import {
  isApiOrAuthRoute,
  isPublicRoute,
  handleUnauthorizedRedirect,
  canAccessRoleRoute,
  handleRoleRedirect,
  handleDefaultRedirect,
} from "./lib/middlewareUtils";
import { getAuthUser } from "./lib/authCheck";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1️⃣ Skip API/Auth routes
  if (isApiOrAuthRoute(pathname)) return null;

  // 2️⃣ Skip public routes
  if (isPublicRoute(pathname)) return null;

  // 3️⃣ Get user (lazy import)
  const user = await getAuthUser(req);

  // 4️⃣ Unauthenticated → redirect to login
  if (!user) return handleUnauthorizedRedirect(req);

  // 5️⃣ Role-based restriction
  if (!canAccessRoleRoute(user.role!, pathname)) {
    return handleRoleRedirect(req, user.role!, pathname);
  }

  // 6️⃣ Redirect base "/" → dashboard
  if (pathname === "/") {
    return handleDefaultRedirect(req, user.role!);
  }

  // ✅ Continue
  return null;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
