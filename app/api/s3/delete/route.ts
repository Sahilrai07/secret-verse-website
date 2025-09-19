import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3Client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  //   const { searchParams } = new URL(req.url);
  const body = await req.json();
  const key = body.key;

  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("S3 delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
