"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "../styles/InfiniteScrollText.scss";

const SPEED = 22; // seconds

const InfiniteScrollSkills: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const items = useMemo(
    () =>
      isArabic
        ? [
            "تطوير الأعمال",
            "قيادة الفرق",
            "تطوير تطبيقات الجوال",
            "خدمات الترجمة",
            "مُعلِّم",
            "فنّان",
          ]
        : [
            "Business Development",
            "Team Leadership",
            "Mobile App Development",
            "Translation Services",
            "Educator",
            "Artist",
          ],
    [isArabic]
  );

  return (
    <section className="inf-root">
      <h2 className="inf-title">
        {isArabic ? "الكفاءات الأساسية" : "Core Competencies"}
      </h2>

      <div className="inf-viewport">
        <div
          key={i18n.language} // 🔑 reset animation on lang change
          className={`inf-track ${isArabic ? "inf-track--rtl" : ""}`}
          style={{ animationDuration: `${SPEED}s` }}
        >
          {/* sequence 1 */}
          <div className="inf-seq">
            {items.map((item, i) => (
              <div
                key={`a-${i}`}
                className={`inf-item ${isArabic ? "inf-item--ar" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* sequence 2 (clone) */}
          <div className="inf-seq">
            {items.map((item, i) => (
              <div
                key={`b-${i}`}
                className={`inf-item ${isArabic ? "inf-item--ar" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrollSkills;
