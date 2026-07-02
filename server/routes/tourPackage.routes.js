import express from "express"

import { createTourPackage } from "../controller/tourPackage.controller.js"
import { getAllTourPackages } from "../controller/tourPackage.controller.js"
import { getTourPackageById } from "../controller/tourPackage.controller.js"
import { toggleTourPackageStatus } from "../controller/tourPackage.controller.js"
import { getFeaturedTourPackages } from "../controller/tourPackage.controller.js"
import { updateTourPackage } from "../controller/tourPackage.controller.js"
import { deleteTourPackage } from "../controller/tourPackage.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js"

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("admin"), createTourPackage)
router.get("/", getAllTourPackages)
router.get("/featured", getFeaturedTourPackages)
router.get("/:id", getTourPackageById)
router.put("/:id", verifyToken, authorizeRoles("admin"), updateTourPackage)
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteTourPackage)
router.patch("/:id/staus", toggleTourPackageStatus)


export default router;