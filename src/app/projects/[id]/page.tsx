import Image from "next/image";
import { projectsData, Project } from "../../data/projectsData";
import Link from "next/link";

export default function ProjectDetails(
  { params }: { params: { id: string } }
) {
  const project = projectsData.find((p: Project) => p.id === Number(params.id));

  if (!project) {
    return (
      <div className="project-details">
        <p>Project not found.</p>
        <Link href="/">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div className="project-details__header">
        <Link href="/" className="project-details__back">
          ← Back to Projects
        </Link>
        <h1 className="project-details__title">{project.title}</h1>
        <p className="project-details__category">{project.category}</p>
      </div>

      <div className="project-details__image">
        <Image src={project.image.replace('./', '/')} alt={project.title} width={400} height={250} />
      </div>

      <div className="project-details__info">
        <p className="project-details__description">{project.description}</p>
        <div className="project-details__meta">
          <span>Year: {project.year}</span>
          <span>Status: {project.status}</span>
        </div>
        <div className="project-details__tech">
          {project.tech.map((t, i) => (
            <span key={i} className="project-details__tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
