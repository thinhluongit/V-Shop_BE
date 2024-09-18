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
  const accessToken = req.headers.authorization?.split(" ")[1];

  const userInfo = await userService.getUserInfo(accessToken as string);
  const id = userInfo.id;

  if (id) {
    const user = await userService.checkUserExist(id);
    if (user) {
      res.status(200).json(user);
      console.log("This user have been existed");
      console.log(user);
    } else {
      console.log("This user does not exist yet");
      res.status(204).send();
    }
  } else {
    res.json({});
  }
};

export const getPhoneNumber = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const token = req.headers.token;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Bad request: Missing token in the body" });
  }

  const userPhoneNumber = await userService.getPhoneNumber(
    accessToken as any,
    token as any,
    res
  );
  res.json(userPhoneNumber);
};
