import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storiesRouter from "./routes/stories.js";
import galleryRouter from "./routes/gallery.js";

dotenv.config();

const app = express();

app.use(cors()); // Permitir todo temporalmente para pruebas

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "fabian-backend" });
});

app.use("/api/stories", storiesRouter);
app.use("/api/gallery", galleryRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});