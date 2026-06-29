import prisma from "../lib/prisma.js";

export const createTourPackage = async (req, res, next) => {
  try {
    const {
      package_name,
      package_name_sv,
      package_slug,
      short_description,
      short_description_sv,
      full_description,
      full_description_sv,
      theme_id,
      duration_days,
      base_price,
      is_featured,
      status,
      location,
      category,
      rating,
      reviews,
      image,
    } = req.body;

    if (!package_name || !package_slug || !short_description || !full_description || !duration_days || !base_price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let resolvedThemeId = theme_id;

    if (!resolvedThemeId) {
      const fallbackTheme = await prisma.theme.findFirst({
        orderBy: { created_at: "asc" },
      });

      if (!fallbackTheme) {
        return res.status(404).json({
          success: false,
          message: "No theme available for tour creation",
        });
      }

      resolvedThemeId = fallbackTheme.id;
    } else {
      const theme = await prisma.theme.findUnique({
        where: { id: resolvedThemeId },
      });

      if (!theme) {
        return res.status(404).json({
          success: false,
          message: "Theme not found",
        });
      }
    }

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

    const tourPackage = await prisma.tourPackage.create({
      data: {
        package_name,
        package_name_sv,
        package_slug,
        short_description,
        short_description_sv,
        full_description,
        full_description_sv,
        theme_id: resolvedThemeId,
        duration_days: parseInt(duration_days),
        base_price: parseFloat(base_price),
        location: location ?? "Sri Lanka",
        category: category ?? "Adventure",
        rating: rating ? parseFloat(rating) : 4.5,
        reviews: reviews ? parseInt(reviews) : 0,
        image: image ?? "sigiriya",
        is_featured: is_featured ?? false,
        status: status ?? "ACTIVE",
      },
      include: {
        theme: true,
      },
    });

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
      package_name_sv,
      package_slug,
      short_description,
      short_description_sv,
      full_description,
      full_description_sv,
      theme_id,
      duration_days,
      base_price,
      is_featured,
      status,
      location,
      category,
      rating,
      reviews,
      image,
    } = req.body;

    const existing = await prisma.tourPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

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

    let resolvedThemeId = theme_id;

    if (resolvedThemeId === undefined || resolvedThemeId === null || resolvedThemeId === "") {
      resolvedThemeId = existing.theme_id;
    } else {
      const theme = await prisma.theme.findUnique({
        where: { id: resolvedThemeId },
      });

      if (!theme) {
        return res.status(404).json({
          success: false,
          message: "Theme not found",
        });
      }
    }

    const updated = await prisma.tourPackage.update({
      where: { id },
      data: {
        package_name: package_name ?? existing.package_name,
        package_name_sv: package_name_sv !== undefined ? package_name_sv : existing.package_name_sv,
        package_slug: package_slug ?? existing.package_slug,
        short_description: short_description ?? existing.short_description,
        short_description_sv: short_description_sv !== undefined ? short_description_sv : existing.short_description_sv,
        full_description: full_description ?? existing.full_description,
        full_description_sv: full_description_sv !== undefined ? full_description_sv : existing.full_description_sv,
        theme_id: resolvedThemeId,
        duration_days: duration_days ? parseInt(duration_days) : existing.duration_days,
        base_price: base_price ? parseFloat(base_price) : existing.base_price,
        location: location ?? existing.location,
        category: category ?? existing.category,
        rating: rating !== undefined ? parseFloat(rating) : existing.rating,
        reviews: reviews !== undefined ? parseInt(reviews) : existing.reviews,
        image: image ?? existing.image,
        is_featured: is_featured !== undefined ? is_featured : existing.is_featured,
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

export const deleteTourPackage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.tourPackage.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Tour package not found",
      });
    }

    await prisma.tourPackage.delete({ where: { id } });

    return res.status(200).json({
      success: true,
      message: "Tour package deleted successfully",
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