import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, 
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});



export const contactRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // only 3 requests per minute
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});