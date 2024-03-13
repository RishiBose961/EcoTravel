import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createStory,getallstory } from "../controller/story.controller.js";

const router = express.Router();


router.route("/newstorys").post(protect, createStory);
router.route("/showstory").get(protect, getallstory);


export default router;