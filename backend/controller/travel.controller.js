import expressAsyncHandler from "express-async-handler";
import Car from "../models/travel.model.js";

export const createTravels = expressAsyncHandler(async (req, res) => {
    try {
      const { carname,carnumberplate, country, city, phone, imagecar, caraddress } =
        req.body;
  
      if (!carname||!carnumberplate || !country || !city || !phone || !caraddress) {
        return res.status(402).json({ error: "Please add all the fields" });
      }
  
      const travels = new Car({
        carname,
        carnumberplate,
        country,
        city,
        phone,
        imagecar,
        caraddress,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude),
          ],
        },
        postedBy: req.user.id,
      });
  
      const savedTravels = await travels.save();
  
      res.status(201).json({ travels: savedTravels });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });