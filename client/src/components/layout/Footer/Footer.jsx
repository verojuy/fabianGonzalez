import "./Footer.css";
import logo from "../../../assets/images/logofabian.png";

const Footer = () => {
  return (
    <footer className="ft">
      <div className="ft__wrap">
        {/* LEFT */}
        <div className="ft__left">
          <img
            src={logo}
            alt="Fabián González Fotografía"
            className="ft__logo"
          />

          <nav className="ft__nav">
            <a href="/">INICIO</a>
            <a href="/portfolio">PORTFOLIO</a>
            <a href="/bodas">BODAS</a>
            <a href="/diario">DIARIO</a>
          </nav>
        </div>

        {/* SPACER */}
        <div className="ft__spacer" aria-hidden="true" />

        {/* INFO RIGHT */}
        <div className="ft__info">
          <span className="ft__info-title">INFO</span>

          <a href="/sobre-mi">SOBRE MÍ</a>
          <a href="/contacto">CONTACTO</a>
          <a href="/perfil">PERFIL</a>

          <div className="ft__socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Pinterest">P</a>
          </div>
        </div>
      </div>

      <div className="ft__bottom">
        © 2026 Fabián González — Fotografía
      </div>
    </footer>
  );
};

export default Footer;
