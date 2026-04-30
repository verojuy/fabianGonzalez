import { useEffect, useMemo, useState } from "react";
import "./Hero.css";

// ✅ imports reales (Vite las procesa)
import hero1 from "../../../assets/images/hero/hero1.jpeg";
import hero2 from "../../../assets//images/hero/hero2.JPG";
import hero3 from "../../../assets/images/hero/hero3.jpeg";

export default function Hero() {
  const images = useMemo(() => [hero1, hero2, hero3], []);

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  const DISPLAY_MS = 5200;
  const FADE_MS = 1100;

  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => {
      setPrev(active);
      setActive((i) => (i + 1) % images.length);
    }, DISPLAY_MS);

    return () => clearInterval(id);
  }, [active, images.length]);

  return (
    <section className="hero" id="works" aria-label="Hero">
      <div
        className="hero__bg hero__bg--prev"
        style={{ backgroundImage: `url(${images[prev]})` }}
      />

      <div
        className="hero__bg hero__bg--active"
        style={{
          backgroundImage: `url(${images[active]})`,
          transitionDuration: `${FADE_MS}ms`,
        }}
        key={active}
      />

      <div className="hero__overlay" />

      {/* <div className="hero__inner">
        <p className="hero__kicker">WEDDING &amp; EDITORIAL PHOTOGRAPHY</p>
        <h1 className="hero__title">
          Timeless photography for <br className="hero__br" />
          real love stories
        </h1>       
      </div> */}
    </section>
  );
}

