import { Routes, Route, Router } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./components/pages/Home/Home";
import Portfolio from "./components/pages/Portfolio/Portfolio";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
// import Stories from "./components/pages/Stories/Stories"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Router path="/stories" element={<Stories/>}  /> */}
      </Route>
    </Routes>
  );
}
