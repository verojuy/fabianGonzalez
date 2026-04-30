// src/components/data/storiesData.js

import cover1 from "../../assets/images/stories/julia-wrede/cover.jpg";
import jw1 from "../../assets/images/stories/julia-wrede/1.jpg";
import jw2 from "../../assets/images/stories/julia-wrede/2.jpg";
import jw3 from "../../assets/images/stories/julia-wrede/3.jpg";

import cover2 from "../../assets/images/stories/theodora-nick/cover.jpg";
import tn1 from "../../assets/images/stories/theodora-nick/1.jpg";
import tn2 from "../../assets/images/stories/theodora-nick/2.jpg";
import tn3 from "../../assets/images/stories/theodora-nick/3.jpg";

export const stories = [
  {
    slug: "julia-wrede",
    couple: "Julia & Wrede",
    location: "Sao Lourenço do Barrocal, Portugal",
    cover: cover1,
    images: [jw1, jw2, jw3],
  },
  {
    slug: "theodora-nick",
    couple: "Theodora & Nick",
    location: "Torre Maizza, Puglia, Italy",
    cover: cover2,
    images: [tn1, tn2, tn3],
  },
];
