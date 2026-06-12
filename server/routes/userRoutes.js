import express from "express";
import {
  getAllUsers,
  getMyProfile,
  updateUser,
  deleteUser,
  softDeleteUser
} from "../controller/userController.js";
import { checkDeletedUser } from "../middleware/auth.middleware.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// user profile
router.get("/me", verifyToken, getMyProfile);

// admin only
router.get("/admin/all", verifyToken, authorizeRoles("admin"), getAllUsers);

// update user
router.put("/:id", verifyToken,checkDeletedUser, updateUser);

// hard delete
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

// soft delete
router.patch("/:id/soft-delete", verifyToken, authorizeRoles("admin"), softDeleteUser);

export default router;