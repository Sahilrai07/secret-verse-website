import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
  try {
    const body: { vendorId?: string } = await req.json();

    const vendorId = body.vendorId;

    if (!vendorId || typeof vendorId !== "string") {
      return NextResponse.json(
        { message: "Vendor ID is required and must be a string" },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return NextResponse.json(
        { error: "Vendor not found" },
        { status: 404 }
      );
    }

    await prisma.vendor.delete({
      where: { id: vendorId },
    });

    return NextResponse.json(
      { message: "Vendor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("vendor delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete vendor" },
      { status: 500 }
    );
  }
}
