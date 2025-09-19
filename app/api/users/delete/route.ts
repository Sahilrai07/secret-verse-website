import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const body: { userId?: string } = await req.json();

    const userId = body.userId;

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { message: "user ID is required and must be a string" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("user delete error:", error);
    return NextResponse.json(
      { message: "Failed to user vendor" },
      { status: 500 }
    );
  }
}
