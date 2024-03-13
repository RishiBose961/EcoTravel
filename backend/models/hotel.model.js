import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    hotelname: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    imagehotel: {
      type: [String],
      default: [],
    },
    hoteladdress: {
      type: String,
      required: true,
    },
    cheapestPrice:{
      type: Number,
      required: true,
  },
    location: {
      type: { type: String, required: true },
      coordinates: [],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

hotelSchema.index({ location: "2dsphere" });

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
