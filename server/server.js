import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet"
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import themeRoutes from "./routes/theme.routes.js"
import destinationRoutes from "./routes/destination.routes.js"
import activityRoutes from "./routes/activity.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
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

// Error handler LAST middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});