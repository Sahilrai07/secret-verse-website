import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const contests = await prisma.contest.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
    });

    // No need to JSON.stringify — NextResponse.json handles it
    return NextResponse.json({ contests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured contests:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured contests" },
      { status: 500 }
    );
  }
}
