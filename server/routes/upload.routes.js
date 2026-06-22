import express from "express";
import { uploadMedia } from "../controller/upload.controller.js";
import upload from "../middleware/upload.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  authorizeRoles("admin"),
  upload.array("files", 20),
  uploadMedia
);

export default router;