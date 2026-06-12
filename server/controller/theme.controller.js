import prisma from "../lib/prisma.js";

export const createTheme = async (req, res, next) => {
  try {
    const {
      theme_name,
      theme_slug,
      description,
      cover_image_id,
      media_ids = [],
    } = req.body;

    const user = req.user;



    // 2. VALIDATION
    if (!theme_name || !theme_slug) {
      return res.status(400).json({
        success: false,
        message: "theme_name and theme_slug are required",
      });
    }

    // 3. DUPLICATE CHECK
    const existingTheme = await prisma.theme.findUnique({
      where: { theme_slug },
    });

    if (existingTheme) {
      return res.status(409).json({
        success: false,
        message: "Theme slug already exists",
      });
    }

    // 4. VERIFY COVER IMAGE
    if (cover_image_id) {
      const coverImage = await prisma.image.findUnique({
        where: { id: cover_image_id },
      });

      if (!coverImage) {
        return res.status(404).json({
          success: false,
          message: "Cover image not found",
        });
      }
    }

    // 5. VERIFY MEDIA IDS
    if (media_ids.length > 0) {
      const count = await prisma.image.count({
        where: {
          id: { in: media_ids },
        },
      });

      if (count !== media_ids.length) {
        return res.status(404).json({
          success: false,
          message: "One or more media files not found",
        });
      }
    }

    // 6. CREATE THEME
    const theme = await prisma.theme.create({
      data: {
        theme_name,
        theme_slug,
        description: description || null,
        cover_image_id: cover_image_id || null,
      },
    });

    // 7. CREATE THEME IMAGES 
    if (media_ids.length > 0) {
      await prisma.themeImage.createMany({
        data: media_ids.map((id) => ({
          themeId: theme.id,
          imageId: id,
        })),
      });
    }

    // 8. RETURN FULL DATA
    const fullTheme = await prisma.theme.findUnique({
      where: { id: theme.id },
      include: {
        cover_image: true,
        images: {
          include: {
            image: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Theme created successfully",
      data: fullTheme,
    });
  } catch (error) {
    next(error);
  }
};

// get all theme
export const getAllThemes = async (req, res, next) => {
  try {
    const themes = await prisma.theme.findMany({
      include: {
        cover_image: true,
        images: {
          include: {
            image: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: themes.length,
      data: themes,
    });
  } catch (error) {
    next(error);
  }
};


//get theme by slug
export const getThemeBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

const theme = await prisma.theme.findFirst({
  where: {
    theme_slug: slug,
    is_active: true,
  },
  include: {
    cover_image: true,
    images: {
      include: {
        image: true,
      },
    },
  },
});

    if (!theme) {
      return res.status(404).json({
        success: false,
        message: "Theme not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: theme,
    });
  } catch (error) {
    next(error);
  }
};


//update theme by id or slug

export const updateTheme = async (req, res, next) => {
  try {
    const { id } = req.params; // ✅ FIX HERE

    const {
      theme_name,
      theme_slug,
      description,
      cover_image_id,
    } = req.body;

    console.log("PARAM ID:", id); // DEBUG

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Theme id is required in params",
      });
    }

    const theme = await prisma.theme.findUnique({
      where: { id },
    });

    if (!theme) {
      return res.status(404).json({
        success: false,
        message: "Theme not found",
      });
    }

    const updatedTheme = await prisma.theme.update({
      where: { id },
      data: {
        theme_name: theme_name ?? theme.theme_name,
        theme_slug: theme_slug ?? theme.theme_slug,
        description: description ?? theme.description,
        cover_image_id: cover_image_id ?? theme.cover_image_id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Theme updated successfully",
      data: updatedTheme,
    });

  } catch (error) {
    next(error);
  }
};



