import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ user });
};
