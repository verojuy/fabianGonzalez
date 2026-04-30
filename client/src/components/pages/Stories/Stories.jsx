// src/components/pages/Stories/Stories.jsx
import "./Stories.css";
import { Link } from "react-router-dom";
import { stories } from "../../data/storiesData";

export default function Stories() {
  return (
    <section className="st" aria-label="Historias">
      <div className="st__wrap">
        <header className="st__header">
          <p className="st__eyebrow">STORIES</p>
          <h1 className="st__title">Our last dream destination weddings</h1>
        </header>

        <div className="st__grid">
          {stories.map((s) => (
            <Link key={s.slug} to={`/stories/${s.slug}`} className="st__card">
              <div className="st__thumb">
                <img className="st__img" src={s.cover} alt={`${s.couple} cover`} loading="lazy" />
              </div>

              <div className="st__meta">
                <h3 className="st__couple">{s.couple}</h3>
                <p className="st__loc">{s.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
