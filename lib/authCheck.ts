// utils/getAuthUser.ts
import { NextRequest } from "next/server";
import type { Session } from "next-auth";

/**
 * Dynamically imports the auth function to reduce Edge Function bundle size.
 * Retrieves the authenticated user from the request in a type-safe way.
 */
export async function getAuthUser(req: NextRequest) {
  // Lazy import keeps middleware small (<1MB)
  const authModule = await import("@/auth");
  const auth = authModule.auth as (request: unknown) => Promise<Session | null>;

  const session = await auth(req);
  return session?.user ?? null;
}