import { useEffect, useState } from "react";
import { apiUrl } from "../../../utils/api";
import Testimonials from "../../sections/Testimonials/Testimonials";
import { useLanguage } from "../../../utils/language";

import "./Contact.css";

export default function Contact() {
  const [, t] = useLanguage();
  const [photos, setPhotos] = useState([]);
  const [photoStatus, setPhotoStatus] = useState("Cargando fotografías...");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadPhotos() {
      try {
        const response = await fetch(apiUrl("/api/gallery/portfolio"), { signal: controller.signal });
        if (!response.ok) throw new Error("No se pudo cargar el portfolio");
        const data = await response.json();
        if (controller.signal.aborted) return;
        setPhotos(data.slice(0, 9));
        setPhotoStatus(data.length ? "" : "No hay fotografías disponibles.");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setPhotoStatus("No se pudieron cargar las fotografías.");
      }
    }
    loadPhotos();
    return () => controller.abort();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado (demo). Luego lo conectamos al envío real.");
  };

  return (
    <div className="contact-reveal">
      <div className="contact-reveal__background">
        <Testimonials />
      </div>
      <div className="contact-reveal__foreground">
    <section className="ct" aria-label="Contacto">
      <div className="ct__strip" role="region" aria-label="Fotografías del portfolio" tabIndex={0}>
        {photoStatus && <p className="ct__stripStatus" role="status">{photoStatus}</p>}
        {photos.map((photo, index) => <img key={photo.id} className="ct__stripPhoto"
          src={photo.url.replace("/upload/", "/upload/f_auto,q_auto,w_500,c_limit/")}
          alt={`Fotografía de boda ${index + 1}`} width="220" height="220" decoding="async" />)}
      </div>
      <h1 className="ct__bookingTitle">{t.contactBooking}</h1>
      <div className="ct__wrap">
        <div className="ct__right">
          <header className="ct__header">
            <h2 className="ct__title">{t.contactTitle}</h2>
            <p className="ct__intro">{t.contactIntro}</p>
          </header>

          <form className="ct__form" onSubmit={onSubmit}>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-names">{t.names} *</label>
              <input id="contact-names" className="ct__input" type="text" name="name" required />
            </div>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-email">{t.email}</label>
              <input id="contact-email" className="ct__input" type="email" name="email" autoComplete="email" />
            </div>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-phone">{t.phone}</label>
              <input id="contact-phone" className="ct__input" type="tel" name="phone" autoComplete="tel" />
            </div>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-date">{t.date}</label>
              <input id="contact-date" className="ct__input" type="date" name="weddingDay" />
            </div>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-location">{t.location}</label>
              <input id="contact-location" className="ct__input" type="text" name="location" />
            </div>
            <div className="ct__field">
              <label className="ct__label" htmlFor="contact-guests">{t.guests}</label>
              <input id="contact-guests" className="ct__input" type="number" name="guests" min="1" step="1" inputMode="numeric" />
            </div>
            <div className="ct__field ct__field--textarea">
              <label className="ct__label" htmlFor="contact-message">{t.message}</label>
              <p id="contact-message-help" className="ct__note">{t.note}</p>
              <textarea id="contact-message" className="ct__textarea" name="message" aria-describedby="contact-message-help" rows={5} />
            </div>
            <button className="ct__submit" type="submit">{t.send}</button>
          </form>
        </div>
      </div>

    </section>
        <div className="contact-reveal__space" aria-hidden="true" />
      </div>
    </div>
  );
}
