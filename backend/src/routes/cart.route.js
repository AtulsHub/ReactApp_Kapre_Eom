import { Router } from "express";
import { addToCart, removeFromCart, getCartItems } from "../controllers/cart.controller.js";

const router = Router();

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/items/:userId", getCartItems);

export default router;
