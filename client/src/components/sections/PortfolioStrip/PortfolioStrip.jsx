import { useEffect, useState } from "react";
import { apiUrl } from "../../../utils/api";
import "./PortfolioStrip.css";

export default function PortfolioStrip() {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("Cargando fotografías...");

  useEffect(() => {
    const controller = new AbortController();
    async function loadPhotos() {
      try {
        const response = await fetch(apiUrl("/api/gallery/portfolio"), { signal: controller.signal });
        if (!response.ok) throw new Error("No se pudo cargar el portfolio");
        const data = await response.json();
        if (controller.signal.aborted) return;
        const selection = [...data];
        for (let i = selection.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [selection[i], selection[j]] = [selection[j], selection[i]];
        }
        setPhotos(selection.slice(0, 9));
        setStatus(selection.length ? "" : "No hay fotografías disponibles.");
      } catch {
        if (!controller.signal.aborted) setStatus("No se pudieron cargar las fotografías.");
      }
    }
    loadPhotos();
    return () => controller.abort();
  }, []);

  return (
    <div className="portfolio-strip" role="region" aria-label="Fotografías del portfolio" tabIndex={0}>
      {status && <p className="portfolio-strip__status" role="status">{status}</p>}
      {photos.map((photo, index) => (
        <img key={photo.id} className="portfolio-strip__photo"
          src={photo.url.replace("/upload/", "/upload/f_auto,q_auto,w_500,c_limit/")}
          alt={`Fotografía de boda ${index + 1}`} width="220" height="220"
          loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
