import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "hashedpassword123",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());
