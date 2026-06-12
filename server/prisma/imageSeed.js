import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Images...");

  // Get a user (uploaded_by FK required)
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("No user found. Create a user first.");
  }

  const images = await prisma.image.createMany({
    data: [
      {
        file_name: "nature-1.jpg",
        file_url: "https://example.com/images/nature-1.jpg",
        file_type: "IMAGE",
        uploaded_by: user.id,
        alt_text_en: "Beautiful nature scenery",
        alt_text_sw: "Asili nzuri",
        entity_type: "theme",
        entity_id: null
      },
      {
        file_name: "nature-2.jpg",
        file_url: "https://example.com/images/nature-2.jpg",
        file_type: "IMAGE",
        uploaded_by: user.id,
        alt_text_en: "Forest landscape",
        alt_text_sw: "Msitu",
        entity_type: "theme",
        entity_id: null
      },
      {
        file_name: "video-1.mp4",
        file_url: "https://example.com/videos/video-1.mp4",
        file_type: "VIDEO",
        uploaded_by: user.id,
        alt_text_en: "Intro video",
        alt_text_sw: "Video ya utangulizi",
        entity_type: "theme",
        entity_id: null
      },
      {
        file_name: "city-1.jpg",
        file_url: "https://example.com/images/city-1.jpg",
        file_type: "IMAGE",
        uploaded_by: user.id,
        alt_text_en: "City night lights",
        alt_text_sw: "Mji usiku",
        entity_type: "theme",
        entity_id: null
      }
    ]
  });

  console.log("✅ Images seeded successfully");
  console.log(images);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });