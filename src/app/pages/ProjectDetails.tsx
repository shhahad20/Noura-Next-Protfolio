import { useParams, Link } from "react-router-dom";
import "../styles/projectDetails.scss";

const projects = [
  {
    id: 1,
    title: "E-Commerce Mobile App",
    category: "Mobile Development",
    description:
      "A comprehensive shopping app with AR try-on features and seamless checkout experience.",
    image: "./apple.jpg",
    tech: ["React Native", "Node.js", "MongoDB"],
    year: "2024",
    status: "Featured",
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    category: "Web Development",
    description:
      "Real-time business intelligence platform with predictive analytics and custom reporting.",
    image: "./Lan.jpg",
    tech: ["React", "Python", "TensorFlow"],
    year: "2024",
    status: "New",
  },
  // ...other projects
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="project-details">
        <p>Project not found.</p>
        <Link to="/">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div className="project-details__header">
        <Link to="/" className="project-details__back">
          ← Back to Projects
        </Link>
        <h1 className="project-details__title">{project.title}</h1>
        <p className="project-details__category">{project.category}</p>
      </div>

      <div className="project-details__image">
        <img src={project.image} alt={project.title} />
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
};

export default ProjectDetails;
