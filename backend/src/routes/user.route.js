import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  login,
  getUser,
  updateUser,
  logout,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(upload.single("profile"), registerUser);
router.route("/login").post(login);
router.route("/get-user/:userId").get(getUser);
router.route("/update-user/:userId").put(upload.single("profile"), updateUser);
router.route("/logout/:userId").get(logout);
router.route("/delete/:userId").delete(deleteUser);


export default router;
