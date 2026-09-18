import { useMemo, useState } from "react";
import "./Contact.css";

// Cambia esta ruta por tu imagen real
// import contactPhoto from "../../../assets/images/contact/contact.jpg";

const CALENDLY_URL = "https://calendly.com/TU-USUARIO/llamada-15min"; // cambia esto

export default function Contact() {
  const [calOpen, setCalOpen] = useState(false);

  const calendlyEmbedUrl = useMemo(() => {
    const url = new URL(CALENDLY_URL);
    url.searchParams.set("hide_landing_page_details", "1");
    url.searchParams.set("hide_gdpr_banner", "1");
    return url.toString();
  }, []);

  const openCalendly = () => setCalOpen(true);
  const closeCalendly = () => setCalOpen(false);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado (demo). Luego lo conectamos al envío real.");
  };

  return (
    <section className="ct" aria-label="Contacto">
      <div className="ct__wrap">
        <aside className="ct__left">
          {/* <div className="ct__photoWrap">
            <img className="ct__photo" src={contactPhoto} alt="Foto editorial" />
          </div> */}

          <h2 className="ct__leftTitle">Todo comienza con una conversación.</h2>

          <div className="ct__schedule">
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
          </div>

          <div className="ct__links">
<a className="ct__link" href="https://instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>

            <a className="ct__link" href="https://facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a className="ct__link" href="https://pinterest.com/" target="_blank" rel="noreferrer">
              Pinterest
            </a>
</div>
        </aside>

        <div className="ct__right">
          <header className="ct__header">
            <h1 className="ct__title">Hablemos de su historia!</h1>
            <p className="ct__intro">
              Cada boda tiene su propio ritmo, su propia energía y una historia que merece ser
              contada. Contanos dónde será, cuándo y qué están imaginando para ese día. A partir
              de ahí podemos coordinar una conversación y conocernos un poco más.
            </p>
          </header>

          <form className="ct__form" onSubmit={onSubmit}>
            <div className="ct__field">
              <input className="ct__input" type="text" name="name" placeholder="Nombre" required />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="lastName" placeholder="Apellido" required />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="weddingDay" placeholder="Fecha de boda" />
            </div>

            <div className="ct__field">
              <input className="ct__input" type="text" name="location" placeholder="Lugar" />
            </div>

            <div className="ct__field ct__field--textarea">
              <textarea
                className="ct__textarea"
                name="message"
                placeholder="Contanos un poco sobre ustedes y lo que están imaginando para su boda."
                rows={5}
              />
            </div>

            <button className="ct__submit" type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>

      {calOpen && (
        <div className="ctCal" role="dialog" aria-modal="true" aria-label="Agendar llamada">
          <button className="ctCal__overlay" onClick={closeCalendly} aria-label="Cerrar" />

          <div className="ctCal__panel">
            <div className="ctCal__top">
              <span className="ctCal__title">Agendar una llamada</span>
              <button className="ctCal__close" onClick={closeCalendly} aria-label="Cerrar">
                ×
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