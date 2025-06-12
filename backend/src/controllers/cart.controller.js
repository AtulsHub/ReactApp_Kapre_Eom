import { Cart } from "../modals/cart.model.js";
import mongoose from "mongoose";

// Add product to cart (with quantity)
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }
    let cart = await Cart.findOne({ owner: userId });
    if (!cart) {
      cart = new Cart({
        owner: userId,
        items: [{ product: new mongoose.Types.ObjectId(productId), quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId.toString()
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: new mongoose.Types.ObjectId(productId), quantity });
      }
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }
    const cart = await Cart.findOne({ owner: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing from cart", error: err.message });
  }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const cart = await Cart.findOne({ owner: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

export { addToCart, removeFromCart, getCartItems };
