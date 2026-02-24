export const projects = [
  {
    id: 1,
    slug: "vouchpro",
    title: "VouchPro",
    shortDescription: "A Discord bot for vouching and scammer alerts.",
    description:
      "Built and deployed a trust layer for communities using automated vouch tracking and scammer reporting flows.",
    image: "/images/projects/vouchpro.png",
    tags: ["Web", "Python"],
    liveUrl: "https://bcm-1a15fad8a9db.herokuapp.com/",
    repoUrl: "https://bcm-1a15fad8a9db.herokuapp.com/",
    role: "Developer",
    stack: ["Python", "Discord APIs", "Automation"],
    problem:
      "Communities lacked a reliable way to track trust signals and warn members about scammers.",
    solution:
      "Implemented structured vouch records, lightweight moderation workflows, and scam alert handling.",
    result:
      "Improved visibility of trust signals and reduced manual moderation overhead.",
  },
  {
    id: 2,
    slug: "portfolio-website",
    title: "Portfolio Website",
    shortDescription: "Modern portfolio website focused on conversion.",
    description:
      "Designed and shipped a responsive personal portfolio with improved UX, contact flow, and performance-focused frontend patterns.",
    image: "/images/projects/1.png",
    tags: ["Web", "JavaScript"],
    liveUrl: "/",
    repoUrl: "https://github.com/msn698/portfolio",
    role: "Designer + Developer",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    problem:
      "Old UI and weak content structure made it harder to convert visitors into leads.",
    solution:
      "Refreshed the visual system, improved hero and project narratives, and hardened contact flow.",
    result:
      "Cleaner positioning, better first impression, and stronger client-facing credibility.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
