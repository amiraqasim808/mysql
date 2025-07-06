// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({ name, email, hashedPassword });

    const token = generateToken(userId);
    res.status(201).json({ id: userId, name, email, token });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    res
      .status(200)
      .json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    next(err);
  }
};
