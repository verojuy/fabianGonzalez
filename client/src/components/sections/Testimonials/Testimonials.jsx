import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../../utils/api";
import { testimonials } from "../../data/testimonials";
import "./Testimonials.css";
import { useLanguage } from "../../../utils/language";

const entries = testimonials;

export default function Testimonials({ children }) {
  const [, t] = useLanguage();
  const sectionRef = useRef(null);
  const [images, setImages] = useState([]);
  const [tick, setTick] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [imageStatus, setImageStatus] = useState("Cargando fotografías...");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(apiUrl("/api/gallery/banner_review"), { signal: controller.signal });
        if (!response.ok) throw new Error("No se pudieron obtener las fotografías");
        const data = await response.json();
        // Decode before starting the sequence so every timed change has a ready image.
        const loaded = await Promise.allSettled(data.map(async ({ url }) => {
          const src = url.replace("/upload/", "/upload/f_auto,q_auto,w_1600,c_limit/");
          const image = new Image();
          image.src = src;
          await image.decode();
          return src;
        }));
        if (controller.signal.aborted) return;
        const urls = loaded.filter((result) => result.status === "fulfilled").map((result) => result.value);
        setImages(urls);
        setImageStatus(urls.length ? "" : "No hay fotografías disponibles.");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Testimonios:", error);
        setImageStatus("No se pudieron cargar las fotografías.");
      }
    }
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView || !pageVisible) return;
    const interval = setInterval(() => setTick((value) => value + 1), 15000);
    return () => clearInterval(interval);
  }, [inView, pageVisible]);

  const activeImage = images.length ? tick % images.length : 0;
  const previousImage = images.length ? Math.max(0, tick - 1) % images.length : 0;
  const activeQuote = entries.length ? tick % entries.length : 0;

  return (
    <section className="testimonials" ref={sectionRef} aria-label="Palabras de los novios">
      <div className="testimonials__background" aria-hidden="true">
      {!!images.length && <div className="testimonials__photos">
        <img src={images[previousImage]} alt="" className="testimonials__photo" />
        <img src={images[activeImage]} alt="" className="testimonials__photo testimonials__photo--active" key={tick} />
      </div>}
      <div className="testimonials__shade" />
      </div>
      <div className="testimonials__foreground">
      <div className="testimonials__message">
      <div className="testimonials__content">
        <h2 className="testimonials__title">{t.eachStory}</h2>
        {imageStatus && <p className="testimonials__status" role="status">{imageStatus}</p>}
        <div className="testimonials__quotes" aria-live="off">
          {entries.map((entry, index) => <figure key={index}
            className={`testimonials__quote ${index === activeQuote ? "is-active" : ""}`}
            aria-hidden={index !== activeQuote}>
            <blockquote lang={entry.lang || "es"}><p>“{entry.quote}”</p></blockquote>
            {entry.couple && <figcaption className="testimonials__author">{entry.couple}</figcaption>}
          </figure>)}
        </div>
      </div>
      </div>
      <div className="testimonials__following">{children}</div>
      </div>
    </section>
  );
}
