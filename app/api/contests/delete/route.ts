import { S3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const contestId = body.contestId;

    if (!contestId) {
      return NextResponse.json(
        { message: "Contest ID is required" },
        { status: 400 }
      );
    }

    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
    });

    if (!contest) {
      return NextResponse.json(
        { message: "Contest not found" },
        { status: 404 }
      );
    }

    if (contest.image) {
      try {
        const s3BaseUrl = process.env.NEXT_PUBLIC_TIGRIS_PUBLIC_BASE_URL || "";
        const key = contest.image.replace(`${s3BaseUrl}/`, "");

        const command = new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
        });
        await S3.send(command);
      } catch (s3Error) {
        console.error("Failed to delete image from S3:", s3Error);
        // Proceed anyway — image delete failure shouldn't block product delete
      }
    }

    await prisma.contest.delete({
      where: { id: contestId },
    });

    return NextResponse.json(
      { message: "Contest deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contest delete error:", err);
    return NextResponse.json(
      { message: "Failed to delete contest" },
      { status: 500 }
    );
  }
}
