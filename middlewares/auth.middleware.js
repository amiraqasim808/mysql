// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { findUserById } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
