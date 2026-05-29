"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Saeed was proactive, reliable, and fast at turning feedback into useful improvements.",
    name: "Startup Team Feedback",
    role: "Fintech Operations",
    initial: "S",
  },
  {
    quote: "Strong ownership mindset — he handled execution details while keeping user impact in focus.",
    name: "Product Collaboration Feedback",
    role: "Design & Product",
    initial: "P",
  },
];

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-primary-500/40" fill="currentColor" viewBox="0 0 32 32">
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
);

const TestimonialsSection = () => {
  return (
    <section className="py-10" id="testimonials">
      <div className="section-accent" />
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
        Testimonials
      </h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
        Short feedback from teams I&apos;ve worked with.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ translateY: -4 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 group-hover:from-primary-500/6 to-transparent transition-all duration-500 rounded-2xl" />
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <QuoteIcon />
            <p className="text-slate-200 leading-relaxed mt-3 text-base italic relative z-10">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3 relative z-10">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {item.initial}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-slate-400 text-xs">{item.role}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
