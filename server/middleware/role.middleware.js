export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role?.toLowerCase();

      const allowedRoles = roles.map(r => r.toLowerCase());

      if (!userRole) {
        const err = new Error("User role not found in token");
        err.statusCode = 401;
        return next(err);
      }

      if (!allowedRoles.includes(userRole)) {
        const err = new Error("You do not have permission to access this resource");
        err.statusCode = 403;
        return next(err);
      }

      next();

    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  };
};