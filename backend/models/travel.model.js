import mongoose from "mongoose";

const carSchema = mongoose.Schema(
  {
    carname: {
      type: String,
      required: true,
    },
    carnumberplate:{
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
    imagecar: {
      type: [String],
      default: [],
    },
    caraddress: {
      type: String,
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

carSchema.index({ location: "2dsphere" });

const Car = mongoose.model("Car", carSchema);

export default Car;
