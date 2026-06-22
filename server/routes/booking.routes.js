import express from "express";

import {
  createBooking,
  updateBooking,
  getAllBookings,
  getBookingById,
  getAllBookingsByUserId,
  cancelBooking,
  confirmBooking,
} from "../controller/booking.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// create booking
router.post("/", verifyToken, createBooking);
// get my bookings (logged-in user)
router.get("/me", verifyToken, getAllBookingsByUserId);
// get single booking by id
router.get("/:id", verifyToken, getBookingById);
router.put("/:id", verifyToken, updateBooking);
router.patch("/:id/cancel", verifyToken, cancelBooking);



// get all bookings (admin only)
router.get("/", verifyToken, authorizeRoles("admin"), getAllBookings);
router.patch("/:id/confirm", verifyToken, authorizeRoles("admin"), confirmBooking);

export default router;