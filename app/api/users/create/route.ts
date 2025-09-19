import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();
    const vendorId =
      currentUser && typeof currentUser === "object" && "id" in currentUser
        ? currentUser.id
        : currentUser;
      console.log("Current user:", currentUser);

    console.log("Creating user with data:", body, "Vendor ID:", vendorId);

    const {
      fullName, // ✅ expect `name`
      email,
      phone,
      gender,
      address,
      city,
      state,
      country,
      dateOfBirth,
      password,
      role,
    } = body;

    const name = fullName; // 👈 Map it here

    // ✅ Required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // ✅ check if vendor exists
    if (vendorId) {
      const vendor = await prisma.vendor.findUnique({
        where: { id: vendorId },
      });
      if (!vendor) {
        return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
      }
    }

    // ✅ Hash password before storing
    const hashedPassword = await hashPassword(password);

    // ✅ Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        gender,
        address,
        city,
        state,
        country,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        password: hashedPassword,
        vendorId: vendorId,
        role: role || "USER", // Default to USER if not provided
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
