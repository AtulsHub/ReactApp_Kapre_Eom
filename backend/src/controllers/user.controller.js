import { User } from "../modals/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Use req.files for upload.any()
    const profileLocalPath = req.files && req.files[0] ? req.files[0].path : undefined;
    let profilePic;

    // Debug: log incoming data
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (password.length < 6 || password.length > 20) {
      return res
        .status(400)
        .json({ message: "Password length must be 6 to 20 characters long" });
    }
    if (profileLocalPath) {
      profilePic = await uploadOnCloudinary(profileLocalPath);
    }
    const user = await User.create({
      name,
      email,
      password,
      profilePic: profilePic?.url || "",
    });
    res.status(201).json({
      message: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ message: "User registration failed" });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: "User fetch failed" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const profileLocalPath = req.file?.path;
    if (!name && !email && !password && !profileLocalPath) {
      return res
        .status(400)
        .json({ message: "Please enter a field to update" });
    }
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID" });
    }
    let updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = password; // Will be hashed by pre-save hook
    if (profileLocalPath) {
      const profilePic = await uploadOnCloudinary(profileLocalPath);
      updateFields.profilePic = profilePic?.url || "";
    }
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(user, updateFields);
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "User update failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "User login failed" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "User logout failed" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID" });
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "User deletion failed" });
  }
};

export { registerUser, getUser, login, logout, updateUser, deleteUser };
