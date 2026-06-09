const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("MongoDB Connected via Prisma");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };