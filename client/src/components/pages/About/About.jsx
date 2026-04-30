import "./About.css";

// Si después querés imágenes reales, reemplazás estos imports:
// import img1 from "../../../assets/images/about/about1.jpg";
// import img2 from "../../../assets/images/about/about2.jpg";

export default function About() {
  return (
    <section className="about" aria-label="About">
      <div className="about__wrap">
        {/* Columna izquierda */}
        <aside className="about__left">
          <div className="about__contact">
            <p className="about__contactName">Fabián González</p>
            <p className="about__contactName">Fotografía</p>
            <a className="about__mail" href="mailto:info@tusitio.com">
              info@tusitio.com
            </a>
          </div>

          <nav className="about__links" aria-label="Links">
            <a className="about__link" href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="about__link" href="https://facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="about__link" href="https://pinterest.com" target="_blank" rel="noreferrer">
              Pinterest
            </a>
            <a className="about__link" href="#" target="_blank" rel="noreferrer">
              Canon Profile
            </a>

            <a className="about_link about_link--strong" href="#">
              WORKSHOPS
            </a>
          </nav>
        </aside>

        {/* Columna centro */}
        <div className="about__center">
          <h1 className="about__hello">Hola! soy</h1>
          <h2 className="about__title">Fabián </h2>
        </div>

        {/* Columna derecha */}
        <div className="about__right">
          <div className="about__copy">
            <p>
              Fabián González es fotógrafo de bodas con una mirada editorial y atemporal.
              Su trabajo se enfoca en emociones reales, luz natural y detalles con intención.
            </p>
            <p>
              Experiencia en bodas destino, editoriales y coberturas íntimas.
              Publicaciones, colaboraciones y proyectos en distintos escenarios.
            </p>
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
    </section>
  );
}