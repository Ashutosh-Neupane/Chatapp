import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../lib/cloudinary.js";

// ---------------- Signup Controller ----------------
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        bio: user.bio,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ---------------- Login Controller ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: userData._id,
        fullName: userData.fullName,
        email: userData.email,
        bio: userData.bio,
        profilePic: userData.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ---------------- Check Auth ----------------
export const checkauth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// ---------------- Update Profile Controller ----------------
export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, selectedImg } = req.body;

    let updateData = { fullName, bio };

    // If selectedImg exists, upload to Cloudinary
    if (selectedImg) {
      const upload = await cloudinary.uploader.upload(selectedImg, {
        folder: "profilePics",
      });
      updateData.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
