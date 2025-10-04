import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { vendor, store } = data;

    // Check if vendor email already exists
    const existing = await prisma.vendor.findUnique({
      where: { email: vendor.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Vendor with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(vendor.password, 10);

    // Create Vendor + Store
    const newVendor = await prisma.vendor.create({
      data: {
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone,
        password: hashedPassword,
        role: "VENDOR",
        isApproved: false,
        stores: {
          create: {
            name: store.name,
            description: store.description,
            logo: store.logo,
            banner: store.banner,
          },
        },
      },
      include: { stores: true },
    });

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    console.error("Vendor Registration Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
