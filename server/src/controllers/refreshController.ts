import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh provided" });
  }

  const user = await User.findOne({ refreshToken: token });

  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET!,
    async (err: any, decode: any) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const newRefreshToken = generateRefreshToken(user);
      const newAccessToken = generateAccessToken(user);

      user.refreshToken = newRefreshToken;
      await user.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        accessToken: newAccessToken,
      });
    }
  );
};
