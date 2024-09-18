import { Request, Response } from "express";
import * as userService from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
  const { zaloId, email, name, phoneNumber, image } = req.body; // based on the zalo response
  const user = await userService.createUser(zaloId, name, image, phoneNumber);
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
  const user = await userService.updateUser(id, name);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.json({ message: "User deleted" });
};

export const getUserInfo = async (req: Request, res: Response) => {
  // const accessToken = req.headers.authorization?.slice(7);
  const accessToken = req.headers.authorization?.split(" ")[1];
  const userInfo = await userService.getUserInfo(accessToken as string);
  const id = userInfo.id;
  console.log("Zalo ID: " + id);

  if (id) {
    const user = await userService.checkUserExist(id);
    if (user) {
      res.status(200).json(user);
      console.log(user);
    } else {
      res.status(204).send();
    }
  }
};

export const getPhoneNumber = async (req: Request, res: Response) => {
  // const accessToken = req.headers.authorization?.slice(7);
  const accessToken = req.headers.authorization?.split(" ")[1];
  const token = req.body.token;
  const userPhoneNumber = await userService.getPhoneNumber(
    accessToken as string,
    token as string,
    res
  );
  res.json(userPhoneNumber);
};
