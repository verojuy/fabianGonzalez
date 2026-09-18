import { Routes, Route, Router } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./components/pages/Home/Home";
import Portfolio from "./components/pages/Portfolio/Portfolio";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import Stories from "./components/pages/Stories/Stories";
import StoriesDetail from "./components/pages/StoriesDetail/StoriesDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<StoriesDetail />} />
      </Route>
    </Routes>
  );
}
