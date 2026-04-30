import { useEffect, useRef, useState } from "react";
import "./MasonryGallery.css";
import {Link} from "react-router-dom"

import img1 from "../../../assets/images/gallery/gallery1.JPG";
import img2 from "../../../assets/images/gallery/gallery2.JPG";
import img3 from "../../../assets/images/gallery/gallery3.JPG";
import img4 from "../../../assets/images/gallery/gallery4.JPG";
import img5 from "../../../assets/images/gallery/gallery5.JPG";
import img6 from "../../../assets/images/gallery/gallery6.JPG";
import img7 from "../../../assets/images/gallery/gallery7.jpeg";
import img8 from "../../../assets/images/gallery/gallery8.jpeg";
import img9 from "../../../assets/images/gallery/gallery9.jpeg";
import img10 from "../../../assets/images/gallery/gallery10.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function MasonryGallery() {
  const itemRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(() => new Array(images.length).fill(false));
  const [shouldLoad, setShouldLoad] = useState(() => new Array(images.length).fill(false));

  // ✅ lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (idx) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  // ✅ bloquear scroll + teclado
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  // ✅ reveal + carga real
  useEffect(() => {
    const els = itemRefs.current.filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const idx = Number(entry.target.dataset.idx);

          setShouldLoad((prevArr) => {
            if (prevArr[idx]) return prevArr;
            const nextArr = [...prevArr];
            nextArr[idx] = true;
            return nextArr;
          });

          setIsVisible((prevArr) => {
            if (prevArr[idx]) return prevArr;
            const nextArr = [...prevArr];
            nextArr[idx] = true;
            return nextArr;
          });

          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="mg" aria-label="Portfolio" id="portfolio">
      <div className="mg__wrap">
        <header className="mg__header">
          <p className="mg__eyebrow">PORTFOLIO</p>
          <h2 className="mg__title">
            <span className="mg__titleEm">FOTOGRAFÍA ATEMPORAL</span> con una firma editorial.
          </h2>
          <p className="mg__lead">
            Nos gusta describir nuestras fotografías como delicadas, emotivas y siempre atemporales.
            Bodas destino y editoriales en lugares increíbles.
          </p>
        </header>

        <div className="mg__grid">
          {images.map((src, idx) => (
            <figure
              key={idx}
              className={`mg__item ${isVisible[idx] ? "is-visible" : ""}`}
              style={{ "--d": `${idx * 90}ms` }}
              data-idx={idx}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <button
                type="button"
                className="mg__btn"
                onClick={() => openLightbox(idx)}
                aria-label={`Abrir foto ${idx + 1}`}
              >
                {shouldLoad[idx] ? (
                  <img className="mg__img" src={src} alt={`Portfolio ${idx + 1}`} loading="eager" />
                ) : (
                  <div className="mg__placeholder" aria-hidden="true" />
                )}
              </button>
            </figure>
          ))}
        </div>
        <Link className="mg__footer" to="/portfolio">
           Ver portfolio completo
        </Link>
      </div>

      {/* ✅ LIGHTBOX */}
      {lightboxOpen && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Galería">
          <button className="lb__overlay" aria-label="Cerrar" onClick={closeLightbox} />

          <div className="lb__bar">
            <span className="lb__count">
              {activeIndex + 1}/{images.length}
            </span>

            <button className="lb__close" aria-label="Cerrar" onClick={closeLightbox}>
              ✕
            </button>
          </div>

          <button className="lb__nav lb__nav--left" aria-label="Anterior" onClick={prev}>
            ‹
          </button>

          <figure className="lb__frame">
            <img className="lb__img" src={images[activeIndex]} alt={`Foto ${activeIndex + 1}`} />
          </figure>

          <button className="lb__nav lb__nav--right" aria-label="Siguiente" onClick={next}>
            ›
          </button>
        </div>
      )}
    </section>
  );
}
