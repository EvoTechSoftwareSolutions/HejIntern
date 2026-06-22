import express from "express";
import { createTheme } from "../controller/theme.controller.js";
import { checkDeletedUser } from "../middleware/auth.middleware.js";
import { updateTheme } from "../controller/theme.controller.js";
import { getAllThemes } from "../controller/theme.controller.js";
import { getThemeBySlug } from "../controller/theme.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// create theme
router.post("/", verifyToken, authorizeRoles("ADMIN"), createTheme);
router.get("/", getAllThemes)
router.get("/:slug", verifyToken, getThemeBySlug)
router.put("/:id", verifyToken, updateTheme)




export default router;