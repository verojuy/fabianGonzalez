import photo from "../../../assets/images/gallery/imagen2.JPG";
import "./ExperienceBanner.css";
import { useLanguage } from "../../../utils/language";

export default function ExperienceBanner({ children }) {
  const [, t] = useLanguage();
  return (
    <section className="experience" aria-labelledby="experience-title">
      <img className="experience__photo" src={photo} width="3000" height="2000"
        alt="Novia sonriendo dentro de un auto, fotografiada en blanco y negro"
        loading="lazy" decoding="async" />
      <div className="experience__foreground">
        <div className="experience__message">
          <h2 className="experience__title" id="experience-title">
            {t.experience}
          </h2>
        </div>
        <div className="experience__following">{children}</div>
      </div>
    </section>
  );
}
