import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controller/contact.controller.js";

import { contactRateLimit } from "../middleware/rateLimit.js";

const router = express.Router();

// PUBLIC (rate limited)
router.post("/", contactRateLimit, createContact);

// ADMIN
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);

export default router;