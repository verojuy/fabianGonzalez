import { useMemo, useState } from "react";
import "./Contact.css";

// ✅ Cambiá esta ruta por tu imagen real
// import contactPhoto from "../../../assets/images/contact/contact.jpg";

const CALENDLY_URL = "https://calendly.com/TU-USUARIO/llamada-15min"; // ✅ cambiá esto

export default function Contact() {
  const [calOpen, setCalOpen] = useState(false);

  const calendlyEmbedUrl = useMemo(() => {
    // params para que se vea más limpio
    const url = new URL(CALENDLY_URL);
    url.searchParams.set("hide_landing_page_details", "1");
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  }, []);

  const openCalendly = () => setCalOpen(true);
  const closeCalendly = () => setCalOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // ✅ acá después lo conectamos a EmailJS / backend / Formspree, etc.
    alert("Formulario enviado (demo). Luego lo conectamos al envío real 🙂");
  };

  return (
    <section className="ct" aria-label="Contacto">
      <div className="ct__wrap">
        {/* LEFT */}
        <aside className="ct__left">
          {/* <div className="ct__photoWrap">
            <img className="ct__photo" src={contactPhoto} alt="Foto editorial" />
          </div> */}

          <h2 className="ct__leftTitle">“Join our next trip”</h2>

          <div className="ct__links">
            <a className="ct__link" href="mailto:info@tudominio.com">
              info@tudominio.com
            </a>

            <a className="ct__link" href="https://instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>

            <a className="ct__link" href="https://facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a className="ct__link" href="https://pinterest.com/" target="_blank" rel="noreferrer">
              Pinterest
            </a>

            <a className="ct__link" href="https://www.usa.canon.com/" target="_blank" rel="noreferrer">
              Canon Profile
            </a>
          </div>
        </aside>

        {/* RIGHT */}
        <div className="ct__right">
          <header className="ct__header">
            <h1 className="ct__title">Say hello!</h1>

            <button type="button" className="ct__calBtn" onClick={openCalendly}>
              Agendar una llamada
            </button>

            <p className="ct__calHint">
              (Si preferís, también podés{" "}
              <a className="ct__inlineLink" href={CALENDLY_URL} target="_blank" rel="noreferrer">
                abrir Calendly en otra pestaña
              </a>
              )
            </p>
          </header>

          <form className="ct__form" onSubmit={onSubmit}>
            <div className="ct__field">
              <input className="ct__input" type="text" name="name" placeholder="Name" required />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="email" name="email" placeholder="Email" required />
            </div>

            <div className="ct__field">
              <input
                className="ct__input"
                type="text"
                name="instagram"
                placeholder="Instagram Account(s)"
              />
            </div>

            <p className="ct__note">(It´s great to have your face in mind while communicating)</p>

            <div className="ct__field">
              <input className="ct__input" type="text" name="weddingDay" placeholder="Wedding Day" />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="location" placeholder="Location" />
            </div>

            <div className="ct__field">
              <input
                className="ct__input"
                type="text"
                name="venues"
                placeholder="Ceremony & Reception Venues"
              />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="planner" placeholder="Wedding Planner" />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="guests" placeholder="Number of Guests" />
            </div>

            <div className="ct__field">
              <input
                className="ct__input"
                type="text"
                name="budget"
                placeholder="Photography Budget"
              />
            </div>

            <div className="ct__field ct__field--textarea">
              <textarea className="ct__textarea" name="message" placeholder="Message" rows={4} />
            </div>

            <button className="ct__submit" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* ✅ CALENDLY MODAL (WIDGET) */}
      {calOpen && (
        <div className="ctCal" role="dialog" aria-modal="true" aria-label="Agendar llamada">
          <button className="ctCal__overlay" onClick={closeCalendly} aria-label="Cerrar" />

          <div className="ctCal__panel">
            <div className="ctCal__top">
              <span className="ctCal__title">Agendar una llamada</span>
              <button className="ctCal__close" onClick={closeCalendly} aria-label="Cerrar">
                ✕
              </button>
            </div>

            <div className="ctCal__frame">
              <iframe
                title="Calendly"
                src={calendlyEmbedUrl}
                frameBorder="0"
                className="ctCal__iframe"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
