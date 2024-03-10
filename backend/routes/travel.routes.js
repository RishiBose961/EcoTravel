import express from "express";
import { createTravels} from "../controller/travel.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newtravels").post(protect, createTravels);

export default router;