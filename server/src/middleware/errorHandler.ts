// Inside ./middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add this line to log the entire error object
  console.error(
    "Full Error Object:",
    JSON.stringify(err, Object.getOwnPropertyNames(err), 2)
  );
  console.error("Error Status being used:", err.status);

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
