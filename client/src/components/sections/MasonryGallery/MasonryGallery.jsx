import { useEffect, useRef, useState } from "react";
import "./MasonryGallery.css";
import {Link} from "react-router-dom"
import useRevealOnce from "../../../hooks/useRevealOnce";
import { useLanguage } from "../../../utils/language";

import img1 from "../../../assets/images/gallery/gallery1.JPG";
import img2 from "../../../assets/images/gallery/gallery2.JPG";
import img3 from "../../../assets/images/gallery/gallery3.JPG";
import img4 from "../../../assets/images/gallery/imagen1.JPG";
import img5 from "../../../assets/images/gallery/imagen2.JPG";
import img6 from "../../../assets/images/gallery/gallery6.JPG";
import img7 from "../../../assets/images/gallery/gallery7.jpeg";
import img8 from "../../../assets/images/gallery/gallery8.jpeg";
import img9 from "../../../assets/images/gallery/gallery9.jpeg";
import img10 from "../../../assets/images/gallery/gallery10.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const dimensions = [[4000, 6000], [3000, 2000], [3000, 2000], [3000, 2000], [3000, 2000], [1332, 2000], [3000, 2000], [7008, 4672], [7008, 4672], [3000, 2000]];
const rows = [[0, 1, 2], [3, 4], [5, 6, 7], [8, 9]];

export default function MasonryGallery() {
  const [, t] = useLanguage();
  const sectionRef = useRef(null);
  useRevealOnce(sectionRef);

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
  }, [lightboxOpen]);

  return (
    <section className="mg home-portfolio" aria-label="Portfolio" id="portfolio" ref={sectionRef}>
      <div className="mg__wrap">
        <header className="mg__header">
          <p className="mg__eyebrow" data-home-reveal>FABIÁN GONZÁLEZ · PORTFOLIO</p>
          <h1 className="mg__title" data-home-reveal data-reveal-delay="80">
            <span className="mg__titleEm">{t.portfolioTitle}</span>
          </h1>
          <p className="mg__lead" data-home-reveal data-reveal-delay="160">
            {t.portfolioLead}
          </p>
        </header>

        <div className="mg__grid">
          {rows.map((row, rowIndex) => (
            <div className="home-portfolio__row" key={rowIndex}>
          {row.map((idx, position) => (
            <figure
              key={idx}
              className="mg__item"
              style={{ "--photo-ratio": dimensions[idx][0] / dimensions[idx][1] }}
              data-home-reveal
              data-reveal-delay={position * 90}
            >
              <button
                type="button"
                className="mg__btn"
                onClick={() => openLightbox(idx)}
                aria-label={`${t.openPhoto} ${idx + 1}`}
              >
                <img className="mg__img" src={images[idx]} alt={`Portfolio ${idx + 1}`} loading="lazy"
                  width={dimensions[idx][0]} height={dimensions[idx][1]} />
              </button>
            </figure>
          ))}
            </div>
          ))}
        </div>
        <Link className="mg__footer mg__fullLink" to="/portfolio">
           {t.fullPortfolio}
        </Link>
      </div>

      {/* ✅ LIGHTBOX */}
      {lightboxOpen && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={t.gallery}>
          <button className="lb__overlay" aria-label={t.close} onClick={closeLightbox} />

          <div className="lb__bar">
            <span className="lb__count">
              {activeIndex + 1}/{images.length}
            </span>

            <button className="lb__close" aria-label={t.close} onClick={closeLightbox}>
              ✕
            </button>
          </div>

          <button className="lb__nav lb__nav--left" aria-label={t.previous} onClick={prev}>
            ‹
          </button>

          <figure className="lb__frame">
            <img className="lb__img" src={images[activeIndex]} alt={`Foto ${activeIndex + 1}`} />
          </figure>

          <button className="lb__nav lb__nav--right" aria-label={t.next} onClick={next}>
            ›
          </button>
        </div>
      )}
    </section>
  );
}
