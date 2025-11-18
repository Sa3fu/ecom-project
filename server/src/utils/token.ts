import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
