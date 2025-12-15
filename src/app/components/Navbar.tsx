"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

import { useTranslation } from "react-i18next";

import "../styles/Navbar.scss";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);

    // 🔑 GLOBAL SYNC SIGNAL
    document.documentElement.lang = newLang;
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="navbar__container">
        <button
          className={`navbar__toggle${open ? " navbar__toggle--open" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="navbar__bar"></span>
          <span className="navbar__bar"></span>
          <span className="navbar__bar"></span>
        </button>
        <ul className={`navbar__links${open ? " navbar__links--open" : ""}`}>
          <li>
            <a href="#" onClick={handleLinkClick}>
              {t("navbar.home")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleLinkClick}>
              {t("navbar.about")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={handleLinkClick}>
              {t("navbar.projects")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleLinkClick}>
              {t("navbar.contact")}
            </a>
          </li>

          <li>
            <button
              className="lang-btn"
              onClick={() => {
                toggleLang();
                handleLinkClick();
              }}
            >
              <Languages size={18} />
              <span>{i18n.language === "en" ? "العربية" : "English"}</span>
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
