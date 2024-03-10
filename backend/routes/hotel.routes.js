import express from "express";
import { createHotels} from "../controller/hotel.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newhotels").post(protect, createHotels);

export default router;