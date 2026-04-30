import "./WorkHighlight.css";
import { Link } from "react-router-dom";

// ✅ Fondo
import bg from "../../../assets/images/work/fondo1.jpg";

// ✅ 3 imágenes de la derecha
import work1 from "../../../assets/images/work/work1.JPG";
import work2 from "../../../assets/images/work/work2.JPG";
import work3 from "../../../assets/images/work/work3.JPG";

export default function WorkHighlight() {
  return (
    <section
      className="wh"
      aria-label="Nuestro trabajo"
      style={{ "--wh-bg": `url(${bg})` }}
    >
      {/* Overlay para el tono editorial */}
      <div className="wh__overlay" aria-hidden="true" />

      <div className="wh__wrap">
        {/* Texto (izquierda) */}
        <div className="wh__text">
          <p className="wh__eyebrow">NUESTRO TRABAJO</p>
          <h2 className="wh__title">Historias de Amor</h2>
          <p className="wh__lead">
            Destinos soñados, parejas aventureras <br />
            e imágenes con alma.
          </p>

          {/* ✅ Link (por ahora a /portfolio, lo armamos después) */}
          <Link className="wh__link" to="/stories">
           Ver todo
        </Link>
        
        </div>

        {/* Imágenes (derecha) */}
        <div className="wh__grid" aria-label="Historias destacadas">
          <figure className="wh__card wh__card--a">
            <img className="wh__img" src={work1} alt="Historia destacada 1" loading="lazy" />
          </figure>

          <figure className="wh__card wh__card--b">
            <img className="wh__img" src={work2} alt="Historia destacada 2" loading="lazy" />
          </figure>

          <figure className="wh__card wh__card--c">
            <img className="wh__img" src={work3} alt="Historia destacada 3" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}
