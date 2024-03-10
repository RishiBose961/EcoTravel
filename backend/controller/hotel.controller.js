import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/hotel.model.js";

export const createHotels = expressAsyncHandler(async (req, res) => {
  try {
    const { hotelname, country, city, phone, imagehotel, hoteladdress } =
      req.body;

    if (!hotelname || !country || !city || !phone || !hoteladdress) {
      return res.status(402).json({ error: "Please add all the fields" });
    }

    const hotels = new Hotel({
      hotelname,
      country,
      city,
      phone,
      imagehotel,
      hoteladdress,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      postedBy: req.user.id,
    });

    const savedHotel = await hotels.save();

    res.status(201).json({ hotels: savedHotel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
