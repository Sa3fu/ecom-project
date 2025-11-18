import { Request, Response } from "express";
import { User } from "../models/User";

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(204).json({ message: "Logged out" });

  const user = await User.findOne({ refreshToken: token });
  if (user) {
    user.refreshToken = "";
    await user.save();
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.status(204).json({ message: "Logout successful" });
};
