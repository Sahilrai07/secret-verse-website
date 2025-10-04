"use server";

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schema";
import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const userRegister = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validated = RegisterSchema.safeParse(values);

    if (!validated.success) {
      return { error: "Invalid data" };
    }

    const { name, email, password } = validated.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send verification email

    const verifciationToken = await generateVerificationToken(email);
    // console.log("Verification Token:", verifciationToken);

    await sendVerificationEmail(
      verifciationToken.email,
      verifciationToken.token
    );

    return { success: "Registration successful. Please verify your email." };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
};

export const userLogin = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) {
      return { error: "Invalid data" };
    }

    const { email, password } = validated.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "User not found" };
    }

    const isVerifed = user.emailVerified || user.isVerified;
    if (!isVerifed) {
      return {
        error: "Please verify your email to login",
      };
    }

    await signIn("credentials", { email, password, redirectTo: "/" });
    return { success: "Login successful", user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Authentication error" };
      }
    }
    console.error("Login error:", error);
    throw error;
  }
};
