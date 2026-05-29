"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long does a typical website project take?",
    a: "Most projects are completed in 5–14 days depending on scope and feedback speed.",
  },
  {
    q: "Do you help with content and structure?",
    a: "Yes. I help shape page structure, messaging flow, and conversion-focused sections.",
  },
  {
    q: "Can I request revisions?",
    a: "Absolutely. Revisions are included in every package to ensure the site matches your goals.",
  },
  {
    q: "What is the fastest way to start?",
    a: "Send your goals and timeline via WhatsApp or the contact form — I'll reply with next steps the same day.",
  },
];

const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left group"
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm sm:text-base pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 group-hover:text-white transition-colors text-xl shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-300 text-sm px-4 pb-4 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-10" id="faq">
      <div className="section-accent" />
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">FAQ</h2>
      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">Common questions before getting started.</p>
      <div className="space-y-2 max-w-3xl mx-auto">
        {faqs.map((item, i) => (
          <FAQItem key={item.q} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
