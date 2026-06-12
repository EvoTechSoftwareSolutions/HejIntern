export const resetPasswordTemplate = (username, resetLink) => {
  return `
    <div style="max-width:600px;margin:auto;padding:30px;font-family:Arial;background:#f9fafb;border-radius:10px;">
      <h2 style="color:#2563eb;">Password Reset Request</h2>

      <p>Hello ${username},</p>

      <p>We received a request to reset your password.</p>

      <a href="${resetLink}"
         style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    </div>
  `;
};