import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example: create default admin
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@email.com",
      password: "admin123",
      role: "SUPERADMIN",
      isVerified: true,
    },
  });
}

main()
  .then(() => {
    console.log("✅ Seeding finished");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
