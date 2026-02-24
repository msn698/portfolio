import React from "react";

const testimonials = [
  {
    quote:
      "Saeed was proactive, reliable, and fast at turning feedback into useful improvements.",
    name: "Startup Team Feedback",
    role: "Fintech Operations",
  },
  {
    quote:
      "Strong ownership mindset — he handled execution details while keeping user impact in focus.",
    name: "Product Collaboration Feedback",
    role: "Design & Product",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-10" id="testimonials">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Testimonials
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
        Short feedback from teams I’ve worked with.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((item, index) => (
          <article
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-slate-200 leading-relaxed">“{item.quote}”</p>
            <div className="mt-4">
              <p className="text-white font-medium text-sm">{item.name}</p>
              <p className="text-slate-400 text-xs">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
