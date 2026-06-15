export const verificationEmailTemplate = (
  username,
  verifyLink
) => {
  return `
    <div style="
      max-width:600px;
      margin:auto;
      padding:30px;
      font-family:Arial,sans-serif;
      background:#f9fafb;
      border-radius:10px;
    ">
      <h2 style="color:#16a34a;">
        Welcome to HejIntern
      </h2>

      <p>Hello ${username},</p>

      <p>
        Please verify your email address
        to activate your account.
      </p>

      <a
        href="${verifyLink}"
        style="
          display:inline-block;
          background:#16a34a;
          color:white;
          text-decoration:none;
          padding:12px 24px;
          border-radius:6px;
        "
      >
        Verify Email
      </a>

      <p>
        This verification link expires in
        24 hours.
      </p>

      <hr>

      <small>
        © HejIntern Team
      </small>
    </div>
  `;
};