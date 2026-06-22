import prisma from "../lib/prisma.js";

export const createDestination = async (req, res, next) => {
  try {
    const {
      destination_name,
      description,
      region,
      theme_id,
      cover_image_id,
    } = req.body;

    if (!destination_name || !region || !theme_id) {
      return res.status(400).json({
        success: false,
        message:
          "destination_name, region and theme_id are required",
      });
    }

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

    if (cover_image_id) {
      const image = await prisma.image.findUnique({
        where: {
          id: cover_image_id,
        },
      });

      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Cover image not found",
        });
      }
    }

    const destination = await prisma.destination.create({
      data: {
        destination_name,
        description,
        region,
        theme_id,
        cover_image_id,
      },
      include: {
        theme: true,
        cover_image: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Destination created successfully",
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};



export const getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await prisma.destination.findMany({
      where: {
        is_active: true,
      },
      include: {
        theme: true,
        cover_image: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
};


export const getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const destination = await prisma.destination.findFirst({
      where: {
        id,
        is_active: true,
      },
      include: {
        theme: true,
        cover_image: true,
      },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    next(error);
  }
};



export const deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const destination = await prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    await prisma.destination.update({
      where: { id },
      data: {
        is_active: false,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      destination_name,
      description,
      region,
      theme_id,
      cover_image_id,
    } = req.body;

    // Check destination exists
    const destination = await prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Update destination
    const updatedDestination = await prisma.destination.update({
      where: { id },
      data: {
        destination_name:
          destination_name ?? destination.destination_name,

        description:
          description ?? destination.description,

        region:
          region ?? destination.region,

        theme_id:
          theme_id ?? destination.theme_id,

        cover_image_id:
          cover_image_id ?? destination.cover_image_id,
      },
      include: {
        theme: true,
        cover_image: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      data: updatedDestination,
    });
  } catch (error) {
    next(error);
  }
};