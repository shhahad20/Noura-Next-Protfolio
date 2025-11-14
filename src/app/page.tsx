import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import About2 from "./components/About2";
import RecentProjects from "./components/Projects";
import InfiniteScrollText from "./components/InfiniteScrollText";
import Contact from "./components/Contact";
import "./i18n";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Education />
      <About2 />
      <RecentProjects />
      <InfiniteScrollText />
      <Contact />
    </>
  );
}
