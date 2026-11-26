import { Router } from "express";
import cloudinary from "../services/cloudinary.js";

const router = Router();

router.get("/:folderName", async (req, res) => {
  const { folderName } = req.params; 
  const fullFolderPath = `fabian-fotos/${folderName}`;

  console.log(`--- PETICIÓN RECIBIDA ---`);
  console.log(`Buscando en carpeta: ${fullFolderPath}`);

  try {
    const resources = [];
    let nextCursor;
    do {
      const query = cloudinary.search
        .expression(`folder:"${fullFolderPath}"`)
        .sort_by('created_at', 'desc')
        .max_results(500);
      if (nextCursor) query.next_cursor(nextCursor);
      const result = await query.execute();
      resources.push(...result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    console.log(`Imágenes encontradas en Cloudinary: ${resources.length}`);

    const images = resources.map(img => ({
      id: img.public_id,
      url: img.secure_url
    }));

    res.json(images);
  } catch (error) {
    console.error("ERROR AL HABLAR CON CLOUDINARY:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
