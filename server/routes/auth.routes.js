import express from "express";
import { registerValidation } from "../validations/auth.validation.js";
import { validate } from "../middleware/validate.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { checkDeletedUser } from "../middleware/auth.middleware.js";
import { register } from "../controller/auth.controller.js";
import { login } from "../controller/auth.controller.js";
import { forgotPassword } from "../controller/auth.controller.js";
import { resetPassword } from "../controller/auth.controller.js";
import { verifyEmail } from "../controller/auth.controller.js";

const router = express.Router();


router.post("/register", registerValidation, validate, register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.get(
  "/verify-email/:token",
  verifyEmail
);
// user route
router.get("/user-dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Welcome User ${req.user.email}`,
  });
});

// admin route
router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: `Welcome Admin ${req.user.email}`,
    });
  }
);

export default router;