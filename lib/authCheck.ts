import { NextRequest } from "next/server";

export async function getAuthUser(req: NextRequest) {
  const { auth } = await import("@/auth"); // Lazy import (reduces bundle size)
  const session = await auth(req);
  return session?.user || null;
}
