
import express from "express";
import { createDestination } from "../controller/destination.controller.js";
import { getAllDestinations } from "../controller/destination.controller.js";
import { getDestinationById } from "../controller/destination.controller.js";
import { deleteDestination } from "../controller/destination.controller.js";
import { updateDestination } from "../controller/destination.controller.js"; 
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  createDestination
);

router.get("/", getAllDestinations);

router.get("/:id", getDestinationById);

router.put("/:id", verifyToken, authorizeRoles("admin"), updateDestination)

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteDestination
);

export default router;