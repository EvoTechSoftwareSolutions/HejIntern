import sendEmail from "../utils/sendEmail.js";
import { verificationEmailTemplate } from "../templates/verificationEmail.template.js";
import { resetPasswordTemplate } from "../templates/resetPassword.template.js";

// VERIFY EMAIL
export const sendVerificationEmail = async (user, verifyLink) => {
  await sendEmail({
    to: user.email,
    subject: "Verify Your Account",
    html: verificationEmailTemplate(user.username, verifyLink),
  });
};

// RESET PASSWORD
export const sendResetEmail = async (user, resetLink) => {
  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: resetPasswordTemplate(user.username, resetLink),
  });
};