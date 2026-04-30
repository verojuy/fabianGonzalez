import express from "express";
import cloudinary from "../services/cloudinary.js";

const router = express.Router();
const STORIES_ROOT = process.env.CLOUDINARY_STORIES_ROOT || "Historias";

/**
 * Convierte "sofi_y_carmelo" -> "Sofi Y Carmelo"
 */
function prettifySlug(slug) {
  return slug
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/**
 * Convierte nombre de carpeta a slug seguro para URL
 * "Emi Y Maxi" -> "emi_y_maxi"
 * "Sofía y Carmelo" -> "sofia_y_carmelo"
 */
function slugifyFolderName(folderName) {
  return folderName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}

/**
 * Agrega transformaciones de entrega optimizadas.
 * f_auto y q_auto son recomendadas por Cloudinary para delivery optimizado.
 */
function optimizeUrl(url) {
  if (!url) return "";
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

/**
 * Busca imágenes de una carpeta de historia.
 * 1) intenta por prefix (fixed folder mode / public_id path)
 * 2) si no hay resultados, intenta por asset_folder (dynamic folder mode)
 */
async function getStoryImages(folderName) {
  const fullPath = `${STORIES_ROOT}/${folderName}`;

  // intento 1: prefix
  const byPrefix = await cloudinary.api.resources({
    type: "upload",
    resource_type: "image",
    prefix: fullPath,
    max_results: 200,
  });

  if (byPrefix.resources?.length) {
    return byPrefix.resources
      .sort((a, b) =>
        a.public_id.localeCompare(b.public_id, undefined, { numeric: true })
      )
      .map((r) => ({
        public_id: r.public_id,
        secure_url: optimizeUrl(r.secure_url),
        width: r.width,
        height: r.height,
        format: r.format,
      }));
  }

  // intento 2: asset_folder search
  const search = await cloudinary.search
    .expression(`resource_type:image AND asset_folder="${fullPath}"`)
    .sort_by("public_id", "asc")
    .max_results(200)
    .execute();

  return (search.resources || []).map((r) => ({
    public_id: r.public_id,
    secure_url: optimizeUrl(r.secure_url),
    width: r.width,
    height: r.height,
    format: r.format,
  }));
}

/**
 * Lista carpetas dentro de Stories root
 */
router.get("/", async (_req, res) => {
  try {
    const foldersResult = await cloudinary.api.sub_folders(STORIES_ROOT);
    const folders = foldersResult.folders || [];

    const stories = await Promise.all(
      folders.map(async (folder) => {
        const folderName = folder.name;
        const slug = slugifyFolderName(folderName);
        const images = await getStoryImages(folderName);
        const cover = images[0]?.secure_url || "";

        return {
          slug,
          title: prettifySlug(folderName),
          cover,
          count: images.length,
        };
      })
    );

    res.json(stories.filter((s) => s.count > 0));
  } catch (error) {
    console.error("GET /api/stories error:", error);
    res.status(500).json({
      error: "No se pudieron listar las historias",
      detail: error.message,
    });
  }
});

/**
 * Detalle de una historia
 * Busca la carpeta cuyo slug coincida con el parámetro
 */
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const foldersResult = await cloudinary.api.sub_folders(STORIES_ROOT);
    const folders = foldersResult.folders || [];

    const matchedFolder = folders.find(
      (folder) => slugifyFolderName(folder.name) === slug
    );

    if (!matchedFolder) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }

    const folderName = matchedFolder.name;
    const images = await getStoryImages(folderName);

    if (!images.length) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }

    res.json({
      slug,
      title: prettifySlug(folderName),
      images,
    });
  } catch (error) {
    console.error(`GET /api/stories/${req.params.slug} error:`, error);
    res.status(500).json({
      error: "No se pudo obtener la historia",
      detail: error.message,
    });
  }
});

export default router;