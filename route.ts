// route.ts

// ✅ Publicly accessible (no login required)
export const publicRoutes = ["/", "/unauthorized"];

// ✅ Authentication routes (should not be accessible after login)
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-email",
];

// ✅ API prefix (NextAuth endpoints)
export const apiAuthPrefix = "/auth";

// ✅ Default redirects after login based on role
export const DEFAULT_REDIRECTS = {
  USER: "/shop",
  ADMIN: "/admin/dashboard",
  VENDOR: "/vendor/dashboard",
} as const;

// ✅ Role-based protected routes
export const roleBasedRoutes: Record<string, string[]> = {
  ADMIN: ["/admin"],
  VENDOR: ["/vendor"],
  USER: ["/shop"], // optional if you want user-only routes
};

// ✅ Protected routes = union of all role-based routes
export const protectedRoutes = Object.values(roleBasedRoutes).flat();
