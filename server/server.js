import "dotenv/config.js";

import express from "express";
import cors from "cors";
import helmet from "helmet"
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import themeRoutes from "./routes/theme.routes.js"
import destinationRoutes from "./routes/destination.routes.js"
import activityRoutes from "./routes/activity.routes.js"
import tourPackagesRoutes from "./routes/tourPackage.routes.js"
import customizationRoutes from "./routes/customization.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import bookingsRoutes from "./routes/booking.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import stayRoutes from "./routes/stay.routes.js"
import { errorHandler } from "./utils/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimit.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// for security purpose hide headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// Logger middleware
app.use(logger);
app.use(apiLimiter);
// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/themes", themeRoutes)
app.use("/api/v1/images", uploadRoutes)
app.use("/api/v1/destination", destinationRoutes)
app.use("/api/v1/activity", activityRoutes)
app.use("/api/v1/packages", tourPackagesRoutes)
app.use("/api/v1/customization", customizationRoutes)
app.use("/api/v1/bookings", bookingsRoutes)
app.use("/api/v1/contact", contactRoutes)
app.use("/api/v1/stays", stayRoutes)

// Error handler LAST middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});