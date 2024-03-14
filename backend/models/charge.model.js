import mongoose from "mongoose";

const chargeSchema = mongoose.Schema(
  {
    chargingname: {
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
    chargingaddress: {
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

chargeSchema.index({ location: "2dsphere" });

const Charge = mongoose.model("Charge", chargeSchema);

export default Charge;
