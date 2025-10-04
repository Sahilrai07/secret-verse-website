import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";
import { LoginSchema } from "./schema";
import { getUserByEmail, getUserById } from "./data/user";
import { comparePassword } from "./lib/hash";
import { prisma } from "./lib/prisma";

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
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "USER",
          isVerified: user.isVerified,
          emailVerified: user.emailVerified,
        };
      },
    }),
  ],

  events: {
    // ✅ Ensure any OAuth user is verified
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);

      // ✅ OAuth users → always verified
      if (account?.provider !== "credentials") {
        if (existingUser && !existingUser.isVerified) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { isVerified: true },
          });
        }
        return true;
      }

      // ✅ Credentials users → require verified email
      // if (!existingUser?.emailVerified) {
      //   return "/auth/verify-email";
      // }
      // if (!existingUser.isVerified) {
      //   return false;
      // }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "USER";
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

  session: {
    strategy: "jwt",
  },
};

export default authConfig;
