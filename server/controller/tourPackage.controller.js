import prisma from "../lib/prisma.js";

export const createTourPackage = async (req, res, next) => {
  try {
    console.log("hit createTourPackage");

    const {
      package_name,
      package_slug,
      short_description,
      full_description,
      theme_id,
      duration_days,
      base_price,
      is_featured,
      status,
    } = req.body;

    // 1. VALIDATION
    if (
      !package_name ||
      !package_slug ||
      !short_description ||
      !full_description ||
      !theme_id ||
      !duration_days ||
      !base_price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. CHECK THEME EXISTS
    const theme = await prisma.theme.findUnique({
      where: {
        id: theme_id,
      },
    });

    if (!theme) {
      return res.status(404).json({
        success: false,
        message: "Theme not found",
      });
    }

    // 3. CHECK DUPLICATE SLUG
    const existingPackage = await prisma.tourPackage.findUnique({
      where: {
        package_slug,
      },
    });

    if (existingPackage) {
      return res.status(409).json({
        success: false,
        message: "Package slug already exists",
      });
    }

    // 4. CREATE PACKAGE
    const tourPackage = await prisma.tourPackage.create({
      data: {
        package_name,
        package_slug,
        short_description,
        full_description,
        theme_id,
        duration_days: parseInt(duration_days),
        base_price: parseFloat(base_price),
        is_featured: is_featured ?? false,
        status: status ?? "ACTIVE",
      },
      include: {
        theme: true,
      },
    });

    // 5. RESPONSE
    return res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      data: tourPackage,
    });
  } catch (error) {
    next(error);
  }
};


export const getAllTourPackages = async (req, res, next) => {
  try {
    const tourPackages = await prisma.tourPackage.findMany({
      include: {
        theme: {
          include: {
            cover_image: true,

            images: {
              include: {
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: tourPackages.length,
      data: tourPackages,
    });
  } catch (error) {
    next(error);
  }
};


export const getTourPackageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tourPackage = await prisma.tourPackage.findUnique({
      where: {
        id,
      },
      include: {
        theme: {
          include: {
            cover_image: true,
            images: {
              include: {
                image: true,
              },
            },
          },
        },
      },
    });

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: tourPackage,
    });

  } catch (error) {
    next(error);
  }
};


export const getFeaturedTourPackages = async (req, res, next) => {
  try {
    const packages = await prisma.tourPackage.findMany({
      where: {
        is_featured: true,
        status: "ACTIVE",
      },
      include: {
        theme: {
          include: {
            cover_image: true,
            images: {
              include: {
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTourPackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      package_name,
      package_slug,
      short_description,
      full_description,
      theme_id,
      duration_days,
      base_price,
      is_featured,
      status,
    } = req.body;

    // 1. CHECK EXIST
    const existing = await prisma.tourPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    // 2. SLUG DUPLICATE CHECK (if changing)
    if (package_slug && package_slug !== existing.package_slug) {
      const slugExists = await prisma.tourPackage.findUnique({
        where: { package_slug },
      });

      if (slugExists) {
        return res.status(409).json({
          success: false,
          message: "Package slug already exists",
        });
      }
    }

    // 3. THEME VALIDATION (if updating theme)
    if (theme_id) {
      const theme = await prisma.theme.findUnique({
        where: { id: theme_id },
      });

      if (!theme) {
        return res.status(404).json({
          success: false,
          message: "Theme not found",
        });
      }
    }

    // 4. UPDATE PACKAGE
    const updated = await prisma.tourPackage.update({
      where: { id },
      data: {
        package_name: package_name ?? existing.package_name,
        package_slug: package_slug ?? existing.package_slug,
        short_description: short_description ?? existing.short_description,
        full_description: full_description ?? existing.full_description,
        theme_id: theme_id ?? existing.theme_id,
        duration_days: duration_days
          ? parseInt(duration_days)
          : existing.duration_days,
        base_price: base_price ? parseFloat(base_price) : existing.base_price,
        is_featured:
          is_featured !== undefined ? is_featured : existing.is_featured,
        status: status ?? existing.status,
      },
      include: {
        theme: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Tour package updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTourPackageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tourPackage = await prisma.tourPackage.findUnique({
      where: { id },
    });

    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    const updated = await prisma.tourPackage.update({
      where: { id },
      data: {
        status:
          tourPackage.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};