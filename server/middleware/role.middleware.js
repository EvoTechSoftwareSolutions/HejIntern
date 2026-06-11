export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    console.log("ROLE CHECK:", userRole);

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: "Role missing in token",
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};