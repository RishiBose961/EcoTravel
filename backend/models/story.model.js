import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    storytitle: {
      type: String,
      required: true,
    },
    storydescription:{
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
    imagestory: {
      type: [String],
      default: [],
    },
    otp_expiry: {
        type:Date
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

storySchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 })

const Story = mongoose.model("Story", storySchema);

export default Story;
