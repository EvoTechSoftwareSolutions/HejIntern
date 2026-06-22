import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  console.log("JWT SECRET:", process.env.JWT_SECRET); // DEBUG

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};