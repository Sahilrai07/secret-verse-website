import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    const vendorId = currentUser?.id;

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // check if the vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    // Fetch all users associated with the vendorid

    const users = await prisma.user.findMany({
      where: {
        vendorId: vendorId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
