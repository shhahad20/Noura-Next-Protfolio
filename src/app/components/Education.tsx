"use client";
import React, { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import "../styles/Education.scss";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";

const Education: React.FC = () => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const pRef = useRef(null);

  // 👇 Trigger only when the section is fully in view
  const sectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.3, // means ~30% of the section must be visible before animating
  });

  const h2InView = useInView(h2Ref, { once: true, amount: 0.4 });
  const pInView = useInView(pRef, { once: true, amount: 0.4 });
  const { t } = useTranslation();

  const educationList = [
    {
      id: 1,
      university: t("education.master.university"),
      period: t("education.master.period"),
      degree: t("education.master.degree"),
      gpa: t("education.master.gpa"),
    },
    {
      id: 2,
      university: t("education.diploma.university"),
      period: t("education.diploma.period"),
      degree: t("education.diploma.degree"),
      gpa: t("education.diploma.gpa"),
    },
    {
      id: 3,
      university: t("education.bachelor.university"),
      period: t("education.bachelor.period"),
      degree: t("education.bachelor.degree"),
      gpa: t("education.bachelor.gpa"),
    },
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="education-wrapper"
      initial={{ opacity: 0, y: 60 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="education-inner">
        <div className="education-hero">
          <h1 className="hero-title">{t("education.title")}</h1>
          <p className="hero-subtitle">{t("education.subtitle")}</p>
        </div>

        <div className="education-grid">
          {educationList.map((item) => (
            <motion.div
              key={item.id}
              className={`education-item ${
                hoveredCard === item.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: item.id * 0.2 }}
            >
              <div className="item-header">
                <h2 className="degree-name">{item.degree}</h2>
              </div>

              <div className="institution-block">
                <h3 className="institution-title">
                  <MapPin size={18} /> {item.university}
                </h3>

                {item.gpa && (
                  <div className="gpa-badge">
                    <span>{item.gpa}</span>
                  </div>
                )}

                <div className="meta-row">
                  <span className="meta-detail">
                    <Calendar size={18} />
                    {item.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="content-section">
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
      </div>
    </motion.div>
  );
};

export default Education;
