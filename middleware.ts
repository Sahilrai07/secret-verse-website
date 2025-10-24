
import type { NextRequest } from "next/server";
import { handleMiddleware } from "./lib/middlewareUtils";


export default async function middleware(req: NextRequest) {
  return handleMiddleware(req);
}

// Keep the matcher here only
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
   runtime: "nodejs", // 👈 runs as Node function instead of Edge
};

