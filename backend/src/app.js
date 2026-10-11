import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import podcastRoutes from "./routes/podcast.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AI Podcast Generator API is running" });
});

app.use("/api/podcast", podcastRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});