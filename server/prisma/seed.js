import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        name: "user",
        canBook: true,
        canCustomize: false,
        canManageUsers: false,
        canAccessAnalytics: false,
      },
      {
        name: "admin",
        canBook: true,
        canCustomize: true,
        canManageUsers: true,
        canAccessAnalytics: true,
      },
    ],
  });

  await prisma.language.createMany({
    data: [
      { code: "en", name: "English", isDefault: true },
      { code: "sw", name: "Swedish", isDefault: false },
    ],
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });