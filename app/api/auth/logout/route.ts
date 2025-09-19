// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Clear the token cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
  });

  return NextResponse.json({ message: "Logged out" });
}
