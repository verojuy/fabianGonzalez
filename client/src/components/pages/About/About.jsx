import "./About.css";
import { Link } from "react-router-dom";
import portrait from "../../../assets/images/sobremi.jpeg";
import PortfolioStrip from "../../sections/PortfolioStrip/PortfolioStrip";
import { useLanguage } from "../../../utils/language";

// Si después querés imágenes reales, reemplazás estos imports:
// import img1 from "../../../assets/images/about/about1.jpg";
// import img2 from "../../../assets/images/about/about2.jpg";

export default function About() {
  const [, t] = useLanguage();
  return (
    <section className="about" aria-label={t.about}>
      <div className="about__wrap">
        {/* Columna centro */}
        <div className="about__center">
          <h1 className="about__hello">{t.aboutMe}</h1>
          <h2 className="about__title">Fabián </h2>
          <figure className="about__portrait">
            <img src={portrait} alt="Fabián González, fotógrafo" decoding="async" />
          </figure>
        </div>

        {/* Columna derecha */}
        <div className="about__right">
          <div className="about__copy">
            <p>
              {t.aboutCopy1}
            </p>
            <p>
              {t.aboutCopy2}
            </p>
            <p>{t.aboutCopy3}</p>
            <p>{t.aboutCopy4}</p>
            <p>{t.aboutCopy5}</p>
          </div>

          <div className="about__images" aria-label="Fotos destacadas">
            {/* <figure className="about__imgCard">
              <img className="about__img" src={img1} alt="About 1" loading="lazy" />
            </figure>
            <figure className="about__imgCard">
              <img className="about__img" src={img2} alt="About 2" loading="lazy" />
            </figure> */}
          </div>
        </div>
      </div>
      <div className="about__actions">
        <nav className="about__links" aria-label="Redes sociales">
          <a href="https://www.instagram.com/fabiangonzalezbodas/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
        </nav>
        <Link className="about__contactButton" to="/contact">{t.aboutButton}</Link>
      </div>
      <PortfolioStrip />
    </section>
  );
}
