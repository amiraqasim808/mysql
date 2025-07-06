import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import postRoutes from "./routes/post.routes.js";


dotenv.config(); 

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler);
db.query("SELECT 1")
  .then(() => console.log("✅ Database connected!"))
  .catch((err) => console.error("❌ DB connection error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
