import express from "express";
import {
  getAllStays,
  getFeaturedStays,
  getStayById,
  createStay,
  updateStay,
  deleteStay,
} from "../controller/stay.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getAllStays);
router.get("/featured", getFeaturedStays);
router.get("/:id", getStayById);
router.post("/", verifyToken, authorizeRoles("admin"), createStay);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateStay);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteStay);

export default router;
