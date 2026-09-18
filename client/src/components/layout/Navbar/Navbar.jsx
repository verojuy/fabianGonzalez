import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/images/logofabian.png";

// Diccionario de traducciones
const translations = {
  ES: {
    works: "TRABAJOS",
    portfolio: "PORTFOLIO",
    stories: "STORIES",
    newsletter: "NEWSLETTER",
    about: "SOBRE MÍ",
    contact: "CONTACTO",
    site: "SITIO",
    language: "IDIOMA / LANGUAGE"
  },
  EN: {
    works: "WORKS",
    portfolio: "PORTFOLIO",
    stories: "STORIES",
    newsletter: "NEWSLETTER",
    about: "ABOUT",
    contact: "CONTACT",
    site: "SITE",
    language: "LANGUAGE"
  },
  IT: {
    works: "LAVORI",
    portfolio: "PORTFOLIO",
    stories: "STORIE",
    newsletter: "NEWSLETTER",
    about: "SU DI ME",
    contact: "CONTATTO",
    site: "SITO",
    language: "LINGUA"
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("ES");
  
  const location = useLocation();
  const t = translations[currentLang]; // Alias para las traducciones actuales

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
        setDropdownOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleMenu = () => setOpen((v) => !v);
  const toggleDropdown = (e) => {
    e.preventDefault();
    setLangOpen(false);
    setDropdownOpen((v) => !v);
  };

  const selectLang = (lang) => {
    setCurrentLang(lang);
    setLangOpen(false);
  };

  return (
    <>
      <header className={`nav ${dropdownOpen ? "is-dropdown-open" : ""}`} id="top">
        <div className="nav__inner">
          <div className="nav__left">
            <button 
              className={`nav__link nav__trigger ${dropdownOpen ? "is-active" : ""}`} 
              onClick={toggleDropdown}
            >
              {t.works}
              <span className="nav__arrow"></span>
            </button>
          </div>

          <Link to="/" className="nav__brand" aria-label="Ir al inicio">
            <img src={logo} alt="Fabián Gonzalez" className="nav__logo" />
          </Link>

          <nav className="nav__right nav__right--desktop">
            <Link to="/about" className="nav__link">{t.about}</Link>
            <Link to="/contact" className="nav__link">{t.contact}</Link>
            
            <div className="nav__lang">
              <button 
                className={`nav__langBtn ${langOpen ? "is-active" : ""}`} 
                onClick={() => { setLangOpen(!langOpen); setDropdownOpen(false); }}
              >
                {currentLang}
              </button>
              
              <div className={`nav__langMenu ${langOpen ? "is-open" : ""}`}>
                <button onClick={() => selectLang("ES")} className={currentLang === "ES" ? "is-current" : ""}>ES</button>
                <button onClick={() => selectLang("EN")} className={currentLang === "EN" ? "is-current" : ""}>EN</button>
                <button onClick={() => selectLang("IT")} className={currentLang === "IT" ? "is-current" : ""}>IT</button>
              </div>
            </div>
          </nav>

          <button
            className={`nav__burger ${open ? "is-open" : ""}`}
            type="button"
            onClick={toggleMenu}
          >
            <span className="nav__burgerLine" />
            <span className="nav__burgerLine" />
            <span className="nav__burgerLine" />
          </button>
        </div>

        <div className={`nav__dropdown ${dropdownOpen ? "is-open" : ""}`}>
          <div className="nav__dropdownInner">
            <Link to="/portfolio" className="nav__dropdownLink">{t.portfolio}</Link>
            <Link to="/stories" className="nav__dropdownLink">{t.stories}</Link>
            <Link to="/#newsletter" className="nav__dropdownLink">{t.newsletter}</Link>
          </div>
        </div>
      </header>

      <div className={`nav__panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="nav__panelHeader">
          <Link to="/" className="nav__panelBrand" onClick={() => setOpen(false)}>
            <img className="nav__panelLogo" src={logo} alt="Fabián González" />
          </Link>
          <button className="nav__close" type="button" onClick={() => setOpen(false)}>
            <span></span><span></span>
          </button>
        </div>

        <div className="nav__panelInner">
          <div className="nav__panelGroup">
            <p className="nav__panelLabel">{t.works}</p>
            <Link className="nav__panelLink" to="/portfolio">{t.portfolio}</Link>
            <Link className="nav__panelLink" to="/stories">{t.stories}</Link>
            <Link className="nav__panelLink" to="/#newsletter">{t.newsletter}</Link>
          </div>
          <div className="nav__panelGroup">
            <p className="nav__panelLabel">{t.site}</p>
            <Link className="nav__panelLink" to="/about">{t.about}</Link>
            <Link className="nav__panelLink" to="/contact">{t.contact}</Link>
          </div>
          <div className="nav__panelGroup">
            <p className="nav__panelLabel">{t.language}</p>
            <div className="nav__panelLang">
              <button onClick={() => selectLang("ES")} className={currentLang === "ES" ? "is-active" : ""}>ES</button>
              <button onClick={() => selectLang("EN")} className={currentLang === "EN" ? "is-active" : ""}>EN</button>
              <button onClick={() => selectLang("IT")} className={currentLang === "IT" ? "is-active" : ""}>IT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
