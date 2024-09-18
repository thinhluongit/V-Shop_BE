import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserInfo,
  getPhoneNumber,
} from "@/controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/info", getUserInfo);
router.get("/auth", getPhoneNumber);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
