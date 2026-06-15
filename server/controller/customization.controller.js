import prisma from "../lib/prisma.js";

// CREATE
export const createCustomization = async (req, res, next) => {
  try {
    const {
      package_id,
      selected_destinations,
      selected_activities,
      group_size,
      duration_days,
      accommodation_level,
      budget_range,
    } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const customization = await prisma.customization.create({
      data: {
        user_id: user.id,
        package_id,
        selected_destinations,
        selected_activities,
        group_size: parseInt(group_size),
        duration_days: parseInt(duration_days),
        accommodation_level,
        budget_range,
      },
      include: {
        user: true,
        tourPackage: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Customization created",
      data: customization,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCustomizations = async (req, res, next) => {
  try {
    const data = await prisma.customization.findMany({
      include: {
        user: true,
        tourPackage: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


export const getCustomizationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await prisma.customization.findUnique({
      where: { id },
      include: {
        user: true,
        tourPackage: true,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Customization not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};


export const updateCustomization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      package_id,
      selected_destinations,
      selected_activities,
      group_size,
      duration_days,
      accommodation_level,
      budget_range,
      status,
      shareable_url,
    } = req.body;

    // 1. CHECK EXISTING RECORD
    const existing = await prisma.customization.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Customization not found",
      });
    }

    // 2. SAFE UPDATE (ONLY ALLOWED FIELDS)
    const updated = await prisma.customization.update({
      where: { id },
      data: {
        package_id: package_id ?? existing.package_id,
        selected_destinations:
          selected_destinations ?? existing.selected_destinations,
        selected_activities:
          selected_activities ?? existing.selected_activities,

        group_size: group_size
          ? parseInt(group_size)
          : existing.group_size,

        duration_days: duration_days
          ? parseInt(duration_days)
          : existing.duration_days,

        accommodation_level:
          accommodation_level ?? existing.accommodation_level,

        budget_range: budget_range ?? existing.budget_range,

        status: status ?? existing.status,

        shareable_url: shareable_url ?? existing.shareable_url,
      },
    });

    // 3. RESPONSE
    return res.status(200).json({
      success: true,
      message: "Customization updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.customization.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    await prisma.customization.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};



export const updateCustomizationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. CHECK VALID STATUS
    const validStatuses = ["PENDING", "CONFIRMED", "DRAFT"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // 2. CHECK EXISTING
    const existing = await prisma.customization.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Customization not found",
      });
    }

    const updated = await prisma.customization.update({
      where: { id },
      data: {
        status,
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