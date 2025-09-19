import { uploadRequestionSchema } from "@/lib/zodSchemas";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3Client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = uploadRequestionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (!process.env.S3_BUCKET_NAME) {
      return NextResponse.json(
        { error: "S3_BUCKET_NAME is not defined" },
        { status: 500 }
      );
    }

    const { fileName, contentType } = result.data;
    const uniqueKey = `${uuidV4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      // ContentLength: size, // optional — remove if causing issues
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });

    return NextResponse.json({
      presignedUrl,
      key: uniqueKey,
    });
  } catch (error) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
