
import Hero from "../../sections/Hero/Hero";
import MasonryGallery from "../../sections/MasonryGallery/MasonryGallery";
import WorkHighlight from "../../sections/WorkHighlight/WorkHighlight";
import Footer from "../../layout/Footer/Footer";


import "./Home.css";

const Home = () => {
  return (
    <>
      
      <Hero/>
      <MasonryGallery/>
      <WorkHighlight />
      <Footer />
      
    </>
  );
};

export default Home;
