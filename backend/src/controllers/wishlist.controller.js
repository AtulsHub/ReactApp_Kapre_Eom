import { Wishlist } from "../modals/wishlist.model.js";
import mongoose from "mongoose";

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }
    let wishlist = await Wishlist.findOne({ owner: userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        owner: userId,
        items: [mongoose.Types.ObjectId(productId)],
      });
    } else {
      if (!wishlist.items.some((item) => item.toString() === productId.toString())) {
        wishlist.items.push(mongoose.Types.ObjectId(productId));
      }
    }
    await wishlist.save();
    res.status(200).json({ message: "Item added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist", error: err.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" });
    }
    const wishlist = await Wishlist.findOne({ owner: userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    wishlist.items = wishlist.items.filter(
      (item) => item.toString() !== productId.toString()
    );
    await wishlist.save();
    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist", error: err.message });
  }
};

// Get all wishlist items for a user
const getWishlistItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    const wishlist = await Wishlist.findOne({ owner: userId }).populate("items");
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist.items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching wishlist", error: err.message });
  }
};

export { addToWishlist, removeFromWishlist, getWishlistItems };
