import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../utils/api";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("Cargando fotografías...");

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  const DISPLAY_MS = 5200;
  const FADE_MS = 1100;

  useEffect(() => {
    const hero = heroRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      // The parent scrolls normally even while the banner is sticky.
      const distance = Math.max(0, -hero.parentElement.getBoundingClientRect().top);
      const limit = window.innerWidth <= 768 ? 24 : 48;
      const shift = motion.matches ? 0 : Math.min(limit, distance * 0.08);
      hero.style.setProperty("--hero-drift", `${-shift}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      hero.style.removeProperty("--hero-drift");
    };
  }, []);

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
    <section className="hero" id="works" aria-label="Fotografías de bodas" ref={heroRef}>
      <div className="hero__depth">
      {status && <p className="hero__status" role="status">{status}</p>}
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

      <div className="hero__overlay" aria-hidden="true" />
      </div>
    </section>
  );
}

