import expressAsyncHandler from "express-async-handler";
import Story from "../models/story.model.js";

export const createStory = expressAsyncHandler(async (req, res) => {
  try {
    const { storytitle, country, city, imagestory, storydescription } =
      req.body;

    if (!storytitle || !country || !city || !storydescription) {
      return res.status(402).json({ error: "Please add all the fields" });
    }

    const storys = new Story({
      storytitle,
      country,
      city,
      imagestory,
      storydescription,
      otp_expiry: new Date(
        Date.now() + process.env.OTP_EXPIRE * 60 * 60 * 1000
      ),
      postedBy: req.user.id,
    });

    const savedStory = await storys.save();

    res.status(201).json({ storys: savedStory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getallstory = expressAsyncHandler(async (req, res) => {
  try {
    const showstory = await Story.find()
      .populate("postedBy", "username avatar")
      .sort({ createdAt: -1 });

    res.status(201).json({ storys: showstory });
  } catch (error) {}
  res.status(500).json({ message: error.message });
});
