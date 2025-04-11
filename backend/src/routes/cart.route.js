import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/all").get(getCartItems);
router.route("/add").post(addToCart);
router.route("/remove").post(removeFromCart);

export default router;
