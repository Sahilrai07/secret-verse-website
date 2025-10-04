import { getVerificationTokenByEmail } from "@/data/verifciation-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

const verificationToken = await prisma.verificationToken.create({
  data: {
    email,               // ✅ custom field
    identifier: email,   // ✅ still required by NextAuth
    token,
    expires,
  },
});

  return verificationToken;
};
