import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/images/logofabian.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // cerrar menú al pasar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // bloquear scroll + clase en body
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("nav-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((v) => !v);

  return (
    <>
      <header className="nav" id="top">
        <div className="nav__inner">
          <a className="nav__link nav__left" href="#works">
            TRABAJOS
          </a>
          <Link to="/" className="nav__brand" aria-label="Ir al inicio">
            <img src={logo} alt="Fabián Gonzalez" className="nav__logo" />
          </Link>

          

          <nav className="nav__right nav__right--desktop" aria-label="Primary">
            <Link to="/about" className="nav__link">
            SOBRE MÍ
            </Link>

            <Link to="/contact" className="nav__link">
            CONTACTO
            </Link>
            
            
          </nav>

          {/* Burger SOLO mobile */}
          <button
            className={`nav__burger ${open ? "is-open" : ""}`}
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={toggleMenu}
          >
            <span className="nav__burgerLine" />
            <span className="nav__burgerLine" />
            <span className="nav__burgerLine" />
          </button>
        </div>
      </header>

      {/* Modal Mobile */}
      <div className={`nav__panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="nav__panelHeader">
          <a className="nav__panelBrand" href="#top" aria-label="Inicio" onClick={closeMenu}>
            <img className="nav__panelLogo" src={logo} alt="Fabián González" />
          </a>

          <button className="nav__close" type="button" aria-label="Cerrar" onClick={closeMenu}>
            <span />
            <span />
          </button>
        </div>

        <div className="nav__panelInner" role="dialog" aria-modal="true">
          <a className="nav__panelLink" href="#works" onClick={closeMenu}>
            Trabajos
          </a>
          <a className="nav__panelLink" href="#about" onClick={closeMenu}>
            Sobre mí
          </a>
          <a className="nav__panelLink" href="#contact" onClick={closeMenu}>
            Contacto
          </a>
        </div>
      </div>
    </>
  );
}
