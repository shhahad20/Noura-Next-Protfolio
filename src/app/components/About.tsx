"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../styles/About.scss";
import { useTranslation } from "react-i18next";
// import Education from "./Education";

const About: React.FC = () => {
  const aboutRef = useRef(null);
  // const h2Ref = useRef(null);
  // const pRef = useRef(null);
  const { t, i18n } = useTranslation();

  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  // const h2InView = useInView(h2Ref, { once: true, margin: "-100px" });
  // const pInView = useInView(pRef, { once: true, margin: "-50px" });

  return (
    <section
      className={`about ${i18n.language === "ar" ? "about--ar" : ""}`}
      ref={aboutRef}
      id="about"
    >
      {/* Title motion */}
      <motion.div
        className="recent-projects__title-section"
        initial={{ opacity: 0, y: 60 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="about__title">{t("about.title")}</h2>
      </motion.div>

      {/* About container motion */}
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 50 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
      >
        <div className="about-paragraph">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          >
            {t("about.paragraph1")}
            <br />
            <br />
            {t("about.paragraph2")}
            <br />
            <br />
            {t("about.paragraph3")}
          </motion.p>
        </div>
      {/* <Education/> */}

        {/* Content section */}
        {/* <div className="content-section">
          <motion.h2
            ref={h2Ref}
            initial={{ opacity: 0, y: 30 }}
            animate={h2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
             {t("about.subtitle")}
          </motion.h2>

          <motion.p
            ref={pRef}
            initial={{ opacity: 0, y: 30 }}
            animate={pInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {t("about.subtext")}
          </motion.p>
        </div> */}
      </motion.div>
    </section>
  );
};

export default About;
