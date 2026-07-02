import prisma from "../lib/prisma.js";

export const getAllStays = async (req, res, next) => {
  try {
    const stays = await prisma.stay.findMany({
      orderBy: { created_at: "asc" },
    });

    return res.status(200).json({
      success: true,
      count: stays.length,
      data: stays,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedStays = async (req, res, next) => {
  try {
    const stays = await prisma.stay.findMany({
      where: { featured: true },
      orderBy: { created_at: "asc" },
    });

    return res.status(200).json({
      success: true,
      count: stays.length,
      data: stays,
    });
  } catch (error) {
    next(error);
  }
};

export const getStayById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stay = await prisma.stay.findUnique({ where: { id } });

    if (!stay) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }

    return res.status(200).json({ success: true, data: stay });
  } catch (error) {
    next(error);
  }
};

export const createStay = async (req, res, next) => {
  try {
    const { name, name_sv, location, location_sv, rating, image, featured } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Name and location are required",
      });
    }

    const stay = await prisma.stay.create({
      data: {
        name,
        name_sv,
        location,
        location_sv,
        rating: rating ? parseFloat(rating) : 4.5,
        image: image ?? "stay",
        featured: featured === true || featured === "true",
      },
    });

    return res.status(201).json({ success: true, message: "Stay created successfully", data: stay });
  } catch (error) {
    next(error);
  }
};

export const updateStay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, name_sv, location, location_sv, rating, image, featured } = req.body;

    const existing = await prisma.stay.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }

    const updated = await prisma.stay.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        name_sv: name_sv !== undefined ? name_sv : existing.name_sv,
        location: location ?? existing.location,
        location_sv: location_sv !== undefined ? location_sv : existing.location_sv,
        rating: rating !== undefined ? parseFloat(rating) : existing.rating,
        image: image ?? existing.image,
        featured: featured !== undefined ? featured : existing.featured,
      },
    });

    return res.status(200).json({ success: true, message: "Stay updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteStay = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.stay.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Stay not found" });
    }

    await prisma.stay.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Stay deleted successfully" });
  } catch (error) {
    next(error);
  }
};
