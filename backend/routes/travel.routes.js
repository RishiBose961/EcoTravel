import express from "express";
import { createTravels,getHotelandTravel} from "../controller/travel.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newtravels").post(protect, createTravels);
router.route("/gethoteltravel").get(protect, getHotelandTravel);


export default router;