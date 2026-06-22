import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/jwt.js";
import { sendVerificationEmail, sendResetEmail } from "../services/email.service.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email, password required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const defaultRole = await prisma.role.findFirst({
      where: { name: "user" },
    });

    const defaultLanguage = await prisma.language.findFirst({
      where: { isDefault: true },
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        roleId: defaultRole.id,
        languageId: defaultLanguage.id,
        isVerified: false,
        verificationToken: hashedToken,
        verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const verifyLink = `http://localhost:5000/api/v1/auth/verify-email/${verificationToken}`;

    await sendVerificationEmail(user, verifyLink);

    return res.status(201).json({
      success: true,
      message: "Check your email to verify account",
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   VERIFY EMAIL
========================= */
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: { verificationToken: hashed },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (user.verificationExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.deletedAt) {
      return res.status(403).json({ message: "Account deleted" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Verify email first" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If email exists, reset sent",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashed,
        passwordResetExpiry: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await sendResetEmail(user, resetLink);

    return res.status(200).json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashed = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: { passwordResetToken: hashed },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.passwordResetExpiry < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hash,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};