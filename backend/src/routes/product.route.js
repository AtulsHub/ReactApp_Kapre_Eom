import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
createProduct,
removeProduct, 
getProductsByCategory, 
filterProducts, 
getProductsPaginated,
editProduct
} from "../controllers/product.controller.js";

const router = Router();

router
  .route("/create-product")
  .post(upload.array("productImages", 10), createProduct);
router.route("/remove-product/:productId").delete(removeProduct);
// router.route("/get-product/:itemId").get(getItem);
// router.route("/update-product/:itemId").put(upload.single("itemImage"), updateItem);
// router.route("/delete-product/:itemId").delete(deleteItem);

router.route("/get-product-by-category").get(getProductsByCategory);
router.route("/search").get(filterProducts);
router.route("/products-paginated").get(getProductsPaginated);
router.route("/edit-product/:productId").put(upload.array("productImages", 10), editProduct);

export default router;
