import prisma from "../lib/prisma.js";

export const createActivity = async (req, res, next) => {
  try {
    console.log(" hit createActivity");

    const {
      activity_name,
      description,
      theme_id,
      destination_id,
      difficulty_level,
      duration_hours,
    } = req.body;

    // 1. VALIDATION
    if (
      !activity_name ||
      !description ||
      !theme_id ||
      !destination_id ||
      !difficulty_level ||
      !duration_hours
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. CREATE ACTIVITY
    const activity = await prisma.activity.create({
      data: {
        activity_name,
        description,
        theme_id,
        destination_id,
        difficulty_level,
        duration_hours: parseFloat(duration_hours),
      },
      include: {
        theme: true,
        destination: true,
      },
    });

    // 3. RESPONSE
    return res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });

  } catch (error) {
    next(error);
  }
};