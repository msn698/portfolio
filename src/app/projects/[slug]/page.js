import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectCaseStudyPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) return notFound();

  return (
    <main className="mx-auto w-full max-w-4xl mt-28 px-4 sm:px-6 lg:px-8 pb-16 text-white">
      <Link href="/#projects" className="text-slate-400 hover:text-white text-sm">
        ← Back to projects
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3">{project.title}</h1>
      <p className="text-slate-300 mb-6">{project.description}</p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-8">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={700}
          className="w-full h-auto rounded-xl"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="font-semibold mb-2">Problem</h2>
          <p className="text-slate-300 text-sm">{project.problem}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="font-semibold mb-2">Solution</h2>
          <p className="text-slate-300 text-sm">{project.solution}</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-8">
        <h2 className="font-semibold mb-2">Result</h2>
        <p className="text-slate-300 text-sm">{project.result}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.stack.map((item) => (
          <span key={item} className="text-xs px-3 py-1 rounded-full border border-white/15 text-slate-300">
            {item}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href={project.liveUrl} className="px-4 py-2 rounded-lg bg-primary-500 text-white" target={project.liveUrl.startsWith("http") ? "_blank" : undefined} rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}>
          Live Demo
        </Link>
        {project.repoUrl ? (
          <Link href={project.repoUrl} className="px-4 py-2 rounded-lg border border-white/20 text-white" target={project.repoUrl.startsWith("http") ? "_blank" : undefined} rel={project.repoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>
            Source
          </Link>
        ) : (
          <span className="px-4 py-2 rounded-lg border border-amber-500/40 text-amber-300 text-sm">
            Source code is private
          </span>
        )}
      </div>
    </main>
  );
}
