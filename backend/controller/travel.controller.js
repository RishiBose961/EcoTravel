import expressAsyncHandler from "express-async-handler";
import Car from "../models/travel.model.js";
import Hotel from "../models/hotel.model.js";

export const createTravels = expressAsyncHandler(async (req, res) => {
  try {
    const {
      carname,
      carnumberplate,
      country,
      city,
      phone,
      cheapestPrice,
      imagecar,
      vehicletype,
      caraddress,
    } = req.body;

    if (
      !carname ||
      !carnumberplate ||
      !country ||
      !vehicletype ||
      !city ||
      !cheapestPrice ||
      !phone ||
      !caraddress
    ) {
      return res.status(402).json({ error: "Please add all the fields" });
    }

    const travels = new Car({
      carname,
      carnumberplate,
      country,
      city,
      phone,
      imagecar,
      vehicletype,
      cheapestPrice,
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

export const getHotelandTravel = expressAsyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const country = req.query.country || "";
    const city = req.query.city;
    const min = req.query.min || "";
    const max = req.query.max || "";

    let query = {};

    if (country !== "All") {
      query.country = country;
    }
    if (city && city !== "All") {
      query.city = city;
    }

    const allPosts = await Hotel.find({
      ...query,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    })
      .populate("postedBy", "username name avatar")
      .sort({ createdAt: -1 });

    const postsWithTag = await Car.find({
      ...query,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    })
      .populate("postedBy", "username name avatar")
      .sort({ createdAt: -1 });

    const combinedData = [...allPosts, ...postsWithTag];

    const totalPosts = combinedData.length;
    const totalPages = Math.ceil(totalPosts / limit);

    let currentPages;
    if (page === 1) {
      currentPages = combinedData.slice(0, limit);
    } else {
      currentPages = combinedData.slice((page - 1) * limit, page * limit);
    }

    res
      .status(200)
      .json({ currentPages, totalPages, currentPage: page, totalPosts });
  } catch (error) {
    console.error("Error fetching posts and tags:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export const getTravelsbyId = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const postindividual = await Car.findById({ _id: id }).populate(
      "postedBy",
      "username name avatar followers"
    );
    // console.log(postindividual.reviews);
    res.status(201).json(postindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});
