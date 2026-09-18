import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";
import { getCloudinaryUrl } from "../../../utils/cloudinary";

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const itemRefs = useRef([]);
  const [isVisible, setIsVisible] = useState([]);
  const [shouldLoad, setShouldLoad] = useState([]);

  // ✅ Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Cargar imágenes desde el servidor
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/gallery/portfolio");
        if (!response.ok) throw new Error("Error al cargar la galería");
        
        const data = await response.json();
        
        // Transformamos los IDs de Cloudinary en URLs de miniatura y alta resolución
        const formattedImages = data.map(img => ({
          thumb: getCloudinaryUrl(img.id, { width: 800 }),
          full: getCloudinaryUrl(img.id),
          id: img.id
        }));

        setImages(formattedImages);
        setIsVisible(new Array(formattedImages.length).fill(false));
        setShouldLoad(new Array(formattedImages.length).fill(false));
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las fotografías. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 2. Lightbox controls
  const openLightbox = (idx) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  // 3. Scroll & Keyboard locks
  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, images.length]);

  // 4. Lazy reveal (Intersection Observer)
  useEffect(() => {
    if (images.length === 0) return;
    
    const els = itemRefs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.dataset.idx);

          setShouldLoad((p) => { const n = [...p]; n[idx] = true; return n; });
          setIsVisible((p) => { const n = [...p]; n[idx] = true; return n; });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 200px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [images]);

  if (loading) return <div className="mg__status">Cargando portfolio...</div>;
  if (error) return <div className="mg__status mg__status--error">{error}</div>;

  return (
    <section className="mg" aria-label="Portfolio">
      <div className="mg__wrap">
        <header className="mg__header">
          <p className="mg__eyebrow">PORTFOLIO</p>
        </header>

        <div className="mg__grid">
          {images.map((img, idx) => (
            <figure
              key={img.id}
              className={`mg__item ${isVisible[idx] ? "is-visible" : ""}`}
              style={{ "--d": `${idx * 50}ms` }}
              data-idx={idx}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <button
                type="button"
                className="mg__btn"
                onClick={() => openLightbox(idx)}
              >
                {shouldLoad[idx] ? (
                  <img className="mg__img" src={img.thumb} alt={`Fotografía ${idx + 1}`} />
                ) : (
                  <div className="mg__placeholder" />
                )}
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div className="lb" role="dialog" aria-modal="true">
          <button className="lb__overlay" onClick={closeLightbox} />
          <div className="lb__bar">
            <span className="lb__count">{activeIndex + 1}/{images.length}</span>
            <button className="lb__close" onClick={closeLightbox}>✕</button>
          </div>
          <button className="lb__nav lb__nav--left" onClick={prev}>‹</button>
          <figure className="lb__frame">
            <img className="lb__img" src={images[activeIndex].full} alt="Visualización" />
          </figure>
          <button className="lb__nav lb__nav--right" onClick={next}>›</button>
        </div>
      )}
    </section>
  );
}
