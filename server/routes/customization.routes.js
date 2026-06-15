import express from "express";
import {
  createCustomization,
  getAllCustomizations,
  getCustomizationById,
  updateCustomization,
  deleteCustomization,
  updateCustomizationStatus
} from "../controller/customization.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",verifyToken, createCustomization);

router.get("/",verifyToken, getAllCustomizations);

router.get("/:id",verifyToken, getCustomizationById);

router.put("/:id",verifyToken, updateCustomization);

router.patch("/:id/status",verifyToken, updateCustomizationStatus);

router.delete("/:id",verifyToken, deleteCustomization);

export default router;