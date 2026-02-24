import React from "react";
import Link from "next/link";

const packages = [
  {
    name: "Starter",
    price: "From AED 299",
    href: "/services/starter",
    points: [
      "1-page modern website",
      "Mobile-first responsive design",
      "WhatsApp + contact form integration",
      "Basic on-page SEO setup",
    ],
  },
  {
    name: "Growth",
    price: "From AED 699",
    href: "/services/growth",
    featured: true,
    points: [
      "Multi-section/business website",
      "Conversion-focused UX + copy structure",
      "Speed/performance optimization",
      "Analytics + lead tracking setup",
    ],
  },
  {
    name: "Custom",
    price: "Custom quote",
    href: "/services/custom",
    points: [
      "Advanced integrations",
      "Custom features and automations",
      "Ongoing iteration support",
      "Priority communication",
    ],
  },
];

const ServicePackagesSection = () => {
  return (
    <section id="services" className="py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Service Packages
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
        Clear options for businesses that need a modern website and better conversions.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className={`rounded-2xl border p-5 bg-white/[0.03] ${
              pkg.featured ? "border-primary-500/50" : "border-white/10"
            }`}
          >
            <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
            <p className="text-primary-300 mt-1 mb-4">{pkg.price}</p>
            <ul className="space-y-2 text-slate-300 text-sm mb-5">
              {pkg.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>

            <Link
              href={pkg.href}
              className="inline-flex text-sm text-primary-300 hover:text-primary-200"
            >
              Learn more →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicePackagesSection;
