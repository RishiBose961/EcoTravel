import express from "express";
import { createHotels,getHotelsbyId} from "../controller/hotel.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newhotels").post(protect, createHotels);
router.route("/getsinglepost/:id").get(protect, getHotelsbyId);



export default router;