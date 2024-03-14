import mongoose from "mongoose";

const latlongSchema = mongoose.Schema(
  {
    locationway1: {
      type: { type: String, required: true },
      coordinates: [],
    },
    locationway2: {
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

latlongSchema.index({ location: "2dsphere" });

const Latlongs = mongoose.model("Latlongs", latlongSchema);

export default Latlongs;
