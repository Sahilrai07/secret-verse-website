import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      country,
      dateOfBirth,
    } = await request.json();

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !country ||
      !dateOfBirth
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingVendor = await prisma.vendor.findUnique({
      where: { email },
    });
    if (existingVendor) {
      return NextResponse.json(
        { error: "Vendor already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newVendor = await prisma.vendor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        state,
        country,
        dateOfBirth: new Date(dateOfBirth),
      },
    });

    return NextResponse.json(
      {
        message: "Vendor created successfully",
        vendor: {
          id: newVendor.id,
          name: newVendor.name,
          email: newVendor.email,
        },
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
