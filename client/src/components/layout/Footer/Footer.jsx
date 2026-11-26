import "./Footer.css";
import logo from "../../../assets/images/logofabian.png";
import { useLanguage } from "../../../utils/language";

const Footer = () => {
  const [, t] = useLanguage();
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
            <a href="/portfolio">PORTFOLIO</a>
            <a href="/stories">{t.stories}</a>
          </nav>
        </div>

        {/* SPACER */}
        <div className="ft__spacer" aria-hidden="true" />

        {/* INFO RIGHT */}
        <div className="ft__info">
          <span className="ft__info-title">INFO</span>

          <a href="/about">{t.about}</a>
          <a href="/contact">{t.contact}</a>

          <div className="ft__socials">
            <a href="https://www.instagram.com/fabiangonzalezbodas/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M14 22v-9h3l.5-3H14V8c0-.87.24-1.5 1.5-1.5H18V3.2c-.43-.06-1.9-.2-3.6-.2C10.85 3 9 5.13 9 8.4V10H6v3h3v9h5Z" />
              </svg>
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 0a12 12 0 0 0-4.37 23.18c-.03-.94-.01-2.11.24-3.18l1.54-6.52s-.39-.78-.39-1.93c0-1.81 1.05-3.16 2.35-3.16 1.11 0 1.65.83 1.65 1.83 0 1.12-.72 2.79-1.08 4.34-.31 1.3.65 2.36 1.93 2.36 2.32 0 4.1-2.45 4.1-6 0-3.14-2.26-5.34-5.48-5.34-3.73 0-5.92 2.8-5.92 5.69 0 1.13.43 2.34.98 3 .11.13.12.25.09.38l-.36 1.48c-.06.24-.19.29-.44.17-1.64-.76-2.66-3.15-2.66-5.07 0-4.13 3-7.92 8.65-7.92 4.54 0 8.07 3.24 8.07 7.57 0 4.52-2.85 8.16-6.81 8.16-1.33 0-2.58-.69-3.01-1.51l-.82 3.1c-.3 1.13-1.1 2.54-1.64 3.4A12 12 0 1 0 12 0Z" />
              </svg>
            </a>
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
