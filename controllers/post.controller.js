// controllers/post.controller.js
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
} from "../models/post.model.js";

export const addPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const postId = await createPost(userId, title, content);
    res.status(201).json({ id: postId, title, content, userId });
  } catch (err) {
    next(err);
  }
};

export const fetchAllPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const fetchPostById = async (req, res, next) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const fetchUserPosts = async (req, res, next) => {
  try {
    const posts = await getPostsByUser(req.user.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updated = await updatePost(id, req.user.id, title, content);

    if (!updated)
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    res.json({ message: "Post updated successfully" });
  } catch (err) {
    next(err);
  }
};

export const removePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deletePost(id, req.user.id);

    if (!deleted)
      return res
        .status(404)
        .json({ message: "Post not found or unauthorized" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
