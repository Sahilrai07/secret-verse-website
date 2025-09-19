import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3Client";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = body.productId;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // If image key or URL exists, delete from S3
    if (product.image) {
      try {
        // Parse out the key from the image URL
        const s3BaseUrl = process.env.NEXT_PUBLIC_TIGRIS_PUBLIC_BASE_URL || "";
        const key = product.image.replace(`${s3BaseUrl}/`, "");

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

    // Delete the product from DB
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Product delete error:", err);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
