
import Hero from "../../sections/Hero/Hero";
import MasonryGallery from "../../sections/MasonryGallery/MasonryGallery";
import WorkHighlight from "../../sections/WorkHighlight/WorkHighlight";
import ExperienceBanner from "../../sections/ExperienceBanner/ExperienceBanner";
import Footer from "../../layout/Footer/Footer";
import Testimonials from "../../sections/Testimonials/Testimonials";
import AboutContact from "../../sections/AboutContact/AboutContact";


import "./Home.css";
import { useLanguage } from "../../../utils/language";

const Home = () => {
  const [, t] = useLanguage();
  return (
    <main className="home">
      <Hero/>
      <div className="home__content">
        <div className="home__banner-message">
          <p className="home__banner-quote">
            {t.heroQuote}
          </p>
        </div>
        <MasonryGallery/>
        <ExperienceBanner>
          <WorkHighlight />
          <AboutContact />
          <Testimonials>
            <Footer />
          </Testimonials>
        </ExperienceBanner>
      </div>
    </main>
  );
};

export default Home;
