"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useTranslation } from "react-i18next";
import "../styles/Contact.scss";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { useRouter } from "next/navigation"; // Add this import


const Contact: React.FC = () => {
  const contactRef = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation();
  const router = useRouter(); // Add this hook


  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      const {
        top: t,
        left: l,
        width: w,
        height: h,
      } = el.getBoundingClientRect();
      el.style.setProperty("--posX", String(x - l - w / 2));
      el.style.setProperty("--posY", String(y - t - h / 2));
    };
    el.addEventListener("pointermove", handlePointerMove);
    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);
  // Add this handler
  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <section
      className={`contact-section ${
        i18n.language === "ar" ? "contact-section--ar" : ""
      }`}
      ref={contactRef}
      id="contact"
    >
      <main className="contact__frame">
        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
        >
          <h1 className="contact__title">{t("contact.title")}</h1>
          <h2 className="contact__greeting">{t("contact.subtitle")}</h2>

          <button className="contact__cta" aria-label="Get in touch" onClick={handleContactClick}>
            {t("contact.btnText")}
          </button>


          {/* 👇 Social media icons */}
          <div className="contact__socials">
            {/* <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram/>
            </a> */}
            {/* <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter />
            </a> */}
            <a href="https://www.linkedin.com/in/noura-muhammad-252247177?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bf0ifJnl6TA6tNzygab8u%2FA%3D%3D" target="_blank" aria-label="LinkedIn">
              <Linkedin />
            </a>
            {/* <a href="https://github.com" target="_blank" aria-label="GitHub">
              <Github />
            </a> */}
          </div>

        </motion.div>
        <Footer />
      </main>
    </section>
  );
};

export default Contact;
