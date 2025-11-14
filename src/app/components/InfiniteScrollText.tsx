"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import "../styles/InfiniteScrollText.scss";

const InfiniteScrollText = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, i18n } = useTranslation();

  const texts = [
    t("core.core1"),
    t("core.core2"),
    t("core.core3"),
    t("core.core4"),
    t("core.core5"),
    t("core.core6"),
  ];

  return (
    <div
      className={`infinite-scroll-page ${
        i18n.language === "ar" ? "infinite-scroll-page--ar" : ""
      }`}
      ref={ref}
    >
      <motion.h2
        className="core-competencies__title"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
            {t("core.title")}

      </motion.h2>
      <div className="scroll-container">
        <div className="scroll-wrapper">
          <div className="scroll-content">
            {texts.map((text, index) => (
              <div key={index} className="scroll-item">
                {text}
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="scroll-content" aria-hidden="true">
            {texts.map((text, index) => (
              <div key={`duplicate-${index}`} className="scroll-item">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollText;
