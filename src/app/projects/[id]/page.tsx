import { projectsData } from "@/app/data/projectsData";
import ProjectDetailsClient from "./ProjectDetailsClient";

export default async function ProjectDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const projectId = Number(id);
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return <div>Project not found.</div>;
  }

  return <ProjectDetailsClient project={project} />;
}
