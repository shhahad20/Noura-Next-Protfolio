"use client";

import { Project } from "@/app/data/projectsData";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// interface Project {
//   title: { en: string; ar: string };
//   category: { en: string; ar: string };
//   image: string;
//   description: { en: string; ar: string };
//   year: number;
//   status: { en: string; ar: string };
//   tech: string[];
// }

export default function ProjectDetailsClient({ project }: { project: Project }) {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "ar";

  if (!project) {
    return (
      <div className="project-details">
        <p>Project not found.</p>
        <Link href="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div className="project-details__header">
        <Link href="/" className="project-details__back">
          ← {lang === "ar" ? "عودة" : "Back to Home"}
        </Link>

        <h1 className="project-details__title">{project.title[lang]}</h1>
        <p className="project-details__category">{project.category[lang]}</p>
      </div>

      <div className="project-details__image">
        <Image
          src={project.image}
          alt={project.title[lang]}
          width={400}
          height={250}
        />
      </div>

      <div className="project-details__info">
        <p className="project-details__description">{project.description[lang]}</p>

        <div className="project-details__meta">
          <span>{lang === "ar" ? "السنة" : "Year"}: {project.year}</span>
          <span>{lang === "ar" ? "الحالة" : "Status"}: {project.status[lang]}</span>
        </div>

        <div className="project-details__tech">
          {project.tech.map((t: string, i: number) => (
            <span key={i} className="project-details__tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
