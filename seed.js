import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  const users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
    {
      name: "Vendor",
      email: "vendor@gmail.com",
      password: await bcrypt.hash("vendor123", 10),
      role: "VENDOR",
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`⚠️ ${user.role} already exists — skipping.`);
      continue;
    }

    await prisma.user.create({ data: user });
    console.log(`✅ Created default ${user.role}: ${user.email}`);
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
