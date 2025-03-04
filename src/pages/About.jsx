import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import ReactMarkdown from "react-markdown";
import FadeInOnScroll from "../animation/FadeInOnScroll";

import { deskTopImg } from "../assets";
import "../css/Markdown.css";

const About = () => {
  const { markdowns } = useContext(GlobalContext);
  const { hash } = useLocation();

  const { about } = markdowns;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(
          null,
          "",
          location.pathname + location.search
        );
      }
    }
  }, [hash]);

  return (
    <section
      id="about"
      className="overflow-x-hidden pt-[75px] sm:pt-20  min-h-screen"
    >
      <div className="container px-4 mx-auto">
        <img
          src={deskTopImg[0]}
          alt="About image"
          className="object-cover w-full h-auto"
        />

        <section
          id="privacypolicy"
          className="max-w-3xl p-4 mx-auto space-y-px sm:space-y-2"
        >
          <FadeInOnScroll className="mb-3 text-xl font-bold text-center uppercase sm:text-3xl font-heading">
            About Jagasree Collections
          </FadeInOnScroll>
          <div className="py-5 space-y-2 text-sm sm:text-base font-body text-text markdown">
            <ReactMarkdown>{about}</ReactMarkdown>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
