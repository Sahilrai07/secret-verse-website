import { hashPassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // disables static build
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = generateToken({ id: newAdmin.id, role: newAdmin.role });

    if (!token) {
      return NextResponse.json(
        { error: "Failed to generate token" },
        { status: 500 }
      );
    }

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, // 7 days
    });

    return NextResponse.json(
      {
        message: "Admin created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
