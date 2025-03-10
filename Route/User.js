
import { Router } from "express";
import { getUserNamePassword_login, updateUserPassword, updateUser, addUser_singUp, getUserById, getAllUsers } from "../Controller/User.js";

const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id/pass", updateUserPassword);
router.put("/:id", updateUser);
router.post("/", addUser_singUp);
router.post("/login/", getUserNamePassword_login);
export default router;