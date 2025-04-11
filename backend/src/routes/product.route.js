import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getAllItems,
  getProductsByCategory,
  createProducts,
} from "../controllers/product.controller.js";

const router = Router();

router
  .route("/create-product")
  .post(upload.single("productImage"), createProducts);
// router.route("/get-product/:itemId").get(getItem);
// router.route("/update-product/:itemId").put(upload.single("itemImage"), updateItem);
// router.route("/delete-product/:itemId").delete(deleteItem);

router.route("/get-all-products").get(getAllItems);
router.route("/get-product-by-category").get(getProductsByCategory);

export default router;
