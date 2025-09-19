import { comparePassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const adminCode = process.env.ADMIN_CODE!;

export async function POST(req: Request) {
  try {
    const { email, password, code } = await req.json();

    if (!email || !password || !code) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    if (code !== adminCode) {
      return NextResponse.json(
        { error: "Invalid admin code" },
        { status: 403 }
      );
    }

    const token = generateToken({ id: admin.id, role: admin.role });

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

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
