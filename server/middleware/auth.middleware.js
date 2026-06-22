import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error("No token provided");
      err.statusCode = 401;
      throw err;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 

    next();
  } catch (error) {
    next(error);
  }
};

export const checkDeletedUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { deletedAt: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.deletedAt !== null) {
      return res.status(403).json({
        success: false,
        message: "Account is deleted",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};