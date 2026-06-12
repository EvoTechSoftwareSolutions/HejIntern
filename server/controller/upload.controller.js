import prisma from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "themes",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(file.buffer);
      });

      const media = await prisma.image.create({
        data: {
          file_name: file.originalname,
          file_url: result.secure_url,
          file_type: result.resource_type === "video" ? "VIDEO" : "IMAGE",

          uploaded_by: req.user.id,

          alt_text_en: file.originalname,
          alt_text_sw: null,

          entity_type: "theme",
          entity_id: null,
        },
      });

      uploadedFiles.push(media);
    }

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: uploadedFiles,
    });
  } catch (error) {
    next(error);
  }
};