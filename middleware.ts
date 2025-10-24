



import { auth } from "@/auth";
import { isApiOrAuthRoute ,isPublicRoute,handleUnauthorizedRedirect,canAccessRoleRoute,handleRoleRedirect,handleDefaultRedirect} from "./lib/middlewareUtils";


export default auth(async (req) => {
  const pathname = req.nextUrl.pathname;
  const user = req.auth?.user;

  // ✅ Allow NextAuth API endpoints
  if (isApiOrAuthRoute(pathname)) return null;

  // ✅ Allow public routes
  if (isPublicRoute(pathname)) return null;

  // 🚫 Not logged in → redirect to login
  if (!user) return handleUnauthorizedRedirect(req);

  

  // 🔒 Role-based access
  if (!canAccessRoleRoute(user.role!, pathname)) {
    return handleRoleRedirect(req, user.role!, pathname);
  }

  // 🏠 Redirect "/" → role-based dashboard
  if (pathname === "/") {
    return handleDefaultRedirect(req, user.role!);
  }

  // ✅ Continue as normal
  return null;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
