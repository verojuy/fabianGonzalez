import { useEffect, useState } from "react";
import { apiUrl } from "../../../utils/api";
import "./Hero.css";

export default function Hero() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("Cargando fotografías...");

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  const DISPLAY_MS = 5200;
  const FADE_MS = 1100;

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const response = await fetch(apiUrl("/api/gallery/banner"), {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("No se pudo cargar el banner");

        const data = await response.json();
        const urls = data.map((image) =>
          image.url.replace("/upload/", "/upload/f_auto,q_auto/")
        );
        if (controller.signal.aborted) return;
        setImages(urls);
        setStatus(urls.length ? "" : "No hay fotografías disponibles.");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error al cargar el banner:", error);
        setStatus("No se pudieron cargar las fotografías.");
      }
    }

    loadImages();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const nextImage = new Image();
    nextImage.src = images[(active + 1) % images.length];
  }, [active, images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setPrev(active);
      setActive((i) => (i + 1) % images.length);
    }, DISPLAY_MS);

    return () => clearInterval(id);
  }, [active, images.length]);

  return (
    <section className="hero" id="works" aria-label="Hero">
      {status && <p role="status">{status}</p>}
      {images.length > 0 && <>
      <img
        className="hero__bg hero__bg--prev"
        src={images[prev]}
        alt=""
        aria-hidden="true"
      />

      <img
        className="hero__bg hero__bg--active"
        src={images[active]}
        alt="Fotografía de boda de Fabián Gonzalez"
        style={{
          animationDuration: `${FADE_MS}ms`,
        }}
        key={active}
      />
      </>}

      <div className="hero__overlay" />

      {/* <div className="hero__inner">
        <p className="hero__kicker">WEDDING &amp; EDITORIAL PHOTOGRAPHY</p>
        <h1 className="hero__title">
          Timeless photography for <br className="hero__br" />
          real love stories
        </h1>       
      </div> */}
    </section>
  );
}

