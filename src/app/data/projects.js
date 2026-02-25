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
    repoUrl: null,
    sourcePrivate: true,
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
    image: "/images/projects/portfolio-website.jpg",
    tags: ["Web", "JavaScript"],
    liveUrl: "/",
    repoUrl: "https://github.com/msn698/portfolio",
    sourcePrivate: false,
    role: "Designer + Developer",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    problem:
      "Old UI and weak content structure made it harder to convert visitors into leads.",
    solution:
      "Refreshed the visual system, improved hero and project narratives, and hardened contact flow.",
    result:
      "Cleaner positioning, better first impression, and stronger client-facing credibility.",
  },
  {
    id: 3,
    slug: "restaurant-ordering-landing",
    title: "Restaurant Ordering Landing Page",
    shortDescription: "Landing page with prefilled WhatsApp ordering flow.",
    description:
      "Built a mobile-friendly restaurant landing page designed to convert visitors into WhatsApp orders in minimal steps.",
    image: "/images/projects/restaurant-ordering-landing.jpg",
    tags: ["Web", "JavaScript"],
    liveUrl: "https://msn698.github.io/restaurant-ordering-landing/",
    repoUrl: "https://github.com/msn698/restaurant-ordering-landing",
    sourcePrivate: false,
    role: "Designer + Developer",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    problem:
      "Restaurants often lose orders because users face too many steps before placing an order.",
    solution:
      "Created a one-page experience with menu highlights and a one-tap WhatsApp CTA containing a prefilled order message.",
    result:
      "Faster ordering path and a cleaner conversion funnel from visit to chat.",
  },
  {
    id: 4,
    slug: "salon-clinic-booking-demo",
    title: "Salon/Clinic Booking Website",
    shortDescription: "Booking demo with forms, calendar links, and reminders.",
    description:
      "Built a client-ready booking website demo for salons/clinics with appointment form, time slots, reminders, and calendar integration.",
    image: "/images/projects/salon-clinic-booking.jpg",
    tags: ["Web", "JavaScript"],
    liveUrl: "https://msn698.github.io/salon-clinic-booking-demo/",
    repoUrl: "https://github.com/msn698/salon-clinic-booking-demo",
    sourcePrivate: false,
    role: "Designer + Developer",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage", "GitHub Pages"],
    problem:
      "Small service businesses need simple online booking and reminder flows without complex systems.",
    solution:
      "Created a fast booking interface with saved appointments, Google Calendar links, and WhatsApp reminders.",
    result:
      "Improves booking speed and follow-up reliability in a lightweight deploy-anywhere format.",
  },
  {
    id: 5,
    slug: "pop-art-ticket-demo",
    title: "Pop Art Exhibition Ticket Demo",
    shortDescription: "Bold ticketing demo with animated ticker and checkout flow.",
    description:
      "Designed and developed a high-energy ticket page demo with dual-direction marquee strips, live counters, ticket selection, and redirect-ready contact form flow.",
    image: "/images/projects/pop-art-ticket-demo.jpg",
    tags: ["Web", "JavaScript"],
    liveUrl: "https://msn698.github.io/pop-art-ticket-demo/",
    repoUrl: "https://github.com/msn698/pop-art-ticket-demo",
    sourcePrivate: false,
    role: "Designer + Developer",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    problem:
      "Event landing pages often look static and fail to create urgency around ticket conversions.",
    solution:
      "Implemented high-contrast visuals, kinetic UI elements, and a fast order summary + WhatsApp checkout interaction.",
    result:
      "Stronger perceived event energy and a clearer conversion path from browse to booking intent.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
