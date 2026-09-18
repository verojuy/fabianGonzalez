import { useEffect, useState } from "react";
import "./Stories.css";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../utils/api";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        // Llamamos a la API de historias que configuramos en el servidor
        const response = await fetch(apiUrl("/api/stories"));
        if (!response.ok) throw new Error("No se pudieron cargar las historias");
        
        const data = await response.json();
        
        // La API nos devuelve un array de objetos con: { slug, title, cover, count }
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("No se pudieron cargar las historias. Verifica que el servidor esté corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div className="st__status">Cargando nuestras historias...</div>;
  
  if (error) return (
    <div className="st__status st__status--error">
      <p>{error}</p>
      <Link to="/" className="st__back-home">Volver al inicio</Link>
    </div>
  );

  return (
    <section className="st" aria-label="Historias">
      <div className="st__wrap">
        <header className="st__header">
          <p className="st__eyebrow">STORIES</p>
          <h1 className="st__title">Nuestras últimas bodas y editoriales</h1>
        </header>

        {stories.length === 0 ? (
          <p className="st__empty">No hay historias disponibles en este momento.</p>
        ) : (
          <div className="st__grid">
            {stories.map((s) => (
              <Link key={s.slug} to={`/stories/${s.slug}`} className="st__card">
                <div className="st__thumb">
                  <img 
                    className="st__img" 
                    src={s.cover} 
                    alt={`${s.title} cover`} 
                    loading="lazy" 
                  />
                </div>

                <div className="st__meta">
                  <h3 className="st__couple">{s.title}</h3>
                  <p className="st__loc">Ver historia completa — {s.count} fotos</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
