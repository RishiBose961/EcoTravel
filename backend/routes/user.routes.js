import express from "express";
import { authUser, logoutUser, registerUser } from "../controller/user.controller.js";
const router = express.Router();


router.post("/", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
export default router;