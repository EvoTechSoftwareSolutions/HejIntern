import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Clean existing records (optional, but good for clean/re-seeding)
  console.log("Cleaning database...");
  await prisma.stay.deleteMany({});
  await prisma.tourPackage.deleteMany({});
  await prisma.theme.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.language.deleteMany({});

  // 2. Roles
  console.log("Seeding Roles...");
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

  // 3. Languages
  console.log("Seeding Languages...");
  await prisma.language.createMany({
    data: [
      { code: "en", name: "English", isDefault: true },
      { code: "sw", name: "Swedish", isDefault: false },
    ],
  });

  const adminRole = await prisma.role.findFirst({ where: { name: "admin" } });
  const defaultLanguage = await prisma.language.findFirst({ where: { isDefault: true } });

  const adminPasswordHash = await bcrypt.hash("Admin@1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@hejceylon.com" },
    update: {
      username: "admin",
      passwordHash: adminPasswordHash,
      roleId: adminRole.id,
      languageId: defaultLanguage.id,
      isVerified: true,
    },
    create: {
      username: "admin",
      email: "admin@hejceylon.com",
      passwordHash: adminPasswordHash,
      roleId: adminRole.id,
      languageId: defaultLanguage.id,
      isVerified: true,
    },
  });

  // 4. Themes
  console.log("Seeding Themes...");
  const themeAdventure = await prisma.theme.create({
    data: { theme_name: "Adventure", theme_slug: "adventure", description: "Get your adrenaline rush!" },
  });
  const themeNature = await prisma.theme.create({
    data: { theme_name: "Nature", theme_slug: "nature", description: "Witness nature in its purest form" },
  });
  const themeRelax = await prisma.theme.create({
    data: { theme_name: "Relax", theme_slug: "relax", description: "Unwind by turquoise waters" },
  });
  const themeHeritage = await prisma.theme.create({
    data: { theme_name: "Heritage", theme_slug: "heritage", description: "Dive into history and traditions" },
  });
  const themeWildlife = await prisma.theme.create({
    data: { theme_name: "Wildlife", theme_slug: "wildlife", description: "Witness wildlife in its natural habitat" },
  });

  // 5. Tour Packages
  console.log("Seeding Tour Packages...");
  const tourData = [
    {
      package_name: "Temple of the Tooth",
      package_name_sv: "Tandtemplet",
      package_slug: "temple-of-the-tooth",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Utforska Sri Lankas skönhet med detta exklusiva turistpaket.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "Upptäck fantastiska vyer och lokal kultur i detta fantastiska paket.",
      theme_id: themeAdventure.id,
      duration_days: 3,
      base_price: 1000,
      rating: 4.5,
      reviews: 14,
      image: "sigiriya",
      location: "Kandy, Sri Lanka",
      category: "Adventure",
    },
    {
      package_name: "Nine Arch Bridge",
      package_name_sv: "Nine Arch Bridge",
      package_slug: "nine-arch-bridge",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Njut av en underbar tillflyktsort i naturen.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "Avkopplande naturupplevelser med fantastisk utsikt över broarna.",
      theme_id: themeNature.id,
      duration_days: 2,
      base_price: 300,
      rating: 4.8,
      reviews: 42,
      image: "sigiriya",
      location: "Ella, Sri Lanka",
      category: "Nature",
    },
    {
      package_name: "Thalpe Beach",
      package_name_sv: "Thalpe Strand",
      package_slug: "thalpe-beach",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Koppla av vid det turkosa vattnet på Sri Lankas sydkust.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "En underbar strandupplevelse med fantastiska vyer.",
      theme_id: themeRelax.id,
      duration_days: 4,
      base_price: 200,
      rating: 4.6,
      reviews: 31,
      image: "sigiriya",
      location: "Thalpe, Sri Lanka",
      category: "Relax",
    },
    {
      package_name: "Sigiriya Rock Fortress",
      package_name_sv: "Sigiriya Klippfästning",
      package_slug: "sigiriya-rock-fortress",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Se soluppgången över den antika lejoklippan.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "En kulturell resa tillbaka i tiden med moderna bekvämligheter.",
      theme_id: themeHeritage.id,
      duration_days: 3,
      base_price: 250,
      rating: 4.7,
      reviews: 28,
      image: "sigiriya",
      location: "Sigiriya, Sri Lanka",
      category: "Heritage",
    },
    {
      package_name: "Galle Fort Explorer",
      package_name_sv: "Galle Fort Utforskare",
      package_slug: "galle-fort-explorer",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Utforska historien och kulturen i Galle Fort.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "Fascinerande arkitektur och historia i den gamla holländska staden.",
      theme_id: themeHeritage.id,
      duration_days: 2,
      base_price: 150,
      rating: 4.9,
      reviews: 56,
      image: "sigiriya",
      location: "Galle, Sri Lanka",
      category: "Heritage",
    },
    {
      package_name: "Nuwara Eliya Tea Trail",
      package_name_sv: "Nuwara Eliya Tespår",
      package_slug: "nuwara-eliya-tea-trail",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Vandra genom grönskande teodlingar i höglandet.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "En smakrik resa där du lär dig allt om det berömda ceylonteet.",
      theme_id: themeNature.id,
      duration_days: 3,
      base_price: 220,
      rating: 4.6,
      reviews: 38,
      image: "sigiriya",
      location: "Nuwara Eliya, Sri Lanka",
      category: "Nature",
    },
    {
      package_name: "Mirissa Whale Watch",
      package_name_sv: "Mirissa Valsafari",
      package_slug: "mirissa-whale-watch",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Åk ut på havet och upplev majestätiska blåvalar.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "Ett spännande havsäventyr på jakt efter havets giganter.",
      theme_id: themeAdventure.id,
      duration_days: 1,
      base_price: 180,
      rating: 4.5,
      reviews: 22,
      image: "sigiriya",
      location: "Mirissa, Sri Lanka",
      category: "Adventure",
    },
    {
      package_name: "Yala Safari Jeep",
      package_name_sv: "Yala Safari Jeep",
      package_slug: "yala-safari-jeep",
      short_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      short_description_sv: "Upplev ett oförglömligt safari i Yala nationalpark.",
      full_description: "Lorem Ipsum is simply dummy text of the printing and type setting industry.",
      full_description_sv: "Se leoparder, elefanter och exotiska fåglar i deras naturliga livsmiljö.",
      theme_id: themeWildlife.id,
      duration_days: 2,
      base_price: 400,
      rating: 4.8,
      reviews: 47,
      image: "sigiriya",
      location: "Yala, Sri Lanka",
      category: "Wildlife",
    },
  ];

  for (const tour of tourData) {
    await prisma.tourPackage.create({ data: tour });
  }

  // 6. Stays
  console.log("Seeding Stays...");
  const stayData = [
    { name: "Amanwella Resort", name_sv: "Amanwella Resort", location: "Tangalle, Southern Province", location_sv: "Tangalle, Södra provinsen", rating: 4.5, image: "stay", featured: true },
    { name: "Heritance Kandalama", name_sv: "Heritance Kandalama", location: "Dambulla, Central Province", location_sv: "Dambulla, Centrala provinsen", rating: 4.8, image: "stay", featured: false },
    { name: "Cape Weligama", name_sv: "Cape Weligama", location: "Weligama, Southern Province", location_sv: "Weligama, Södra provinsen", rating: 4.7, image: "stay", featured: false },
    { name: "Jetwing Surf", name_sv: "Jetwing Surf", location: "Arugam Bay, Eastern Province", location_sv: "Arugam Bay, Östra provinsen", rating: 4.6, image: "stay", featured: false },
    { name: "Wild Coast Tented Lodge", name_sv: "Wild Coast Tented Lodge", location: "Yala, Southern Province", location_sv: "Yala, Södra provinsen", rating: 4.9, image: "stay", featured: false },
    { name: "Santani Wellness Resort", name_sv: "Santani Hälsocenter", location: "Kandy, Central Province", location_sv: "Kandy, Centrala provinsen", rating: 4.7, image: "stay", featured: false },
    { name: "Tri Lanka", name_sv: "Tri Lanka", location: "Koggala Lake, Southern Province", location_sv: "Koggala Lake, Södra provinsen", rating: 4.8, image: "stay", featured: false },
    { name: "The Fortress Resort", name_sv: "The Fortress Resort", location: "Koggala, Southern Province", location_sv: "Koggala, Södra provinsen", rating: 4.6, image: "stay", featured: false },
  ];

  await prisma.stay.createMany({ data: stayData });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });