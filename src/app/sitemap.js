import { projects } from "./data/projects";

export default function sitemap() {
  const base = "https://msaeed.tech";
  const projectUrls = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
