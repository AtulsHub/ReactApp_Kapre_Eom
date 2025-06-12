import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
