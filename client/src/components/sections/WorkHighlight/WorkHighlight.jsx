import "./WorkHighlight.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getCloudinaryUrl } from "../../../utils/cloudinary";

// ✅ Fondo
import bg from "../../../assets/images/sobremi1.JPG";
import { useLanguage } from "../../../utils/language";

// Portadas seleccionadas en las carpetas de Stories de Cloudinary.
const work1 = getCloudinaryUrl("0422_Anto_Segu_tv3pnx", { width: 1000 });
const work2 = getCloudinaryUrl("0406_SANTI_JO.JPG_m3bmym", { width: 1000 });
const work3 = getCloudinaryUrl("0374RO_PABLITO_rfuyd2", { width: 1000 });
const work4 = getCloudinaryUrl("0435_Flor_Seba_qr6y2g", { width: 1000 });

export default function WorkHighlight() {
  const [, t] = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (viewport - top) / (viewport + height)));
      const mobile = window.innerWidth <= 768;
      const travel = Math.min(mobile ? 80 : 160, height * (mobile ? 0.1 : 0.18));
      const offset = reducedMotion.matches ? 0 : (progress * 2 - 1) * travel;
      section.style.setProperty("--wh-drift", `${offset}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      section.style.removeProperty("--wh-drift");
    };
  }, []);

  return (
    <section
      className="wh"
      ref={sectionRef}
      aria-label={t.loveStories}
      style={{ "--wh-bg": `url(${bg})` }}
    >
      <div className="wh__background" aria-hidden="true" />
      {/* Overlay para el tono editorial */}
      <div className="wh__overlay" aria-hidden="true" />

      <div className="wh__wrap">
        {/* Texto (izquierda) */}
        <div className="wh__text">
          <h2 className="wh__title">{t.loveStories}</h2>
          <p className="wh__lead">
            {t.dream}
          </p>

          {/* ✅ Link (por ahora a /portfolio, lo armamos después) */}
        
        </div>

        {/* Imágenes (derecha) */}
        <div className="wh__grid" aria-label="Historias destacadas">
          <figure className="wh__card wh__card--a">
            <img className="wh__img" src={work1} alt="Boda de Anto y Segu en Jujuy" loading="lazy" />
          </figure>

          <figure className="wh__card wh__card--b">
            <img className="wh__img" src={work2} alt="Boda de Santi y Yo en Jujuy" loading="lazy" />
          </figure>

          <figure className="wh__card wh__card--c">
            <img className="wh__img" src={work3} alt="Boda de Ro y Pablo en Jujuy" loading="lazy" />
          </figure>
          <figure className="wh__card wh__card--d">
            <img className="wh__img" src={work4} alt="Boda de Flor y Seba" loading="lazy" />
          </figure>
        </div>
        <Link className="wh__link" to="/stories">{t.view}</Link>
      </div>
    </section>
  );
}
