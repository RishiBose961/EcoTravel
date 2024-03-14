import express from "express";
import { createCharge,findnearCharging} from "../controller/charge.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/newcharge").post(protect, createCharge);
router.route("/:latitude/:longitude").get(findnearCharging);



export default router;