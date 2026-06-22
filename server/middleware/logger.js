export const logger = (req, res, next) => {
  console.log(" API REQUEST ");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Body:", req.body);
  console.log("Time:", new Date().toISOString());

  next();
};