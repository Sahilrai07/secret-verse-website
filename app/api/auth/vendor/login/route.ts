import { comparePassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingVendor = await prisma.vendor.findUnique({
      where: { email },
    });

    if (!existingVendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const isPasswordValid = await comparePassword(
      password,
      existingVendor.password
    );

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken({
      id: existingVendor.id,
      role: existingVendor.role,
    });

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Exclude password from response
    const { password: _, ...vendorWithoutPassword } = existingVendor;

    return NextResponse.json(
      {
        message: "Login successful",
        vendor: vendorWithoutPassword,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
