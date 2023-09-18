import express from "express";
import { User } from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const userRouter = express.Router();

// Login
userRouter.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json({ message: "user doesn't exist" });
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      return res
        .status(200)
        .json({ message: "User Logged In  Successfully", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

// Signup
userRouter.post("/signup", async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    return res
      .status(200)
      .json({ message: "New User Created Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});
