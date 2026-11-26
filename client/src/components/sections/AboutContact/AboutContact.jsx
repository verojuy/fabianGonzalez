import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../utils/api";
import "./AboutContact.css";
import { useLanguage } from "../../../utils/language";

export default function AboutContact() {
  const [, t] = useLanguage();
  const links = [
    { label: t.about, to: "/about" },
    { label: t.contact, to: "/contact" },
  ];
  const [images, setImages] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadImages() {
      try {
        const response = await fetch(apiUrl("/api/gallery/sobremi_contacto"), { signal: controller.signal });
        if (!response.ok) throw new Error("No se pudieron cargar las fotos de Sobre mí y Contacto");
        const data = await response.json();
        if (!controller.signal.aborted) setImages(data);
      } catch (error) {
        if (!controller.signal.aborted) console.error(error);
      }
    }
    loadImages();
    return () => controller.abort();
  }, []);

  return (
    <section className="about-contact" aria-label="Conocé a Fabián y contactalo">
      <div className="about-contact__grid">
        {links.map((link, index) => (
          <Link className="about-contact__link" to={link.to} key={link.to}>
            <div className="about-contact__frame">
              {images[index]?.url && <img
                src={images[index].url.replace("/upload/", "/upload/f_auto,q_auto,w_900,c_limit/")}
                alt="" loading="lazy" decoding="async" className="about-contact__image" />}
            </div>
            <h2 className="about-contact__title">{link.label}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
