// routes/post.routes.js
import express from "express";
import {
  addPost,
  fetchAllPosts,
  fetchPostById,
  fetchUserPosts,
  editPost,
  removePost,
} from "../controllers/post.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", fetchAllPosts);
router.get("/:id", fetchPostById);

// Private
router.post("/", protect, addPost);
router.get("/user/myposts", protect, fetchUserPosts);
router.put("/:id", protect, editPost);
router.delete("/:id", protect, removePost);

export default router;
