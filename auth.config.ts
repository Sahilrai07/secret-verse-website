import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./schema";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    isVerified?: boolean;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string;
      role?: string;
      isVerified?: boolean;
      emailVerified?: Date | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    role?: string;
    isVerified?: boolean;
    emailVerified?: Date | null;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        // ✅ Skip password check for default admin
        const isDefaultAdmin =
          (user.role === "ADMIN" || user.role === "SUPERADMIN") &&
          user.email === "admin@gmail.com";

        if (!isDefaultAdmin) {
          const match = await comparePassword(password, user.password);
          if (!match) return null;
        }

        const match = await comparePassword(password, user.password);
        if (!match) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "USER",
          isVerified: user.isVerified ?? false,
          emailVerified: user.emailVerified ?? null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified ?? false;
        token.emailVerified = user.emailVerified ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production", // false on localhost
      },
    },
  },

  events: {
    async signIn({ user }) {
      if (user && !user.isVerified) {
        await prisma.user.update({
          where: { id: user.id },
          data: { isVerified: true },
        });
      }
    },
  },
};

export default authConfig;
