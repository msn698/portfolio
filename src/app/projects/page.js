import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import { getOrderedProjects } from "../data/projects";

export const metadata = {
  title: "All Projects | Mohammed Saeed",
  description: "Explore all projects by Mohammed Saeed.",
};

export default function AllProjectsPage() {
  const orderedProjects = getOrderedProjects();

  return (
    <main className="mx-auto w-full max-w-6xl mt-28 px-4 sm:px-6 lg:px-8 pb-16 text-white">
      <Link href="/#projects" className="text-slate-400 hover:text-white text-sm">
        ← Back to homepage
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3">All Projects</h1>
      <p className="text-slate-300 mb-8">
        Full list of shipped projects, ordered by priority and impact.
      </p>

      <ul className="grid md:grid-cols-3 gap-8 md:gap-12">
        {orderedProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard
              title={project.title}
              description={project.shortDescription}
              imgUrl={project.image}
              gitUrl={project.repoUrl}
              previewUrl={project.liveUrl}
              sourcePrivate={project.sourcePrivate}
            />
            <Link
              href={`/projects/${project.slug}`}
              className="inline-block mt-3 text-sm text-primary-400 hover:text-primary-300"
            >
              View case study →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
