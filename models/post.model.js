// models/post.model.js
import db from "../config/db.js";

// Create new post
export const createPost = async (userId, title, content) => {
  const [result] = await db.query(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    [userId, title, content]
  );
  return result.insertId;
};

// Get all posts
export const getAllPosts = async () => {
  const [rows] = await db.query(`
    SELECT posts.*, users.name AS author 
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    ORDER BY posts.created_at DESC
  `);
  return rows;
};

// Get single post by ID
export const getPostById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT posts.*, users.name AS author 
    FROM posts 
    JOIN users ON posts.user_id = users.id 
    WHERE posts.id = ?
  `,
    [id]
  );
  return rows[0];
};

// Get posts by user
export const getPostsByUser = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

// Update post
export const updatePost = async (postId, userId, title, content) => {
  const [result] = await db.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?",
    [title, content, postId, userId]
  );
  return result.affectedRows;
};

// Delete post
export const deletePost = async (postId, userId) => {
  const [result] = await db.query(
    "DELETE FROM posts WHERE id = ? AND user_id = ?",
    [postId, userId]
  );
  return result.affectedRows;
};
