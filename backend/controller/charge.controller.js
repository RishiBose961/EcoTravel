import expressAsyncHandler from "express-async-handler";
import Charge from "../models/charge.model.js";

export const createCharge = expressAsyncHandler(async (req, res) => {
  try {
    const { chargingname, country, city, cheapestPrice, chargingaddress } =
      req.body;

    if (
      !chargingname ||
      !country ||
      !city ||
      !cheapestPrice ||
      !chargingaddress
    ) {
      return res.status(402).json({ error: "Please add all the fields" });
    }

    const charging = new Charge({
      chargingname,
      country,
      city,
      chargingaddress,
      cheapestPrice,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      postedBy: req.user.id,
    });

    const savedCharge = await charging.save();

    res.status(201).json({ charging: savedCharge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const findnearCharging = expressAsyncHandler(async (req, res) => {
  try {
    const { latitude, longitude } = req.params;

    const projectCharge = await Charge.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: parseFloat(1000) * 1609,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]);

    return res.status(200).json({ data: projectCharge });
  } catch (err) {
    return res.status(500).json(err);
  }
});
