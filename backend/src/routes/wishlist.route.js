import { Router } from "express";
import { addToWishlist, removeFromWishlist, getWishlistItems } from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/add", addToWishlist);
router.post("/remove", removeFromWishlist);
router.get("/items", getWishlistItems);

export default router;
