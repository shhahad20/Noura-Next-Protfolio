"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

import { useTranslation } from "react-i18next";

import "../styles/Navbar.scss";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname(); // Add this hook to get current path

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

   const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    handleLinkClick();
    
    // If not on home page, navigate to home with hash
    if (pathname !== "/home") {
      router.push(`/home#${section}`);
    } else {
      // If already on home page, just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
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
            <a href="/home" onClick={handleLinkClick}>
              {t("navbar.home")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleSectionClick(e, "about")}>
              {t("navbar.about")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleSectionClick(e, "projects")}>
              {t("navbar.projects")}
            </a>
          </li>
          <li>
            <a href="/contact" onClick={handleLinkClick}>
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
