import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import RecentProjects from "../components/Projects";
import InfiniteScrollText from "../components/InfiniteScrollText";
import About2 from "../components/About2";
import Contact from "../components/Contact";
import "./i18n";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <About2 />
      <RecentProjects />
      <InfiniteScrollText />
      <Contact />
    </>
  );
};

export default Home;
