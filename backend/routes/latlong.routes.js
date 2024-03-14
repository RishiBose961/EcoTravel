import express from "express";
import { createLatLong} from "../controller/latlong.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newlatlong").post(protect, createLatLong);
// router.route("/getsinglepost/:id").get(protect, getHotelsbyId);



export default router;