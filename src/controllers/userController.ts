import { Request, Response } from "express";
import * as userService from "@/services/userService";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, phoneNumber, image } = req.body; // based on the zalo response
  const user = await userService.createUser(email, name, phoneNumber, image);
  res.json(user);
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name } = req.body;
  const user = await userService.updateUser(id, email, name);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.json({ message: "User deleted" });
};
