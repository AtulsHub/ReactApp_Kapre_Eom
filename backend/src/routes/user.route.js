import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser, 
  getUser, 
  login, 
  logout, 
  updateUser, 
  deleteUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Accept registration with or without a file
router.route("/register").post(upload.any(), registerUser);
router.route("/login").post(login);
router.route("/get-user/:userId").get(verifyJWT, getUser);
router.route("/update-user/:userId").put(verifyJWT, upload.single("profile"), updateUser);
router.route("/logout/:userId").get(verifyJWT, logout);
router.route("/delete/:userId").delete(verifyJWT, deleteUser);

export default router;
