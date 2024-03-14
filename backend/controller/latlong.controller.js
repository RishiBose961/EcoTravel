import expressAsyncHandler from "express-async-handler";
import Latlongs from "../models/latilong.model.js";

export const createLatLong = expressAsyncHandler(async (req, res) => {
    try {
     
  
      const latlonging = new Latlongs({
        
        locationway1: {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitudeone),
            parseFloat(req.body.latitudeone),
          ],
        },
        locationway2: {
            type: "Point",
            coordinates: [
              parseFloat(req.body.longitudetwo),
              parseFloat(req.body.latitudetwo),
            ],
          },
        postedBy: req.user.id,
      });
  
      const savedLatLong = await latlonging.save();
  
      res.status(201).json({ latlonging: savedLatLong });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });