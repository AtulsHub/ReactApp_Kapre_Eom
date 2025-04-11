import { User } from "../modals/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profileLocalPath = req.file?.path;
    let profilePic;

    console.log(profileLocalPath);

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
    res.status(400).json({
      message: "User registration failed",
    });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.params);

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
    return res.status(400).json({
      message: "User registration failed",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const profileLocalPath = req.file?.profile[0].path;

    if (!name && !email && !password) {
      return res
        .status(400)
        .json({ message: "please enter the field you want to update" });
    }

    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID" });
    }

    const profilePic = await uploadOnCloudinary(profileLocalPath);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password,
        profilePic: profilePic?.url || "",
      },
      { new: true }
    );

    res.status(201).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      User,
    });
  } catch (error) {
    res.status(400).json({
      message: "User updation failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    console.log("email: ", email);

    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "User login failed",
    });
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Please provide a user ID" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({
      message: "User logout failed",
    });
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
    res.status(400).json({
      message: "User deletion failed",
    });
  }
};

export { registerUser, getUser, login, logout, updateUser, deleteUser };
